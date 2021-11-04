<template>
  <q-banner inline-actions>
    Track your stamp levels and bribes (WIP), and calculate the material/coin
    cost for stamp levels. Note: The current implementation
    <em>does not</em> account for cost-decreasing effects, such as bribes.
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
    <div class="text-2xl">Stamps</div>
    <div class="mt-2 mx-auto md:w-[80%]">
      <q-markup-table separator="cell" bordered>
        <thead>
          <tr>
            <th
              class="bg-primary"
              v-for="header in [
                'Stamp',
                'Level',
                'Cost to Next Level',
                'Bonus',
              ]"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stamp, id) in allStamps" class="text-center">
            <td class="w-20">
              <Tooltip>
                <q-img width="48px" :src="Assets.StampImage(stamp.name)" />
                <template #content>
                  {{ stamp.name }}
                </template>
              </Tooltip>
            </td>
            <td class="w-20">
              <q-input
                :model-value="stamps[stamp.name] ?? 0"
                @update:model-value="stamps[stamp.name] = $event"
                type="number"
                :min="0"
                filled
              />
            </td>
            <td class="w-40">
              <div class="flex flex-col items-center justify-center">
                <CoinDisplay
                  :value="
                    calculateStampCoinCost(stamp, stamps[stamp.name] ?? 0)
                  "
                />
                <div class="flex">
                  <div
                    v-if="stamps[stamp.name] % stamp.diffRatio === 0"
                    class="flex items-center"
                  >
                    <ICAsset
                      :image="Assets.FromDir(stamp.material, 'materials')"
                      size="xs"
                    />
                    <div class="flex items-center ml-0.5">
                      {{
                        calculateStampMaterialsCost(
                          stamp,
                          stamps[stamp.name] ?? 0
                        )
                      }}
                    </div>
                  </div>
                  <div v-else>
                    Next material cost:
                    {{
                      stamp.diffRatio -
                      ((stamps[stamp.name] ?? 0) % stamp.diffRatio)
                    }}
                  </div>
                </div>
              </div>
            </td>
            <td class="w-40">
              +{{
                calculateStampBonus(stamp, stamps[stamp.name] ?? 0).toFixed(2)
              }}
              {{ stamp.bonus }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Assets } from "~/composables/Utilities";
import { Stamps, useStamps } from "~/composables/Stamps";
import { computed, defineComponent } from "vue";
import { useState } from "~/State";
import CoinDisplay from "~/components/CoinDisplay.vue";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

const wikiLinks = new Map([["Stamps", "https://idleon.info/wiki/Stamps"]]);

export default defineComponent({
  components: {
    CoinDisplay,
    ICAsset,
  },
  name: "Stamps",
  setup() {
    const state = useState();
    const {
      calculateStampCoinCost,
      calculateStampMaterialsCost,
      calculateStampBonus,
    } = useStamps();

    const stamps = computed({
      get: () => state.value.stamps,
      set: (value) => (state.value.stamps = value),
    });

    return {
      Assets,
      allStamps: Stamps,
      calculateStampBonus,
      calculateStampCoinCost,
      calculateStampMaterialsCost,
      stamps,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../../styles/base.sass'
</style>
