<template>
  <div class="jumbotron">
    <!-- Anvil Tab Selector -->
    <div class="row pl-3 mb-4" style="float:left;padding-right:100px">
      <div class="form-group">
        <h3>Anvil Tab Unlocked</h3>
        <select v-model="anvilTab" class="custom-select" id="anvilSelector">
          <option value="" selected>Select Anvil Tab</option>
          <option value="anvil1">Anvil Tab 1</option>
          <option value="anvil2">Anvil Tab 2</option>
        </select>
      </div>
    </div>
    <!-- Task Tier Selector -->
    <div class="row pl-3 mb-4" style="float:left">
      <div class="form-group">
        <h3>Task Tier</h3>
        <select v-model="taskTier" class="custom-select" id="tierSelector">
          <option value="" selected>Select Task Tier</option>
          <option value="tier1">Tier 1</option>
          <option value="tier2">Tier 2</option>
          <option value="tier3">Tier 3</option>
          <option value="tier4">Tier 4</option>
          <option value="tier5">Tier 5</option>
          <option value="tier6">Tier 6</option>
          <option value="tier7">Tier 7</option>
          <option value="tier8">Tier 8</option>
          <option value="tier9">Tier 9</option>
          <option value="tier10">Tier 10</option>
        </select>
      </div>
    </div>
    <!-- Display Recommended -->
    <div v-if="anvilTab && taskTier">
      <div style="clear:both"/>
      <!-- <div>{{ recommended }}</div> -->
      <div style="float:left;width:30%;padding-right:5%">
        <h4>Recipe List</h4>
        <div id="recipeList" style="height:200px;overflow:auto">
          <ol>
            <li v-for="(recipe, index) in recommended.recipes" :key="`recipe-${index}`">
              {{ recipe }}
            </li>
          </ol>
        </div>
        <h4>Material List</h4>
        <div id="materialList" style="height:200px;overflow:auto">
          <ul>
            <li v-for="(material, index) in recommended.materials" :key="`material-${index}`">
              {{ material }}
            </li>
          </ul>
        </div>
      </div>
      <div id="inventoryList">
        <h4>Inventory Setups</h4>
        <div style="width:65%;height:475px;float:left;overflow:auto">
          <ol>
            <li v-for="(inventory, index) in recommended.caps" :key="`inventory-${index}`">
              {{ inventory }}
            </li>
          </ol>
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
