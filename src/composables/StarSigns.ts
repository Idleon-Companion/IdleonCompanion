import { EffectData, Effects } from "./Utilities";

export type Constellation = {
  name: string;
  area: string;
  requirement: string;
  points: number;
  count: number;
};

export const Constellations: Constellation[] = [
  {
    name: "A-1",
    area: "Blunder Hills",
    requirement: "Reach Lv 30 on four players",
    points: 3,
    count: 4,
  },
  {
    name: "A-2",
    area: "Where the Branches End",
    requirement: "AFK here for 1+ hours",
    points: 3,
    count: 1,
  },
  {
    name: "A-3",
    area: "Valley of the Beans",
    requirement: "Reach this star on 4 players",
    points: 3,
    count: 4,
  },
  {
    name: "A-4",
    area: "Tucked Away",
    requirement: "Reach this star on 3 players",
    points: 4,
    count: 3,
  },
  {
    name: "A-5",
    area: "The Office",
    requirement: "Defeat Dr. Defecaus on 3 players",
    points: 5,
    count: 3,
  },
  {
    name: "A-6",
    area: "Freefall Caverns",
    requirement: "Reach this star as any Archer Class",
    points: 3,
    count: 1,
  },
  {
    name: "A-7",
    area: "Winding Willows",
    requirement: "AFK here for 24+ hours on 2 players",
    points: 3,
    count: 2,
  },
  {
    name: "A-8",
    area: "Dewdrop Colosseum",
    requirement: "Clear the colosseum on 3 players",
    points: 4,
    count: 3,
  },
  {
    name: "A-9",
    area: "Amarok Arena",
    requirement: "Defeat Amarok in under 20 seconds on 3 players",
    points: 5,
    count: 3,
  },
  {
    name: "A-10",
    area: "Echoing Ingress",
    requirement: "Reach this star as any Mage Class",
    points: 4,
    count: 1,
  },
  {
    name: "B-1",
    area: "The Mimic Hole",
    requirement: "Reach this star on 3 players",
    points: 4,
    count: 3,
  },
  {
    name: "B-2",
    area: "Faraway Piers",
    requirement: "Reach this star as any Mage Class",
    points: 4,
    count: 1,
  },
  {
    name: "B-3",
    area: "The Grandiose Canyon",
    requirement: "AFK here for 36+ hours on 3 players",
    points: 4,
    count: 3,
  },
  {
    name: "B-4",
    area: "Slamabam Straightaway",
    requirement: "Reach this star on 4 players",
    points: 5,
    count: 4,
  },
  {
    name: "B-5",
    area: "Sandstone Colosseum",
    requirement: "Clear the colosseum on 4 players",
    points: 3,
    count: 4,
  },
  {
    name: "B-6",
    area: "Efaunts Tomb",
    requirement: "Defeat Efaunt as any Beginner Class",
    points: 5,
    count: 1,
  },
  {
    name: "B-7",
    area: "Up Up Down Down",
    requirement: "AFK here for 48+ hours on 3 players",
    points: 3,
    count: 3,
  },
  {
    name: "B-8",
    area: "YumYum Grotto",
    requirement: "Reach Lv 65 on four players",
    points: 4,
    count: 4,
  },
  {
    name: "C-1",
    area: "Frostbite Towndra",
    requirement: "Reach Lvl 90 on 6 players",
    points: 6,
    count: 6,
  },
  {
    name: "C-2",
    area: "Steep Sheep Ledge",
    requirement: "Kill a Sheepie barehanded on 4 players",
    points: 4,
    count: 4,
  },
  {
    name: "C-3",
    area: "Trappers Folley",
    requirement: "Reach Lvl 15 Trapping on 5 players",
    points: 4,
    count: 5,
  },
  {
    name: "C-4",
    area: "Refrigeration Station",
    requirement: "AFK here for 60 hours on 3 players",
    points: 4,
    count: 3,
  },
  {
    name: "C-5",
    area: "Rollin' Tundra",
    requirement: "Reach Wave 11 on 4 players",
    points: 5,
    count: 4,
  },
  {
    name: "C-6",
    area: "Thermonuclear Climb",
    requirement: "AFK here for 11 hours on 9 players",
    points: 5,
    count: 9,
  },
  {
    name: "C-7",
    area: "Crystal Basecamp",
    requirement: "Reach this star on 6 players",
    points: 6,
    count: 6,
  },
  {
    name: "C-8",
    area: "Hell hath Frozen Over",
    requirement: "Kill a Bloodbone on 4 players",
    points: 5,
    count: 4,
  },
];

export type StarSign = {
  id: string;
  name: string;
  bonus: Partial<Record<EffectData, number>>;
  cost: number;
};

export const StarSigns: StarSign[] = [
  {
    id: "1",
    name: "The Book Worm",
    bonus: {
      [Effects.ClassExp]: 1,
      [Effects.BaseWIS]: 3,
    },
    cost: 0,
  },
  {
    id: "1a",
    name: "The Buff Guy",
    bonus: {
      [Effects.TotalDamage]: 1,
      [Effects.BaseSTR]: 3,
    },
    cost: 0,
  },
  {
    id: "1b",
    name: "The Fuzzy Dice",
    bonus: {
      [Effects.ExtraTalentPoints]: 3,
      [Effects.BaseLUK]: 3,
    },
    cost: 0,
  },
  {
    id: "2",
    name: "Flexo Bendo",
    bonus: {
      [Effects.MoveSpeed]: 2,
      [Effects.BaseAGI]: 3,
    },
    cost: 0,
  },
  {
    id: "3",
    name: "Dwarfo Beardus",
    bonus: {
      [Effects.MiningEfficiency]: 5,
      [Effects.MiningMultiOre]: 20,
    },
    cost: 2,
  },
  {
    id: "4",
    name: "Hipster Logger",
    bonus: {
      [Effects.ChoppinEfficiency]: 5,
      [Effects.ChoppinMultiLog]: 20,
    },
    cost: 2,
  },
  {
    id: "4a",
    name: "Pie Seas",
    bonus: {
      [Effects.FishingEfficiency]: 5,
      [Effects.FishingMultiFish]: 20,
    },
    cost: 2,
  },
  {
    id: "4b",
    name: "Miniature Game",
    bonus: {
      [Effects.MinigameReward]: 30,
    },
    cost: 2,
  },
  {
    id: "4c",
    name: "Shoe Fly",
    bonus: {
      [Effects.CatchingEfficiency]: 5,
      [Effects.CatchingMultiCatch]: 20,
    },
    cost: 2,
  },
  {
    id: "5",
    name: "Pack Mule",
    bonus: {
      [Effects.CarryCapacity]: 10,
    },
    cost: 2,
  },
  {
    id: "6",
    name: "Pirate Booty",
    bonus: {
      [Effects.DropRate]: 5,
    },
    cost: 2,
  },
  {
    id: "7",
    name: "All Rounder",
    bonus: {
      [Effects.BaseAllStats]: 4,
    },
    cost: 2,
  },
  {
    id: "7a",
    name: "Muscle Man",
    bonus: {
      [Effects.BaseSTR]: 8,
    },
    cost: 1,
  },
  {
    id: "7b",
    name: "Fast Frog",
    bonus: {
      [Effects.BaseAGI]: 8,
    },
    cost: 1,
  },
  {
    id: "7c",
    name: "Smart Stooge",
    bonus: {
      [Effects.BaseWIS]: 8,
    },
    cost: 1,
  },
  {
    id: "7d",
    name: "Lucky Larry",
    bonus: {
      [Effects.BaseLUK]: 8,
    },
    cost: 1,
  },
  {
    id: "8",
    name: "Fatty Doodoo",
    bonus: {
      [Effects.MoveSpeed]: -3,
      [Effects.TotalDefense]: 5,
      [Effects.TotalDamage]: 2,
    },
    cost: 2,
  },
  {
    id: "9",
    name: "Robinhood",
    bonus: {
      [Effects.TotalAccuracy]: 4,
      [Effects.MoveSpeed]: 2,
    },
    cost: 2,
  },
  {
    id: "9a",
    name: "Blue Hedgehog",
    bonus: {
      [Effects.MoveSpeed]: 4,
    },
    cost: 3,
  },
  {
    id: "10",
    name: "Ned Kelly",
    bonus: {
      [Effects.TotalDefense]: 6,
      [Effects.WeaponPower]: 2,
    },
    cost: 2,
  },
  {
    id: "10a",
    name: "The Fallen Titan",
    bonus: {
      [Effects.BossDamage]: 3,
      [Effects.CritChance]: 4,
    },
    cost: 2,
  },
  {
    id: "CR",
    name: "Chronus Cosmos All",
    bonus: {},
    cost: 3,
  },
  {
    id: "11",
    name: "Activelius",
    bonus: {
      [Effects.MonsterExpActive]: 15,
    },
    cost: 2,
  },
  {
    id: "11a",
    name: "Gum Drop",
    bonus: {},
    cost: 2,
  },
  {
    id: "12",
    name: "Mount Eaterest",
    bonus: {
      [Effects.NoFoodConsume]: 10,
      [Effects.FoodEffect]: 15,
    },
    cost: 2,
  },
  {
    id: "13",
    name: "Bob Build Guy",
    bonus: {
      [Effects.TownSkillSpeed]: 10,
    },
    cost: 3,
  },
  {
    id: "14",
    name: "The Big Comatose",
    bonus: {
      [Effects.SkillAfk]: 2,
    },
    cost: 3,
  },
  {
    id: "14a",
    name: "Sir Savvy",
    bonus: {
      [Effects.SkillExp]: 3,
    },
    cost: 3,
  },
  {
    id: "15",
    name: "Silly Snoozer",
    bonus: {
      [Effects.FightingAfk]: 2,
    },
    cost: 3,
  },
  {
    id: "15a",
    name: "The Big Brain",
    bonus: {
      [Effects.ClassExp]: 3,
    },
    cost: 3,
  },
  {
    id: "16",
    name: "Grim Reaper",
    bonus: {
      [Effects.MobRespawn]: 2,
    },
    cost: 4,
  },
  {
    id: "16a",
    name: "The Forsaken",
    bonus: {
      [Effects.TotalHP]: -80,
      [Effects.TotalDefense]: -50,
      [Effects.FightingAfk]: 6,
    },
    cost: 4,
  },
  {
    id: "17",
    name: "The OG Skiller",
    bonus: {
      [Effects.CarryCapacity]: 5,
      [Effects.SkillAfk]: 1,
      [Effects.SkillProwess]: 2,
    },
    cost: 4,
  },
  {
    id: "18",
    name: "Mr No Sleep",
    bonus: {
      [Effects.FightingAfk]: -6,
      [Effects.SkillAfk]: -6,
      [Effects.CarryCapacity]: 30,
    },
    cost: 4,
  },
];
