<template>
  <div class="flex items-center">
    <div class="text-xl">Vials</div>
    <q-toggle v-model="showMissingVialMaterials" label="Show Missing Vials" />
  </div>
  <div class="text-secondary">
    Use left/right click to cycle between vial tiers.
  </div>
  <q-card bordered flat class="flex flex-wrap p-2">
    <div
      class="vial-wrapper mx-1"
      v-for="vial in Vials"
      :key="vial.name"
      @click="onVialClick(vial.name, +1)"
      @contextmenu.prevent="onVialClick(vial.name, -1)"
    >
      <ICAsset
        class="vial-bottle"
        :image="
          Assets.FromDir('Vials' + (alchemy.vials[vial.name] + 1), 'alchemy')
        "
        :title="vial.name"
        size="none"
      >
        <template #tooltip>
          <div
            class="text-center"
            v-html="getVialText(vial, alchemy.vials[vial.name])"
          ></div>
        </template>
      </ICAsset>
      <ICAsset
        class="vial-material"
        :image="getVialMaterialImage(vial)"
        :enabled="alchemy.vials[vial.name] !== 0"
        size="medium"
      />
    </div>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";

import { AlchemyConst, Vial, VialCost, Vials } from "~/composables/Alchemy";
import { Assets } from "~/composables/Utilities";
import { useState } from "~/State";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "Vials",
  components: {
    ICAsset,
  },
  setup() {
    const state = useState();
    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });
    const showMissingVialMaterials = ref(false);

    onBeforeMount(() => {
      // Populate empty vial data
      for (const v of Vials) {
        if (!(v.name in alchemy.value.vials)) {
          alchemy.value.vials[v.name] = 0;
        }
      }
    });

    const getVialMaterialImage = (vial: Vial): string => {
      if (!alchemy.value.vials[vial.name] && !showMissingVialMaterials.value) {
        return Assets.FromDir("VialMissing", "alchemy");
      }
      return Assets.FromDir(vial.material, "materials");
    };

    const getVialText = (vial: Vial, level: number): string => {
      let costText, next, name;
      let cost = VialCost[level];
      let effect = vial.effect || "???";
      if (!effect.startsWith("%")) {
        effect = " " + effect;
      }
      const round = (n: number) => Math.round(Math.abs(n) * 100) / 100;
      let current = `${vial.base < 0 ? "-" : "+"}${round(vial.base * level)}`;

      // Change the tooltip text according to the level of the vial
      if (level + 1 < AlchemyConst.VialTiers) {
        costText = `${cost} ${vial.material.replace(/_/g, " ")} + ${
          3 * level
        } Water Droplets to next level`;
        next = ` → ${round(vial.base * (level + 1))}`;
        name = vial.name;
        if (level === 0) {
          costText = `Roll: ${vial.roll}+`;
        }
      } else {
        // Max level
        costText = "";
        next = "";
        name = `${vial.name} (Max level)`;
      }
      return `${name}<br><em>${current}${next}${effect} <br> ${costText}`;
    };

    // Input handlers
    const onVialClick = (name: string, step: number) => {
      let tier = (alchemy.value.vials[name] + step) % AlchemyConst.VialTiers;
      if (tier < 0) {
        tier = AlchemyConst.VialTiers - 1;
      }
      alchemy.value.vials[name] = tier;
    };

    return {
      alchemy,
      Assets,
      getVialMaterialImage,
      getVialText,
      onVialClick,
      showMissingVialMaterials,
      Vials,
    };
  },
});
</script>

<style lang="sass" scoped>
.vial-wrapper
  position: relative
  width: 104px
  height: 120px
  .vial-material
    pointer-events: none
    position: absolute
    left: 24px
    bottom: 40px
  .vial-bottle
    cursor: pointer
    position: absolute
    width: 104px
</style>
