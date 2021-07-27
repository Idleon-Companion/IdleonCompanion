import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useBuilds } from "~/composables/Builds";
import Alchemy from "~/pages/Alchemy.vue";
import Characters from "~/pages/Characters.vue";
import Credits from "~/pages/Changelog.vue";
import ProgressTracker from "~/components/tracker/ProgressTracker.vue";
import Statues from "~/components/tracker/Statues.vue";
import SweetSpot from "~/pages/SweetSpot.vue";
import Tasks from "~/pages/Tasks.vue";

const { loadBuildFromDatabase } = useBuilds();

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
    name: "Collection Progress",
    path: "/tracker/progress",
    component: ProgressTracker,
  },
  {
    name: "Statues",
    path: "/tracker/statues",
    component: Statues,
  },
  // {
  //   name: "Alchemy",
  //   path: "/tracker/alchemy",
  //   component: Alchemy,
  // },
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
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export { router };
