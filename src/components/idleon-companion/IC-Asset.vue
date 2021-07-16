<template>
  <Tooltip v-if="title">
    <q-img
      class="asset"
      loading="lazy"
      :data-enabled="enabled"
      :src="image"
      :style="computedStyle"
    />
    <template #content class="abc">
      <slot name="tooltip">
        <div>{{ title }}</div>
      </slot>
    </template>
  </Tooltip>
  <q-img
    v-else
    class="asset"
    draggable="false"
    loading="lazy"
    :data-enabled="enabled"
    :src="image"
    :style="computedStyle"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

type AssetSize = "small" | "medium" | "large";

export default defineComponent({
  name: "IC-Asset",
  props: {
    enabled: {
      default: true,
      type: Boolean,
    },
    image: {
      required: true,
      type: String,
    },
    title: {
      default: "",
      required: false,
      type: String,
    },
    size: {
      default: "medium",
      required: false,
      type: String as PropType<AssetSize>,
    },
  },
  setup(props) {
    const computedStyle = computed(() => {
      const styleTable: Record<AssetSize, string> = {
        small: "32px",
        medium: "48px",
        large: "64px",
      };
      return {
        height: styleTable[props.size],
        width: styleTable[props.size],
      };
    });

    return {
      computedStyle,
    };
  },
});
</script>

<style lang="sass" scoped>
.asset
  object-fit: contain
  opacity: 1
  transition: 0.3s
  &[data-enabled='false']
    opacity: 0.5
    filter: grayscale(1)
</style>
