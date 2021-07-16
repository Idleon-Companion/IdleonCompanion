<template>
  <q-banner inline-actions>
    Create/edit your characters! Track your character skill progress, inventory
    upgrades, star signs, and more.
    <template v-slot:action>
      <q-btn-dropdown outline label="Wiki">
        <q-list separator>
          <a v-for="[label, link] in wikiLinks" :key="label" :href="link">
            <q-item clickable>
              <q-item-section>{{ label }}</q-item-section>
            </q-item>
          </a>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-banner>
  <q-card v-if="currentCharacter === null">
    <div>
      You have no characters. Create your first character or load your data from
      the cloud!
    </div>
    <q-btn @click="newCharacter">New Character</q-btn>
  </q-card>
  <CharacterEditor v-else />
  <CharacterProgressTracker v-if="currentCharacter !== null" />
</template>
<!-- TODO
  <StatuesSection />
  <Constellations />
-->

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useToast } from "vue-toastification";

import CharacterCard from "~/components/CharacterCard.vue";
import CharacterEditor from "~/components/characters/CharacterEditor.vue";
import CharacterProgressTracker from "~/components/characters/CharacterProgressTracker.vue";
import CloudData from "~/components/CloudData.vue";
import Constellations from "~/components/Constellations.vue";
import {
  Character,
  Class,
  Skills,
  Subclass,
  useCharacters,
} from "~/composables/Characters";
import { Statues } from "~/composables/Statues";
import { Assets, Text } from "~/composables/Utilities";
import StatuesSection from "~/pages/Statues.vue";
import { useAuth } from "~/State";

const WikiLinks = new Map([
  ["Classes", "https://idleon.miraheze.org/wiki/Classes"],
  ["Skills", "https://idleon.miraheze.org/wiki/Skills"],
  ["Items", "https://idleon.miraheze.org/wiki/Items"],
  ["Star Signs", "https://idleon.miraheze.org/wiki/Star_Signs"],
]);

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
    CharacterEditor,
    CharacterProgressTracker,
    CloudData,
    Constellations,
    StatuesSection,
  },
  setup() {
    const { user } = useAuth();
    const { characters, charIndex, currentCharacter, numCharacters } =
      useCharacters();
    const toast = useToast();
    // Filter out class "All"
    const classes = [];
    for (const class_ in Class) {
      if (class_ !== Class.All) {
        classes.push(class_);
      }
    }

    const newCharacter = () => {
      let char = new Character();
      for (const skill of Skills) {
        char.skills[skill] = 0;
      }
      for (const name of Object.keys(Statues)) {
        char.statues[name] = 0;
      }
      characters.value.push(char);
      charIndex.value = characters.value.length - 1;
      toast.info("New character created.");
    };
    const deleteCharacter = () => {
      characters.value.splice(charIndex.value, 1);
      charIndex.value = 0;
    };

    const totalCharLevel = computed<number>(() => {
      let total = 0;
      for (const c of characters.value) {
        if (typeof c.level === "string") {
          total += parseInt(c.level);
        } else {
          total += c.level;
        }
      }
      return total;
    });

    return {
      Assets,
      characters,
      charIndex,
      classes,
      currentCharacter,
      deleteCharacter,
      newCharacter,
      numCharacters,
      Subclass,
      Text,
      totalCharLevel,
      user,
      wikiLinks: WikiLinks,
    };
  },
});
</script>

<style scoped lang="sass">
@import '../styles/base.sass'
.char-delete-btn
  background: darken($red, 25%)
  color: white
  &:hover
    background: darken($red, 20%)
    color: white
.char-delete-icon
  cursor: pointer
  font-size: 1.5rem
  transition: 0.3s
  &:hover
    color: lighten(red, 15%)
.char-editor
  label
    color: darken(white, 15%)
    font-size: 1.15rem
    font-weight: bold
    margin: 0.1rem 0
  .char-class-img
    border-radius: 50%
    cursor: pointer
    height: 5rem
    width: 5rem
    padding: 0.25rem
    object-fit: contain
    transition: 0.3s
    &:hover
      transform: scale(1.1)
      background: rgba(white, 0.05)
  .char-input
    &.skill-input
      width: 5rem
  .char-skill-img
    width: 2rem
    object-fit: contain
.char-class-close
  color: white
.total-level
  color: darken(white, 10%)
  font-weight: 600
  font-size: 0.9rem
  margin-top: 0.25rem
</style>
