<template>
  <q-list>
    <template v-for="(tab, tabIndex) in tabs" :key="tabIndex">
      <q-item
        v-if="!tab.children"
        :to="tab.path"
        :tabindex="tabIndex"
        class="items-center"
        active-class="tab-active"
        >{{ tab.name }}</q-item
      >
      <q-expansion-item v-else :label="tab.name">
        <q-item
          v-for="(nestedTab, nestedIndex) in tab.children"
          :key="nestedIndex"
          :to="nestedTab.path"
          :tabindex="nestedIndex"
          class="items-center"
          active-class="tab-active"
          >{{ nestedTab.name }}</q-item
        >
      </q-expansion-item>
      <q-separator />
    </template>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type NavigationTab = {
  name: string;
  path?: string;
  children?: NavigationTab[];
};

const tabs: NavigationTab[] = [
  {
    name: "Characters",
    path: "/characters",
  },
  {
    name: "Trackers",
    children: [
      {
        name: "Collection Progress",
        path: "/tracker/progress",
      },
      {
        name: "Statues",
        path: "/tracker/statues",
      },
      {
        name: "Stamps",
        path: "/tracker/stamps",
      },
      {
        name: "Alchemy",
        path: "/tracker/alchemy",
      },
      {
        name: "Quests",
        path: "/tracker/quests",
      },
    ],
  },
  {
    name: "Tasks",
    path: "/tasks",
  },
  {
    name: "Sweet Spot",
    path: "/sweet-spot",
  },
  {
    name: "Builds",
    path: "/builds",
  },
  {
    name: "Cards",
    path: "/cards",
  },
  {
    name: "Tools",
    children: [
      {
        name: "Picnic Quest",
        path: "/tools/picnic-quest",
      },
      {
        name: "Pack Mule Crafter",
        path: "/tools/pack-mule",
      },
      {
        name: "Recipe Calculator",
        path: "/tools/recipe-calculator",
      },
    ],
  },
  {
    name: "Import",
    path: "/import",
  },
  {
    name: "Changelog",
    path: "/changelog",
  },
];

export default defineComponent({
  name: "LeftDrawerContent",
  setup() {
    return {
      tabs,
    };
  },
});
</script>

<style scoped lang="sass">
@import '../../styles/base.sass'
.tab-active
  color: $info
  font-weight: bold
  transition: 0.1s
</style>
