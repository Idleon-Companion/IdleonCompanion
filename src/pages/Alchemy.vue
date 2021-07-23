<template>
  <!-- <ul class="nav nav-pills nav-fill mt-3" role="tablist">
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
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Cauldrons from "~/components/alchemy/Cauldrons.vue";
// import Vials from "~/components/alchemy/Vials.vue";

export default defineComponent({
  name: "Alchemy",
  components: {
    // Cauldrons,
    // Vials,
  },
  setup() {
    const tabs = {
      // Cauldrons: Cauldrons,
      // Vials: Vials,
    };
    const defaultTab = "Cauldrons";
    return {
      defaultTab,
      tabs,
    };
  },
});
</script>
