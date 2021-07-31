<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Browse through our list of suggested builds, filtered by character
        class.
      </p>
    </div>
  </div>
  <div class="row px-3 my-3">
    <div class="col-md input-group build-selector p-0">
      <span class="input-group-text">Class</span>
      <select v-model="buildClass" class="bg-primary" id="buildClass">
        <option value="all" selected>All</option>
        <option v-for="(c, v) in classes" :key="c" :value="c">{{ v }}</option>
      </select>
    </div>
    <div class="col-md input-group build-selector p-0">
      <span class="input-group-text bg-dark text-light">Build</span>
      <select v-model="build" class="bg-primary" id="buildSelector">
        <option value="" selected>Select Your Build</option>
        <option
          v-for="(build, buildID) in filteredBuilds"
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
              :image="Assets.TalentImage('all', 1, i)"
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
              :src="Assets.TalentImage(activeBuild.class, 1, i)"
              class="img-fluid img-thumbnail"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_one", i + 10) }}
            </div>
          </div>
        </div>
        <div class="card-body border border-secondary rounded-bottom">
          <div class="card-text">
            <p v-for="(line, n) in commentToLines(activeBuild.comment_one)" :key='n'>
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeBuild.class" class="col-xl-4" style="max-width: 400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 2</div>
        <div class="card-body talent-container p-3" id="skill_tab_two">
          <div
            v-for="i in 15"
            :key="i"
            :data-enabled="getTalent('tab_two', i) != '0'"
          >
            <img
              :src="Assets.TalentImage(activeBuild.class, 2, i)"
              class="img-fluid img-thumbnail"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_two", i) }}
            </div>
          </div>
        </div>
        <div class="card-body border border-secondary rounded-bottom">
          <div class="card-text">
            <p v-for="(line, n) in commentToLines(activeBuild.comment_two)" :key='n'>
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeBuild.subclass" class="col-xl-4" style="max-width: 400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 3</div>
        <div class="card-body talent-container p-3" id="skill_tab_three">
          <div
            v-for="i in 15"
            :key="i"
            :data-enabled="getTalent('tab_three', i) != '0'"
          >
            <img
              :src="Assets.TalentImage(activeBuild.subclass, 3, i)"
              class="img-fuid img-thumbnail"
            />
            <div class="border rounded-bottom skill mb-1">
              {{ getTalent("tab_three", i) }}
            </div>
          </div>
        </div>
        <div class="card-body border border-secondary rounded-bottom">
          <div class="card-text">
            <p v-for="(line, n) in commentToLines(activeBuild.comment_three)" :key='n'>
              {{ line }}
            </p>
          </div>
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
import { builds as buildData } from "~/data/builds/";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";
import { Class, Subclass } from "~/composables/Characters";

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

type NewBuild = typeof buildData[1];

const classAlias: Record<Class | Subclass, string> = {
  [Class.All]: "all",
  [Class.Beginner]: "all",
  [Class.Warrior]: "war",
  [Class.Archer]: "arc",
  [Class.Mage]: "mag",
  [Class.Journeyman]: "jma",
  [Subclass.Barbarian]: "bar",
  [Subclass.Bowman]: "bow",
  [Subclass.Hunter]: "hun",
  [Subclass.Maestro]: "mae",
  [Subclass.Shaman]: "sha",
  [Subclass.Squire]: "sqr",
  [Subclass.Wizard]: "wiz",
};

const newToOldBuildData = (newBuild: NewBuild): Build => {
  const oldFormat: Build = {
    title: newBuild.title,
    notes: newBuild.notes,
    class: classAlias[newBuild.class] ?? "all",
    subclass: newBuild.subclass ? classAlias[newBuild.subclass] ?? "" : "",
    comment_one: "",
    comment_two: "",
    comment_three: "",
  }

  const tabOne = newBuild.tabs[0]
  if (tabOne) {
    oldFormat.comment_one = tabOne.comment;
    oldFormat.tab_one = tabOne.skills;
  }

  const tabTwo = newBuild.tabs[1]
  if (tabTwo) {
    oldFormat.comment_two = tabTwo.comment;
    oldFormat.tab_two = tabTwo.skills;
  }

  const tabThree = newBuild.tabs[2]
  if (tabThree) {
    oldFormat.comment_three = tabThree.comment;
    oldFormat.tab_three = tabThree.skills;
  }

  return oldFormat
}

export default defineComponent({
  name: "Builds",
  components: {
    GameAsset,
  },
  setup() {
    const builds: Record<string, Build> = buildData.reduce((acc, cur) => {
      acc[cur.title] = newToOldBuildData(cur);
      return acc;
    }, {} as Record<string, Build>);
    const build = ref("");
    const activeBuild = computed(() => build.value === '' ? null : builds[build.value]);

    const classes: Record<string, string> = {
      Beginner: "",
      Journeyman: "jma",
      Warrior: "war",
      Archer: "arc",
      Mage: "mag",
    };

    const buildClass = ref("all");
    const filteredBuilds = computed(() => {
      let filtered: Record<string, Build> = {};
      if (buildClass.value === 'all') {
        return builds
      }
      for (const [name, build] of Object.entries(builds)) {
        if (buildClass.value === build.class) {
          filtered[name] = build
        }
      }
      return filtered
    });

    return {
      activeBuild,
      Assets,
      build,
      buildClass,
      classes,
      filteredBuilds,
      commentToLines: (comment: string) => comment.split('\n')
    };
  },
  methods: {
    getTalent(tab: "tab_one" | "tab_two" | "tab_three", slot: number): string {
      if (this.activeBuild !== null) {
        return this.activeBuild[tab]?.[slot] || "0";
      }
      return "0";
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

.build-selector
  display: flex
  height: 3rem
  align-self: flex-end
  select
    width: 80%

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
