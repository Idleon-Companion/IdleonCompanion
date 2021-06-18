<template>
  <div class="tree-menu">
    <div class="row border-top border-bottom">
      <div class="col-sm-1">
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
      <div :style="indent" class="col-sm-11">
        {{ parseInt(quantity).toLocaleString() }} {{ label }}
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
        return { transform: `translate(${this.depth * 25}px)` }
      }
    }
  }
</script>