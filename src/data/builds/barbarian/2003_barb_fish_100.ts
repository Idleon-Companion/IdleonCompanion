import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Fishing Active / AFK (Barb) 100+",
  notes: "Do not level your fishing skill higher than your MMan's fishing skill.",
  version: "1.40b",
  level: 100,
  tabs: [
    {
      skills: {
        "6": "100+",
        "7": "*1",
        "8": "*1",
        "9": "*1",
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Brute Efficiency, Fist of Rage, and Idle Skilling in that order.\n*1 Leftover points can be put into LUK, AGI or WIS.",
    },
    {
      skills: {
        "5": "100+",
        "7": "*1",
        "9": "100+",
        "15": "100+",
      },
      comment:
        "Max Firmly Grasp It, Absolute Unit and Tempestuous Emotions in that order. Points can also be put into 'Str'ess Tested Garb if more STR is desired.",
    },
    {
      skills: {
        "9": "*2",
        "11": "100+",
        "12": "*1",
        "13": "100+",
        "14": "100+",
      },
      comment:
        "Max Worming Undercover, STR Summore, Strongest Statues, All Fish Diet and Catching Some ZZZ's.\n*1 Level it up to your minigame score \n*2 Excess can be used to improve STR.",
    },
  ],
  class: Class.Barbarian,
};
