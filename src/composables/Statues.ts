import { EffectData, Effects } from "./Utilities";

// All statues in the game
type Statue = {
  base: number;
  effect: EffectData;
};

export type StatueName =
  | "Power"
  | "Speed"
  | "Mining"
  | "Feasty"
  | "Health"
  | "Kachow"
  | "Lumberbob"
  | "Thicc Skin"
  | "Oceanman"
  | "Ol Reliable"
  | "Exp Book"
  | "Anvil"
  | "Cauldron"
  | "Beholder"
  | "Bullseye"
  | "Box"
  | "Twosoul"
  | "EhExPee"
  | "Seesaw";

// Metadata to keep track of for statues
export type StatueInfo = {
  level: number;
  progress: number; // Number of statues to next level
  golden: boolean; // Whether the statue has been upgraded to gold
};

export const Statues: Record<StatueName, Statue> = {
  Power: {
    base: 3,
    effect: Effects.BaseDamage,
  },
  Speed: {
    base: 0.1,
    effect: Effects.MoveSpeed,
  },
  Mining: {
    base: 0.3,
    effect: Effects.MiningBase,
  },
  Feasty: {
    base: 1,
    effect: Effects.FoodEffect,
  },
  Health: {
    base: 3,
    effect: Effects.BaseHP,
  },
  Kachow: {
    base: 0.4,
    effect: Effects.CritDamage,
  },
  Lumberbob: {
    base: 0.3,
    effect: Effects.ChoppinBase,
  },
  "Thicc Skin": {
    base: 1,
    effect: Effects.BaseDefense,
  },
  Oceanman: {
    base: 0.3,
    effect: Effects.FishingBase,
  },
  "Ol Reliable": {
    base: 0.3,
    effect: Effects.CatchingBase,
  },
  "Exp Book": {
    base: 0.1,
    effect: Effects.ClassExp,
  },
  Anvil: {
    base: 0.5,
    effect: Effects.ProductionSpeed,
  },
  Cauldron: {
    base: 0.5,
    effect: Effects.AlchemyExp,
  },
  Beholder: {
    base: 0.2,
    effect: Effects.CritChance,
  },
  Bullseye: {
    base: 0.8,
    effect: Effects.TotalAccuracy,
  },
  Box: {
    base: 0.3,
    effect: Effects.TrappingBase,
  },
  Twosoul: {
    base: 0.3,
    effect: Effects.WorshipBase,
  },
  EhExPee: {
    base: 0.1,
    effect: Effects.SkillExp,
  },
  Seesaw: {
    base: 0.5,
    effect: Effects.ConstructionExp,
  },
};
