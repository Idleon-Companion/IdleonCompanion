import checklistData from "./data/checklist.json";
import { version } from "../package.json";
import { createGlobalState, useStorage } from "@vueuse/core";
import { AlchemyData } from "~/composables/Alchemy";
import { Task } from "~/composables/Progress";
import { Character } from "~/composables/Characters";

const StorageKey = "idleon-companion";
export const useState = createGlobalState(() =>
  useStorage(StorageKey, {
    alchemy: {
      upgrades: {},
      vials: {},
    } as AlchemyData,
    cards: {} as Record<string, number>,
    chars: [] as Character[],
    checklist: {} as Record<string, boolean>,
    tasks: {
      tasks: Array<Task>(),
      dailyReset: "12:00",
    },
    version: "0.1.3",
  })
);

export function versionControl() {
  let savedVersion = localStorage.getItem("version");
  const state = useState();
  // Perform version controlling here
  if (savedVersion !== null) {
    // Consider all previous stored data invalid
    if (savedVersion < "0.1.1") {
      // Task reworked to allow custom tasks
      localStorage.removeItem("tasks");
    }
    if (savedVersion < "0.1.2") {
      // Add cycle items (Capacity Pouches)
      let chars = localStorage.getItem("chars");
      if (chars !== null) {
        for (const c of JSON.parse(chars)) {
          for (const item of checklistData["Capacity Pouches"]["items"]) {
            delete c.items[item.name];
          }
        }
      }
    }
  }
  if (state.value.version < "0.2.0") {
    for (const k of [
      "alchemy",
      "cards",
      "chars",
      "checklist",
      "tasks",
    ] as const) {
      let value = localStorage.getItem(k);
      if (value !== null) {
        state.value[k] = JSON.parse(value);
      }
    }
    for (const k of Object.keys(localStorage)) {
      if (![StorageKey, "iconify"].includes(k)) {
        localStorage.removeItem(k);
      }
    }
  }
  state.value.version = version;
}
