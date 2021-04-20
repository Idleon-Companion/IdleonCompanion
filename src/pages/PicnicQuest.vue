<template>
  <div class="row">
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
  <table class="table table-hover">
    <thead>
      <tr class="text-light">
        <th scope="col" class="col-2"></th>
        <th scope="col">Item</th>
        <th scope="col">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-light align-middle"
        v-for="(req, i) in picnicRequirements"
        :key="i"
      >
        <td>
          <GameAsset
            :height="72"
            :image="Assets.MaterialImage(req.name.replace(/ /g, '_'))"
            :title="req.name"
          />
        </td>
        <td>{{ req.name }}</td>
        <td class="base">
          {{ req.amount }} x {{ repeat }} = {{ req.amount * repeat }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import GameAsset from "../components/GameAsset.vue";
import { Assets } from "../composables/Utilities";

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
