<template>
  <tr>
    <td>
      <ICAsset
        :image="Assets.FromDir(`${color}${index + 1}`, 'alchemy')"
        :title="bubbleInfo.effectDesc"
      ></ICAsset>
    </td>
    <td>{{ startCase(bubbleInfo.Name) }}</td>
    <td class="md:w-1/12">
      <q-input v-model.number="alchemyUpgrade" filled type="number" :min="0" />
    </td>
    <td class="md:w-1/12">
      <q-input
        type="number"
        v-model.number="alchemyGoal"
        filled
        :min="alchemyUpgrade"
      />
    </td>
    <td>
      {{ calculateBubbleEffect(color, index, alchemyUpgrade).toFixed(2)
      }}{{
        alchemyGoal > alchemyUpgrade
          ? ` 🡒 ${calculateBubbleEffect(color, index, alchemyGoal).toFixed(2)}`
          : ""
      }}
    </td>
    <td>
      <div class="flex">
        <div
          v-for="material in bubbleInfo.Materials"
          class="flex flex-col items-center mr-1"
        >
          <ICAsset
            :image="
              Assets.FromDir(
                material.Name,
                material.isLiquid ? 'alchemy' : 'materials'
              )
            "
            :title="material.Name"
            size="small"
          ></ICAsset>
          <div>{{ material.Amount }}</div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import { startCase } from "lodash";

import {
  AlchemyColor,
  AlchemyConst,
  AlchemyUtil,
  useAlchemy,
} from "~/composables/Alchemy";
import { Assets } from "~/composables/Utilities";
import { useState } from "~/State";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "AlchemyRow",
  components: {
    ICAsset,
  },
  props: {
    color: {
      required: true,
      type: String as PropType<AlchemyColor>,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const state = useState();
    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });

    // Computed refs to update values with v-model
    const alchemyGoal = computed({
      get: () => alchemy.value.goals[props.color][props.index],
      set: (value) => (alchemy.value.goals[props.color][props.index] = value),
    });
    const alchemyUpgrade = computed({
      get: () => alchemy.value.upgrades[props.color][props.index],
      set: (value) =>
        (alchemy.value.upgrades[props.color][props.index] = value),
    });

    const { calculateBubbleEffect, getBubbleInfo } = useAlchemy();

    // Compute all materials needed for the wanted upgrades
    // const computeMaterials = () => {
    //   // Discounts are stored as e.g. 70 (%), however calculation need the form of 0.3
    //   let discountCalc = props.discount.map((a) => {
    //     return (100 - a) / 100;
    //   });
    //   let levelNow = alchemy.value.upgrades[props.group][props.idx] ?? 0;
    //   let levelGoal = alchemy.value.goals[props.group][props.idx] ?? 0;
    //   let materialHistogram = [0, 0, 0, 0];
    //   let bubble = bubblesData[props.group][props.idx];

    //   // Sum all materials of the different levels together into the histogram
    //   for (var i = levelNow; i < levelGoal; i++) {
    //     let levelMulti = Math.pow(1.35 - (0.3 * i) / (50 + i), i);
    //     bubble.Materials.forEach((m, y) => {
    //       if (m.isLiquid) {
    //         materialHistogram[y] += m.Amount + Math.floor(i / 20);
    //       } else {
    //         materialHistogram[y] += Math.round(
    //           m.Amount * levelMulti * discountCalc[discountCalc.length - 1]
    //         );
    //       }
    //     });
    //   }
    //   // Return the histogram combined with the material name and leave empty when no material name in that slot
    //   return materialHistogram.map(function (e, x) {
    //     if (x < bubble.Materials.length) {
    //       return [bubble.Materials[x].Name, e.toLocaleString()];
    //     }
    //     return "";
    //   });

    return {
      alchemyGoal,
      alchemyUpgrade,
      Assets,
      bubbleInfo: computed(() => getBubbleInfo(props.color, props.index)),
      calculateBubbleEffect,
      startCase,
    };
  },
});
</script>

<style lang="sass" scoped></style>
