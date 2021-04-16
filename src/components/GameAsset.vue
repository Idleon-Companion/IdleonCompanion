<template>
  <Tooltip v-if="title">
    <img
      loading="lazy"
      :class="computedClass"
      :data-enabled="enabled"
      :src="image"
      :style="computedStyle"
    />
    <template #content>
      <slot name="tooltip">
        <div>{{ title }}</div>
      </slot>
    </template>
  </Tooltip>
  <img
    v-else
    loading="lazy"
    :class="computedClass"
    :data-enabled="enabled"
    :src="image"
    :style="computedStyle"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "GameAsset",
  props: {
    enabled: {
      default: true,
      type: Boolean,
    },
    height: {
      type: Number,
    },
    image: {
      required: true,
      type: String,
    },
    title: String,
    thumbnail: {
      default: false,
      type: Boolean,
    },
    width: {
      type: Number,
    },
  },
  setup(props) {
    const computedClass = computed(() => {
      let cssClass = "img-fluid asset";
      if (props.thumbnail) {
        cssClass += " img-thumbnail";
      }
      return cssClass;
    });

    const computedStyle = computed(() => {
      let height = props.height ? props.height + "px" : "auto";
      let width = props.width ? props.width + "px" : "auto";
      return {
        height,
        width,
      };
    });

    return {
      computedClass,
      computedStyle,
    };
  },
});
</script>

<style lang="sass" scoped>
.asset
  object-fit: contain
</style>
