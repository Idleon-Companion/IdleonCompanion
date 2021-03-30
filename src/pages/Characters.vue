<template>
  <div class="bg-dark p-4 rounded">
    <h4 v-if="chars.numCharacters === 0">
      You have no characters. Add new ones below!
    </h4>
    <div v-else>
      <h4>Your Characters</h4>
      <CharacterCard v-for="(char, i) in characters" :key="i" :char="char" />
    </div>

    <h2>Add New Character</h2>
    <div class="row w-50 flex-column p-3">
      <label for="newchar-name">Name</label>
      <input
        id="newchar-name"
        v-model="newChar.name"
        type="text"
        placeholder="Name"
        class="col-8 char-input"
      />
      <label for="newchar-level">Level</label>
      <input
        id="newchar-level"
        v-model="newChar.level"
        type="number"
        min="1"
        placeholder="Level"
        class="col-3 char-input"
      />
      <button class="btn btn-primary col-6 mt-4" @click="addCharacter">
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { Class, Character, CharacterManager } from "../State";

import CharacterCard from "../components/CharacterCard.vue";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
  },
  setup() {
    const chars = inject("chars") as CharacterManager;
    const newChar = reactive({
      name: "",
      level: 1,
    });

    const addCharacter = () => {
      if (newChar.name === "") {
        return;
      }
      let char = {
        name: newChar.name,
        level: newChar.level,
        items: {},
        statues: {},
        class: Class.Beginner,
        subclass: null,
      } as Character;
      newChar.name = "";
      newChar.level = 1;
      chars.characters.value.push(char);
    };

    return {
      addCharacter,
      chars,
      characters: chars.characters.value,
      newChar,
    };
  },
});
</script>

<style>
.char-input {
  outline: none;
  padding: 0.25rem;
}
</style>
