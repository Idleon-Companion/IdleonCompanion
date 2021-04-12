<template>
  <img
    class="img-fluid asset"
    data-bs-toggle="tooltip"
    data-bs-placement="bottom"
    loading="lazy"
    :data-enabled="enabled"
    :title="title"
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
    width: {
      type: Number,
    },
  },
  setup(props) {
    const computedStyle = computed(() => {
      let height = props.height ? props.height + "px" : "auto";
      let width = props.width ? props.width + "px" : "auto";
      return {
        height,
        width,
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
</style>
