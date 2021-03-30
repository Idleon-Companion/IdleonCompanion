<template>
  <div v-if="chars.numCharacters === 0">
    Add your characters on the "Character" tab.
  </div>
  <div v-else class="d-flex flex-column bg-dark">
    <div>Character {{ chars.index + 1 }}/{{ chars.numCharacters }}</div>
    <div class="d-flex">
      <div>prev</div>
      <CharacterCard :char="chars.curCharacter" />
      <div>next</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { CharacterManager } from "../State";

import CharacterCard from "../components/CharacterCard.vue";

export default defineComponent({
  name: "CharacterSelector",
  components: {
    CharacterCard,
  },
  setup() {
    const chars = inject("chars") as CharacterManager;
    return {
      chars,
    };
  },
});
</script>
