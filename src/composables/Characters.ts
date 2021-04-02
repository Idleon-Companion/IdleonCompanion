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
  statues: Record<string, number>;
};

const characters = ref(Array<Character>());
const charIndex = ref(0);

export function useCharacters() {
  const numCharacters = computed(() => {
    return characters.value.length;
  });

  const curCharacter = computed(() => {
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
    console.log("Saving!", characters.value);
    localStorage.setItem("chars", JSON.stringify(characters.value));
  };

  return {
    characters,
    charIndex,
    curCharacter,
    numCharacters,
    nextCharacter,
    prevCharacter,
    saveCharacters,
  };
}
