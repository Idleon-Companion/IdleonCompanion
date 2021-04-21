<template>
  <h2 class="text-white">Statues</h2>
  <div v-if="curCharacter !== null" class="statue-wrapper">
    <div class="d-flex flex-wrap justify-content-around">
      <div class="d-flex flex-column my-2 col-12 col-md-7">
        <div class="statue-list">
          <div
            class="statue"
            v-for="(statue, i) in Object.keys(statues)"
            :key="i"
            :data-active="curStatue === statue"
            @click="curStatue = statue"
          >
            <img :src="Assets.StatueImage(statue.replace(/ /g, '_'))" />
            <div class="statue-level-badge">
              {{ curCharacter.statues[statue] }}
            </div>
          </div>
        </div>
        <div class="statue-info">
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
          <div class="statue-text">{{ bonusText(curStatue) }}</div>
        </div>
      </div>
      <div class="statue-buffs rounded col-12 col-md-4">
        <div class="text-light h2">Total Buffs</div>
        <div
          v-for="(buff, i) in statueBuffs"
          :key="i"
          class="statue-buff text-light h6"
        >
          {{ buff }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h5 text-light">You have no characters created.</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { useCharacters } from "../composables/Characters";
import { Statues } from "../composables/Statues";
import { Assets } from "../composables/Utilities";

export default defineComponent({
  name: "Statues",
  setup() {
    const { curCharacter, saveCharacters } = useCharacters();
    const curStatue = ref("Anvil");

    const statues = computed(() => {
      let s = {} as Record<string, number>;
      if (curCharacter.value !== null) {
        for (const name of Object.keys(Statues)) {
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

    const bonusText = (statue: string) => {
      let level = curCharacter.value ? curCharacter.value.statues[statue] : 0;
      let data = Statues[statue];
      let effect = data.effect as string;
      if (!effect.startsWith("%")) {
        effect = " " + effect;
      }
      return `+${Number((data.base * level).toFixed(2))}${effect}`;
    };

    const statueBuffs = computed(() => {
      let a = [];
      for (const s of Object.keys(Statues)) {
        if (curCharacter.value !== null && curCharacter.value.statues[s] > 0) {
          a.push(bonusText(s));
        }
      }
      return a;
    });

    return {
      Assets,
      bonusText,
      curCharacter,
      curStatue,
      saveCharacters,
      setStatueLevel,
      statueBuffs,
      statues,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'

.statue-wrapper
  display: flex
  flex-direction: column
.statue-level-badge
  text-align: center
  background: $primary
  border-radius: 5rem
  margin: 0 auto
  margin-top: 0.25rem
  width: 75%
.statue-info
  align-items: center
  background: $primary
  border-radius: 5px
  color: darken(white, 5%)
  display: flex
  flex-direction: column
  justify-content: center
  margin-top: 2rem
  padding: 1.5rem
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
    margin: 0 0.5rem
    outline: none
    padding: 0.15rem
    text-align: center
    width: 25%
.statue-buffs
  background: $primary
  padding: 1.5rem
.statue-list
  display: flex
  flex-wrap: wrap
  @media (max-width: 768px)
    justify-content: center

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
      transform: scale(1.20)
    &[data-active='true']
      background: rgba(white, 0.2)
</style>
