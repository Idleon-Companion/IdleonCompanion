import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Mining Active / AFK (Barb) 100+",
  notes: "",
  version: "1.23",
  level: 100,
  tabs: [
    {
      skills: {
        "1": "100+",
        "6": "150+",
        "9": "*1",
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Brute Efficiency, Idle Skilling, Health Booster, and Fist Of Rage in that order.\n*1 Any left over points can go into LUK to improve Droprate.",
    },
    {
      skills: {
        "3": "*2",
        "5": "*1",
        "9": "*1",
        "11": "100+",
        "12": "100+",
        "13": "100+",
        "14": "100+",
        "15": "*3",
      },
      comment:
        "Max Big Pick, Copper Collector, Tool Proficiency, and Motherlode Miner.\n*1 Excess points can go into Firmly Grasp it or Absolute Unit for more Str.\n*2 Points can also go into HP\n*3 If you need EXP, you can level Tempestuous Emotions",
    },
    {
      skills: {
        "7": "*1",
        "8": "100+",
        "9": "100+",
        "15": "100+",
      },
      comment:
        "Max Back to Basics, Strongest Statues and STR Summore in that order. If you are using Obols with STR and have left over points, level Fistful of Obol as well.",
    },
  ],
  class: Class.Barbarian,
};
