import { ref, Ref } from "vue";

export class StateManager {
  private version: string;

  constructor(version: string) {
    console.log(`Idleon Companion loaded - v${version}`);
    this.version = version;
    // Perform version controlling here
  }

  // Load data from local storage
  load(key: string): any {
    return localStorage.getItem(key);
  }

  // Save a value in local storage
  save(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}

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
// Characters keep track of individual data
export type Character = {
  class: Class;
  subclass: Subclass | null;
  level: number;
  name: string;
  items: Record<string, boolean>;
  statues: Record<string, number>;
};
export class CharacterManager {
  public characters: Ref<Array<Character>>;
  private index: number;

  constructor(characters: Array<Character>) {
    this.characters = ref(characters);
    this.index = 0;
  }

  get numCharacters(): number {
    return this.characters.value.length;
  }

  get curCharacter(): Character | null {
    if (this.numCharacters > 0) {
      return this.characters.value[this.index];
    } else {
      return null;
    }
  }

  // Cycle to next character
  nextCharacter() {
    if (this.numCharacters > 0) {
      this.index = (this.index + 1) % this.numCharacters;
    }
  }

  // Cycle to previous character
  prevCharacter() {
    if (this.numCharacters > 0) {
      this.index = (this.index - 1) % this.numCharacters;
    }
  }
}
