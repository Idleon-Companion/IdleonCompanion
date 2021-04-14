<template>
  <h2 class="text-white">Statues</h2>
  <div v-if="curCharacter !== null" class="statue-wrapper">
    <div class="statue-list">
      <div
        class="statue"
        v-for="(statue, i) in Object.keys(statues)"
        :key="i"
        :data-active="curStatue === statue"
        @click="curStatue = statue"
      >
        <img :src="getStatueImagePath(statue)" />
      </div>
    </div>
    <div class="statue-info col-12 col-md-8">
      <div class="statue-name">{{ curStatue }} Statue</div>
      <h5 class="d-flex align-items-center justify-content-center mt-3">
        <div class="statue-text">Level</div>
        <input
          :value="curCharacter.statues[curStatue]"
          class="statue-level"
          type="number"
          min="0"
          @change="setStatueLevel"
        />
      </h5>
      <div class="statue-text my-2">
        <em
          >{{
            Math.round(Math.pow(curCharacter.statues[curStatue], 1.35) + 1)
          }}
          statues to level {{ curCharacter.statues[curStatue] + 1 }}</em
        >
      </div>
      <div class="statue-text">{{ bonusText }}</div>
    </div>
  </div>
  <div v-else>You have no characters created.</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { useCharacters, Statues } from "../composables/Characters";

export default defineComponent({
  name: "Statues",
  setup() {
    const { curCharacter, saveCharacters } = useCharacters();
    const curStatue = ref(Statues[0]);

    const statues = computed(() => {
      let s = {} as Record<string, number>;
      if (curCharacter.value !== null) {
        for (const name of Statues) {
          s[name] = curCharacter.value.statues[name];
        }
      }
      return s;
    });

    const setStatueLevel = (event: Event) => {
      let level = (event.target as HTMLInputElement).value;
      if (curCharacter.value === null) {
        return;
      }
      let n = 0;
      if (level !== "") {
        n = parseInt(level);
      }
      curCharacter.value.statues[curStatue.value] = n;
      saveCharacters();
    };

    const bonusText = computed(() => {
      let base = 0;
      let effect = "";
      let level = curCharacter.value
        ? curCharacter.value.statues[curStatue.value]
        : 0;
      switch (curStatue.value) {
        case "Anvil":
          base = 0.5;
          effect = "% Production Speed";
          break;
        case "Beholder":
          base = 0.2;
          effect = "% Crit Chance";
          break;
        case "Bullseye":
          base = 0.8;
          effect = "% Accuracy";
          break;
        case "Cauldron":
          base = 0.5;
          effect = "% Alchemy Exp";
          break;
        case "Exp Book":
          base = 0.1;
          effect = "% Class Exp";
          break;
        case "Feasty":
          base = 1;
          effect = "% Food Effect";
          break;
        case "Health":
          base = 3;
          effect = " Base Health";
          break;
        case "Kachow":
          base = 0.4;
          effect = "% Crit Damage";
          break;
        case "Lumberbob":
          base = 0.3;
          effect = " Choppin Power";
          break;
        case "Mining":
          base = 0.3;
          effect = " Mining Power";
          break;
        case "Oceanman":
          base = 0.3;
          effect = " Fishing Power";
          break;
        case "Ol Reliable":
          base = 0.3;
          effect = " Catching Power";
          break;
        case "Power":
          base = 3;
          effect = " Base Damage";
          break;
        case "Speed":
          base = 0.1;
          effect = "% Move Speed";
          break;
        case "Thicc Skin":
          base = 1;
          effect = " Base Defence";
          break;
      }
      return `+${base * level}${effect}`;
    });

    return {
      bonusText,
      curCharacter,
      curStatue,
      saveCharacters,
      setStatueLevel,
      statues,
    };
  },
  methods: {
    getStatueImagePath(statue: string): string {
      let s = statue.replace(" ", "_");
      return `assets/statues/${s}_Statue.png`;
    },
  },
});
</script>

<style lang="sass" scoped>
.statue-wrapper
  display: flex
  flex-direction: column
.statue-info
  align-items: center
  background: #3a3f44
  border-radius: 5px
  color: darken(white, 5%)
  display: flex
  flex-direction: column
  justify-content: center
  margin: 1rem auto
  padding: 1.5rem
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0

  /* Firefox */
  input[type=number]
    -moz-appearance: textfield
  .statue-name
    font-size: 2rem
    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2)
  .statue-level-text
    font-size: 1.5rem
  .statue-level
    background: rgba(150,150,150,0.2)
    color: white
    border: none
    border-radius: 3px
    margin: 0 0.25rem
    outline: none
    padding: 0.15rem
    text-align: center
    width: 25%
.statue-list
  display: flex
  flex-wrap: wrap

  .statue
    border-radius: 50%
    color: white
    cursor: pointer
    padding: 1rem
    width: 96px
    height: 96px
    transition: 0.3s
    img
      width: 72px
      height: 72px
      margin-top: -12px
      margin-left: -4px
      object-fit: contain
    &:hover
      transform: scale(1.30)
    &[data-active='true']
      background: rgba(255, 255, 255, 0.1)
</style>
