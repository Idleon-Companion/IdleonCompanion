<template>
  <div class="flex">
    <template v-for="(value, i) in splitCoinsFromValue(value)">
      <div v-if="value" class="flex items-center">
        <ICAsset size="xxs" :image="Assets.MiscImage(keys[i] + '_coin')" />
        <div class="mx-1">{{ value }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Assets, useMoney } from "~/composables/Utilities";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

enum CoinKeys {
  dem,
  plat,
  gold,
  silver,
  bronze,
}

export default defineComponent({
  name: "CoinDisplay",
  components: {
    ICAsset,
  },
  props: {
    value: {
      required: true,
      type: Number,
    },
  },
  setup() {
    const { splitCoinsFromValue } = useMoney();
    return {
      Assets,
      keys: CoinKeys,
      splitCoinsFromValue,
    };
  },
});
</script>
