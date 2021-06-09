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
];
