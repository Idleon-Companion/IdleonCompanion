import checklistData from "./data/checklist.json";
import { version } from "../package.json";
import { createGlobalState, useStorage } from "@vueuse/core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { AlchemyData, Color } from "~/composables/Alchemy";
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
      goals: {
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
    starSigns: {} as Record<string, boolean>,
    tasks: {
      tasks: Array<Task>(),
      dailyReset: "12:00",
    },
    version: "0.2.0",
  })
);

export function versionControl() {
  // Perform version controlling here whenever there is new data that is persisted
  // Make sure to update the version number in package.json!
  const state = useState();
  let savedVersion = localStorage.getItem("version");
  // Legacy support for localStorage
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
    if (savedVersion < "0.2.0") {
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
  }
  // Add star signs and constellations
  if (state.value.version < "0.2.2") {
    for (const key in state.value.chars) {
      if (!state.value.chars[key].constellations) {
        state.value.chars[key].constellations = {};
      }
      if (!state.value.chars[key].starSigns) {
        state.value.chars[key].starSigns = {};
      }
    }
    if (!state.value.starSigns) {
      state.value.starSigns = {};
    }
  }
  // Add W3 skills and statues
  if (state.value.version < "0.2.3") {
    let newSkills = ["Trapping", "Construction", "Worship"];
    let newStatues = ["Box", "EhExPee", "Seesaw", "Twosoul"];

    for (const key in state.value.chars) {
      for (const s of newSkills) state.value.chars[key].skills[s] = 0;
      for (const t of newStatues) state.value.chars[key].statues[t] = 0;
    }
  }
  // Add new bubble slots and a goals field for each bubble
  if (state.value.version < "0.2.4") {
    let colors: Color[] = ["Orange", "Green", "Purple", "Yellow"];
    for (const k of colors) {
      let amount = 15;
      if (!state.value.alchemy.goals) {
        state.value.alchemy.goals = {
          Orange: [],
          Green: [],
          Purple: [],
          Yellow: [],
        };
      }
      for (let i = 0; i < amount; i++) {
        state.value.alchemy.upgrades[k][i] = state.value.alchemy.upgrades[k][i] ?? 0; 
        state.value.alchemy.goals[k][i] = state.value.alchemy.goals[k][i] ?? 0;       
      }     
    }
  }
  state.value.version = version;
}

// Firebase Initialization
import firebase from "firebase/app";
import "firebase/auth";
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
type UserState = firebase.User | null;
export const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const user = ref(null as UserState);

export const useAuth = () => {
  user.value = auth.currentUser;
  const db = firebaseApp.database();

  const toast = useToast();

  const state = useState();
  const { createCharactersFromData } = useCharacters();

  const loadCloud = () => {
    if (user.value === null) {
      toast.error("You are not logged in!");
      return null;
    }
    return db
      .ref("/users/" + user.value.uid)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = JSON.parse(snapshot.val());
          state.value = data;
          // Ensure cloud data is up to date!
          versionControl();
          // Load characters as class instances
          createCharactersFromData(state.value.chars);
          toast.success("Cloud data loaded!");
        } else {
          toast.error("No data found on the cloud.");
        }
      });
  };

  const saveCloud = () => {
    if (user.value === null) {
      toast.error("You are not logged in!");
      return null;
    }
    toast.success("Data saved to the cloud.");
    return db.ref("/users/" + user.value.uid).set(JSON.stringify(state.value));
  };

  return { auth, loadCloud, saveCloud, user };
};
