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
            class="
              md:text-xl
              text-light text-center
              font-medium
              p-2
              m-2
              rounded
            "
            :class="categoryClass(category)"
          >
            {{ category }} {{ getCompletedByCategoryText(category) }}
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mx-2">
            <Tooltip v-for="(quests, npc) in npcs">
              <div class="flex flex-col items-center">
                <img
                  class="cursor-pointer w-16 h-16 object-contain mb-1"
                  :src="Assets.NPCAnimated(npc)"
                />
                <q-badge
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
                        @click="onToggleQuestComplete(quest, quests)"
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
  setup() {
    const { currentCharacter } = useCharacters();

    const hideCompletedQuests = ref(false);

    const filteredQuests = (quests: Quest[]) => {
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

    const numQuestsCompleted = (quests: Quest[]): number => {
      return quests.filter((x) => questComplete(x.id)).length;
    };

    const questComplete = (id: string) => {
      return currentCharacter.value?.quests[id] ?? false;
    };

    const onToggleQuestComplete = (quest: Quest, npcQuests: Quest[]) => {
      if (currentCharacter.value) {
        const completed = currentCharacter.value.quests[quest.id];
        if (completed) {
          // Uncheck this quest and all subsequent quests from NPC
          for (const subsequent of npcQuests.filter((x) => x.id >= quest.id)) {
            currentCharacter.value.quests[subsequent.id] = false;
          }
        } else {
          // Check this quest and all previous quests from NPC
          for (const subsequent of npcQuests.filter((x) => x.id <= quest.id)) {
            currentCharacter.value.quests[subsequent.id] = true;
          }
        }
      }
    };

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
    };
  },
});
</script>

<style scoped lang="sass"></style>
