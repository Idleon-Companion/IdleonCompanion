<template>
  <div v-if="numCharacters === 0">
    Add your characters on the "Character" tab.
  </div>
  <div v-else class="d-flex flex-column bg-dark">
    <div class="bg-primary p-2 rounded-top">
      <CharacterCard :char="curCharacter" />
    </div>
    <div class="dropdown">
      <button
        class="btn btn-dark dropdown-toggle border-0 rounded-0"
        id="char-select-menu-btn"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Switch character
      </button>
      <ul
        class="dropdown-menu dropdown-menu-dark"
        aria-labelledby="char-select-menu-btn"
      >
        <div
          v-for="(char, i) in characters"
          class="char-select-item"
          :key="i"
          @click="updateChar(i)"
        >
          <CharacterCard :char="char" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CharacterCard from "../components/CharacterCard.vue";
import { useCharacters } from "../composables/Characters";

export default defineComponent({
  name: "CharacterSelector",
  components: {
    CharacterCard,
  },
  setup() {
    const {
      characters,
      charIndex,
      curCharacter,
      numCharacters,
    } = useCharacters();

    const updateChar = (i: number) => {
      charIndex.value = i;
    };

    return {
      characters,
      charIndex,
      curCharacter,
      numCharacters,
      updateChar,
    };
  },
});
</script>

<style>
.char-select-item {
  padding: 0.35rem;
}
.char-select-item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
