<template>
  <div class="container pt-3">
    <div class="row justify-content-between align-items-center">
      <div class="col-auto align-items-center">
        <div id="logo" class="display-4 text-light">Idleon Companion</div>
      </div>
      <div class="col-md-4 col-12">
        <CharacterSelector />
      </div>
    </div>
    <!-- Nav -->
    <ul class="nav nav-tabs nav-dark" role="tablist">
      <li v-for="tab in Object.keys(tabs)" :key="tab" class="nav-item">
        <button
          class="nav-link text-light"
          data-bs-toggle="tab"
          :data-bs-target="'#' + tab"
          type="button"
          role="tab"
          aria-controls="profile"
          :aria-selected="tab === 'Tasks'"
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
          active: tab === 'Tasks',
          show: tab === 'Tasks',
          jumbotron: tab !== 'Tasks',
        }"
        :id="tab"
      >
        <component :is="tab.replace(/_/g, '')"></component>
      </div>
    </div>
  </div>
  <div class="footer m-5"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CharacterSelector from "~/components/CharacterSelector.vue";
import Alchemy from "~/pages/Alchemy.vue";
import Builds from "~/pages/Builds.vue";
import Cards from "~/pages/Cards.vue";
import Characters from "~/pages/Characters.vue";
import Credits from "~/pages/Credits.vue";
import PackMuleCrafter from "~/pages/PackMuleCrafter.vue";
import PicnicQuest from "~/pages/PicnicQuest.vue";
import ProgressTracker from "~/pages/ProgressTracker.vue";
import Statues from "~/pages/Statues.vue";
import Tasks from "~/pages/Tasks.vue";
import Stamps from "~/pages/Stamps.vue";

export default defineComponent({
  name: "Home",
  components: {
    Alchemy,
    Builds,
    Cards,
    Characters,
    CharacterSelector,
    Credits,
    PackMuleCrafter,
    PicnicQuest,
    ProgressTracker,
    Statues,
    Tasks,
    Stamps,
  },
  setup() {
    const tabs = {
      Characters: Characters,
      Tasks: Tasks,
      Progress_Tracker: ProgressTracker,
      Picnic_Quest: PicnicQuest,
      Stamps: Stamps,
      Statues: Statues,
      Alchemy: Alchemy,
      Pack_Mule_Crafter: PackMuleCrafter,
      Builds: Builds,
      Cards: Cards,
      Credits: Credits,
    };
    return {
      tabs,
    };
  },
});
</script>
