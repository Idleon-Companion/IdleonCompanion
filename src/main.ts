import { version } from "../package.json";
import { createApp } from "vue";
import App from "./App.vue";
import { Character, CharacterManager, StateManager } from "./State";

const state = new StateManager(version);
let characters = Array<Character>();
let charData = state.load("characters");
if (charData !== null) {
  characters = JSON.parse(charData);
}
const chars = new CharacterManager(characters);
createApp(App).provide("state", state).provide("chars", chars).mount("#app");
