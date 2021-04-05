<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./pages/Home.vue";

import "./styles/base.sass";
import "./styles/progress.sass";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
});
</script>
