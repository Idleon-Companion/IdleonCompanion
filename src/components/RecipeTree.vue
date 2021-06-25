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
        {{ computedQuantity }}
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

  type Indent = {
    transform: String,
    display: String
  };

  export default defineComponent({
    name: "RecipeTree",
    components: {
      GameAsset
    },
    props: {
      label: { type: String, required: true },
      nodes: { type: Object, required: true },
      quantity: { type: Number, required: true },
      depth: { type: Number, required: true },
      toCraft: { type: Number, required: true }
    },
    setup(props) {
      const indent = computed(() => {
        return { transform: `translate(${props.depth * 40}px)`, display: 'flex' }
      });
      const computedQuantity = computed(
        (): String => {
          return (props.quantity * props.toCraft).toLocaleString();
        });
      return { Assets, computedQuantity, indent }
    }
  });
</script>