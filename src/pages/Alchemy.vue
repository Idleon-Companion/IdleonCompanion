<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress for bubbles and vials, and see costs/bonuses
        for vials.
      </p>
    </div>
  </div>
  <div class="d-flex flex-column alchemy-wrapper mt-3">
    <div class="h2 text-light">Alchemy Upgrades</div>
    <div class="d-flex flex-wrap justify-content-center">
      <div v-for="(color, i) in colors" :key="i" class="alchemy-upgrades">
        <div v-for="n in upgradeCount" :key="color + n" class="d-flex mt-1">
          <GameAsset
            class="mx-1"
            :image="Assets.FromDir(color + n, 'alchemy')"
            :height="64"
          />
          <input
            class="col-4"
            v-model.number="alchemy.upgrades[color][n - 1]"
            type="number"
            :min="0"
          />
        </div>
      </div>
    </div>
    <div class="h2 text-light my-3">Alchemy Vials</div>
    <div class="d-flex flex-wrap">
      <div
        v-for="vial in Vials"
        :key="vial.name"
        class="vial-wrapper m-1"
        @click="handleVialClick(vial.name, +1)"
        @contextmenu.prevent="handleVialClick(vial.name, -1)"
      >
        <GameAsset
          class="vial-bottle"
          :image="
            Assets.FromDir('Vials' + (alchemy.vials[vial.name] + 1), 'alchemy')
          "
          :title="vial.name"
          :height="96"
        >
          <template #tooltip>
            <div
              class="text-center"
              v-html="vialText(vial, alchemy.vials[vial.name])"
            ></div>
          </template>
        </GameAsset>
        <GameAsset
          class="vial-material"
          :image="Assets.FromDir(vial.material, 'materials')"
          :height="48"
          :data-enabled="alchemy.vials[vial.name] !== 0"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";
import { Color, Vial, Vials, VialCost } from "~/composables/Alchemy";
import { useState } from "~/State";

export default defineComponent({
  name: "Alchemy",
  components: {
    GameAsset,
  },
  setup() {
    const colors: Color[] = ["Orange", "Green", "Purple", "Yellow"];
    const upgradeCount = 10;

    const state = useState();
    const alchemy = ref(state.value.alchemy);
    for (const c of colors) {
      for (
        let i = 0;
        i < upgradeCount - alchemy.value.upgrades[c].length;
        i += 1
      ) {
        alchemy.value.upgrades[c].push(0);
      }
    }
    for (const v of Vials) {
      if (!(v.name in alchemy.value.vials)) {
        alchemy.value.vials[v.name] = 0;
      }
    }

    // Input handlers
    const VIAL_TIERS = 10;
    const handleVialClick = (name: string, step: number) => {
      let tier = (alchemy.value.vials[name] + step) % VIAL_TIERS;
      if (tier < 0) {
        tier = VIAL_TIERS - 1;
      }
      alchemy.value.vials[name] = tier;
    };

    return {
      alchemy,
      Assets,
      colors,
      handleVialClick,
      upgradeCount,
      Vials,
    };
  },
  methods: {
    vialText(vial: Vial, level: number): string {
      let cost = VialCost[level];
      let costText = `${cost} ${vial.material.replace(/_/g, " ")} + ${
        3 * level
      } Water Droplets to next level`;
      let effect = vial.effect || "???";
      if (!effect.startsWith("%")) {
        effect = " " + effect;
      }
      return `${vial.name}<br><em>${vial.base < 0 ? "" : "+"}${
        vial.base * level
      }${effect}<br>${costText}</em>`;
    },
  },
});
</script>

<style lang="sass" scoped>
.vial-wrapper
  position: relative
  width: 72px
  top: 0.5rem
  height: 96px
  .vial-material
    height: auto
    pointer-events: none
    position: absolute
  .vial-bottle
    cursor: pointer
    bottom: 22px
    left: -14px
    position: absolute
</style>
