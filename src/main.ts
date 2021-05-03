import { version } from "../package.json";
import { createApp } from "vue";
import VueTippy from "vue-tippy";
import App from "~/App.vue";

import "tippy.js/dist/tippy.css";

import { StateManager } from "./State";
import { Character, useCharacters } from "./composables/Characters";

const state = new StateManager(version);
const { characters } = useCharacters();
let charData = state.load("chars");
if (charData !== null) {
  let chars = JSON.parse(charData);
  for (const c of chars) {
    let newChar = new Character();
    Object.assign(newChar, c);
    characters.value.push(newChar);
  }
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
  .use(VueTippy, {
    directive: "tooltip",
    component: "Tooltip",
    defaultProps: {
      placement: "bottom",
      offset: [0, 30],
    },
  })
  .mount("#app");
