<template>
  <q-banner inline-actions>
    Track your account collection progress! Use this page to keep track of all
    global collectibles such as chests, stamps, cards, and more. See the Wiki
    link for drop table info.
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
  <q-card class="m-4 p-4">
    <div class="text-2xl">Unique Collectibles</div>
    <div class="flex items-start justify-center">
      <q-expansion-item
        v-for="(groups, category) in allItems"
        class="bg-blue-400 m-4 rounded w-full md:w-1/4 font-medium"
      >
        <template #header>
          <q-knob
            show-value
            track-color="grey-3"
            color="positive"
            :modelValue="getItemGroupCompletion(groups, hasItem)"
            >{{ getItemGroupCompletion(groups, hasItem).toFixed(0) }}%</q-knob
          >
          <q-item-section class="font-medium ml-2">{{
            category
          }}</q-item-section>
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
                @contextmenu.stop.prevent="
                  onChecklistItemClick(item, group, -1)
                "
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
  </q-card>
  <CardTracker />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { Assets, Item, ItemGroup, wikiBaseURL } from "~/composables/Utilities";
import { GlobalChecklist, useChecklist } from "~/composables/Checklist";
import { useState } from "~/State";
import CardTracker from "~/components/tracker/CardTracker.vue";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

const wikiLinks = new Map([
  ["Drop Tables", wikiBaseURL + "Category:Droptables"],
]);

export default defineComponent({
  name: "ProgressTracker",
  components: {
    CardTracker,
    ICAsset,
  },
  setup() {
    const state = useState();

    const {
      getChecklistItemText,
      getItemGroupCompletion,
      handleChecklistItemClick,
      highestUnlockedItemFromCycle,
    } = useChecklist();
    const checklist = computed({
      get: () => state.value.checklist,
      set: (value) => (state.value.checklist = value),
    });

    // Utility functions
    const hasItem = (item: string) => Boolean(checklist.value[item]);
    const setItem = (item: string, state: boolean) =>
      (checklist.value[item] = state);

    return {
      allItems: GlobalChecklist,
      Assets,
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
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped></style>
