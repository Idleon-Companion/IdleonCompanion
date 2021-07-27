<template>
  <q-banner inline-actions>
    Use this page to calculate the materials needed for a recipe. Select your
    recipe, and the quantity to craft.
    <template v-slot:action>
      <q-btn-dropdown outline label="Wiki">
        <q-list separator>
          <a v-for="[label, link] in wikiLinks" :key="label" :href="link">
            <q-item clickable>
              <q-item-section>{{ label }}</q-item-section>
            </q-item>
          </a>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-banner>
  <q-card class="m-4">
    <q-card-section>
      <div class="flex justify-between items-center">
        <div class="text-2xl">Recipe Calculator</div>
        <div class="text-sm">Last Updated: {{ lastUpdated }}</div>
      </div>
      <div class="flex">
        <q-select
          v-model="recipe"
          :options="filteredRecipes"
          outlined
          use-input
          :input-debounce="0"
          label="Select Recipe"
          class="w-full md:w-1/3 mt-2 mr-2"
          @filter="onFilterRecipes"
        />
        <q-input
          v-model.number="quantity"
          type="number"
          :min="1"
          filled
          label="Quantity"
          class="mt-2"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="recipe && quantity">
        <div class="text-xl">Materials</div>
        <q-tree
          :nodes="nodes"
          node-key="name"
          label-key="name"
          children-key="materials"
        >
          <template #default-header="props">
            <div class="flex items-center">
              <ICAsset
                size="small"
                :image="
                  Assets.MaterialImage(props.node.name.replace(/ /g, '_'))
                "
                :title="props.node.name"
              >
                <template #tooltip>
                  <div v-html="props.node.name"></div>
                </template>
              </ICAsset>
              {{ props.node.quantity }} {{ props.node.name }}
            </div>
          </template>
        </q-tree>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { Assets } from "~/composables/Utilities";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";
import calculatorData from "~/data/recipeCalculator.json";

type RecipeNode = {
  name: string;
  quantity: number;
  materials?: Array<RecipeNode>;
};

const wikiLinks = new Map([["Smithing", "https://idleon.info/wiki/Smithing"]]);

export default defineComponent({
  name: "RecipeCalculator",
  components: {
    ICAsset,
  },
  setup() {
    const recipes: Record<string, RecipeNode> = calculatorData;
    const recipe = ref(null as { label: string; value: string } | null);
    const quantity = ref(1);
    const displayType = ref("list");
    const lastUpdated = "June 28, 2021 (v1.22)";

    const nodes = computed((): RecipeNode[] => {
      if (!recipe.value) {
        return [];
      }
      return [recipes[recipe.value.value]];
    });

    // const flattenedRecipe = (node: RecipeNode) => {
    //   let result: Record<string, number> = {};

    //   // Helper function to flatten a recipe
    //   function flatten(current: RecipeNode) {
    //     if (current.materials) {
    //       current.materials.forEach((mat) => {
    //         flatten(mat);
    //       });
    //     } else {
    //       let name = current.name;
    //       let quantity = current.quantity;
    //       if (result.hasOwnProperty(name)) {
    //         result[name] += quantity;
    //       } else {
    //         result[name] = quantity;
    //       }
    //     }
    //   }
    //   flatten(tree);
    //   return result;
    // },
    // })

    const allRecipes = Object.entries(recipes).map(([id, recipe]) => {
      return {
        label: recipe.name,
        value: id,
      };
    });

    const filteredRecipes = ref(allRecipes);

    const onFilterRecipes = (name: string, update: (cb: any) => void) => {
      update(() => {
        if (name === "") {
          filteredRecipes.value = allRecipes;
        } else {
          filteredRecipes.value = allRecipes.filter((r) =>
            r.label.toLowerCase().includes(name.toLowerCase())
          );
        }
      });
    };

    return {
      Assets,
      displayType,
      filteredRecipes,
      lastUpdated,
      nodes,
      onFilterRecipes,
      quantity,
      recipe,
      recipes,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../../styles/base.sass'

#version-group
  border: 2px solid $primary
  border-radius: 0.25rem
.recipe-quantity
  text-align: right

.padded-start
  white-space: pre
</style>
