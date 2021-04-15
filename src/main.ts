import { version } from "../package.json";
import { createApp } from "vue";
import App from "./App.vue";

// broken

import { StateManager } from "./State";
import { useCharacters } from "./composables/Characters";

const state = new StateManager(version);
const { characters } = useCharacters();
let charData = state.load("chars");
if (charData !== null) {
  characters.value = JSON.parse(charData);
}
createApp(App).provide("state", state).mount("#app");
