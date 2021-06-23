<template>
  <div class="tree-menu border-top border-bottom">
    <div :style="indent">
      <div v-bind:style="{padding: '5px'}">
        <GameAsset
          :height="72"
          :image="Assets.MaterialImage(label.replace(/ /g, '_'))"
          :title="label"
        >
          <template #tooltip>
            <div v-html="label"></div>
          </template>
        </GameAsset>
      </div>
      <div 
        v-bind:style="{flex: '5%', textAlign: 'right', marginRight: '5%'}"
      >
        {{ parseInt(quantity * toCraft).toLocaleString() }}
      </div>
      <div
        v-bind:style="{flex: '80%'}"
      >
        {{ label }}
      </div>
    </div>
    <RecipeTree
      v-for="node in nodes" 
      :nodes="node.materials" 
      :label="node.name"
      :quantity="node.quantity"
      :depth="depth + 1"
      :toCraft="toCraft"
    >
    </RecipeTree>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import GameAsset from "~/components/GameAsset.vue";
  import { Assets } from "~/composables/Utilities";

  export default defineComponent({
    name: "RecipeTree",
    components: {
      GameAsset
    },
    props: {
      label: { type: String },
      nodes: { type: Object },
      quantity: { type: Number },
      depth: { type: Number },
      toCraft: { type: Number }
    },
    setup() {
      return { Assets }
    },
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 40}px)`, display: 'flex' }
      }
    }
  });
</script>