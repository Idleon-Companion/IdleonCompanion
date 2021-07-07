<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your account progress! Here you can check all of the global
        collectibles in game. Click on a cards to cycle through rarity levels.
        <br>
        For details on drops, please refer to the <a target="_blank" href="https://idleon.info/wiki/Category:Droptables">wiki page about drop tables</a>
      </p>
    </div>
  </div>
  <div class="col progress-tracker">
    <div
      v-for="(data, category) in globalChecklist"
      :key="category"
      class="progress-group"
    >
      <div class="progress-category text-light col-12 col-md-6 my-1">
        {{ category }}
      </div>
      <div class="progress-items">
        <div v-for="(item, i) in data.items" :key="i">
          <div class="progress-item">
            <GameAsset
              class="mx-1"
              :height="64"
              :title="item.name"
              :image="Assets.FromDir(item.name, data.assetDir)"
              :enabled="checklist[item.name]"
              @click="handleProgressCheck(item.name)"
            >
              <template #tooltip>
                <div class="text-center" v-html="Text.Item(item)"></div>
              </template>
            </GameAsset>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(category, j) in CardCategory" :key="j" class="progress-group">
      <div class="progress-category text-light col-md-6 my-3">
        {{ category }} Cards
      </div>
      <div class="progress-items">
        <div v-for="(card, i) in cardData[category]" :key="i">
          <div class="progress-item card-wrapper m-1">
            <GameAsset
              class="card-image"
              :height="72"
              :title="cardText(card)"
              :image="Assets.CardImage(card.id)"
              :enabled="cards[card.id] !== 0"
              @click="handleCardClick(card.id, +1)"
              @contextmenu.prevent="handleCardClick(card.id, -1)"
            >
              <template #tooltip>
                <div class="text-center" v-html="cardText(card)"></div>
              </template>
            </GameAsset>
            <GameAsset
              v-if="cards[card.id] > 1"
              class="card-border"
              :height="100"
              :image="Assets.CardBorderImage(cards[card.id] - 1)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { checklistData } from "~/composables/Checklist";

import GameAsset from "~/components/GameAsset.vue";
import { Card, CardCategory, Cards } from "~/composables/Cards";
import { Assets, ItemGroup, Text } from "~/composables/Utilities";
import { useState } from "~/State";

export default defineComponent({
  name: "ProgressTracker",
  components: {
    GameAsset,
  },
  setup() {
    const globalChecklist = computed(() => {
      // Non-global items are managed on the characters page
      return Object.entries(checklistData)
        .filter(([_, value]) => value.global)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {} as Record<string, ItemGroup>);
    });

    const state = useState();
    const checklist = computed({
      get: () => state.value.checklist,
      set: (value) => (state.value.checklist = value),
    });
    for (const data of Object.values(globalChecklist.value)) {
      for (const item of data.items) {
        if (checklist.value[item.name]) {
          checklist.value[item.name] = true;
        } else {
          checklist.value[item.name] = false;
        }
      }
    }

    const cards = computed({
      get: () => state.value.cards,
      set: (value) => (state.value.cards = value),
    });
    const cardData = ref({} as Record<string, Card[]>);
    for (const card of Cards) {
      // Group by category for template
      if (card.category in cardData.value) {
        cardData.value[card.category].push(card);
      } else {
        cardData.value[card.category] = [card];
      }
      // Load from local state
      if (!(card.id in state.value.cards)) {
        state.value.cards[card.id] = 0;
      }
    }

    // Input handlers
    const CARD_TIERS = 5;
    const handleCardClick = (id: string, amount: number) => {
      let cardTier = (state.value.cards[id] + amount) % CARD_TIERS;
      if (cardTier < 0) {
        cardTier = CARD_TIERS - 1;
      }
      state.value.cards[id] = cardTier;
    };
    const handleProgressCheck = (item: string) => {
      checklist.value[item] = !checklist.value[item];
    };

    return {
      Assets,
      CardCategory,
      cardData,
      cards,
      checklist,
      globalChecklist,
      handleCardClick,
      handleProgressCheck,
      Text,
    };
  },
  methods: {
    cardText(card: Card): string {
      let name = card.id.replace(/_/g, " ");
      let bonus = this.cards[card.id] * card.base;
      let text = `${name}<br>+${bonus} ${card.effect}`;
      if (card.source) {
        text += `<br><em>Source: ${card.source}</em>`;
      }
      return text;
    },
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
a
  color: lighten($info, 10%)
  font-weight: bold
  transition: 0.3s
  &:hover
    color: darken($info, 10%)
.card-wrapper
  position: relative
  width: 62px
  .card-image
    display: block
    margin-left: 3px
    height: auto
  .card-border
    bottom: -24px
    position: absolute
    pointer-events: none
</style>
