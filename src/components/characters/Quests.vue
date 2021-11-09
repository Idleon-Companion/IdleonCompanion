<template>
  <q-card v-if="currentCharacter" class="m-4">
    <q-card-section>
      <div class="flex items-center">
        <div class="text-2xl font-medium mr-2">Quests</div>
        <q-toggle v-model="hideCompletedQuests" label="Hide Completed Quests" />
      </div>
      <div class="grid grid-cols-3 mt-2">
        <div v-for="(npcs, category) in AllQuests">
          <div
            class="text-xl text-light text-center font-medium p-2 m-2 rounded"
            :class="categoryClass(category)"
          >
            {{ category }} {{ getCompletedByCategoryText(category) }}
          </div>
          <div class="flex flex-wrap w-full mx-4">
            <Tooltip v-for="(quests, npc) in npcs">
              <div class="flex flex-col">
                <img
                  class="cursor-pointer m-1 w-16 h-16 object-contain"
                  :src="Assets.NPCAnimated(npc)"
                />
                <q-badge
                  class="mx-auto"
                  :color="
                    numQuestsCompleted(quests) === quests.length ? 'green' : ''
                  "
                  >{{ numQuestsCompleted(quests) }}/{{ quests.length }}</q-badge
                >
                <q-popup-proxy>
                  <q-card class="pt-4 px-4 bg-primary">
                    <q-timeline color="grey-7">
                      <q-timeline-entry heading tag="div">
                        <div class="text-xl -mb-4">{{ npc }}</div>
                      </q-timeline-entry>
                      <q-timeline-entry
                        class="cursor-pointer"
                        v-for="quest in filteredQuests(quests)"
                        :color="questComplete(quest.id) ? 'green' : ''"
                        :icon="
                          questComplete(quest.id) ? 'mdi-check' : 'mdi-minus'
                        "
                        @click="onToggleQuestComplete(quest.id)"
                        ><template #subtitle>
                          <div
                            :class="questComplete(quest.id) ? 'text-green' : ''"
                          >
                            {{ quest.name }}
                          </div>
                        </template>
                      </q-timeline-entry>
                    </q-timeline>
                  </q-card>
                </q-popup-proxy>
              </div>
              <template #content>
                {{ npc }}
              </template>
            </Tooltip>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
<<<<<<< HEAD
import { AllQuests, Quest } from "~/composables/Quests";
import { Assets } from "~/composables/Utilities";
import { defineComponent, ref } from "vue";
import { useCharacters } from "~/composables/Characters";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "Quests",
  components: {
    ICAsset,
  },
=======
import { AllQuests } from "~/composables/Quests";
import { Assets } from "~/composables/Utilities";
import { defineComponent, ref } from "vue";
import { useCharacters } from "~/composables/Characters";

export default defineComponent({
  name: "Quests",
>>>>>>> 2307fef1... feat(quests): add quest data, persistence and basic functionality + UI
  setup() {
    const { currentCharacter } = useCharacters();

    const hideCompletedQuests = ref(false);

<<<<<<< HEAD
    const filteredQuests = (quests: Array<Quest>) => {
      return quests.filter((quest) => {
        return hideCompletedQuests.value ? !questComplete(quest.id) : true;
      });
    };

    const getCompletedByCategoryText = (category: string): string => {
      let quests = Object.values(
        AllQuests[category as keyof typeof AllQuests]
      ).flat();
      return `(${numQuestsCompleted(quests)}/${quests.length})`;
    };

    const numQuestsCompleted = (quests: Array<Quest>): number => {
      return quests.filter((x) => questComplete(x.id)).length;
=======
    const NUM_WORLDS = 3;
    const getQuestsByWorld = (world: number) => {
      return AllQuests.filter((quest) => {
        return (
          quest.world === world &&
          (hideCompletedQuests.value ? !questComplete(quest.id) : true)
        );
      });
    };

    const getCompletedByWorldText = (world: number): string => {
      let quests = getQuestsByWorld(world);
      let completed = quests.filter((x) => questComplete(x.id));
      return `(${completed.length}/${quests.length})`;
>>>>>>> 2307fef1... feat(quests): add quest data, persistence and basic functionality + UI
    };

    const questComplete = (id: string) => {
      return currentCharacter.value?.quests[id] ?? false;
    };

    const onToggleQuestComplete = (id: string) => {
      if (currentCharacter.value) {
        currentCharacter.value.quests[id] = !currentCharacter.value.quests[id];
      }
    };

<<<<<<< HEAD
    const categoryClass = (category: string): string => {
      return (
        {
          "World 1": "bg-green-600",
          "World 2": "bg-yellow-400",
          "World 3": "bg-blue-400",
        }[category] ?? ""
      );
    };

    return {
      AllQuests,
      Assets,
      categoryClass,
      currentCharacter,
      filteredQuests,
      getCompletedByCategoryText,
      hideCompletedQuests,
      numQuestsCompleted,
      onToggleQuestComplete,
      questComplete,
=======
    const worldClass = (world: number): string => {
      if (world === 1) {
        return "bg-green-600";
      }
      if (world === 2) {
        return "bg-yellow-400";
      }
      if (world === 3) {
        return "bg-blue-400";
      }
      return "";
    };

    return {
      Assets,
      currentCharacter,
      getCompletedByWorldText,
      getQuestsByWorld,
      hideCompletedQuests,
      NUM_WORLDS,
      onToggleQuestComplete,
      questComplete,
      worldClass,
>>>>>>> 2307fef1... feat(quests): add quest data, persistence and basic functionality + UI
    };
  },
});
</script>

<style scoped lang="sass"></style>
