<template>
  <q-card class="m-4 p-4">
    <div class="text-2xl">Cards</div>
    <div class="flex flex-wrap justify-center">
      <q-expansion-item
        v-for="(cards, category) in allCards"
        class="bg-blue-400 m-4 rounded w-full font-medium"
      >
        <template #header>
          <q-badge outline
            >{{ getCardProgress(cards).unlocked }} /
            {{ getCardProgress(cards).total }}</q-badge
          >
          <q-item-section class="font-medium ml-2">{{
            category
          }}</q-item-section>
        </template>
        <q-card class="flex flex-wrap py-2">
          <div v-for="card in cards" class="relative m-1">
            <ICAsset
              class="card-image cursor-pointer"
              size="none"
              :enabled="getCardTier(card) !== 0"
              :image="Assets.CardImage(card.id)"
              :title="getCardText(card, getCardTier(card))"
              @click="handleCardClick(card.id, +1)"
              @contextmenu.prevent="handleCardClick(card.id, -1)"
            >
              <template #tooltip>
                <div
                  class="text-center"
                  v-html="getCardText(card, getCardTier(card))"
                ></div>
              </template>
            </ICAsset>
            <ICAsset
              v-if="getCardTier(card) > 1"
              class="card-border"
              size="none"
              :image="Assets.CardBorderImage(getCardTier(card) - 1)"
            />
          </div>
        </q-card>
      </q-expansion-item>
    </div>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { Assets } from "~/composables/Utilities";
import { Card, Cards, useCards } from "~/composables/Cards";
import { useState } from "~/State";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "CardTracker",
  components: {
    ICAsset,
  },
  setup() {
    const state = useState();
    const { getCardText } = useCards();

    const cards = computed({
      get: () => state.value.cards,
      set: (value) => (state.value.cards = value),
    });
    const CARD_TIERS = 5;

    const getCardTier = (card: Card): number => {
      return cards.value[card.id] ?? 0;
    };

    const getCardProgress = (cards: Card[]) => {
      let unlocked = 0;
      for (const card of cards) {
        unlocked += getCardTier(card);
      }
      return {
        unlocked,
        total: cards.length * (CARD_TIERS - 1),
      };
    };

    // Input handlers
    const handleCardClick = (id: string, amount: number) => {
      let cardTier = (state.value.cards[id] + amount) % CARD_TIERS;
      if (cardTier < 0) {
        cardTier = CARD_TIERS - 1;
      }
      state.value.cards[id] = cardTier;
    };

    return {
      allCards: Cards,
      Assets,
      cards,
      getCardProgress,
      getCardText,
      getCardTier,
      handleCardClick,
    };
  },
});
</script>

<style scoped lang="sass">
.card-image
  display: block
  height: 72px
  width: 56px
.card-border
  bottom: -18px
  height: 90px
  width: 56px
  position: absolute
  pointer-events: none
</style>
