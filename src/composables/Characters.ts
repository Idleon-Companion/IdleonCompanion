import { computed, ref } from "vue";

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

// Characters keep track of individual data
export type Character = {
  class: Class;
  subclass: Subclass | null;
  level: number;
  name: string;
  items: Record<string, boolean>;
  skills: Record<string, number>;
  statues: Record<string, number>;
};

const characters = ref(Array<Character>());
const charIndex = ref(0);

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

  // Save data to local storage
  const saveCharacters = () => {
    localStorage.setItem("chars", JSON.stringify(characters.value));
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
    switch (value) {
      case Subclass.Barbarian:
        curCharacter.value.class = Class.Warrior;
        curCharacter.value.subclass = value;
        break;
      case Subclass.Squire:
        curCharacter.value.class = Class.Warrior;
        curCharacter.value.subclass = value;
        break;
      case Subclass.Bowman:
        curCharacter.value.class = Class.Archer;
        curCharacter.value.subclass = value;
        break;
      case Subclass.Hunter:
        curCharacter.value.class = Class.Archer;
        curCharacter.value.subclass = value;
        break;
      case Subclass.Shaman:
        curCharacter.value.class = Class.Mage;
        curCharacter.value.subclass = value;
        break;
      case Subclass.Wizard:
        curCharacter.value.class = Class.Mage;
        curCharacter.value.subclass = value;
        break;
      case Subclass.Journeyman:
        curCharacter.value.class = Class.Beginner;
        curCharacter.value.subclass = value;
        break;
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
