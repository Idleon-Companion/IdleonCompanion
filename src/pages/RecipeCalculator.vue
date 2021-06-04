<template>
  <!-- Info -->
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mb-4 rounded">
        Use this page to calculate the materials needed for a recipe. Select
        your recipe, and the quantity to craft.
      </p>
    </div>
  </div>
  <!-- Tab +  Recipe + Quantity selectors -->
  <div class="row d-flex justify-content-between flex-wrap" id="selectors">
    <div class="col d-flex flex-wrap mb-3">
      <!-- Tab Selector (TODO: rename the variable, not sure why it breaks when i swap it with tab-->
      <div class="col-auto mb-3 me-3">
        <select v-model="recipe" class id="recipe-selector">
          <option value selected>Select the anvil tab</option>
          <option v-for="(group, id) in data" :key="id" :value="id">{{ id}}</option>
        </select>
      </div>
      <!-- Recipe Selector -->
      <div class="col-auto mb-3 me-3">
        <select v-model="tab" class id="tab-selector">
          <option value selected>Select Your Recipe</option>
          <option v-for="(group, id) in data[recipe]" :key="id" :value="id">{{ id}}</option>
        </select>
      </div>
    </div>
    <div class="col-auto">
      <div class="input-group">
        <span class="input-group-text">Quantity</span>
        <input
          v-model.number="quantity"
          type="number"
          min="1"
          id="recipe-quantity"
          class="form-control"
        />
      </div>
    </div>
    <!-- Version -->
    <div class="col-auto text-light">
      <div id="version-group" class="p-2">
        <h3>Last Updated</h3>
        <p>v1.20b</p>
        <p>June 4, 2021</p>
      </div>
    </div>
  </div>
  <!-- Materials -->
  <div v-if="tab" class="text-light">
    <h4>Materials</h4>
    <div
      class="row"
      v-for="(material) in data[recipe][tab]['Materials']"
      :key="`material-${index}`"
    >
      <div
        class="border-top border-bottom col-sm-2 align-right"
      >{{ (material[2] * parseInt(quantity)).toLocaleString() }}</div>
      <div
        class="border-top border-bottom col-sm-10 padded-start"
      >{{ material[1].padStart(material[1].length+material[0]*4)}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import calculatorData from "~/data/recipes.json";

type MaterialObject = {
  Recursive: boolean;
  quantity: number;
};

type TabObject = {
	name : string
	recipes: Array<RecipeObject>;
};

type RecipeObject = {
  name: string;
  materials: Array<MaterialObject>;
};

export default defineComponent({
  name: "RecipeCalculator",
  setup() {
    const data = calculatorData;
		console.log(data);
		const tab = ref("");
    const recipe = ref("");
    const quantity = ref("1");
    return { data, recipe, tab, quantity};
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'

#version-group
    border: 2px solid $primary
    border-radius: 0.25rem
</style>