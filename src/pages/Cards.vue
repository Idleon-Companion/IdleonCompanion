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
  <q-card class="m-4">
    <q-card-section>
      <div class="text-2xl">Card Sets</div>
    </q-card-section>
    <q-markup-table>
      <thead class="text-right">
        <tr>
          <th><div class="text-lg">Goal</div></th>
          <th><div class="text-lg">Core</div></th>
          <th><div class="text-lg">Secondary</div></th>
          <th><div class="text-lg">Extra</div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cardset in cardData" class="text-right">
          <td>{{ cardset.title }}</td>
          <td>
            <ICAsset
              v-for="(card, index) in cardset.core"
              size="none"
              :key="index"
              :image="Assets.CardImage(card)"
              :title="card.replace(/_/g, ' ')"
              class="card-image"
            >
              <template #tooltip>
                {{ card.replace(/_/g, " ") }}
              </template>
            </ICAsset>
          </td>
          <td>
            <ICAsset
              v-for="(card, index) in cardset.useful"
              size="none"
              :key="index"
              :image="Assets.CardImage(card)"
              :title="card.replace(/_/g, ' ')"
              class="card-image"
            >
              <template #tooltip>
                {{ card.replace(/_/g, " ") }}
              </template>
            </ICAsset>
          </td>
          <td>
            <ICAsset
              v-for="(card, index) in cardset.minimal"
              size="none"
              :key="index"
              :image="Assets.CardImage(card)"
              :title="card.replace(/_/g, ' ')"
              class="card-image"
            >
              <template #tooltip>
                {{ card.replace(/_/g, " ") }}
              </template>
            </ICAsset>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-card>
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
.card-image
  display: inline-block
  height: 64px
  width: 48px
</style>
