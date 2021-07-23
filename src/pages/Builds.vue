<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Browse through our list of suggested builds, filtered by character
        class.
      </p>
    </div>
  </div>
  <div class="flex justify-between my-3 w-full">
    <div class="flex w-full">
      <div class="input-group">
        <span class="input-group-text">Class</span>
        <select v-model="buildClass" class="bg-primary" id="buildClass">
          <option v-for="(c, v) in classes" :key="c" :value="c">
            {{ v }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <span class="input-group-text">Subclass</span>
        <select v-model="buildSubclass" class="bg-primary" id="buildClass">
          <option value=""></option>
          <option v-for="(c, v) in subclasses" :key="c" :value="c">
            {{ v }}
          </option>
        </select>
      </div>
    </div>
    <div class="input-group">
      <span class="input-group-text bg-dark text-light">Build</span>
      <select
        v-model="showcaseBuildIndex"
        @change="
          loadBuildFromShowcase(showcaseBuildIndex);
          editingMode = false;
        "
        class="bg-primary w-2/3"
        id="buildSelector"
      >
        <option
          v-for="(build, i) in filteredBuilds"
          :key="build.title"
          :value="i"
        >
          {{ build.title }}
        </option>
      </select>
    </div>
  </div>

  <div class="flex w-full my-2">
    <button
      class="bg-info px-3 py-2 rounded my-auto min-w-1/6"
      @click="
        createNewBuild(buildClass, buildSubclass);
        editingMode = true;
      "
    >
      Create New Build
    </button>
    <input
      v-if="currentBuild && editingMode"
      v-model="currentBuild.title"
      placeholder="Build Name"
      class="mx-3 w-full"
    />
    <div v-if="currentBuild" class="input-group">
      <div class="input-group-text">Recommended Level</div>
      <input
        v-if="currentBuild"
        :disabled="!editingMode"
        v-model="currentBuild.level"
        class="bg-primary"
        placeholder="10"
      />
    </div>
    <div v-if="currentBuild" class="input-group">
      <div class="input-group-text">Game Version</div>
      <select v-model="currentBuild.version" class="bg-primary">
        <option v-for="(version, i) in versions" :key="i" :value="version">
          {{ version }}
        </option>
      </select>
    </div>
    <button
      v-if="currentBuild && editingMode && user !== null"
      class="bg-success ml-auto min-w-1/12"
      @click="uploadBuild"
    >
      Post Build
    </button>
  </div>

  <BuildSkills :editingMode="editingMode" />
  <div
    v-if="currentBuild"
    class="flex items-center bg-primary border border-secondary rounded mt-4"
  >
    <textarea
      v-model="currentBuild.notes"
      :disabled="!editingMode"
      placeholder="Notes about your perfect build."
      class="text-light w-full resize border-0"
    ></textarea>
  </div>
  <div
    v-if="currentBuild && currentBuildMeta.id"
    class="flex items-center text-light bg-primary p-2 rounded"
  >
    <div>Likes: {{ currentBuildMeta.likes }}</div>
    <div class="flex items-center ml-2" @click="copyBuildLink">
      <div class="italic mr-1">Share Build</div>
      <div class="iconify" data-icon="mdi:link"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";

import BuildSkills from "~/components/BuildSkills.vue";
import { useBuilds, Build } from "~/composables/Builds";
import { Class, Subclass, useCharacters } from "~/composables/Characters";
import { GameVersions } from "~/composables/Utilities";
import { useAuth } from "~/State";

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
      loadBuildFromShowcase,
      uploadBuild,
    } = useBuilds();
    const { currentCharacter } = useCharacters();
    const toast = useToast();
    // Refs
    const buildClass = ref<Class>(Class.All);
    const buildSubclass = ref<Subclass | null>(null);
    const editingMode = ref(false);
    const showcaseBuildIndex = ref(-1);

    // Hooks
    onBeforeMount(() => {
      if (currentCharacter.value) {
        buildClass.value = currentCharacter.value.class;
        buildSubclass.value = currentCharacter.value.subclass;
      }
    });

    const copyBuildLink = () => {
      navigator.clipboard.writeText(currentBuildLink.value).then((_) => {
        toast.success("Build link copied to clipboard!");
      });
    };

    const currentBuildLink = computed(() => {
      return process.env.NODE_ENV === "production"
        ? `https://idleoncompanion.com/build/${currentBuildMeta.value.id}`
        : `http://localhost:3000/build/${currentBuildMeta.value.id}`;
    });

    const filteredBuilds = computed(() => {
      let filtered: Build[] = [];
      if (buildClass.value === Class.All) {
        return builds;
      }
      for (const build of builds) {
        if (build.class === buildClass.value) {
          if (buildSubclass.value && buildSubclass.value !== build.subclass) {
            continue;
          }
          filtered.push(build);
        }
      }
      return filtered;
    });

    return {
      buildClass,
      buildSubclass,
      copyBuildLink,
      createNewBuild,
      currentBuild,
      currentBuildLink,
      currentBuildMeta,
      classes: Class,
      editingMode,
      filteredBuilds,
      loadBuildFromShowcase,
      showcaseBuildIndex,
      subclasses: Subclass,
      uploadBuild,
      user,
      versions: GameVersions,
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
