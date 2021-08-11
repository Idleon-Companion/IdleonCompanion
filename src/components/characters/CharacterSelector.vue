<template>
  <q-expansion-item label="Switch Characters" class="bg-primary" dense>
    <q-separator />
    <CharacterCard
      v-for="(character, index) in characters"
      :character="character"
      class="character-card-select"
      @click="switchToCharacter(index)"
    />
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCharacters } from "~/composables/Characters";
import CharacterCard from "~/components/characters/CharacterCard.vue";

export default defineComponent({
  name: "CharacterSelector",
  components: {
    CharacterCard,
  },
  setup() {
    const { characters, switchToCharacter } = useCharacters();

    return {
      characters,
      switchToCharacter,
    };
  },
});
</script>

<style scoped lang="sass">
.character-card-select
  opacity: 0.4
  transition: 0.3s
  &:hover
    opacity: 1
</style>
