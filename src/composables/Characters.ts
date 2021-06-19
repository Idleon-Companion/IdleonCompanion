import { computed, ref } from "vue";
import { useState } from "~/State";
import checklistData from "~/data/checklist.json";

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
  "Trapping",
  "Construction",
  "Worship",
];

// Characters keep track of individual data
export class Character {
  public class: Class;
  public subclass: Subclass | null;
  public level: number;
  public name: string;
  public items: Record<string, boolean>;
  public skills: Record<string, number>;
  public statues: Record<string, number>;
  public constellations: Record<string, boolean>;
  public starSigns: Record<string, boolean>;

  constructor() {
    this.class = Class.Beginner;
    this.subclass = null;
    this.level = 1;
    this.name = "";
    this.items = {};
    this.skills = {};
    this.statues = {};
    this.constellations = {};
    this.starSigns = {};
  }

  setClass(c: Class | Subclass) {
    for (const x in Class) {
      if (x === c) {
        this.class = c as Class;
        this.subclass = null;
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
  }

  get bagSlots(): number {
    let slots = 16; // Base inventory slots
    const { checklist } = useState().value;
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
        if (checklist[item.name] === true) {
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

const charIndex = ref(0);
const characters = ref(Array<Character>());

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

  // Create new character class objects from data (from existing state)
  const createCharactersFromData = (data: Character[]) => {
    characters.value = [];
    for (const c of data) {
      let newChar = new Character();
      Object.assign(newChar, c);
      characters.value.push(newChar);
    }
  };

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

  return {
    characters,
    charIndex,
    createCharactersFromData,
    curCharacter,
    numCharacters,
    nextCharacter,
    prevCharacter,
  };
}
