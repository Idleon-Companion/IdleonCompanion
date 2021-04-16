<template>
  <div class="row pl-3 mb-4">
    <div class="input-group">
      <select v-model="build" id="buildSelector">
        <option value="" selected>Select Your Build</option>
        <option
          v-for="(build, buildID) in builds"
          :key="buildID"
          :value="buildID"
        >
          {{ build.title }}
        </option>
      </select>
    </div>
  </div>
  <!-- TALENTS -->
  <div v-if="activeBuild" class="row justify-content-center" id="buildContent">
    <div class="col-xl-4" style="max-width: 400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 1</div>
        <div class="card-body talent-container p-3" id="skill_tab_one">
          <div
            v-for="i in 10"
            :key="i"
            :data-enabled="getTalent('tab_one', i) != '0'"
          >
            <GameAsset
              :image="getTalentImagePath('all', 1, i)"
              :thumbnail="true"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_one", i) }}
            </div>
          </div>
          <div
            v-for="i in 5"
            :key="i"
            :data-enabled="getTalent('tab_one', i + 10) != '0'"
          >
            <img
              :src="getTalentImagePath(activeBuild.class, 1, i)"
              class="img-fluid img-thumbnail"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_one", i + 10) }}
            </div>
          </div>
        </div>
        <div class="card-body border border-secondary rounded-bottom">
          <p class="card-text">{{ activeBuild.comment_one }}</p>
        </div>
      </div>
    </div>
    <div v-if="activeBuild.class" class="col-xl-4" style="max-width: 400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 2</div>
        <div class="card-body talent-container p-3" id="skill_tab_one">
          <div
            v-for="i in 15"
            :key="i"
            :data-enabled="getTalent('tab_two', i) != '0'"
          >
            <img
              :src="getTalentImagePath(activeBuild.class, 2, i)"
              class="img-fluid img-thumbnail"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_two", i) }}
            </div>
          </div>
        </div>
        <div class="card-body border border-secondary rounded-bottom">
          <p class="card-text">{{ activeBuild.comment_two }}</p>
        </div>
      </div>
    </div>
    <div v-if="activeBuild.subclass" class="col-xl-4" style="max-width: 400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 3</div>
        <div class="card-body talent-container p-3" id="skill_tab_one">
          <div
            v-for="i in 15"
            :key="i"
            :data-enabled="getTalent('tab_three', i) != '0'"
          >
            <img
              :src="getTalentImagePath(activeBuild.subclass, 3, i)"
              class="img-fuid img-thumbnail"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_three", i) }}
            </div>
          </div>
        </div>
        <div class="card-body border border-secondary rounded-bottom">
          <p class="card-text">{{ activeBuild.comment_three }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- NOTES -->
  <div v-if="activeBuild" class="row">
    <div class="col-xl-12 mt-4">
      <div class="card border-light">
        <div class="card-body">
          <p class="card-text" id="notes">{{ activeBuild.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import buildData from "../data/builds.json";

import GameAsset from "../components/GameAsset.vue";

type Build = {
  title: string;
  class: string;
  subclass: string;
  comment_one: string;
  comment_two: string;
  comment_three: string;
  notes: string;
  tab_one?: Record<string, string>;
  tab_two?: Record<string, string>;
  tab_three?: Record<string, string>;
};

export default defineComponent({
  name: "Builds",
  components: {
    GameAsset,
  },
  setup() {
    const builds: Record<string, Build> = buildData;
    const build = ref("");
    const activeBuild = computed(() => {
      if (build.value === "") {
        return null;
      }
      return builds[build.value];
    });

    return {
      activeBuild,
      build,
      builds,
    };
  },
  methods: {
    getTalent(tab: "tab_one" | "tab_two" | "tab_three", slot: number): string {
      if (this.activeBuild !== null) {
        return this.activeBuild[tab]?.[slot] || "0";
      }
      return "0";
    },
    getTalentImagePath(role: string, tab: number, slot: number): string {
      let image = `${role}-${tab}-${slot}`;
      if (role === "") {
        image = "empty";
      }
      if (slot >= 11 && slot < 15) {
        if (["sqr", "hun", "wiz"].includes(role)) {
          image = role + "-filler";
        }
      }
      return `assets/talents/${image}.png`;
    },
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'

.card
  background: $primary
  color: #aaaaaa

.card-header
  background: $secondary
  color: darken(white, 10%)
  font-weight: bold

.talent-container
  display: grid
  grid-template-columns: repeat(5, 1fr)
  grid-template-rows: repeat(3, 1fr)
  gap: 3px 3px
  grid-template-areas: "....." "....." "....."

  img
    background: none
    border-bottom: 0
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

.skill
  background: $secondary
  color: $light
  text-align: center
</style>
