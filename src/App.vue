<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect } from "vue";
import Home from "~/pages/Home.vue";

import { useCharacters } from "~/composables/Characters";
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
