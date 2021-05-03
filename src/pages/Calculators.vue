<template>
<div class="tabbable">
    <ul class="nav nav-pills nav-fill mt-3" role="tablist">
      <li v-for="tab in Object.keys(tabs)" :key="tab" class="nav-item">
        <button
          class="nav-link text-light"
          data-bs-toggle="tab"
          :data-bs-target="'#' + tab"
          type="button"
          role="tab"
          aria-controls="profile"
          :aria-selected="tab === defaultTab"
        >
          {{ tab.replace(/_/g, " ") }}
        </button>
      </li>
    </ul>

    <div id="nav-tabContent-calcs" class="tab-content">
      <div
        v-for="(component, tab) in tabs"
        :key="tab"
        :class="{
          'tab-pane': true,
          fade: true,
          active: tab === defaultTab,
          show: tab === defaultTab,
          jumbotron: true,
        }"
        :id="tab"
      >
        <component :is="tab.replace(/_/g, '')"></component>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PackMuleCrafter from "~/pages/PackMuleCrafter.vue";
import PicnicQuest from "~/pages/PicnicQuest.vue";
import Stamps from "~/pages/Stamps.vue";

export default defineComponent({
  name: "Calculators",
  components: {
    PackMuleCrafter,
    PicnicQuest,
    Stamps,
  },
  setup() {
    const tabs = {
      Picnic_Quest: PicnicQuest,
      Stamps: Stamps,
      Pack_Mule_Crafter: PackMuleCrafter,
    };
    const defaultTab = "Picnic_Quest";
    return {
      defaultTab,
      tabs,
    };
  },
});
</script>

<style lang="sass" scoped>
#logo
    cursor: pointer
    object-fit: contain
</style>
