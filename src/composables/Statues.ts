import { Effects } from "./Utilities";

// All statues in the game
type Statue = {
  base: number;
  effect: Effects;
};

export const Statues: Record<string, Statue> = {
  Anvil: { base: 0.5, effect: Effects.ProductionSpeed },
  Beholder: { base: 0.2, effect: Effects.CritChance },
  Bullseye: { base: 0.8, effect: Effects.TotalAccuracy },
  Cauldron: { base: 0.5, effect: Effects.AlchemyExp },
  "Exp Book": { base: 0.1, effect: Effects.ClassExp },
  Feasty: { base: 1, effect: Effects.FoodEffect },
  Health: { base: 3, effect: Effects.BaseHP },
  Kachow: { base: 0.4, effect: Effects.CritDamage },
  Lumberbob: { base: 0.3, effect: Effects.ChoppinPower },
  Mining: { base: 0.3, effect: Effects.MiningPower },
  Oceanman: { base: 0.3, effect: Effects.FishingPower },
  "Ol Reliable": { base: 0.3, effect: Effects.CatchingPower },
  Power: { base: 3, effect: Effects.BaseDamage },
  Speed: { base: 0.1, effect: Effects.MoveSpeed },
  "Thicc Skin": { base: 1, effect: Effects.BaseDefense },
};
