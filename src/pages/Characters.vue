<template>
  <div class="p-4 rounded">
    <h4 v-if="numCharacters === 0" class="text-light">
      You have no characters. Add new ones below!
    </h4>
    <div v-else>
      <h4 class="text-light">Edit Characters (TODO)</h4>
      <div
        v-for="(char, i) in characters"
        :key="i"
        class="bg-primary p-2 w-25 rounded mb-1"
      >
        <CharacterCard :char="char" />
      </div>
    </div>
    <h4 class="text-light mt-4">Add New Character</h4>
    <div class="row w-50 flex-column px-3">
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
import { defineComponent, reactive } from "vue";
import { Class, Character, useCharacters } from "../composables/Characters";

import CharacterCard from "../components/CharacterCard.vue";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
  },
  setup() {
    const { characters, numCharacters } = useCharacters();
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
      characters.value.push(char);
    };

    return {
      addCharacter,
      characters,
      newChar,
      numCharacters,
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
