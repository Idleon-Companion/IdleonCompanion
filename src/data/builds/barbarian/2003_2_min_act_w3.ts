import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Mining Active / AFK (Warrior) 100+",
  notes: "",
  version: "1.23",
  level: 100,
  tabs: [
    {
      skills: {
        "1": "100+",
        "6": "200+",
        "9": "100*",
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Brute Efficiency, Health Booster, Fist Of Rage and Idle Skilling in that order. Any left over points can go into LUK.",
    },
    {
      skills: {
        "3": "100+",
        "11": "100+",
        "12": "100+",
        "13": "100+",
        "14": "100+",
        "15": "100+",
      },
      comment:
        "Max Copper Collector, Tool Proficiency, Big Pick, Motherlode Miner and Tempestuous Emotions in that order. Extra points can go into HP",
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
