<template>
  <div class="flex flex-col md:flex-row jumbotron mt-4">
    <div class="w-full md:w-1/3 mt-0">
      <div class="h4 text-white text-2xl">Constellations</div>
      <div
        v-for="(constellation, i) in constellations"
        :key="i"
        class="
          constellation
          flex
          items-center
          justify-between
          px-4
          py-2
          text-light
          mb-1
          rounded-1
        "
        :data-complete="
          curCharacter && curCharacter.constellations[constellation.name]
        "
        :data-all-complete="constellationUnlocked(constellation)"
        @click="toggleConstellation(constellation)"
      >
        <div class="constellation-name">{{ constellation.name }}</div>
        <div class="constellation-area w-1/2">{{ constellation.area }}</div>
        <tooltip>
          <div
            class="constellation-completion border border-gray-300 rounded p-1"
          >
            {{ constellationCompletions(constellation.name).length }} /
            {{ constellation.count }}
          </div>
          <template #content>
            <strong>Completed</strong>
            <div
              v-if="constellationCompletions(constellation.name).length === 0"
            >
              None
            </div>
            <div
              v-for="char in constellationCompletions(constellation.name)"
              :key="char.name"
            >
              - {{ char.name }}
            </div>
          </template>
        </tooltip>
      </div>
    </div>
    <div class="ml-4">
      <div class="h4 text-white text-2xl">
        Star Signs ({{ starSignsEquipped }}/{{ starSignsEquippable }} Equipped)
      </div>
      <div class="flex flex-wrap">
        <div
          v-for="(starSign, i) in starSigns"
          :key="i"
          class="star-sign text-light p-2 m-1 rounded-lg"
          :data-unlocked="starSignUnlocked(starSign.id)"
          @click="toggleStarSign(starSign)"
        >
          <div class="flex flex-col justify-center items-center h-full">
            <Tooltip class="justify-self-end self-end">
              <template #content>
                <div>Toggle Active</div>
              </template>
              <div
                class="border rounded-full w-4 h-4"
                :data-equipped="
                  curCharacter && curCharacter.starSigns[starSign.id] === true
                "
                @click.stop="toggleEquipStarSign(starSign)"
              ></div>
            </Tooltip>
            <div class="text-xl mb-2">{{ starSign.id }}</div>
            <div class="text-sm">{{ starSign.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCharacters } from "~/composables/Characters";
import {
  Constellation,
  Constellations,
  StarSign,
  StarSigns,
} from "~/composables/StarSigns";
import { useState } from "~/State";

export default defineComponent({
  name: "Constellations",
  setup() {
    const { characters, curCharacter } = useCharacters();
    const state = useState();

    const constellationCompletions = (name: string) => {
      return characters.value.filter((x) => x.constellations[name] === true);
    };

    const constellationUnlocked = (c: Constellation) => {
      return constellationCompletions(c.name).length === c.count;
    };

    const toggleConstellation = (c: Constellation) => {
      if (!curCharacter.value) {
        return;
      }
      if (curCharacter.value.constellations[c.name]) {
        curCharacter.value.constellations[c.name] = false;
      } else if (!constellationUnlocked(c)) {
        curCharacter.value.constellations[c.name] = true;
      }
    };

    const starSignsEquipped = computed(() => {
      if (!curCharacter.value) {
        return 0;
      }
      return Object.keys(curCharacter.value.starSigns).length;
    });

    const starSignsEquippable = computed(() => {
      if(state.value.starSigns){
       return state.value.starSigns["CR"] ? 2 : 1;
      } else {
        return 0;
      }
    });

    const starSignUnlocked = (id: string) => {
      if(state.value.starSigns){
        return state.value.starSigns[id];
      }
    };

    const toggleStarSign = (s: StarSign) => {
      if(state.value.starSigns){
        state.value.starSigns[s.id] = !state.value.starSigns[s.id];
      }
    };

    const toggleEquipStarSign = (s: StarSign) => {
      if (!curCharacter.value) {
        return;
      }
      if (curCharacter.value.starSigns[s.id] === true) {
        delete curCharacter.value.starSigns[s.id];
      } else if (
        state.value.starSigns[s.id] &&
        starSignsEquipped.value < starSignsEquippable.value
      ) {
        curCharacter.value.starSigns[s.id] = true;
      }
    };

    return {
      constellationCompletions,
      constellations: Constellations,
      constellationUnlocked,
      curCharacter,
      starSigns: StarSigns,
      starSignsEquipped,
      starSignsEquippable,
      starSignUnlocked,
      toggleConstellation,
      toggleStarSign,
      toggleEquipStarSign,
    };
  },
});
</script>

<style scoped lang="sass">
@import '../styles/base.sass'
.constellation
  background: $primary
  cursor: pointer
  transition: 0.2s
  &[data-complete='true']
    background: $success !important
  &[data-all-complete='true']
    background: darken($success, 15%) !important
    opacity: 0.8
    cursor: default
.star-sign
  border: 1px solid $primary
  cursor: pointer
  width: 10rem
  transition: 0.2s
  &:hover
    background: lighten($primary, 5%)
  &[data-unlocked='true']
    border-width: 0
    background: $primary
  [data-equipped='true']
    background: $indigo
</style>
