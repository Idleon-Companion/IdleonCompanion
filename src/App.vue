<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./pages/Home.vue";

import "./styles/custom.css";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
});
</script>

<style></style>
