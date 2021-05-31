import checklistData from "./data/checklist.json";
import { version } from "../package.json";
import { createGlobalState, useStorage } from "@vueuse/core";
import { ref } from "vue";
import { AlchemyData } from "~/composables/Alchemy";
import { Task } from "~/composables/Progress";
import { Character, useCharacters } from "~/composables/Characters";

const StorageKey = "idleon-companion";
export const useState = createGlobalState(() =>
  useStorage(StorageKey, {
    alchemy: {
      upgrades: {
        Orange: [],
        Green: [],
        Purple: [],
        Yellow: [],
      },
      vials: {},
    } as AlchemyData,
    cards: {} as Record<string, number>,
    chars: [] as Character[],
    checklist: {} as Record<string, boolean>,
    tasks: {
      tasks: Array<Task>(),
      dailyReset: "12:00",
    },
    version: "0.2.0",
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

// Firebase Initialization
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDP9fu1062i82w64K9LgKHFFMDgPtUj6k4",
  authDomain: "idleon-companion.firebaseapp.com",
  databaseURL: "https://idleon-companion-default-rtdb.firebaseio.com",
  projectId: "idleon-companion",
  storageBucket: "idleon-companion.appspot.com",
  messagingSenderId: "693976777179",
  appId: "1:693976777179:web:cc00d02a3bd8752ec327fe",
  measurementId: "G-3W9H9KERK0",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const useAuth = () => {
  const auth = firebaseApp.auth();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const db = firebaseApp.database();
  const user = ref(auth.currentUser);

  const state = useState();
  const { createCharactersFromData } = useCharacters();

  const loadCloud = () => {
    if (user.value === null) {
      return null;
    }
    return db
      .ref("/users/" + user.value.uid)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = JSON.parse(snapshot.val());
          console.log("Loaded cloud data:", data);
          state.value = data;
          // Ensure cloud data is up to date!
          versionControl();
          // Load characters as class instances
          createCharactersFromData(state.value.chars);
        }
      });
  };

  const saveCloud = () => {
    if (user.value === null) {
      return null;
    }
    return db.ref("/users/" + user.value.uid).set(JSON.stringify(state.value));
  };

  return { auth, loadCloud, saveCloud, user };
};
