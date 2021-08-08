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
        ` 🡒 ${calculateBubbleEffect(color, index, alchemyGoal).toFixed(2)}`
      }}
    </td>
    <td>
      <div class="flex">
        <div
          v-for="material in upgradeMaterialCost"
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
          <div>{{ Math.round(material.Amount) }}</div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import { cloneDeep, startCase } from "lodash";

import { AlchemyColor, useAlchemy } from "~/composables/Alchemy";
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
    discount: {
      required: true,
      type: Number,
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

    const bubbleInfo = computed(() => getBubbleInfo(props.color, props.index));

    const { calculateBubbleEffect, getBubbleInfo } = useAlchemy();

    const upgradeMaterialCost = computed(() => {
      // Discounts are stored as e.g. 70 (%), however calculation need the form of 0.3
      let discountBy = (100 - props.discount) / 100;
      let materialCosts = cloneDeep(bubbleInfo.value.Materials);
      // Sum all materials of the different levels together into the histogram
      for (let i = alchemyUpgrade.value; i < alchemyGoal.value - 1; i += 1) {
        let levelMulti = Math.pow(1.35 - (0.3 * i) / (50 + i), i);
        bubbleInfo.value.Materials.forEach((material, index) => {
          if (material.isLiquid) {
            materialCosts[index].Amount += material.Amount + Math.floor(i / 20);
          } else {
            materialCosts[index].Amount +=
              material.Amount * levelMulti * discountBy;
          }
        });
      }
      return materialCosts;
    });

    return {
      alchemyGoal,
      alchemyUpgrade,
      Assets,
      bubbleInfo,
      calculateBubbleEffect,
      startCase,
      upgradeMaterialCost,
    };
  },
});
</script>

<style lang="sass" scoped></style>
