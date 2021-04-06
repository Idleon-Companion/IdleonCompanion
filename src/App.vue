<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Home from "./pages/Home.vue";
import * as bootstrap from "bootstrap";

import "./styles/base.sass";
import "./styles/progress.sass";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
  setup() {
    onMounted(() => {
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    });
  },
});
</script>
