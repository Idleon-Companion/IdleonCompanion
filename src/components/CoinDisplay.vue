<template>
  <span class="d-flex">
    <template v-for="(value, key) in splitValues(Number(value))" :key="key">
      <template v-if="value">
        <img
          :src="Assets.MiscImage(key + '_coin')"
          class="img-fuid h-100 align-self-center mx-1"
        />
        {{ value }}
      </template>
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Assets } from "../composables/Utilities";

type Coin = {
  bronze: number;
  silver: number;
  gold: number;
  plat: number;
  dem: number;
};

export default defineComponent({
  name: "CoinDisplay",
  props: {
    value: {
      required: true,
      type: Number,
    },
  },
  setup() {
    return {
      Assets,
    };
  },
  methods: {
    splitValues(value: number): Coin {
      let v = value;
      let a = [];
      let n = 5; // number of distinct coin types
      while (n--) {
        let c = Math.pow(100, n);
        a.push(Math.floor(v / c));
        v %= c;
      }

      return {
        dem: a[0],
        plat: a[1],
        gold: a[2],
        silver: a[3],
        bronze: a[4],
      };
    },
  },
});
</script>
