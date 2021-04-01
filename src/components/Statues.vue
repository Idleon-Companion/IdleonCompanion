<template>
  <h4>Statues</h4>
  <div class="statue-ring">
    <div
      class="statue"
      v-for="(statue, i) in Object.keys(statues)"
      :key="i"
      :data-active="curStatue === statue"
      :style="statuePos(i)"
      @mouseover="curStatue = statue"
    >
      <img :src="getStatueImagePath(statue)" />
    </div>
    <div class="statue-info">
      <h4>{{ curStatue }} Statue</h4>
      <h5 class="d-flex align-items-center justify-content-center">
        <div class="mr-2">Level</div>
        <input
          class="statue-level"
          v-model="statues[curStatue]"
          type="number"
        />
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useCharacters, Statues } from "../composables/Characters";

export default defineComponent({
  name: "Statues",
  setup() {
    const { curCharacter } = useCharacters();
    const statues = ref({} as Record<string, number>);
    for (const s of Statues) {
      if (curCharacter.value && s in curCharacter.value.statues) {
        statues.value[s] = curCharacter.value.statues[s];
      } else {
        statues.value[s] = 0;
      }
    }
    const curStatue = ref(Statues[0]);
    return {
      curStatue,
      statues,
    };
  },
  methods: {
    getStatueImagePath(statue: string): string {
      statue = ["Anvil", "Beholder", "Bullseye", "Cauldron"][
        Math.round(Math.random() * 3)
      ];
      return `assets/statues/${statue}_Statue.png`;
    },
    statuePos(i: number) {
      let deg = (360 / Object.keys(this.statues).length) * i;
      let theta = (deg * Math.PI) / 180;
      let radius = 300;
      let x = radius * Math.cos(theta);
      let y = radius * Math.sin(theta);
      return {
        "margin-top": y + "px",
        "margin-left": x + "px",
      };
    },
  },
});
</script>

<style lang="sass" scoped>
.statue-ring
  display: flex
  margin-top: 350px
  margin-left: 50%
  .statue-info
    align-items: center
    background: var(--primary)
    border-radius: 0.25rem
    display: flex
    flex-direction: column
    justify-self: center
    padding: 1.5rem
    .statue-level
      background: var(--secondary)
      border: none
      outline: none
      padding: 0.25rem
.statue
  border-radius: 50%
  color: white
  cursor: pointer
  display: flex
  padding: 1rem
  width: 96px
  height: 96px
  position: absolute
  transition: 0.3s
  &:hover
    transform: scale(1.30)
  &[data-active='true']
    background: rgba(255, 255, 255, 0.1)
</style>
