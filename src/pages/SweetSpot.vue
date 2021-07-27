<template>
  <q-banner inline-actions>
    Sweet Spot description...
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
    <q-card-section>Sweet Spot</q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const wikiLinks = new Map([["Example", "https://idleoncompanion.com"]]);

export default defineComponent({
  name: "SweetSpot",
  setup() {
    return {
      wikiLinks,
    };
  },
});
</script>

<style scoped lang="sass"></style>
