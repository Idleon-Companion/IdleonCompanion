<template>
  <div class="jumbotron">
    <!-- Dropdown Selectors -->
    <div class="container" id="selectors">
      <div class="row">
        <!-- Anvil Tab Selector -->
        <div class="col-sm-5 pl-3 mb-2">
          <div class="form-group">
            <h3>Anvil Tab Unlocked</h3>
            <select v-model="anvilTab" class="custom-select" id="anvilSelector">
              <option value="" selected>Select Anvil Tab</option>
              <option value="anvil1">Anvil Tab 1</option>
              <option value="anvil2">Anvil Tabs 1-2</option>
            </select>
          </div>
        </div>
        <!-- Task Tier Selector -->
        <div class="col-sm-5 pl-3 mb-2">
          <div class="form-group">
            <h3>Task Tier</h3>
            <select v-model="taskTier" class="custom-select" id="tierSelector">
              <option value="" selected>Select Task Tier</option>
              <option value="tier1">Tier 1 (3 Items)</option>
              <option value="tier2">Tier 2 (8 Items)</option>
              <option value="tier3">Tier 3 (14 Items)</option>
              <option value="tier4">Tier 4 (24 Items)</option>
              <option value="tier5">Tier 5 (34 Items)</option>
              <option value="tier6">Tier 6 (45 Items)</option>
              <option value="tier7">Tier 7 (55 Items)</option>
              <option value="tier8">Tier 8 (70 Items)</option>
              <option value="tier9">Tier 9 (90 Items)</option>
              <option value="tier10">Tier 10 (110 Items)</option>
            </select>
          </div>
        </div>
        <!-- Game Version Note -->
        <div class="col-sm-2 pl-3 mb-2">
          <h3>Last Updated</h3>
          <p>v1.13</p>
          <p>Apr 05, 2021</p>
        </div>
      </div>
    </div>
    <!-- Display Recommended -->
    <div v-if="anvilTab && taskTier" class="container">
      <div v-if="recommended.recipes.length === 0" id="noRecommendations">
        <h4>No Recipe Suggestions</h4>
        <p>This is probably due to one of the following reasons:</p>
        <ul>
          <li>
            This Anvil Tab selection doesn't have enough items
            for this tier of the task
          </li>
          <li>
            There aren't enough inventory slots available to
            craft all the items for this tier of the task
          </li>
        </ul>
      </div>
      <div v-else>
        <!-- Crafting Notes -->
        <h4>Notes</h4>
        <p>Please keep the following in mind while crafting:</p>
        <ul>
          <li>
            Recipes need to be crafted in the order they are listed, as thats
            how they were successfully tested
          </li>
          <li>
            Remember to combine "not full" stacks of materails when possible, as
            that was taken into account during testing
          </li>
          <li>
            The list of Inventory Capacity Setups are not a perfect calculation, and
            there can be variation between setups for a given number of slots and
            list of materials. These lists are always looking to be improved, and
            should always be considered a possibility and not "the best".
          </li>
        </ul>
        <div class="row">
          <!-- Recipe + Materials -->
          <div class="col-sm-4" id="recipesMaterials">
            <h4>Recipe List</h4>
            <div class="container" id="recipeList" style="height:200px;overflow:auto">
              <div class="row" v-for="(recipe, index) in recommended.recipes" :key="`recipe-${index}`">
                <div class="border-top border-bottom col-sm-2">{{ index+1 }}</div>
                <div class="border-top border-bottom col-sm-10">{{ recipe }}</div>
              </div>
            </div>
            <h4>Material List</h4>
            <div class="container" id="materialList" style="height:200px;overflow:auto">
              <div class="row" v-for="(material, index) in recommended.materials" :key="`material-${index}`">
                <div class="border-top border-bottom col-sm-2" />
                <div class="border-top border-bottom col-sm-10">{{ material }}</div>
              </div>
            </div>
          </div>
          <div class="col-sm-8" id="inventoryList">
            <h4>Inventory Capacity Setups</h4>
            <div class="container" style="height:475px;overflow:auto">
              <div class="row" v-for="(inventory, index) in recommended.caps" :key="`inventory-${index}`">
                <div class="border-top border-bottom col-sm"><h5>Slots: {{ inventory.slots }}</h5></div>
                <div class="border-top border-bottom col-sm">Material:<br/>{{ inventory.material }}</div>
                <div class="border-top border-bottom col-sm">Mining:<br/>{{ inventory.mining }}</div>
                <div class="border-top border-bottom col-sm">Fish:<br/>{{ inventory.fish }}</div>
                <div class="border-top border-bottom col-sm">Food:<br/>{{ inventory.food }}</div>
                <div class="border-top border-bottom col-sm">Chopping:<br/>{{ inventory.choppin }}</div>
                <div class="border-top border-bottom col-sm">Bug:<br/>{{ inventory.bug }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import packMuleData from "../data/packMule.json";

export default defineComponent({
  name: "PackMuleCrafter",
  setup() {
    const data: Record<string, object> = packMuleData;
    const anvilTab = ref("");
    const taskTier = ref("");
    const recommended = computed(() => {
      if(anvilTab.value === "" || taskTier.value === "") { return {} }
      return data[`${ anvilTab.value }${ taskTier.value }`];
    });
    return { data, anvilTab, taskTier, recommended }
  }
});
</script>
