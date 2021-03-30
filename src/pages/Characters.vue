<template>
  <div class="bg-dark p-4 rounded">
    <h4 v-if="chars.numCharacters === 0">
      You have no characters. Add new ones below!
    </h4>
    <div v-else>
      <h4>Your Characters</h4>
      <div
        v-for="(char, i) in chars.characters"
        :key="i"
        class="bg-secondary p-2 w-50 mx-auto"
      >
        <div class="d-flex">
          <img :src="getClassImagePath(char)" class="char-icon" />
          <div class="d-flex flex-column">
            <div>{{ char.name }}</div>
            <em>Level {{ char.level }} - {{ charClassText(char) }}</em>
          </div>
        </div>
      </div>
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
import { Class, Subclass, Character, CharacterManager } from "../State";

export default defineComponent({
  name: "Characters",
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
      chars.characters.push(char);
    };

    return {
      addCharacter,
      chars,
      newChar,
    };
  },
  methods: {
    charClassText(char: Character): string {
      let classes = [char.class, char.subclass].filter((x) => x !== null);
      return classes.join(" / ");
    },
    getClassImagePath(char: Character): string {
      let image = char.class as string;
      if (char.subclass) {
        image = char.subclass as string;
      }
      return `assets/classes/${image}.png`;
    },
  },
});
</script>

<style>
.char-icon {
  object-fit: contain;
  height: 4rem;
  width: 4rem;
}
.char-input {
  outline: none;
  padding: 0.25rem;
}
</style>
