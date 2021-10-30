import "firebase/auth";
import "firebase/database";
import { AlchemyColor, AlchemyData } from "~/composables/Alchemy";
import { Character, useCharacters } from "~/composables/Characters";
import { Stamps } from "./composables/Stamps";
import { StatueInfo, StatueName, Statues } from "./composables/Statues";
import { Task, Timer } from "~/composables/Tasks";
import { createGlobalState, useStorage } from "@vueuse/core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { version } from "../package.json";
import firebase from "firebase/app";

const StorageKey = "idleon-companion";
export const DefaultState = {
  alchemy: {
    goals: {
      Orange: [],
      Green: [],
      Purple: [],
      Yellow: [],
    },
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
  stamps: {} as Record<string, number>,
  starSigns: {} as Record<string, boolean>,
  statues: {} as Record<StatueName, StatueInfo>,
  tasks: {
    dailyReset: "12:00",
    tasks: Array<Task>(),
    timers: Array<Timer>(),
  },
  version: "0.2.0",
};
export const useState = createGlobalState(() =>
  useStorage(StorageKey, DefaultState)
);

export function versionControl() {
  // Perform version controlling here whenever there is new data that is persisted
  // Make sure to update the version number in package.json!
  const state = useState();
  const savedVersion = localStorage.getItem("version");
  // Legacy support for localStorage
  if (savedVersion !== null) {
    // Consider all previous stored data invalid
    if (savedVersion < "0.1.1") {
      // Task reworked to allow custom tasks
      localStorage.removeItem("tasks");
    }
    if (savedVersion < "0.2.0") {
      for (const k of [
        "alchemy",
        "cards",
        "chars",
        "checklist",
        "tasks",
      ] as const) {
        const value = localStorage.getItem(k);
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
    const newSkills = ["Trapping", "Construction", "Worship"] as const;

    for (const key in state.value.chars) {
      for (const s of newSkills) {
        if (!(s in state.value.chars[key].skills)) {
          state.value.chars[key].skills[s] = 0;
        }
      }
    }
  }
  // Add new bubble slots and a goals field for each bubble
  if (state.value.version < "0.2.4") {
    const colors: AlchemyColor[] = ["Orange", "Green", "Purple", "Yellow"];
    for (const k of colors) {
      const amount = 15;
      if (!state.value.alchemy.goals) {
        state.value.alchemy.goals = {
          Green: [],
          Orange: [],
          Purple: [],
          Yellow: [],
        };
      }
      for (let i = 0; i < amount; i++) {
        state.value.alchemy.upgrades[k][i] =
          state.value.alchemy.upgrades[k][i] ?? 0;
        state.value.alchemy.goals[k][i] =
          state.value.alchemy.goals[k][i] ??
          state.value.alchemy.upgrades[k][i] + 1;
      }
    }
  }
  // Move statues from character to global state, add stamp tracking, new tasks/timers
  if (state.value.version < "0.3.0") {
    if (!state.value.statues) {
      state.value.statues = {} as Record<StatueName, StatueInfo>;
    }
    for (const statue of Object.keys(Statues) as Array<StatueName>) {
      if (!state.value.statues[statue]){
        state.value.statues[statue] = {
          golden: false,
          level: 0,
          progress: 0,
        };
      }
    }
    // Remove statues from character state
    for (const index in state.value.chars) {
      delete (state.value.chars[index] as Character & { statues: any }).statues;
    }
    // Add stamp tracking data
    if (!state.value.stamps) {
      state.value.stamps = {};
      for (const stamp of Object.values(Stamps)) {
        state.value.stamps[stamp.name] = 0;
      }
    }
    // Reset tasks/daily reset timer
    state.value.tasks = {
      dailyReset: "00hr 00min 00sec",
      tasks: [],
      timers: [],
    };
  }
  // Remove subclass from characters
  if (state.value.version < "0.3.1") {
    for (const key in state.value.chars) {
      if ("subclass" in state.value.chars[key]) {
        state.value.chars[key].class =
          (state.value.chars[key] as Character & { subclass: any }).subclass ??
          state.value.chars[key].class;
        delete (state.value.chars[key] as Character & { subclass: any })
          .subclass;
      }
    }
    // Also, change cards to be stored without underscores for API imports
    for (const key in state.value.cards) {
      // Only replace keys that have underscores
      if (key.includes("_")) {
        state.value.cards[key.replace(/_/g, " ")] = state.value.cards[key];
        delete state.value.cards[key];
      }
    }
  }
  state.value.version = version;
}

// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDP9fu1062i82w64K9LgKHFFMDgPtUj6k4",
  appId: "1:693976777179:web:cc00d02a3bd8752ec327fe",
  authDomain: "idleon-companion.firebaseapp.com",
  databaseURL: "https://idleon-companion-default-rtdb.firebaseio.com",
  measurementId: "G-3W9H9KERK0",
  messagingSenderId: "693976777179",
  projectId: "idleon-companion",
  storageBucket: "idleon-companion.appspot.com",
};

// Initialize Firebase
type UserState = firebase.User | null;
export const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.database();
const user = ref(null as UserState);

export enum DbRef {
  Builds = "/builds",
  Users = "/users",
}

export const useAuth = () => {
  user.value = auth.currentUser;

  const toast = useToast();

  const state = useState();
  const { createCharactersFromData } = useCharacters();

  const loadCloud = () => {
    if (user.value === null) {
      toast.error("You are not logged in!");
      return null;
    }
    return db
      .ref(`${DbRef.Users}/${user.value.uid}`)
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
    return db
      .ref(`${DbRef.Users}/${user.value.uid}`)
      .set(JSON.stringify(state.value));
  };

  return { auth, loadCloud, saveCloud, user };
};

export const useDB = () => {
  return {
    db,
    DbRef,
  };
};
