<template>
  <div v-if="char !== null" class="d-flex char-card">
    <img :src="getClassImagePath(char)" class="char-icon" />
    <div class="d-flex flex-column">
      <div class="char-name">{{ char.name }}</div>
      <div class="char-meta">
        <div class="char-level">Lv. {{ char.level }}</div>
        <div class="char-class">{{ charClassText(char) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Character } from "../composables/Characters";

export default defineComponent({
  name: "CharacterCard",
  props: {
    char: {
      required: true,
      type: Object as PropType<Character | null>,
    },
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

<style scoped lang="sass">
.char-icon
  object-fit: contain
  height: 4rem
  width: 4rem

.char-card
  .char-name
    color: darken(white, 15%)
    font-size: 1.25rem
    font-weight: bold
  .char-meta
    align-items: center
    color: darken(white, 10%)
    display: flex
    .char-level
      background: var(--purple)
      border-radius: 0.2rem
      padding: 0.1rem 0.25rem
    .char-class
      font-style: italic
      margin-left: 0.25rem
</style>
