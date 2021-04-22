import { computed, ref } from "vue";

import checklistData from "~/data/checklist.json";
import { useChecklist } from "~/composables/Checklist";

export enum Class {
  Beginner = "Beginner",
  Warrior = "Warrior",
  Archer = "Archer",
  Mage = "Mage",
}

export enum Subclass {
  Journeyman = "Journeyman",
  Barbarian = "Barbarian",
  Squire = "Squire",
  Bowman = "Bowman",
  Hunter = "Hunter",
  Wizard = "Wizard",
  Shaman = "Shaman",
}

export const Skills = [
  "Mining",
  "Smithing",
  "Choppin'",
  "Fishing",
  "Alchemy",
  "Catching",
];

// All statues in the game
export const Statues = [
  "Anvil",
  "Beholder",
  "Bullseye",
  "Cauldron",
  "Exp Book",
  "Feasty",
  "Health",
  "Kachow",
  "Lumberbob",
  "Mining",
  "Oceanman",
  "Ol Reliable",
  "Power",
  "Speed",
  "Thicc Skin",
];

const characters = ref(Array<Character>());
const charIndex = ref(0);

// Save data to local storage
const saveCharacters = () => {
  localStorage.setItem("chars", JSON.stringify(characters.value));
};

// Characters keep track of individual data
export class Character {
  public class: Class;
  public subclass: Subclass | null;
  public level: number;
  public name: string;
  public items: Record<string, boolean>;
  public skills: Record<string, number>;
  public statues: Record<string, number>;

  constructor() {
    this.class = Class.Beginner;
    this.subclass = null;
    this.level = 1;
    this.name = "";
    this.items = {};
    this.skills = {};
    this.statues = {};
  }

  setClass(c: Class | Subclass) {
    for (const x in Class) {
      if (x === c) {
        this.class = c as Class;
        this.subclass = null;
        saveCharacters();
        return;
      }
    }
    this.class = {
      [Subclass.Barbarian]: Class.Warrior,
      [Subclass.Squire]: Class.Warrior,
      [Subclass.Bowman]: Class.Archer,
      [Subclass.Hunter]: Class.Archer,
      [Subclass.Shaman]: Class.Mage,
      [Subclass.Wizard]: Class.Mage,
      [Subclass.Journeyman]: Class.Beginner,
    }[c as Subclass];
    this.subclass = c as Subclass;
    saveCharacters();
  }

  get bagSlots(): number {
    let slots = 16; // Base inventory slots
    const { checklist } = useChecklist();
    // Character items
    for (const category of ["Inventory Bags"] as const) {
      for (const item of checklistData[category].items) {
        if (this.hasItem(item.name)) {
          slots += item.bagSlots;
        }
      }
    }
    // Global items
    for (const category of ["Gem Shop Bags"] as const) {
      for (const item of checklistData[category].items) {
        if (checklist.value[item.name] === true) {
          slots += item.bagSlots;
        }
      }
    }
    return slots;
  }

  hasItem(item: string): boolean {
    return this.items[item] === true;
  }
}

export function useCharacters() {
  const numCharacters = computed(() => {
    return characters.value.length;
  });

  const curCharacter = computed<Character | null>(() => {
    if (numCharacters.value > 0) {
      return characters.value[charIndex.value];
    }
    return null;
  });

  // Cycle to next character
  const nextCharacter = () => {
    if (numCharacters.value > 0) {
      charIndex.value = (charIndex.value + 1) % numCharacters.value;
    }
  };

  // Cycle to previous character
  const prevCharacter = () => {
    if (numCharacters.value > 0) {
      charIndex.value = (charIndex.value - 1) % numCharacters.value;
    }
  };

  // Set character class/subclass
  const setClass = (value: Class | Subclass) => {
    if (curCharacter.value === null) {
      return;
    }
    for (const c in Class) {
      if (value === c) {
        curCharacter.value.class = value as Class;
        curCharacter.value.subclass = null;
        saveCharacters();
        return;
      }
    }

    saveCharacters();
  };

  return {
    characters,
    charIndex,
    curCharacter,
    numCharacters,
    nextCharacter,
    prevCharacter,
    saveCharacters,
    setClass,
  };
}
