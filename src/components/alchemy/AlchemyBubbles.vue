<template>
  <div class="text-xl">Bubble Discount</div>
  <div class="flex py-2">
    <div class="flex flex-col pr-2">
      <q-input
        v-model.number="cauldronLevel"
        type="number"
        label="Cauldron Boost Cost Level"
        filled
        :min="0"
      />
      <div class="text-secondary p-1">
        {{ `-${discount.Cauldron.toFixed(1)}%` }}
      </div>
    </div>
    <div class="flex flex-col px-2">
      <q-input
        v-model.number="bargainTagLevel"
        type="number"
        label="Bargain Tag Level"
        filled
        :min="0"
        class="mr-2"
      />
      <div class="text-secondary p-1">
        {{ `-${discount["Bargain Tag"].toFixed(1)}%` }}
      </div>
    </div>
    <div class="flex flex-col justify-end px-2">
      <div class="text-lg">Bargain Bubble</div>
      <div class="text-secondary p-1">
        {{ `-${discount["Bargain Bubble"].toFixed(1)}%` }}
      </div>
    </div>
    <div class="flex flex-col justify-end px-2">
      <div class="text-lg">Underdeveloped Costs/Barley Brew</div>
      <div class="text-secondary p-1">
        {{ `-${discount["Underdeveloped Costs/Barley Brew"].toFixed(1)}%` }}
      </div>
    </div>
    <div class="flex flex-col justify-end px-2">
      <div class="text-lg">Obtained S-M-R-T</div>
      <div class="q-gutter-sm">
      <q-checkbox
        v-model="hasAchievement"
        color="secondary"
      />
    </div>
    </div>
    <div class="flex flex-col justify-end px-2 text-green-500">
      <div class="text-lg">Total Discount</div>
      <div class="p-1">
        {{ `-${discount["Total"].toFixed(1)}%` }}
      </div>
    </div>
  </div>
  <q-btn
    v-for="(cauldron, color) in cauldrons"
    unelevated
    @click="onChangeCauldron(color)"
    :class="{ 'bg-primary': currentCauldron === color }"
  >
    <div :style="{ color: cauldron.hex }">{{ cauldron.name }} Cauldron</div>
  </q-btn>
  <q-markup-table bordered>
    <thead>
      <tr class="text-left">
        <th></th>
        <th>Name</th>
        <th>Level</th>
        <th>Goal</th>
        <th>Effect</th>
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      <AlchemyBubbleRow
        v-for="(_, index) in bubbleCount"
        :color="currentCauldron"
        :discount="discount['Total']"
        :index="bubbleCount - index - 1"
      />
    </tbody>
  </q-markup-table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { AlchemyColor, AlchemyConst, useAlchemy } from "~/composables/Alchemy";
import { Assets } from "~/composables/Utilities";
import { useState } from "~/State";
import AlchemyBubbleRow from "~/components/alchemy/AlchemyBubbleRow.vue";

interface CauldronInfo {
  name: string;
  hex: string;
}

const CauldronData: Record<AlchemyColor, CauldronInfo> = {
  Orange: {
    name: "Power",
    hex: "#ff9420",
  },
  Green: {
    name: "Quicc",
    hex: "#47db5a",
  },
  Purple: {
    name: "High IQ",
    hex: "#cb79e3",
  },
  Yellow: {
    name: "Kazam",
    hex: "#edc300",
  },
};

export default defineComponent({
  name: "Cauldrons",
  components: {
    AlchemyBubbleRow,
  },
  setup() {
    const state = useState();
    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });

    const { calculateBubbleDiscount } = useAlchemy();

    const currentCauldron = ref<AlchemyColor>("Orange");
    const hasAchievement = ref<number>(0);

    const cauldronLevel = ref(0);
    const bargainTagLevel = ref(0);

    const bargainBubble = computed(
      () =>
        alchemy.value.upgrades[currentCauldron.value][
          AlchemyConst.BargainBubble
        ] ?? 0
    );
    const undevCosts = computed(
      () => alchemy.value.upgrades["Yellow"][AlchemyConst.UnderdevelopedCosts]
    );
    const barleyBrew = computed(
      () => alchemy.value.vials[AlchemyConst.BarleyBrew] ?? 0
    );

    return {
      alchemy,
      Assets,
      bargainTagLevel,
      bubbleCount: AlchemyConst.BubbleCount,
      hasAchievement,
      discount: computed(() =>
        calculateBubbleDiscount(
          cauldronLevel.value,
          bargainTagLevel.value,
          bargainBubble.value,
          undevCosts.value,
          barleyBrew.value,
          hasAchievement.value,
        )
      ),
      cauldronLevel,
      cauldrons: CauldronData,
      currentCauldron,
      onChangeCauldron: (color: string) => {
        currentCauldron.value = color as AlchemyColor;
      },
    };
  },
});
</script>

<style lang="sass" scoped></style>
