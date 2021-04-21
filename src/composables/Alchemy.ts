export type Color = "Orange" | "Green" | "Purple" | "Yellow";

export type Vial = {
  name: string;
  roll: number;
  material: string;
  base: number;
  effect?: string;
};

export const Vials: Vial[] = [
  {
    name: "Copper Corona",
    roll: 1,
    material: "Copper_Ore",
    base: 3,
    effect: "% Orange Bubble Cauldron Brew Speed",
  },
  {
    name: "Sippy Splinters",
    roll: 10,
    material: "Oak_Logs",
    base: 3,
  },
  {
    name: "Mushroom Soup",
    roll: 20,
    material: "Spore_Cap",
    base: 3,
  },
  {
    name: "Spool Sprite",
    roll: 30,
    material: "Thread",
    base: 3,
  },
  {
    name: "Barium Mixture",
    roll: 40,
    material: "Copper_Bar",
    base: 3,
  },
  {
    name: "Dieter Drenk",
    roll: 40,
    material: "Bean_Slices",
    base: 1,
  },
  {
    name: "Thumb Pow",
    roll: 50,
    material: "Trusty_Nails",
    base: 1,
  },
  {
    name: "Skinny O Cal",
    roll: 60,
    material: "Snake_Skin",
    base: 2.5,
  },
  {
    name: "Jungle Juice",
    roll: 60,
    material: "Jungle_Logs",
    base: 1,
  },
  {
    name: "Barley Brew",
    roll: 65,
    material: "Iron_Bar",
    base: 1,
  },
  {
    name: "Anearful",
    roll: 70,
    material: "Goblin_Ear",
    base: 2,
  },
  {
    name: "Tea with Pea",
    roll: 75,
    material: "Potty_Rolls",
    base: 3,
  },
  {
    name: "Gold Guzzler",
    roll: 83,
    material: "Gold_Ore",
    base: 1,
  },
  {
    name: "Ramificoction",
    roll: 84,
    material: "Bullfrog_Horn",
    base: 1,
  },
  {
    name: "Seawater",
    roll: 87,
    material: "Goldfish",
    base: 1,
  },
  {
    name: "Fly in my Drink",
    roll: 87,
    material: "Fly",
    base: 3,
  },
  {
    name: "Slug Slurp",
    roll: 89,
    material: "Hermit_Can",
    base: 2,
  },
  {
    name: "Mimicraught",
    roll: 90,
    material: "Megalodon_Tooth",
    base: 1,
  },
  {
    name: "Tail Time",
    roll: 91,
    material: "Rats_Tail",
    base: 0.5,
  },
  {
    name: "Blue Flav",
    roll: 93,
    material: "Platinum_Ore",
    base: -3.33,
  },
  {
    name: "Pickle Jar",
    roll: 99,
    material: "BobJoePickle",
    base: 50,
  },
];
export const VialCost = [
  0,
  100,
  1e3,
  2.5e3,
  10e3,
  50e3,
  100e3,
  500e3,
  1e6 + 1,
  5e6,
  25e6,
  100e6,
  1e9,
];
