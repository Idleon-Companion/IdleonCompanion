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
  <div class="row d-flex justify-content-between flex-wrap" id="selectors">
    <!-- Recipe Selector -->
    <div class="col d-flex flex-wrap mb-3">
      <div class="col-auto mb-3 me-3">
        <select v-model="recipe" class="" id="recipe-selector">
          <option value="" selected>Select Your Recipe</option>
          <option v-for="(recipe, id) in data" :key="id" :value="id">
            {{ recipe.name }}
          </option>
        </select>
      </div>
      <!-- Quantity Input -->
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
      <!-- Game Version Note -->
    </div>
    <div class="col-auto text-light">
      <div id="version-group" class="p-2">
        <h3>Last Updated</h3>
        <p>v1.22</p>
        <p>July 7, 2021</p>
      </div>
    </div>
  </div>
  <!-- Display Materials -->
  <div v-if="recipe && quantity" class="text-light">
    <h4>Materials</h4>
    <!-- Select Display Type -->
    <select v-model="display" class="" id="recipe-selector">
      <option value="">Select a View Type</option>
      <option value="list">List View</option>
      <option value="tree">Tree View</option>
    </select>
    <div v-if="display">
      <div v-if="display === 'list'">
        <div
          class="tree-menu border-top border-bottom"
          v-for="(qnt, material) in listMaterials(materials)"
          :key="`material-${material}`"
        >
          <GameAsset
            :height="72"
            :image="Assets.MaterialImage(material.replace(/ /g, '_'))"
            :title="material"
          >
            <template #tooltip>
              <div v-html="material"></div>
            </template>
          </GameAsset>
          {{ (Number(quantity) * qnt).toLocaleString() }} {{ material }}
        </div>
      </div>
      <div v-else>
        <recipe-tree
          :label="materials.name"
          :nodes="materials.materials"
          :quantity="1"
          :depth="0"
          :toCraft="Number(quantity)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import calculatorData from "~/data/recipeCalculator.json";
import GameAsset from "~/components/GameAsset.vue";
import RecipeTree from "~/components/RecipeTree.vue";
import { Assets } from "~/composables/Utilities";


type RecipeObject = {
  name: string;
  quantity: number;
  materials?: Array<RecipeObject>;
};

export default defineComponent({
  name: "RecipeCalculator",
  components: {
    GameAsset,
    RecipeTree
  },
  methods: {
    listMaterials(tree:RecipeObject) {
      // Setup result
      let result: Record<string, number> = {};
      function flatten(current:RecipeObject) {
        if(current.materials) {
          current.materials.forEach(mat => {
            flatten(mat);
          })
        } else {
          let name = current.name;
          let quantity = current.quantity;
          if(result.hasOwnProperty(name)) { result[name] += quantity }
          else { result[name] = quantity }
        }
      }
      flatten(tree);
      return result;
    }
  },
  setup() {
    const data: Record<string, RecipeObject> = calculatorData;
    const recipe = ref("");
    const quantity = ref("");
    const display = ref("list");
    const materials = computed(
      (): RecipeObject => {
        if (recipe.value === "") {
          return {} as RecipeObject;
        }
        return data[recipe.value];
      }
    );
    return { Assets, data, display, recipe, quantity, materials };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'

#version-group
  border: 2px solid $primary
  border-radius: 0.25rem
.recipe-quantity
  text-align: right
	
.padded-start
  white-space: pre
</style>