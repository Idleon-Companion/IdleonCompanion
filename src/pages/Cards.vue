<template>
  <q-banner inline-actions>
    Find which cards are best for a certain objective! Cards are grouped by
    having direct bonuses (Choppin' EXP), indirect bonuses (Accuracy), or
    additional benefit (Drop Chance).
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
  <div class="p-3">
    <div class="col-12" v-for="(cardset, i) in cardData" :key="i">
      <div class="h1 text-light">{{ cardset.title }}</div>
      <div class="row justify-content-start">
        <div class="col-4 border border-secondary rounded p-2 w-auto flex">
          <span class="badge bg-secondary card-title">Core Cards</span>
          <ICAsset
            v-for="card in cardset.core"
            :image="Assets.CardImage(card)"
            :title="card.replace(/_/g, ' ')"
          />
        </div>
        <div class="col-4 border border-secondary rounded p-2 w-auto flex">
          <span class="badge bg-secondary card-title">Useful Cards</span>
          <ICAsset
            v-for="card in cardset.useful"
            :image="Assets.CardImage(card)"
            :title="card.replace(/_/g, ' ')"
          />
        </div>
        <div class="col-4 border border-secondary rounded p-2 w-auto flex">
          <span class="badge bg-secondary card-title">Minimal Benefits</span>
          <ICAsset
            v-for="card in cardset.minimal"
            :image="Assets.CardImage(card)"
            :title="card.replace(/_/g, ' ')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cardData from "~/data/card-sets.json";

import ICAsset from "~/components/idleon-companion/IC-Asset.vue";
import { Assets } from "~/composables/Utilities";

const WikiLinks = new Map([["Cards", "https://idleon.info/wiki/Cards"]]);

export default defineComponent({
  name: "Cards",
  components: {
    ICAsset,
  },
  setup() {
    return {
      Assets,
      cardData,
      wikiLinks: WikiLinks,
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
