<template>
  <q-banner inline-actions>
    Use this page to help plan the Pack Mule Crafter W1 Task. Select your
    highest unlocked Anvil Tab, and what task tier you need to complete.
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
  <q-card class="m-4 p-2">
    <q-card-section>
      <div class="flex justify-between items-center">
        <div class="text-2xl">Pack Mule Crafter</div>
        <div class="text-sm">Last Updated: {{ lastUpdated }}</div>
      </div>
      <div class="flex">
        <q-select
          v-model="anvilTab"
          label="Anvil Tab"
          outlined
          :options="anvilTabs"
          class="w-full md:(w-1/4 mr-2) mt-2"
        />
        <q-select
          v-model="taskTier"
          label="Task Tier"
          outlined
          :options="taskTiers"
          class="w-full md:w-1/4 mt-2"
        />
      </div>
    </q-card-section>
    <q-card-section v-if="anvilTab && taskTier">
      <div v-if="!recommended.recipes.length">
        <div class="text-xl mb-2">No Recipe Suggestions</div>
        <div>This is probably due to the following:</div>
        <li>
          This Anvil Tab selection doesn't have enough items for this tier of
          the task
        </li>
        <li>
          There aren't enough inventory slots available to craft all the items
          for this tier of the task
        </li>
      </div>
      <div v-else>
        <div class="text-xl">Notes</div>
        <ul class="list-disc ml-4">
          <li>
            Recipes need to be crafted in the order they are listed, as that's
            how they were successfully tested
          </li>
          <li>
            Remember to combine "not full" stacks of materials when possible, as
            that was taken into account during testing
          </li>
          <li>
            The list of Inventory Capacity Setups are not a perfect calculation
            and there can be variation between setups for a given number of
            slots and list of materials. These lists are always looking to be
            improved and should always be considered a possibility, not "the
            best"
          </li>
        </ul>
        <div class="flex justify-around">
          <div class="flex flex-col justify-center w-full md:w-1/3">
            <q-card bordered class="m-2 p-2">
              <q-scroll-area class="h-80">
                <div class="text-lg">Recipe List</div>
                <div v-for="(recipe, index) in recommended.recipes">
                  <div class="p-2 opacity-86">
                    <ICAsset
                      :image="
                        Assets.MaterialImage(recipe.replace(/[0-9]+ /g, ''))
                      "
                      size="small"
                    />
                    {{ recipe }}
                  </div>
                  <q-separator v-if="index < recommended.recipes.length - 1" />
                </div>
              </q-scroll-area>
            </q-card>
            <q-card bordered class="m-2 p-2">
              <q-scroll-area class="h-80">
                <div class="text-lg">Materials Needed</div>
                <div v-for="(material, index) in recommended.materials">
                  <div class="p-2 opacity-86">
                    <ICAsset
                      :image="
                        Assets.MaterialImage(material.replace(/[0-9]+ /g, ''))
                      "
                      size="small"
                    />
                    {{ material }}
                  </div>
                  <q-separator
                    v-if="index < recommended.materials.length - 1"
                  />
                </div>
              </q-scroll-area>
            </q-card>
          </div>
          <q-card bordered class="w-full md:w-1/2 m-2 p-4">
            <q-scroll-area class="h-160">
              <div class="flex justify-between mb-2">
                <div>
                  <div class="text-lg">Inventory Requirements</div>
                  <div class="text-sm">
                    By default, the highest requirements your character meets
                    are shown.
                  </div>
                </div>
                <q-toggle v-model="showAllRequirements" label="Show All" />
              </div>
              <q-markup-table
                v-if="inventoryRequirements.length > 0"
                bordered
                class="text-center"
              >
                <thead>
                  <tr>
                    <th>Bag Slots</th>
                    <th>Material</th>
                    <th>Mining</th>
                    <th>Fish</th>
                    <th>Food</th>
                    <th>Choppin</th>
                    <th>Bugs</th>
                    <th>Critters</th>
                    <th>Souls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="inventory in inventoryRequirements">
                    <td>{{ inventory.slots }}</td>
                    <td>{{ inventory.material }}</td>
                    <td>{{ inventory.mining }}</td>
                    <td>{{ inventory.fish }}</td>
                    <td>{{ inventory.food }}</td>
                    <td>{{ inventory.choppin }}</td>
                    <td>{{ inventory.bug }}</td>
                    <td>{{ inventory.critter }}</td>
                    <td>{{ inventory.soul }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
              <q-card v-else flat bordered class="p-2">
                Your character needs more inventory slots to be able to complete
                this task!
              </q-card>
            </q-scroll-area>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { Assets } from "~/composables/Utilities";
import { useCharacters } from "~/composables/Characters";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";
import packMuleData from "~/data/packMule.json";

type PackMuleObject = {
  tier: number;
  items: number;
  recipes: Array<string>;
  materials: Array<string>;
  caps: Array<Record<string, number>>;
};
type SelectOption = {
  label: string;
  value: string;
};

const anvilTabs = [
  { label: "Anvil Tab 1", value: "anvil1" },
  { label: "Anvil Tab 2", value: "anvil2" },
  { label: "Anvil Tab 3", value: "anvil3" },
];
const taskTiers = [
  { label: "Tier 1 (3 Items)", value: "tier1" },
  { label: "Tier 2 (8 Items)", value: "tier2" },
  { label: "Tier 3 (14 Items)", value: "tier3" },
  { label: "Tier 4 (24 Items)", value: "tier4" },
  { label: "Tier 5 (34 Items)", value: "tier5" },
  { label: "Tier 6 (45 Items)", value: "tier6" },
  { label: "Tier 7 (55 Items)", value: "tier7" },
  { label: "Tier 8 (70 Items)", value: "tier8" },
  { label: "Tier 9 (90 Items)", value: "tier9" },
  { label: "Tier 10 (110 Items)", value: "tier10" },
];
const lastUpdated = "July 31, 2021 (v1.23)";
const wikiLinks = new Map([
  [
    "Pack Mule Crafter Task",
    "https://idleon.miraheze.org/wiki/Tasks/Blunder_Hills#Pack_Mule_Crafter",
  ],
]);

export default defineComponent({
  name: "PackMuleCrafter",
  components: {
    ICAsset,
  },
  setup() {
    const { currentCharacter } = useCharacters();
    const data: Record<string, PackMuleObject> = packMuleData;
    const anvilTab = ref(null as SelectOption | null);
    const taskTier = ref(null as SelectOption | null);
    const showAllRequirements = ref(false);

    const recommended = computed((): PackMuleObject => {
      if (!anvilTab.value || !taskTier.value) {
        return {} as PackMuleObject;
      }
      return data[`${anvilTab.value.value}${taskTier.value.value}`];
    });

    const inventoryRequirements = computed(() => {
      // Filters the list of recommended inventory caps by current character slot
      let filtered = recommended.value.caps;
      if (!showAllRequirements.value) {
        filtered = recommended.value.caps.filter(
          (x) => x.slots <= (currentCharacter.value?.bagSlots ?? 0)
        );
      }
      return filtered.slice().reverse();
    });

    return {
      Assets,
      anvilTab,
      anvilTabs,
      currentCharacter,
      inventoryRequirements,
      lastUpdated,
      recommended,
      showAllRequirements,
      taskTier,
      taskTiers,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped></style>
