import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useBuilds } from "~/composables/Builds";
import Alchemy from "~/pages/Alchemy.vue";
import Characters from "~/pages/Characters.vue";
import Credits from "~/pages/Changelog.vue";
import ProgressTracker from "~/components/tracker/ProgressTracker.vue";
import StatueTracker from "~/components/tracker/StatueTracker.vue";
import StampTracker from "~/components/tracker/StampTracker.vue";
import SweetSpot from "~/pages/SweetSpot.vue";
import Tasks from "~/pages/Tasks.vue";

const { loadBuildFromDatabase } = useBuilds();

export const trackerRoutes: RouteRecordRaw[] = [
  {
    name: "Collection Progress",
    path: "/tracker/progress",
    component: ProgressTracker,
  },
  {
    name: "Statues",
    path: "/tracker/statues",
    component: StatueTracker,
  },
  {
    name: "Stamps",
    path: "/tracker/stamps",
    component: StampTracker,
  },
  {
    name: "Alchemy",
    path: "/tracker/alchemy",
    component: Alchemy,
  },
];

export const tabRoutes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    redirect: "/characters",
  },
  {
    name: "Characters",
    path: "/characters",
    component: Characters,
  },
  {
    name: "Sweet Spot",
    path: "/sweet-spot",
    component: SweetSpot,
  },
  {
    name: "Tasks",
    path: "/tasks",
    component: Tasks,
  },
  {
    name: "Changelog",
    path: "/changelog",
    component: Credits,
  },
];

const routes: RouteRecordRaw[] = [
  {
    name: "Build",
    path: "/build/:buildId",
    redirect: (to) => {
      const buildId = to.params.buildId.toString();
      loadBuildFromDatabase(buildId);
      return "/";
    },
  },
  ...tabRoutes,
  ...trackerRoutes,
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export { router };
