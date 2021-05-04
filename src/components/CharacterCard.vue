<template>
  <div v-if="char !== null" class="d-flex char-card">
    <img :src="Assets.CharImage(char)" class="char-icon" />
    <div class="d-flex flex-column ms-2">
      <div class="char-name">{{ char.name || "No Name" }}</div>
      <div class="char-meta">
        <div class="char-level">Lv. {{ char.level }}</div>
        <div class="char-class">{{ charClassText(char) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Character } from "~/composables/Characters";
import { Assets } from "~/composables/Utilities";

export default defineComponent({
  name: "CharacterCard",
  props: {
    char: {
      required: true,
      type: Object as PropType<Character | null>,
    },
  },
  setup() {
    return {
      Assets,
    };
  },
  methods: {
    charClassText(char: Character): string {
      let classes = [char.class, char.subclass].filter((x) => x !== null);
      return classes.join(" > ");
    },
  },
});
</script>

<style scoped lang="sass">
@import '../styles/base.sass'

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
      background: $purple
      border-radius: 0.2rem
      font-weight: bold
      padding: 0.1rem 0.25rem
    .char-class
      font-style: italic
      margin-left: 0.25rem
</style>
