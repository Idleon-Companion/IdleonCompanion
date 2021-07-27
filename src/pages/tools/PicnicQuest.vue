<template>
  <q-banner inline-actions>
    Use this tool to calculate material costs for the Pinic Stowaway's King of
    Food Trophy. Adjust the number of quest repeats using the slider.
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
  <q-card class="m-4 p-2">
    <q-card-section>
      <q-slider
        v-model="repeat"
        :min="1"
        :max="30"
        color="green"
        label-always
      />
    </q-card-section>
    <div class="flex flex-wrap justify-center">
      <div v-for="(req, i) in picnicRequirements" :key="i" class="quest-item">
        <ICAsset
          size="xl"
          :image="Assets.MaterialImage(req.name.replace(/ /g, '_'))"
          :title="req.name"
        >
          <template #tooltip>
            <div v-html="req.name"></div>
          </template>
        </ICAsset>
        <div class="quest-amount">{{ req.amount * repeat }}</div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { Assets } from "~/composables/Utilities";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

const picnicRequirements = [
  {
    amount: 200,
    name: "Frog Leg",
  },
  {
    amount: 100,
    name: "Bean Slices",
  },
  {
    amount: 100,
    name: "Peanut",
  },
  {
    amount: 1500,
    name: "Bleach Logs",
  },
  {
    amount: 50,
    name: "Grass Leaf",
  },
  {
    amount: 200,
    name: "Crude Oil",
  },
  {
    amount: 100,
    name: "Iron Bar",
  },
  {
    amount: 1,
    name: "Sculpting Tools",
  },
  {
    amount: 1,
    name: "Iron Helmet",
  },
  {
    amount: 500,
    name: "Kebab Sticks",
  },
  {
    amount: 1,
    name: "Magic Meatloaf",
  },
  {
    amount: 2,
    name: "Nuget Cake",
  },
  {
    amount: 2,
    name: "Midnight Cookie",
  },
];

const wikiLinks = new Map([
  ["Picnic Stowaway", "https://idleon.miraheze.org/wiki/Picnic_Stowaway"],
]);

export default defineComponent({
  name: "Picnic Quest",
  components: {
    ICAsset,
  },
  setup() {
    const repeat = ref(1);
    return {
      Assets,
      picnicRequirements,
      repeat,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../../styles/base.sass'
.quest-item
  border: 1px solid $primary
  background: darken($primary, 10%)
  border-radius: 0.25rem
  display: flex
  margin: 0.25rem
  flex-direction: column
  align-items: center
  padding: 0.2rem
.quest-amount
  font-size: 1.05rem
  font-weight: 500
  color: $secondary
</style>
