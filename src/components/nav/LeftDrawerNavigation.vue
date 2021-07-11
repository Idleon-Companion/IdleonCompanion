<template>
  <q-list>
    <template v-for="(tab, tabIndex) in tabs" :key="tabIndex">
      <q-item
        v-if="!tab.children"
        :to="tab.path"
        :tabindex="tabIndex"
        class="items-center"
        >{{ tab.name }}</q-item
      >
      <q-expansion-item v-else :label="tab.name">
        <q-item
          v-for="(nestedTab, nestedIndex) in tab.children"
          :key="nestedIndex"
          :to="nestedTab.path"
          :tabindex="nestedIndex"
          class="items-center"
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
    name: "Tasks",
    path: "/tasks",
  },
  {
    name: "Progress Tracker",
    path: "/progress-tracker",
  },
  {
    name: "Alchemy",
    path: "/alchemy",
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
        name: "Stamp Cost",
        path: "/tools/picnic-quest",
      },
      {
        name: "Pack Mule Crafter",
        path: "/tools/picnic-quest",
      },
      {
        name: "Recipe Calculator",
        path: "/tools/picnic-quest",
      },
    ],
  },
];

export default defineComponent({
  name: "LeftDrawerNavigation",
  setup() {
    return {
      tabs,
    };
  },
});
</script>

<style scoped lang="sass"></style>
