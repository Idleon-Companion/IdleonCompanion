<template>
  <Tooltip v-if="title">
    <q-img
      class="asset"
      loading="lazy"
      :data-enabled="enabled"
      :draggable="false"
      :src="image"
      :height="computedStyle.height"
      :width="computedStyle.width"
    />
    <template #content>
      <slot name="tooltip">
        <div>{{ title }}</div>
      </slot>
    </template>
  </Tooltip>
  <q-img
    v-else
    class="asset"
    loading="lazy"
    :data-enabled="enabled"
    :draggable="false"
    :src="image"
    :height="computedStyle.height"
    :width="computedStyle.width"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

type AssetSize = "xxs" | "xs" | "small" | "medium" | "large" | "xl" | "none";

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
      if (props.size === "none") {
        return {};
      }
      const styleTable: Record<AssetSize, string> = {
        xxs: "16px",
        xs: "24px",
        small: "32px",
        medium: "48px",
        large: "64px",
        xl: "72px",
        none: "",
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
