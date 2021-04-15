import { version } from "../package.json";
import { createApp } from "vue";
import App from "./App.vue";

import { StateManager } from "./State";
import { useCharacters } from "./composables/Characters";

const state = new StateManager(version);
const { characters } = useCharacters();
let charData = state.load("chars");
if (charData !== null) {
  characters.value = JSON.parse(charData);
}
createApp(App)
  .directive("resizable", {
    updated(el) {
      el.addEventListener("input", (e: any) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      });
    },
  })
  .provide("state", state)
  .mount("#app");
