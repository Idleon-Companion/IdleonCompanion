<template>
  <div>Welcome to Idleon Companion!</div>
</template>

<script lang="ts">
/* <div class="container pt-3">
    <div class="row justify-content-between align-items-center mb-3">
      <div class="col-auto align-items-center d-flex">
        <img id="logo" src="/logo.png" />
        <div id="logo-text" class="ms-2 display-4 text-light">
          Idleon Companion
        </div>
      </div>
      <div class="col-md-4 col-12">
        <CharacterSelector />
      </div>
    </div>
    <!-- Nav -->
    <ul class="nav nav-tabs nav-dark mt-3" role="tablist">
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

    <div id="nav-tabContent" class="tab-content">
      <div
        v-for="(component, tab) in tabs"
        :key="tab"
        :class="{
          'tab-pane': true,
          fade: true,
          active: tab === defaultTab,
          show: tab === defaultTab,
          //jumbotron: tab !== defaultTab,
        }"
        :id="tab"
      >
        <component :is="tab.replace(/_/g, '')"></component>
      </div>
    </div>
  </div>
  <div class="footer m-5"></div> */

import { defineComponent } from "vue";

import CharacterSelector from "~/components/CharacterSelector.vue";
import Alchemy from "~/pages/Alchemy.vue";
import Builds from "~/pages/Builds.vue";
import Cards from "~/pages/Cards.vue";
import Characters from "~/pages/Characters.vue";
import Credits from "~/pages/Credits.vue";
import ProgressTracker from "~/pages/ProgressTracker.vue";
import Tasks from "~/pages/Tasks.vue";
import Calculators from "~/pages/Calculators.vue";

export default defineComponent({
  name: "Home",
  components: {
    Alchemy,
    Builds,
    Cards,
    Characters,
    CharacterSelector,
    Credits,
    ProgressTracker,
    Tasks,
    Calculators,
  },
  setup() {
    const tabs = {
      Characters: Characters,
      Tasks: Tasks,
      Progress_Tracker: ProgressTracker,
      Alchemy: Alchemy,
      Builds: Builds,
      Cards: Cards,
      Calculators: Calculators,
      Credits: Credits,
    };
    const defaultTab = "Characters";
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
