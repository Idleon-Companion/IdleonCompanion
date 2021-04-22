<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "~/pages/Home.vue";

import "~/styles/base.sass";
import "~/styles/progress.sass";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
  setup() {},
});
</script>
