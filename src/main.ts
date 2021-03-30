import { version } from "../package.json";
import { createApp } from "vue";
import App from "./App.vue";
import { StateManager } from "./State";

const state = new StateManager(version);
createApp(App).provide("state", state).mount("#app");
