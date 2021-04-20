<template>
  <div v-if="curCharacter === null" class="text-light">
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
        data-bs-toggle="dropdown"
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

<style scoped lang="sass">
.dropdown-menu
  border: none
  border-radius: 0
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3)
  width: 100%
.char-select-item
  cursor: pointer
  opacity: 0.5
  padding: 0.35rem
  transition: 0.2s
  &:hover
    opacity: 1.0
.char-select-item:not(:last-child)
  border-bottom: 1px solid rgba(255, 255, 255, 0.1)
</style>
