<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress for bubbles and vials, and see costs/bonuses
        for vials. This got updated. 
      </p>
    </div>
  </div>
  <ul class="nav nav-pills nav-fill mt-3" role="tablist">
    <li v-for="tab in colors" :key="tab" class="nav-item">
      <button
        class="nav-link text-light"
        data-bs-toggle="tab"
        :data-bs-target="'#' + tab"
        type="button"
        role="tab"
        aria-controls="profile"
        :aria-selected="tab === Orange"
        :style="{background: tab}"
        v-on:click="setGroup(tab)"
      >
        {{ tab.replace(/_/g, " ") }}
      </button>
    </li>
  </ul>


  <div class="d-flex flex-column alchemy-wrapper mt-3">
    <div class="h2 text-light">Alchemy Upgrades</div>
    <AlchemyRow :group="activeGroup"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import GameAsset from "~/components/GameAsset.vue";
import AlchemyRow from "~/components/AlchemyRow.vue";
import { Assets } from "~/composables/Utilities";
import { Color, Vial, Vials, VialCost } from "~/composables/Alchemy";


export default defineComponent({
  name: "Alchemy",
  components: {
    GameAsset,
    AlchemyRow,
  },
  setup() {
    const colors: Color[] = ["Orange", "Green", "Purple", "Yellow"];
    const activeGroup = ref("Orange"); 

    return {      
      Assets,
      colors,
      activeGroup,
      Vials,
    };
  },
  methods: {
    setGroup(tab: string) {
      this.activeGroup = tab;
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
