<template>
  <div class="bg-secondary p-2 w-50 mx-auto rounded-sm my-1">
    <div class="d-flex">
      <img :src="getClassImagePath(char)" class="char-icon" />
      <div class="d-flex flex-column">
        <div>{{ char.name }}</div>
        <em>Level {{ char.level }} - {{ charClassText(char) }}</em>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Character } from "../State";

export default defineComponent({
  name: "CharacterCard",
  props: {
    char: {
      required: true,
      type: Object as PropType<Character>,
    },
  },
  setup() {},
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

<style scoped>
.char-icon {
  object-fit: contain;
  height: 4rem;
  width: 4rem;
}
</style>
