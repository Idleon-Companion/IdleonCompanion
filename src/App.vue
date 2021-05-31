<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect } from "vue";
import * as bootstrap from "bootstrap";
import Home from "~/pages/Home.vue";

import { Character, useCharacters } from "~/composables/Characters";
import { versionControl, useState } from "./State";

import "~/styles/base.sass";
import "~/styles/progress.sass";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
  setup() {
    onMounted(versionControl);
    // Initialize Bootstrap toasts
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl, { delay: 2500 });
    });
    // State for storage/persistence
    const state = useState();
    const { characters, createCharactersFromData } = useCharacters();
    createCharactersFromData(state.value.chars);
    // Watch for changes, and update local state
    watchEffect(() => {
      state.value.chars = characters.value;
    });
  },
});
</script>
