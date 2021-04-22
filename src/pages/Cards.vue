<template>
  <div class="col-12" v-for="(cardset, i) in cardData" :key="i">
    <div class="h1 text-light">{{ cardset.title }}</div>
    <div class="row justify-content-start">
      <div
        class="col-4 border border-secondary rounded p-2 w-auto"
        style="min-width: 150px"
      >
        <span class="badge bg-secondary card-title">Core Cards</span>
        <GameAsset
          v-for="(card, c) in cardset.core"
          :key="c"
          :height="72"
          :image="Assets.CardImage(card)"
          :title="card.replace(/_/g, ' ')"
        />
      </div>
      <div
        class="col-4 border border-secondary rounded p-2 w-auto"
        style="min-width: 150px"
      >
        <span class="badge bg-secondary card-title">Useful Cards</span>
        <GameAsset
          v-for="(card, c) in cardset.useful"
          :key="c"
          :height="72"
          :image="Assets.CardImage(card)"
          :title="card.replace(/_/g, ' ')"
        />
      </div>
      <div
        class="col-4 border border-secondary rounded p-2 w-auto"
        style="min-width: 150px"
      >
        <span class="badge bg-secondary card-title">Minimal Benefits</span>
        <GameAsset
          v-for="(card, c) in cardset.minimal"
          :key="c"
          :height="72"
          :image="Assets.CardImage(card)"
          :title="card.replace(/_/g, ' ')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cardData from "~/data/card-sets.json";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";

export default defineComponent({
  name: "Cards",
  components: {
    GameAsset,
  },
  setup() {
    return {
      Assets,
      cardData,
    };
  },
});
</script>

<style lang="sass" scoped>
.card-text
  white-space: pre-line

.card-title
  position: absolute
  opacity: 90%
</style>
