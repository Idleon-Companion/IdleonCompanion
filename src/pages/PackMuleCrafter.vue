<template>
  <!-- Dropdown Selectors -->
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mb-4 rounded">
        Use this page to help plan the Pack Mule Crafter W1 Task. Select your
        highest unlocked Anvil Tab, and what task tier you need to complete.
      </p>
    </div>
  </div>
  <div class="container text-light" id="selectors">
    <div class="row">
      <!-- Anvil Tab Selector -->
      <div class="col-sm-5 pl-3 mb-2">
        <div class="form-group">
          <h3>Anvil Tab Unlocked</h3>
          <select v-model="anvilTab">
            <option value="" selected>Select Anvil Tab</option>
            <option value="anvil1">Anvil Tab 1</option>
            <option value="anvil2">Anvil Tab 2</option>
            <option value="anvil3">Anvil Tab 3</option>
          </select>
        </div>
      </div>
      <!-- Task Tier Selector -->
      <div class="col-sm-5 pl-3 mb-2">
        <div class="form-group">
          <h3>Task Tier</h3>
          <select v-model="taskTier">
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
        <p>v1.22d</p>
        <p>July 17, 2021</p>
      </div>
    </div>
  </div>
  <!-- Display Recommended -->
  <div v-if="anvilTab && taskTier" class="container text-light">
    <div v-if="recommended.recipes.length === 0" id="noRecommendations">
      <h4>No Recipe Suggestions</h4>
      <p>This is probably due to one of the following reasons:</p>
      <ul>
        <li>
          This Anvil Tab selection doesn't have enough items for this tier of
          the task
        </li>
        <li>
          There aren't enough inventory slots available to craft all the items
          for this tier of the task
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="row">
        <!-- Special Notes -->
        <div class="col-sm-4" id="notes">
          <!-- Crafting Notes -->
          <h4>Notes</h4>
          <p>Please keep the following in mind while crafting:</p>
          <ul>
            <li>
              Recipes need to be crafted in the order they are listed, as that's how
              they were successfully tested
            </li>
            <li>
              Remember to combine "not full" stacks of materials when possible, as
              that was taken into account during testing
            </li>
            <li>
              The list of Inventory Capacity Setups are not a perfect calculation
              and there can be variation between setups for a given number of slots
              and list of materials. These lists are always looking to be improved
              and should always be considered a possibility, not "the best"
            </li>
          </ul>
        </div>
        <!-- Recipe List -->
        <div class="col-sm-4" id="recipes">
          <h4>Recipe List</h4>
          <div
            class="container"
            id="recipeList"
            style="height: 300px; overflow: auto"
          >
            <div
              class="row"
              v-for="(recipe, index) in recommended.recipes"
              :key="`recipe-${index}`"
            >
              <div class="border-top border-bottom col-sm-3">
                <GameAsset
                  :height="72"
                  :image="Assets.MaterialImage(recipe.replace(/[0-9]+ /g, '').replace(/ /g, '_'))"
                  :title="recipe.replace(/[0-9]+ /g, '')"
                >
                  <template #tooltip>
                    <div v-html="recipe.replace(/[0-9]+ /g, '')"></div>
                  </template>
                </GameAsset>
              </div>
              <div class="border-top border-bottom col-sm-9">
                {{ recipe }}
              </div>
            </div>
          </div>
        </div>
        <!-- Material List -->
        <div class="col-sm-4" id="materials">
          <h4>Material List</h4>
          <div
            class="container"
            id="materialList"
            style="height: 300px; overflow: auto"
          >
            <div
              class="row"
              v-for="(material, index) in recommended.materials"
              :key="`material-${index}`"
            >
              <div class="border-top border-bottom col-sm-3">
                <GameAsset
                  :height="72"
                  :image="Assets.MaterialImage(material.replace(/[0-9]+ /g, '').replace(/ /g, '_'))"
                  :title="material.replace(/[0-9]+ /g, '')"
                >
                  <template #tooltip>
                    <div v-html="material.replace(/[0-9]+ /g, '')"></div>
                  </template>
                </GameAsset>
              </div>
              <div class="border-top border-bottom col-sm-9">
                {{ material }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <h4>Inventory Capacity Setups</h4>
        <div class="container" style="height: 475px; overflow: auto">
          <!-- Current Character Setup -->
          <div v-if="curCharacter !== null">
            <h5>Using Character "{{ curCharacter.name }}"</h5>
            <!-- Character doesn't have enough slots -->
            <div v-if="defaultSlots === null">
              Currently selected character is not capable of completing this tier of the task
            </div>
            <!-- Character has enough slots -->
            <div v-else class="row">
              <div class="border-top border-bottom col-sm">
                <h5>Slots: {{ recommended.caps[defaultSlots].slots }}</h5>
              </div>
              <div class="border-top border-bottom col-sm">
                Material:<br />{{ recommended.caps[defaultSlots].material }}
              </div>
              <div class="border-top border-bottom col-sm">
                Mining:<br />{{ recommended.caps[defaultSlots].mining }}
              </div>
              <div class="border-top border-bottom col-sm">
                Fish:<br />{{ recommended.caps[defaultSlots].fish }}
              </div>
              <div class="border-top border-bottom col-sm">
                Food:<br />{{ recommended.caps[defaultSlots].food }}
              </div>
              <div class="border-top border-bottom col-sm">
                Chopping:<br />{{ recommended.caps[defaultSlots].choppin }}
              </div>
              <div class="border-top border-bottom col-sm">
                Bug:<br />{{ recommended.caps[defaultSlots].bug }}
              </div>
              <div class="border-top border-bottom col-sm">
                Soul:<br />{{ recommended.caps[defaultSlots].soul }}
              </div>
              <div class="border-top border-bottom col-sm">
                Critter:<br />{{ recommended.caps[defaultSlots].critter }}
              </div>
            </div>
          </div>
          <h5>All Inventory Setups</h5>
          <!-- Inventory Selector -->
          <select v-model="invSlots" id="slot-selector">
            <option 
              v-for="(inventory, index) in recommended.caps"
              :key="index"
              :value="index"
            >
              {{ inventory.slots }} Inventory Slots
            </option>
          </select>
          <!-- Display Selected Inventory Setup -->
          <div class="row">
            <div class="border-top border-bottom col-sm">
              <h5>Slots: {{ recommended.caps[parseInt(invSlots)].slots }}</h5>
            </div>
            <div class="border-top border-bottom col-sm">
              Material:<br />{{ recommended.caps[parseInt(invSlots)].material }}
            </div>
            <div class="border-top border-bottom col-sm">
              Mining:<br />{{ recommended.caps[parseInt(invSlots)].mining }}
            </div>
            <div class="border-top border-bottom col-sm">
              Fish:<br />{{ recommended.caps[parseInt(invSlots)].fish }}
            </div>
            <div class="border-top border-bottom col-sm">
              Food:<br />{{ recommended.caps[parseInt(invSlots)].food }}
            </div>
            <div class="border-top border-bottom col-sm">
              Chopping:<br />{{ recommended.caps[parseInt(invSlots)].choppin }}
            </div>
            <div class="border-top border-bottom col-sm">
              Bug:<br />{{ recommended.caps[parseInt(invSlots)].bug }}
            </div>
            <div class="border-top border-bottom col-sm">
              Soul:<br />{{ recommended.caps[parseInt(invSlots)].soul }}
            </div>
            <div class="border-top border-bottom col-sm">
              Critter:<br />{{ recommended.caps[parseInt(invSlots)].critter }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import packMuleData from "~/data/packMule.json";
import GameAsset from "~/components/GameAsset.vue";
import { useCharacters } from "~/composables/Characters";
import { Assets } from "~/composables/Utilities";

type PackMuleObject = {
  tier: number;
  items: number;
  recipes: Array<string>;
  materials: Array<string>;
  caps: Array<Record<string, number>>;
};

export default defineComponent({
  name: "PackMuleCrafter",
  components: {
    GameAsset
  },
  setup() {
    const { characters, curCharacter } = useCharacters();
    const data: Record<string, PackMuleObject> = packMuleData;
    const anvilTab = ref("");
    const taskTier = ref("");
    const recommended = computed(
      (): PackMuleObject => {
        if (anvilTab.value === "" || taskTier.value === "") {
          return {} as PackMuleObject;
        }
        return data[`${anvilTab.value}${taskTier.value}`];
      }
    );
    const defaultSlots = computed(
      (): number|null => {
        let i = null;
        if(curCharacter) {
          recommended.value.caps.forEach((inv:Record<string, number>, index:number) => {
            if(curCharacter.value!.bagSlots >= inv.slots) { i = index }
          });
        }
        return i;
      }
    );
    const invSlots = ref("0");
    return {
      Assets,
      anvilTab,
      characters,
      curCharacter,
      data,
      defaultSlots,
      invSlots,
      recommended,
      taskTier
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
</style>