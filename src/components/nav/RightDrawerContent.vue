<template>
  <CloudData />
  <q-separator />
  <div class="flex justify-between items-center p-2 bg-primary">
    <div class="font-medium">Selected Character</div>
    <div class="text-xs font-medium">Account Level: {{ accountLevel }}</div>
  </div>
  <q-separator />
  <CharacterCard v-if="currentCharacter" :character="currentCharacter" />
  <CharacterSelector />
  <q-separator />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useCharacters } from "~/composables/Characters";
import CharacterCard from "~/components/characters/CharacterCard.vue";
import CharacterSelector from "~/components/characters/CharacterSelector.vue";
import CloudData from "~/components/CloudData.vue";

export default defineComponent({
  name: "RightDrawerContent",
  components: {
    CharacterCard,
    CharacterSelector,
    CloudData,
  },
  setup() {
    const { characters, currentCharacter } = useCharacters();

    const accountLevel = computed<number>(() => {
      let total = 0;
      for (const c of characters.value) {
        if (c.level && typeof c.level === "string") {
          total += parseInt(c.level);
        } else {
          total += c.level;
        }
      }
      return total;
    });

    return {
      accountLevel,
      currentCharacter,
    };
  },
});
</script>

<style scoped lang="sass"></style>
