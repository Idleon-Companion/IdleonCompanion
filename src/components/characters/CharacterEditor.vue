<template>
  <q-card v-if="currentCharacter" class="m-4">
    <q-card-section :horizontal="!isMobile" class="flex flex-col md:(flex-row)">
      <q-card-section class="flex flex-col w-full">
        <div class="text-2xl font-medium">Character Info</div>
        <div class="flex items-center mt-2">
          <div class="rounded-full border border-gray-500 p-2 cursor-pointer">
            <ICAsset :image="Assets.CharImage(currentCharacter)" size="large" />
            <q-popup-proxy>
              <q-card class="flex flex-wrap p-2 bg-primary">
                <ICAsset
                  v-for="(class_, i) in allClasses"
                  :key="i"
                  :image="Assets.IconImage(class_)"
                  :title="class_"
                  size="small"
                  class="character-class-img rounded-full cursor-pointer p-2"
                  @click="onSetClass(class_)"
                />
              </q-card>
            </q-popup-proxy>
          </div>
          <div class="flex flex-col ml-4">
            <q-input
              v-model="currentCharacter.name"
              filled
              label="Name"
              placeholder="EpicGamer73"
              input-class="text-2xl"
              class="flex-wrap"
            />
            <q-input
              v-model.number="currentCharacter.level"
              filled
              type="number"
              label="Level"
              class="mt-2 w-1/3"
              :min="1"
              :max="9999"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="flex flex-col w-full">
        <div class="text-2xl font-semibold">Skills</div>
        <div class="flex flex-wrap">
          <q-input
            v-for="(skill, skillIndex) in allSkills"
            :key="skillIndex"
            v-model.number="currentCharacter.skills[skill]"
            outlined
            type="number"
            class="mr-2 mb-2 w-1/2 md:w-1/3 lg:w-1/4"
            :min="0"
            :max="9999"
            :rules="[clampSkill()]"
          >
            <template v-slot:prepend>
              <Tooltip>
                <template #content>
                  {{ skill }}
                </template>
                <q-icon :name="'img:' + Assets.IconImage(skill)" />
              </Tooltip>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="info" @click="onCreateNewCharacter">New Character</q-btn>
      <q-btn color="negative" @click="onDeleteCurrentCharacter">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Assets, useLayout } from "~/composables/Utilities";
import {
  Class,
  Skills as allSkills,
  useCharacters,
} from "~/composables/Characters";
import { computed, defineComponent } from "vue";
import { useToast } from "vue-toastification";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "CharacterEditor",
  components: {
    ICAsset,
  },
  setup() {
    const { createNewCharacter, currentCharacter, deleteCurrentCharacter } =
      useCharacters();
    const { isMobile } = useLayout();
    const toast = useToast();

    const onCreateNewCharacter = () => {
      createNewCharacter();
      toast.info("New character created.");
    };

    const onDeleteCurrentCharacter = () => {
      deleteCurrentCharacter();
      toast.info("Character deleted.");
    };

    const onSetClass = (class_: Class) => {
      if (currentCharacter.value) {
        currentCharacter.value.class = class_;
      }
    };

    return {
      allClasses: computed(() => Object.values(Class)),
      allSkills,
      Assets,
      currentCharacter,
      isMobile,
      onCreateNewCharacter,
      onDeleteCurrentCharacter,
      onSetClass,
    };
  },

  methods: {
    clampSkill() {
      return (val: number) => (val >= 0 && val <= 9999) || 'Skill values must be 0-9999'
    }
  },
});
</script>

<style scoped lang="sass">
.character-class-img
  transition: 0.3s
  &:hover
    transform: scale(1.05)
    background: rgba(white, 0.05)
</style>
