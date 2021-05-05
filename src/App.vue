<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect } from "vue";
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
    const state = useState();
    const { characters } = useCharacters();
    // Load saved state
    let chars = state.value.chars;
    for (const c of chars) {
      let newChar = new Character();
      Object.assign(newChar, c);
      characters.value.push(newChar);
    }
    // Watch for changes, and update local state
    watchEffect(() => {
      state.value.chars = characters.value;
    });
  },
});
</script>
