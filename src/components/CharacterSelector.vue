<template>
  <div v-if="characters.length === 0">
    Add your characters on the "Character" tab.
  </div>
  <div v-else v-for="(char, n) in characters" :key="n">Character {{ n }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CharacterSelector",
  setup() {},
});
</script>
