import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Fishing Active / AFK (Barb) 50+",
  notes:
    " ",
  version: "1.23",
  level: 50,
  tabs: [
    {
      skills: {
        "6": "*1",
        "11": "100",
        "15": "100",
      },
      comment:
        'Place points into Brute Efficiency, and then Idle Skilling.\n\*1 Excess points can be placed into STR.',
    },
    {
      skills: {
        "5": "100",
        "9": "100",
        "15": "*1",
      },
      comment:
        'Maxing "Absolute Unit" and "Firmly Grasp it" for efficiency.\n*1 Excess points can be place into "Tempestous Emotions" for extra xp.',
    },
    {
      skills: {
        "11": "100",
        "12": "*1",
        "14": "30",
      },
      comment:
        'Max "Worming Undercover". Then place points into "Catching some ZZZ\'s"\n*1 Boost it to around your minigame score.',
    },
  ],
  class: Class.Barbarian,
};
