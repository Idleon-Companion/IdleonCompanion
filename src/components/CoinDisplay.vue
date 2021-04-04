<template>
  <span class="d-flex">
    <template v-for="(value, key) in splitValues(value)" :key="key">
      <img 
        v-if="(value != '')" 
        :src="getCoinImagePath(key)" 
        class="img-fuid h-100 align-self-center mx-1" 
      />
      {{ value }}
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Coin = {
  bronze: string;
  silver: string;
  gold: string;
  plat: string;
  dem: string;
};

export default defineComponent({
  name: "CoinDisplay",
  props: {
    value: {
      required: true,
      type: String,
    },
  },
  methods: {
    splitValues(value: string): Coin {
      let coins = {
        dem: "",
        plat: "",
        gold: "",
        silver: "",
        bronze: "",
      };

      coins["bronze"] = value.slice(-2);
      value = value.slice(0, -2);
      coins["silver"] = value.slice(-2);
      value = value.slice(0, -2);
      coins["gold"] = value.slice(-2);
      value = value.slice(0, -2);
      coins["plat"] = value.slice(-2);
      value = value.slice(0, -2);
      coins["dem"] = value.slice(-2);
      value = value.slice(0, -2);

      return coins;
    },
    getCoinImagePath(name: string): string {
      return `assets/misc/${name}_coin.png`;
    },
  },
});
</script>
