export type Color = "Orange" | "Green" | "Purple" | "Yellow";

export type Vial = {
  name: string;
  roll: number;
  material: string;
  base: number;
  effect: string;
};

export const Vials: Partial<Vial>[] = [
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
    material: "Spore_Cap",
  },
  {
    material: "Thread",
  },
  {
    material: "Copper_Bar",
  },
  {
    material: "Bean_Slices",
  },
  {
    material: "Trusty_Nails",
  },
  {
    material: "Snake_Skin",
  },
  {
    material: "Jungle_Logs",
  },
  {
    material: "Iron_Bar",
  },
  {
    material: "Goblin_Ear",
  },
  {
    material: "Potty_Rolls",
  },
  {
    material: "Gold_Ore",
  },
  {
    material: "Bullfrog_Horn",
  },
  {
    material: "Goldfish",
  },
  {
    material: "Fly",
  },
  {
    material: "Hermit_Can",
  },
  {
    material: "Megalodon_Tooth",
  },
  {
    material: "Rats_Tail",
  },
  {
    material: "Platinum_Ore",
  },
  {
    material: "BobJoePickle",
  },
  {
    material: "Thread",
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
