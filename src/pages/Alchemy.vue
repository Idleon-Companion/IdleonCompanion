<template>
  <q-banner inline-actions>
    Track your alchemy bubble upgrades and see the costs/bonuses of those
    upgrades, and your progress with unlocking/upgrading alchemy vials.
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
    <q-tabs v-model="tab" inline-label>
      <q-tab v-for="tab in tabs" :name="tab" :label="tab" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="Bubbles">
        <AlchemyBubbles />
      </q-tab-panel>
      <q-tab-panel name="Vials">
        <AlchemyVials />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import AlchemyBubbles from "~/components/alchemy/AlchemyBubbles.vue";
import AlchemyVials from "~/components/alchemy/AlchemyVials.vue";

const wikiLinks = new Map([
  ["Alchemy", "https://idleon.miraheze.org/wiki/Alchemy"],
]);

export default defineComponent({
  name: "Alchemy",
  components: {
    AlchemyBubbles,
    AlchemyVials,
  },
  setup() {
    const tab = ref("Bubbles");
    const tabs = ["Bubbles", "Vials"];
    return {
      tab,
      tabs,
      wikiLinks,
    };
  },
});
</script>
