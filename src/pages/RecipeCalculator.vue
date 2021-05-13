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
  <!-- Recipe + Quantity selectors -->
  <div class="container text-light" id="selectors">
    <div class="row">
      <!-- Recipe Selector -->
      <div class="col-sm-5 pl-3 mb-2">
        <div class="input-group">
          <select v-model="recipe" class="" id="recipeSelector">
          <option value="" selected>Select Your Recipe</option>
          <option v-for="(recipe, id) in data" :key="id" :value="id">
            {{ recipe.name }}
          </option>
        </select>
        </div>
      </div>
      <!-- Quantity Input -->
      <div class="col-sm-5 pl-3 mb-2">
        <label for="stamp-lvl" class="h5 m-2 ms-0">Quantity</label>
        <input
          v-model.number="quantity"
          type="number"
          min="1"
          id="recipe-quantity"
        />
      </div>
      <!-- Game Version Note -->
      <div class="col-sm-2 pl-3 mb-2">
        <h3>Last Updated</h3>
        <p>v1.14</p>
        <p>May 13, 2021</p>
      </div>
    </div>
  </div>
  <!-- Display Materials -->
  <div v-if="recipe && quantity" class="container text-light">
    <h4>Materials</h4>
    <div
      class="row"
      v-for="(material, index) in materials.materials"
      :key="`material-${index}`"
    >
      <div class="border-top border-bottom col-sm-2">
        {{ material.quantity * parseInt(quantity) }}
      </div>
      <div class="border-top border-bottom col-sm-10">
        {{ material.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import calculatorData from "~/data/recipeCalculator.json";

type MaterialObject = {
  name: string;
  quantity: number;
};

type RecipeObject = {
  name: string;
  materials: Array<MaterialObject>;
};

export default defineComponent({
  name: "RecipeCalculator",
  setup() {
    const data: Record<string, RecipeObject> = calculatorData;
    const recipe = ref("");
    const quantity = ref("");
    const materials = computed(
      (): RecipeObject => {
        if (recipe.value === "") {
          return {} as RecipeObject;
        }
        return data[recipe.value];
      }
    );
    return { data, recipe, quantity, materials };
  }
});
</script>