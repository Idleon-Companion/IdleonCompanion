<template>
  <div class="col-12" v-for="(cardset, i) in cardData" :key="i">
    <div class="h1 text-light">{{ cardset.title }}</div>
    <div class="row justify-content-start border border-secondary rounded">
      <div class="col-4 p-2">
        <span class="badge bg-secondary card-title">Core Cards</span>
        <GameAsset
          v-for="(card, c) in cardset.core"
          :key="c"
          :height="90"
          :image="getCardImagePath(card)"
          :title="card.replace('_', ' ')"
        />
      </div>
      <div class="col-4 p-2 border-start border-end border-secondary">
        <span class="badge bg-secondary card-title px-4 py-1"
          >Useful Cards</span
        >
        <GameAsset
          v-for="(card, c) in cardset.useful"
          :key="c"
          :height="90"
          :image="getCardImagePath(card)"
          :title="card.replace('_', ' ')"
        />
      </div>
      <div class="col-4 p-2">
        <span class="badge bg-secondary card-title px-4 py-1"
          >Minimal Benefits</span
        >
        <GameAsset
          v-for="(card, c) in cardset.minimal"
          :key="c"
          :height="90"
          :image="getCardImagePath(card)"
          :title="card.replace('_', ' ')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cardData from "../data/card-sets.json";

import GameAsset from "./GameAsset.vue";

export default defineComponent({
  name: "Cards",
  components: {
    GameAsset,
  },
  setup() {
    return {
      cardData,
    };
  },
  methods: {
    getCardImagePath(card: string): string {
      return `assets/cards/${card}_Card.png`;
    },
  },
});
</script>

<style lang="sass" scoped>
.card-text
  white-space: pre-line

.card-title
  position: absolute
  opacity: 80%
</style>
