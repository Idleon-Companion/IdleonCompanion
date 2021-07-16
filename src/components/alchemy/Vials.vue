<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress of the vials and see the costs/bonuses of those upgrades.
      </p>
    </div>
  </div>
  <div class="h2 text-light my-3">Alchemy Vials</div>
  <div class="d-flex flex-wrap">
    <div class="vial-wrapper m-1"
      v-for="vial in Vials" :key="vial.name" 
      @click="handleVialClick(vial.name, +1)"
      @contextmenu.prevent="handleVialClick(vial.name, -1)">
      <GameAsset class="vial-bottle"
        :image="Assets.FromDir('Vials' + (alchemy.vials[vial.name] + 1), 'alchemy')"
        :title="vial.name" :height="96">
        <template #tooltip>
          <div class="text-center" v-html="vialText(vial, alchemy.vials[vial.name])"></div>
        </template>
      </GameAsset>
      <GameAsset class="vial-material"
        :image="Assets.FromDir(vial.material, 'materials')"
        :height="48"
        :data-enabled="alchemy.vials[vial.name] !== 0" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useState } from "~/State";

  import GameAsset from "~/components/GameAsset.vue";
  import { Vial, Vials, VialCost } from "~/composables/Alchemy";
  import { Assets } from "~/composables/Utilities";

  export default defineComponent({
    name: "Vials",
    components: {
      GameAsset,
    },
    setup() {
      const upgradeCount = 10;

      const state = useState();
      const alchemy = state.value.alchemy;
      for (const v of Vials) {
        if (!(v.name in alchemy.vials)) {
          alchemy.vials[v.name] = 0;
        }
      }

      // Input handlers
      const VIAL_TIERS = 10;
      const handleVialClick = (name: string, step: number) => {
        let tier = (alchemy.vials[name] + step) % VIAL_TIERS;
        if (tier < 0) {
          tier = VIAL_TIERS - 1;
        }
        alchemy.vials[name] = tier;
      };

      return {
        Assets,
        handleVialClick,
        upgradeCount,
        alchemy,
        Vials,
      };
    },
    methods: {
      vialText(vial: Vial, level: number): string {
        let costText, next, name;
        let cost = VialCost[level];
        let effect = vial.effect || "???";
        if (!effect.startsWith("%")) {
          effect = " " + effect;
        }
        let current = `${vial.base < 0 ? "" : "+"}${vial.base * level}`;

        // Change the tooltip text according to the level of the vial
        if (level + 1 < this.upgradeCount) {
          costText = `${cost} ${vial.material.replace(/_/g, " ")} + ${3 * level} Water Droplets to next level`;
          next = ` → ${Math.abs(vial.base * (level + 1))}`;
          name = vial.name;
          if (level === 0) {
            costText = `Drop at cauldron and roll ${vial.roll}+`;
          }
        } else { // Max level
          costText = "";
          next = "";
          name = `${vial.name} (Max level)`;
        }
        return `${name}<br><em>${current}${next}${effect} <br> ${costText}`;
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