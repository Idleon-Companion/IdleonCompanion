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
        v-bind:style="{flex: '15%', textAlign: 'right', marginRight: '5%'}"
      >
        {{ parseInt(quantity).toLocaleString() }}
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
    >
    </RecipeTree>
  </div>
</template>

<script>
  import GameAsset from "~/components/GameAsset.vue";
  import { Assets } from "~/composables/Utilities";

  export default { 
    name: "RecipeTree",
    components: {
      GameAsset
    },
    setup() {
      return { Assets }
    },
    props: [ 'label', 'nodes', 'quantity', 'depth' ],
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 40}px)`, display: 'flex' }
      }
    }
  }
</script>