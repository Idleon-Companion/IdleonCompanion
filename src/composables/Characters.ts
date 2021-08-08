import { CompleteChecklist } from "~/composables/Checklist";
import { computed, ref } from "vue";
import { useState } from "~/State";

export enum Class {
  Beginner = "Beginner",
  Journeyman = "Journeyman",
  Maestro = "Maestro",

  Warrior = "Warrior",
  Barbarian = "Barbarian",
  Squire = "Squire",

  Archer = "Archer",
  Bowman = "Bowman",
  Hunter = "Hunter",

  Mage = "Mage",
  Wizard = "Wizard",
  Shaman = "Shaman",
}

export const BaseClass = [
  Class.Beginner,
  Class.Warrior,
  Class.Archer,
  Class.Mage,
];

export const Subclass: Record<Class, Class[]> = {
  [Class.Beginner]: [Class.Journeyman],
  [Class.Journeyman]: [Class.Maestro],
  [Class.Maestro]: [],
  [Class.Warrior]: [Class.Barbarian, Class.Squire],
  [Class.Barbarian]: [],
  [Class.Squire]: [],
  [Class.Archer]: [Class.Bowman, Class.Hunter],
  [Class.Bowman]: [],
  [Class.Hunter]: [],
  [Class.Mage]: [Class.Wizard, Class.Shaman],
  [Class.Wizard]: [],
  [Class.Shaman]: [],
};

export const Superclass: Partial<Record<Class, Class>> = {
  [Class.Journeyman]: Class.Beginner,
  [Class.Maestro]: Class.Journeyman,
  [Class.Warrior]: Class.Beginner,
  [Class.Barbarian]: Class.Warrior,
  [Class.Squire]: Class.Warrior,
  [Class.Archer]: Class.Beginner,
  [Class.Bowman]: Class.Archer,
  [Class.Hunter]: Class.Archer,
  [Class.Mage]: Class.Beginner,
  [Class.Wizard]: Class.Mage,
  [Class.Shaman]: Class.Mage,
};

export const getClassTree = (class_: Class): Class[] => {
  // Retuns the parent class tree given a leaf class node (Maestro -> [Maestro, Journeyman, Beginner])
  const classes: Class[] = [];
  let current: Class | undefined = class_;
  while (current) {
    classes.push(current);
    current = Superclass[current];
  }
  return classes;
};

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
] as const;
export type Skill = typeof Skills[number];

// Characters keep track of individual data
export class Character {
  public class: Class;
  public level: number;
  public name: string;
  public items: Record<string, boolean>;
  public skills: Record<Skill, number>;
  public constellations: Record<string, boolean>;
  public starSigns: Record<string, boolean>;

  constructor() {
    this.class = Class.Beginner;
    this.level = 1;
    this.name = "";
    this.items = {};
    this.skills = <Record<Skill, number>>(
      Object.fromEntries(Skills.map((x) => [x, 0]))
    );
    this.constellations = {};
    this.starSigns = {};
  }

  get bagSlots(): number {
    // The number of inventory slots in the character's item bag
    let slots = 16; // Base inventory slots
    const { checklist } = useState().value;
    for (const category of ["Inventory Bags"] as const) {
      for (const item of CompleteChecklist[category][0].items) {
        if (this.hasItem(item.name)) {
          slots += item.bagSlots ?? 0;
        }
      }
    }
    // Global items
    for (const category of ["Gem Shop Bags"] as const) {
      for (const item of CompleteChecklist[category][0].items) {
        if (checklist[item.name] === true) {
          slots += item.bagSlots ?? 0;
        }
      }
    }
    return slots;
  }

  /* TODO: Stats
  - Characters should have basic stats stored on them (move speed, HP, drop chance, etc.)
  - Other stats have computed getters that are based on these stats
    - Attack Speed (TODO)
    - Damage/HR -> Kills/HR (Nice to have in Sweet Spot/future features)
  */

  hasItem(item: string): boolean {
    return this.items[item] === true;
  }
}

const charIndex = ref(0);
export function useCharacters() {
  const state = useState();
  const characters = computed({
    get: () => state.value.chars,
    set: (value) => (state.value.chars = value),
  });

  const numCharacters = computed(() => {
    return characters.value.length;
  });

  const currentCharacter = computed<Character | null>(() => {
    if (numCharacters.value > 0) {
      return characters.value[charIndex.value];
    }
    return null;
  });

  // Create new character class objects from data (from existing state)
  const createCharactersFromData = (data: Character[]) => {
    characters.value = [];
    for (const c of data) {
      const newChar = new Character();
      Object.assign(newChar, c);
      characters.value.push(newChar);
    }
  };

  const createNewCharacter = () => {
    // Creates a new character
    characters.value.push(new Character());
    charIndex.value = characters.value.length - 1;
  };

  const deleteCurrentCharacter = () => {
    // Deletes the currently selected character
    characters.value.splice(charIndex.value, 1);
    charIndex.value = 0;
  };

  const nextCharacter = () => {
    // Cycles to the next character
    if (numCharacters.value > 0) {
      charIndex.value = (charIndex.value + 1) % numCharacters.value;
    }
  };

  const prevCharacter = () => {
    // Cyclec to the previous character
    if (numCharacters.value > 0) {
      charIndex.value = (charIndex.value - 1) % numCharacters.value;
    }
  };

  const switchToCharacter = (i: number) => {
    // Switches to the character at that index
    if (i < 0 || i > characters.value.length) {
      return;
    }
    charIndex.value = i;
  };

  return {
    characters,
    createCharactersFromData,
    createNewCharacter,
    currentCharacter,
    deleteCurrentCharacter,
    numCharacters,
    nextCharacter,
    prevCharacter,
    switchToCharacter,
  };
}

export enum WeaponType {
  Fisticuff,
  Spear,
  Bow,
  Wand,
}

export function useCombat() {
  // TODO: These should probably all be a part of the character class as getters
  const attackSpeed = (weaponSpeed: number, weaponType: WeaponType) => {
    // Attack speed is measured in milliseconds
    const weaponStats: Record<
      WeaponType,
      { base: number; cap: number; delay: number }
    > = {
      [WeaponType.Fisticuff]: {
        base: 650,
        cap: 300,
        delay: 13,
      },
      [WeaponType.Spear]: {
        base: 650,
        cap: 300,
        delay: 13,
      },
      [WeaponType.Bow]: {
        base: 850,
        cap: 750,
        delay: 13.5,
      },
      [WeaponType.Wand]: {
        base: 760,
        cap: 600,
        delay: 16,
      },
    };
    const stats = weaponStats[weaponType];
    return Math.max(stats.base + (stats.delay - weaponSpeed) / 5, stats.cap);
  };

  return {
    attackSpeed,
  };
}
