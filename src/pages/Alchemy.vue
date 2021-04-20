<template>
  <div class="d-flex flex-column alchemy-wrapper">
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
            v-model="alchemy.upgrades[color][n - 1]"
            type="number"
            :min="0"
          />
        </div>
      </div>
    </div>
    <div class="h2 text-light">Alchemy Vials</div>
    <div class="d-flex flex-wrap">
      <div v-for="vial in Vials" :key="vial.name" class="vial-wrapper m-1">
        <div class="vial-material">
          <GameAsset
            :image="Assets.FromDir(vial.material, 'materials')"
            :height="64"
            :title="vial.name"
            :data-enabled="alchemy.vials[vial.name] !== 0"
          >
            <template #tooltip>
              <div
                class="text-center"
                v-html="vialText(vial, alchemy.vials[vial.name])"
              ></div>
            </template>
          </GameAsset>
        </div>
        <GameAsset
          class="vial-bottle"
          :image="
            Assets.FromDir('Vials' + (alchemy.vials[vial.name] + 1), 'alchemy')
          "
          :height="96"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { StateManager } from "../State";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "../composables/Utilities";
import { Color, Vial, Vials, VialCost } from "../composables/Alchemy";

type AlchemyData = {
  vials: Record<string, number>;
  upgrades: Record<Color, number[]>;
};

export default defineComponent({
  name: "Alchemy",
  components: {
    GameAsset,
  },
  setup() {
    const state = inject("state") as StateManager;

    const colors = ["Orange", "Green", "Purple", "Yellow"];
    const upgradeCount = 10;

    const alchemy = reactive({
      upgrades: {},
      vials: {},
    } as AlchemyData);

    for (const c of colors) {
      let upgrades = Array<number>();
      for (let i = 0; i < upgradeCount; i += 1) {
        upgrades.push(0);
      }
      alchemy.upgrades[c as Color] = upgrades;
    }
    for (const v of Vials) {
      alchemy.vials[v.name || ""] = 3;
    }

    // Input handlers
    const VIAL_TIERS = 10;
    const handleVialClick = (name: string) => {
      alchemy.vials[name] = (alchemy.vials[name] + 1) % VIAL_TIERS;
      state.save("alchemy", JSON.stringify(alchemy));
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
      let costText = `${cost} ${vial.material.replace(
        /_/g,
        " "
      )} to next level`;
      return `${vial.name}<br><em>+${vial.base * level} ${
        vial.effect
      }<br>${costText}</em>`;
    },
  },
});
</script>

<style lang="sass" scoped>
.vial-wrapper
  position: relative
  width: 62px
  height: 100px
  .vial-material
    margin-left: 3px
    height: auto
    position: absolute
  .vial-bottle
    z-index: 0
    position: absolute
    pointer-events: none
</style>
