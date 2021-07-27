<template>
  <div v-if="currentCharacter !== null" class="flex items-start justify-center">
    <q-expansion-item
      v-for="(groups, groupKey) in checklist"
      :key="groupKey"
      class="bg-blue-400 mx-4 rounded w-1/3 font-medium"
    >
      <template #header>
        <q-knob
          show-value
          track-color="grey-3"
          color="positive"
          :modelValue="getItemGroupCompletion(groups, hasItem)"
          >{{ getItemGroupCompletion(groups, hasItem).toFixed(0) }}%</q-knob
        >

        <q-item-section class="font-medium ml-2">{{ groupKey }}</q-item-section>
      </template>
      <q-card class="flex flex-wrap justify-center p-2">
        <template v-for="group in groups">
          <div v-for="item in group.items">
            <ICAsset
              v-if="
                group.cycle
                  ? item.name ===
                    highestUnlockedItemFromCycle(group, hasItem).name
                  : true
              "
              class="m-1 cursor-pointer"
              size="large"
              :enabled="hasItem(item.name)"
              :image="Assets.FromDir(item.name, group.assetDir)"
              :title="item.name"
              @click.stop="onChecklistItemClick(item, group, +1)"
              @contextmenu.stop.prevent="onChecklistItemClick(item, group, -1)"
            >
              <template #tooltip>
                <div
                  class="text-center"
                  v-html="getChecklistItemText(item)"
                ></div>
              </template>
            </ICAsset>
          </div>
        </template>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCharacters } from "~/composables/Characters";
import { CharacterChecklist, useChecklist } from "~/composables/Checklist";
import { Assets, Item, ItemGroup } from "~/composables/Utilities";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "CharacterProgressTracker",
  components: {
    ICAsset,
  },
  setup() {
    const { currentCharacter } = useCharacters();
    const {
      getChecklistItemText,
      getItemGroupCompletion,
      handleChecklistItemClick,
      highestUnlockedItemFromCycle,
    } = useChecklist();

    const hasItem = (item: string) =>
      currentCharacter.value?.hasItem(item) ?? false;

    const setItem = (item: string, state: boolean) => {
      if (currentCharacter.value !== null) {
        currentCharacter.value.items[item] = state;
      }
    };

    return {
      Assets,
      checklist: CharacterChecklist,
      currentCharacter,
      getChecklistItemText,
      getItemGroupCompletion,
      hasItem,
      highestUnlockedItemFromCycle,
      onChecklistItemClick: (
        item: Item,
        group: ItemGroup,
        direction?: 1 | -1
      ) => {
        handleChecklistItemClick(item, group, hasItem, setItem, direction);
      },
    };
  },
});
</script>

<style scoped lang="sass"></style>
