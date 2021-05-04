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
    <div class="d-flex flex-column ms-auto align-items-end text-light">
      <div class="d-flex align-items-center">
        <div class="iconify" data-icon="mdi-sack"></div>
        <div class="ms-1 char-text-sm">{{ char.bagSlots }} Slots</div>
      </div>
      <div class="d-flex">
        <GameAsset
          v-for="(skill, i) in topSkills"
          :key="i"
          :height="24"
          :title="skill"
          :image="Assets.IconImage(skill)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import GameAsset from "~/components/GameAsset.vue";
import { Character, Skills, useCharacters } from "~/composables/Characters";
import { Assets } from "~/composables/Utilities";

export default defineComponent({
  name: "CharacterCard",
  components: {
    GameAsset,
  },
  props: {
    char: {
      required: true,
      type: Object as PropType<Character | null>,
    },
  },
  setup(props) {
    const { characters } = useCharacters();

    const topSkills = computed(() => {
      let top = [];
      if (props.char !== null) {
        for (const skill of Skills) {
          let best = true;
          for (const c of characters.value) {
            if (c.skills[skill] > props.char.skills[skill]) {
              best = false;
              break;
            }
          }
          if (best) {
            top.push(skill);
          }
        }
      }
      return top.slice(0, 3);
    });

    return {
      Assets,
      characters,
      topSkills,
    };
  },
  methods: {
    charClassText(char: Character): string {
      return char.subclass || char.class;
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
    margin-top: 0.15rem
    display: flex
    .char-level
      background: $purple
      border-radius: 0.2rem
      font-weight: bold
      padding: 0.05rem 0.25rem
    .char-class
      margin-left: 0.25rem
      font-weight: 500
  .char-text-sm
    font-size: 0.85rem
</style>
