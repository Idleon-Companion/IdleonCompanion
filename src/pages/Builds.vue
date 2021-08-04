<template>
  <q-banner inline-actions>
    Browse through our list of curated character builds, filtered by class and
    level. You can also create your own builds and share them through a custom
    link!
    <template v-slot:action>
      <q-btn-dropdown outline label="Wiki">
        <q-list separator>
          <a v-for="[label, link] in wikiLinks" :key="label" :href="link">
            <q-item clickable>
              <q-item-section>{{ label }}</q-item-section>
            </q-item>
          </a>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-banner>

  <q-card class="m-4">
    <q-card-section>
      <div class="text-xl">Recommended Builds</div>
      <div class="text-secondary">
        By default, your current character's class/subclass will be selected.
      </div>
      <div class="flex justify-between mt-2">
        <div class="flex md:w-1/2">
          <div class="md:w-1/3 mr-2">
            <q-select
              outlined
              v-model="buildClass"
              label="Class"
              :options="classes"
            />
          </div>
          <div class="md:w-1/3 mr-2">
            <q-select
              outlined
              v-model="buildSubclass"
              label="Subclass"
              :options="subclasses"
            />
          </div>
        </div>
        <div class="md:w-1/2">
          <q-select
            outlined
            :model-value="currentBuild?.title"
            @update:model-value="onSelectRecommendedBuild"
            label="Build"
            :options="filteredBuilds"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No builds found!
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="flex pt-1 -ml-1" v-if="currentBuild">
        <q-chip color="primary">
          Level: {{ currentBuild.level ?? "?" }}
        </q-chip>
        <q-chip color="primary">
          Game Version: {{ currentBuild.version ?? "?" }}
        </q-chip>
      </div>
    </q-card-section>
    <q-card-section v-if="currentBuild">
      <BuildSkills :editingMode="editingMode" />
      <q-input
        v-model="currentBuild.notes"
        autogrow
        filled
        type="textarea"
        class="mt-4"
        placeholder="Notes about your perfect build. Explain the order of upgrades, tradeoffs, or other important notes."
      ></q-input>
    </q-card-section>
    <q-card-section v-if="currentBuild && currentBuildMeta.id">
      <q-btn
        text-color="red"
        round
        :icon="
          currentBuildMeta.likedByCurrentUser ? 'favorite' : 'favorite_border'
        "
        @click="onToggleBuildLike"
      >
        <q-badge floating>{{ currentBuildMeta.likes }}</q-badge>
      </q-btn>
      <q-btn
        color="primary"
        icon="share"
        label="Share"
        class="ml-4"
        @click="onCopyBuildLink"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-xl">Create/Share Builds</div>
      <div class="text-secondary">
        Edit build class, talents, and talent comments above.
      </div>
      <div v-if="currentBuild && editingMode" class="flex w-full pt-2">
        <div class="md:(w-1/3 pr-2)">
          <q-input
            v-model="currentBuild.title"
            placeholder="Warrior AFK"
            label="Build Name"
            filled
          />
        </div>
        <div class="md:(w-1/6 pr-2)">
          <q-input
            v-model.number="currentBuild.level"
            type="number"
            :min="1"
            label="Level"
            filled
          />
        </div>
        <div class="md:w-1/6">
          <q-select
            v-model="currentBuild.version"
            label="Game Version"
            :options="versions"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn color="info" label="New Build" @click="onCreateNewBuild" />
      <q-btn
        v-if="editingMode"
        color="positive"
        label="Upload Build"
        @click="onUploadBuild"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";

import { Build, useBuilds } from "~/composables/Builds";
import {
  Class,
  Subclass,
  SubclassTree,
  useCharacters,
} from "~/composables/Characters";
import { GameVersions } from "~/composables/Utilities";
import { useAuth } from "~/State";
import BuildSkills from "~/components/BuildSkills.vue";

const wikiLinks = new Map([
  ["Classes", "https://idleon.info/wiki/Classes"],
  ["Special Talents", "https://idleon.info/wiki/Special_Talents"],
]);

export default defineComponent({
  name: "Builds",
  components: {
    BuildSkills,
  },
  setup() {
    const { user } = useAuth();
    const {
      builds,
      createNewBuild,
      currentBuild,
      currentBuildMeta,
      likeBuild,
      unlikeBuild,
      uploadBuild,
    } = useBuilds();
    const { currentCharacter } = useCharacters();
    const toast = useToast();
    // Refs
    const buildClass = ref<Class>(Class.Beginner);
    const buildSubclass = ref<Subclass | null>(null);
    const editingMode = ref(false);

    // Hooks
    onBeforeMount(() => {
      if (currentCharacter.value) {
        buildClass.value = currentCharacter.value.class;
        buildSubclass.value = currentCharacter.value.subclass;
      }
    });

    const onCopyBuildLink = () => {
      navigator.clipboard.writeText(currentBuildLink.value).then((_) => {
        toast.success("Build link copied to clipboard!");
      });
    };

    const onCreateNewBuild = () => {
      createNewBuild(buildClass.value, buildSubclass.value);
      editingMode.value = true;
    };

    const onToggleBuildLike = async () => {
      if (!currentBuild.value || !currentBuildMeta.value || !user.value) {
        return;
      }
      if (currentBuildMeta.value.likedByCurrentUser) {
        unlikeBuild(currentBuildMeta.value.id);
        currentBuildMeta.value.likes -= 1;
        currentBuildMeta.value.likedByCurrentUser = false;
      } else {
        likeBuild(currentBuildMeta.value.id);
        currentBuildMeta.value.likes += 1;
        currentBuildMeta.value.likedByCurrentUser = true;
      }
    };

    const onSelectRecommendedBuild = (selection: {
      label: string;
      value: Build;
    }) => {
      currentBuild.value = selection.value;
      editingMode.value = false;
    };

    const filteredSubclasses = computed(() => {
      return [
        null,
        ...Object.values(Subclass).filter(
          (x) => SubclassTree[x] === buildClass.value
        ),
      ];
    });

    const currentBuildLink = computed(() => {
      return import.meta.env.PROD
        ? `https://idleoncompanion.com/build/${currentBuildMeta.value.id}`
        : `http://localhost:3000/build/${currentBuildMeta.value.id}`;
    });

    const filteredBuilds = computed(() => {
      let filtered: Build[] = [];
      if (buildClass.value === Class.Beginner) {
        filtered = builds;
      } else {
        for (const build of builds) {
          if (build.class === buildClass.value) {
            if (buildSubclass.value && buildSubclass.value !== build.subclass) {
              continue;
            }
            filtered.push(build);
          }
        }
      }
      return filtered.map((build) => {
        return {
          label: build.title,
          value: build,
        };
      });
    });

    return {
      buildClass,
      buildSubclass,
      currentBuild,
      currentBuildLink,
      currentBuildMeta,
      classes: computed(() => Object.values(Class)),
      editingMode,
      filteredBuilds,
      onCopyBuildLink,
      onCreateNewBuild,
      onSelectRecommendedBuild,
      onToggleBuildLike,
      onUploadBuild: uploadBuild,
      recommendedBuilds: builds,
      subclasses: filteredSubclasses,
      user,
      versions: GameVersions,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
.input-group
  .input-group-text, select
    border: none
</style>
