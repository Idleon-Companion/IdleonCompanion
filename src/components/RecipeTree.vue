<template>
  <div class="tree-menu border-top border-bottom">
    <div :style="indent">
      <div v-bind:style="{ padding: '5px' }">
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
      <div v-bind:style="{ flex: '5%', textAlign: 'right', marginRight: '5%' }">
        {{ computedQuantity }}
      </div>
      <div v-bind:style="{ flex: '80%' }">
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

import { Assets } from "~/composables/Utilities";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

type Indent = {
  transform: string;
  display: string;
};

export default defineComponent({
  name: "RecipeTree",
  components: {
    ICAsset,
  },
  props: {
    label: { type: String, required: true },
    nodes: { type: Object, required: true },
    quantity: { type: Number, required: true },
    depth: { type: Number, required: true },
    toCraft: { type: Number, required: true },
  },
  setup(props) {
    const indent = computed(() => {
      return { transform: `translate(${props.depth * 40}px)`, display: "flex" };
    });
    const computedQuantity = computed((): string => {
      return (props.quantity * props.toCraft).toLocaleString();
    });
    return { Assets, computedQuantity, indent };
  },
});
</script>
