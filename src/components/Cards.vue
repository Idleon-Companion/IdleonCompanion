<template>
  <div v-for="(cardset, i) in cardData" :key="i">
    <div class="h1">{{ cardset.title }}</div>
    <div class="row justify-content-left p-3">
      <div
        class="bs-component border border-secondary rounded p-2"
        style="min-width: 150px"
      >
        <span class="badge badge-pill badge-primary card-title px-4 py-1"
          >Core Cards</span
        >
        <img
          v-for="(card, c) in cardset.core"
          :key="c"
          :src="getCardImagePath(card)"
          :title="card"
          class="img-fluid card-set"
        />
      </div>
      <div
        class="bs-component border border-secondary rounded p-2"
        style="min-width: 150px"
      >
        <span class="badge badge-pill badge-primary card-title px-4 py-1"
          >Useful Cards</span
        >
        <img
          v-for="(card, c) in cardset.useful"
          :key="c"
          :src="getCardImagePath(card)"
          :title="card"
          class="img-fluid card-set"
        />
      </div>
      <div
        v-if="Object.keys(cardset.minimal).length"
        class="bs-component border border-secondary rounded p-2"
        style="min-width: 150px"
      >
        <span class="badge badge-pill badge-primary card-title px-4 py-1"
          >Minimal Benefits</span
        >
        <img
          v-for="(card, c) in cardset.minimal"
          :key="c"
          :src="getCardImagePath(card)"
          :title="card"
          class="img-fluid card-set"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cardData from "../data/card-sets.json";

export default defineComponent({
  name: "Cards",
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
