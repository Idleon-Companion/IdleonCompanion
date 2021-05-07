<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mb-4 rounded">
        Use this tool to calculate material costs for the Pinic Quest's King of
        Food Trophy. Use the slider to select the number of runs to display.
      </p>
    </div>
    <div class="col-xl-12">
      <fieldset class="px-3">
        <label class="text-light form-label" for="foodRange"
          >How many runs of Picnic Quest would you like to show?</label
        >
        <span class="badge bg-secondary ms-3" id="foodPill">{{ repeat }}</span>
        <input
          v-model="repeat"
          type="range"
          class="form-range"
          min="1"
          max="30"
          id="foodRange"
        />
      </fieldset>
    </div>
  </div>
  <div class="d-flex justify-content-center flex-wrap">
    <div v-for="(req, i) in picnicRequirements" :key="i" class="quest-item">
      <GameAsset
        :height="72"
        :image="Assets.MaterialImage(req.name.replace(/ /g, '_'))"
        :title="req.name"
      >
        <template #tooltip>
          <div v-html="req.name"></div>
        </template>
      </GameAsset>
      <div class="quest-amount">{{ req.amount * repeat }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";

const picnicRequirements = [
  {
    name: "Frog Leg",
    amount: 200,
  },
  {
    name: "Bean Slices",
    amount: 100,
  },
  {
    name: "Peanut",
    amount: 100,
  },
  {
    name: "Bleach Logs",
    amount: 1500,
  },
  {
    name: "Grass Leaf",
    amount: 50,
  },
  {
    name: "Crude Oil",
    amount: 200,
  },
  {
    name: "Iron Bar",
    amount: 100,
  },
  {
    name: "Sculpting Tools",
    amount: 1,
  },
  {
    name: "Iron Helmet",
    amount: 1,
  },
  {
    name: "Kebab Sticks",
    amount: 500,
  },
  {
    name: "Magic Meatloaf",
    amount: 1,
  },
  {
    name: "Nuget Cake",
    amount: 2,
  },
  {
    name: "Midnight Cookie",
    amount: 2,
  },
];

export default defineComponent({
  name: "Picnic Quest",
  components: {
    GameAsset,
  },
  setup() {
    const repeat = ref(1);
    return {
      Assets,
      picnicRequirements,
      repeat,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
.quest-item
  border: 1px solid $primary
  background: darken($primary, 10%)
  border-radius: 0.25rem
  display: flex
  margin: 0.25rem
  flex-direction: column
  align-items: center
  padding: 0.2rem
.quest-amount
  font-size: 1.05rem
  font-weight: 500
  color: $secondary
</style>
