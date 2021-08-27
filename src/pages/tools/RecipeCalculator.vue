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
        <div class="w-full md:w-1/3">
          <q-select
            v-model="recipe"
            :options="filteredRecipes"
            filled
            use-input
            :input-debounce="0"
            label="Recipe"
            class="p-2"
            @filter="onFilterRecipes"
          />
        </div>
        <div class="w-1/2 md:w-1/6">
          <q-input
            v-model.number="quantity"
            type="number"
            :min="1"
            filled
            label="Quantity"
            class="p-2"
          />
        </div>
        <div class="w-1/2 md:w-1/6">
          <q-select
            v-model="displayType"
            :options="displayTypeOptions"
            filled
            label="View"
            class="p-2"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="recipe && quantity">
        <div class="text-xl">Materials</div>
        <q-tree
          v-if="displayType === 'Tree'"
          :nodes="nodes"
          node-key="name"
          label-key="name"
          children-key="materials"
          default-expand-all
        >
          <template #default-header="props">
            <div class="flex items-center bg-primary p-2 rounded">
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
        <q-list
          bordered
          separator
          v-else-if="displayType === 'List'"
          class="rounded"
        >
          <q-item clickable v-for="(quantity, node) in flattenedRecipe">
            <q-item-section avatar>
              <ICAsset
                size="small"
                :image="Assets.MaterialImage(node)"
                :title="node"
              >
                <template #tooltip>
                  <div v-html="node"></div>
                </template>
              </ICAsset>
            </q-item-section>
            <q-item-section> {{ quantity }} {{ node }} </q-item-section>
          </q-item>
        </q-list>
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
type RecipeDisplay = "List" | "Tree";

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
    const lastUpdated = "July 31, 2021 (v1.23)";

    const displayType = ref<RecipeDisplay>("Tree");
    const displayTypeOptions = ["List", "Tree"];

    const nodes = computed((): RecipeNode[] => {
      if (!recipe.value) {
        return [];
      }
      return [recipes[recipe.value.value]];
    });

    const flattenedRecipe = computed(() => {
      if (nodes.value.length === 0) {
        return {};
      }
      const result: Record<string, number> = {};
      const flatten = (current: RecipeNode, result: Record<string, number>) => {
        if (current.materials) {
          current.materials.forEach(({ name, quantity }) => {
            if (recipes[name]) {
              flatten(
                {
                  ...recipes[name],
                  quantity: quantity * current.quantity,
                },
                result
              );
            } else {
              if (!(name in result)) {
                result[name] = 0;
              }
              result[name] += quantity * current.quantity;
            }
          });
        }
      };
      flatten(nodes.value[0], result);
      return result;
    });

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
      displayTypeOptions,
      filteredRecipes,
      flattenedRecipe,
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
