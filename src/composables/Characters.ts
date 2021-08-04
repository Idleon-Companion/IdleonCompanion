import { CompleteChecklist } from "~/composables/Checklist";
import { computed, ref } from "vue";
import { useState } from "~/State";

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

export const SubclassTree: Record<Subclass, Class> = {
  [Subclass.Journeyman]: Class.Beginner,
  [Subclass.Barbarian]: Class.Warrior,
  [Subclass.Squire]: Class.Warrior,
  [Subclass.Bowman]: Class.Archer,
  [Subclass.Hunter]: Class.Archer,
  [Subclass.Wizard]: Class.Mage,
  [Subclass.Shaman]: Class.Mage,
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
  public subclass: Subclass | null;
  public level: number;
  public name: string;
  public items: Record<string, boolean>;
  public skills: Record<Skill, number>;
  public constellations: Record<string, boolean>;
  public starSigns: Record<string, boolean>;

  constructor() {
    this.class = Class.Beginner;
    this.subclass = null;
    this.level = 1;
    this.name = "";
    this.items = {};
    this.skills = <Record<Skill, number>>(
      Object.fromEntries(Skills.map((x) => [x, 0]))
    );
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

  get actualClass(): Class | Subclass {
    // Retrieves the class of the character based on subclass progression
    return this.subclass || this.class;
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
