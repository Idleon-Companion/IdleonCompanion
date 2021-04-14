import { Effects } from "./Utilities";

export enum CardCategory {
  BlunderHills = "Blunder Hills",
  YumYumDesert = "Yum Yum Desert",
  FrostbiteTundra = "Frostbite Tundra",
  EasyResources = "Easy Resources",
  MediumResources = "Medium Resources",
  Bosses = "Bosses",
  Events = "Events",
}

export type Card = {
  id: string;
  category: CardCategory;
  effect: Effects;
  base: number;
  source?: string;
};

export const Cards: Card[] = [
  {
    id: "Green_Mushroom",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseHP,
    base: 12,
    source: "Green Mushrooms (1/10,000)",
  },
  {
    id: "Red_Mushroom",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseLUK,
    base: 3,
  },
  {
    id: "Frog",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseMP,
    base: 10,
  },
  {
    id: "Bored_Bean",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseDamage,
    base: 7,
  },
  {
    id: "Slime",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseWIS,
    base: 2,
  },
  {
    id: "Baby_Boa",
    category: CardCategory.BlunderHills,
    effect: Effects.MoveSpeed,
    base: 1,
  },
  {
    id: "Carrotman",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseAGI,
    base: 2,
  },
  {
    id: "Glublin",
    category: CardCategory.BlunderHills,
    effect: Effects.TotalHP,
    base: 2,
  },
  {
    id: "Wode_Board",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseSTR,
    base: 2,
  },
  {
    id: "Gigafrog",
    category: CardCategory.BlunderHills,
    effect: Effects.CardChance,
    base: 5,
  },
  {
    id: "Poop",
    category: CardCategory.BlunderHills,
    effect: Effects.CrystalChance,
    base: 10,
  },
  {
    id: "Rat",
    category: CardCategory.BlunderHills,
    effect: Effects.CritChance,
    base: 1,
  },
  {
    id: "Walking_Stick",
    category: CardCategory.BlunderHills,
    effect: Effects.BaseWIS,
    base: 5,
  },
  {
    id: "Nutto",
    category: CardCategory.BlunderHills,
    effect: Effects.MonsterMoney,
    base: 5,
  },
  {
    id: "Crystal_Carrot",
    category: CardCategory.BlunderHills,
    effect: Effects.DropRate,
    base: 5,
  },
  {
    id: "Wood_Mushroom",
    category: CardCategory.BlunderHills,
    effect: Effects.TotalAccuracy,
    base: 5,
  },
  {
    id: "Sandy_Pot",
    category: CardCategory.YumYumDesert,
    effect: Effects.ExpConversion,
    base: 12,
    source: "Sandy Pot (1/10,000)",
  },
];
