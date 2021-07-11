<template>
  <q-card v-if="curCharacter" class="m-4">
    <q-card-section :horizontal="!isMobile">
      <q-card-section class="flex flex-col w-full md:(items-start w-1/3)">
        <div class="text-2xl font-medium">Character Info</div>
        <div class="flex items-center mt-2">
          <q-avatar>
            <img src="logo.png" class="object-contain" />
          </q-avatar>
          <div class="flex flex-col ml-4">
            <q-input
              v-model="curCharacter.name"
              filled
              label="Name"
              placeholder="EpicGamer73"
              input-class="text-2xl"
            />
            <q-input
              v-model.number="curCharacter.level"
              filled
              type="number"
              label="Level"
              class="mt-2 w-1/3"
              :min="1"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="flex flex-col w-2/3">
        <div class="text-2xl font-semibold">Skills</div>
        <div class="flex flex-wrap">
          <q-input
            v-for="(skill, skillIndex) in allSkills"
            :key="skillIndex"
            v-model.number="curCharacter.skills[skill]"
            outlined
            type="number"
            class="mr-2 mb-2 w-1/2 md:w-1/3 lg:w-1/4"
          >
            <template v-slot:prepend>
              <Tooltip>
                <template #content>
                  {{ skill }}
                </template>
                <q-icon :name="'img:' + iconImage(skill)" />
              </Tooltip>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="negative">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCharacters, Skills as allSkills } from "~/composables/Characters";
import { Assets, useLayout } from "~/composables/Utilities";

export default defineComponent({
  name: "CharacterEditor",
  setup() {
    const { curCharacter } = useCharacters();
    const { isMobile } = useLayout();

    return {
      allSkills,
      curCharacter,
      isMobile,
      iconImage: Assets.IconImage,
    };
  },
});
</script>

<style scoped lang="sass"></style>
