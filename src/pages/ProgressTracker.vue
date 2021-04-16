<template>
  <div class="col progress-tracker">
    <div
      v-for="(data, category) in globalChecklist"
      :key="category"
      class="progress-group"
    >
      <div class="progress-category text-light col-12 col-md-6 my-3">
        {{ category }}
      </div>
      <div class="progress-items">
        <div v-for="(item, i) in data.items" :key="i">
          <div class="progress-item">
            <GameAsset
              class="m-1"
              :height="64"
              :title="item.name"
              :image="getItemImagePath(item.name, data.assetDir)"
              :data-enabled="checklist[item.name]"
              @click="handleProgressCheck(item.name)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-for="(category, j) in CardCategory" :key="j" class="progress-group">
      <div class="progress-category text-light col-12 col-md-6 my-3">
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
              :data-enabled="cards[card.id] !== 0"
              @click="handleCardClick(card.id)"
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
import { computed, defineComponent, inject, ref } from "vue";
import checklistData from "../data/checklist.json";
import { StateManager } from "../State";

import GameAsset from "../components/GameAsset.vue";
import { Assets } from "../composables/Utilities";
import { Card, CardCategory, Cards } from "../composables/Cards";

export default defineComponent({
  name: "ProgressTracker",
  components: {
    GameAsset,
  },
  setup() {
    const checklist = ref({} as Record<string, boolean>);
    const state = inject("state") as StateManager;
    var saved = JSON.parse(state.load("checklist"));

    const globalChecklist = computed(() => {
      // Non-global items are managed on the characters page
      return Object.entries(checklistData)
        .filter(([_, value]) => value.global)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {} as Record<string, any>);
    });

    for (const data of Object.values(globalChecklist.value)) {
      for (const item of data.items) {
        if (saved !== null && saved[item.name]) {
          checklist.value[item.name] = true;
        } else {
          checklist.value[item.name] = false;
        }
      }
    }

    const cards = ref({} as Record<string, number>);
    const cardData = ref({} as Record<string, Card[]>);
    saved = JSON.parse(state.load("cards"));
    for (const card of Cards) {
      // Group by category for template
      if (card.category in cardData.value) {
        cardData.value[card.category].push(card);
      } else {
        cardData.value[card.category] = [card];
      }
      // Load from local state
      if (saved !== null && saved[card.id]) {
        cards.value[card.id] = saved[card.id];
      } else {
        cards.value[card.id] = 0;
      }
    }

    // Input handlers
    const CARD_TIERS = 5;
    const handleCardClick = (id: string) => {
      cards.value[id] = (cards.value[id] + 1) % CARD_TIERS;
      state.save("cards", JSON.stringify(cards.value));
    };
    const handleProgressCheck = (item: string) => {
      checklist.value[item] = !checklist.value[item];
      state.save("checklist", JSON.stringify(checklist.value));
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
    getItemImagePath(item: string, dir: string): string {
      let cleaned = item.replace(/ /g, "_");
      return `assets/${dir}/${cleaned}.png`;
    },
  },
});
</script>

<style lang="sass" scoped>
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
