import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Journeyman AFK (~70)",
  notes:
    "This build is for leveling, and ignores all of the utility talents that provide help with drops and cash.",
  version: "1.40b",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "9": "80",
        "10": "100",
        "15": "100",
      },
      comment:
        "Journeyman has 4 talents that impact damage in tab 1. Once you get those maxed, it is up to you what you want - you can go for HP/defense for survivability, movespeed, etc. \n Accuracy shouldn't be an issue anymore at this point. Use cards and/or upgrade Shaq bubble if you need more.",
    },
    {
      skills: {
        "1": "100",
        "2": "*2",
        "4": "100",
        "6": "100",
        "7": "*1",
        "9": "*1",
        "11": "*2",
        "14": "*2",
        "15": "*2",
      },
      comment:
        "Max Two Punch Man and Indiana Attack. Then, points can be placed into Lucky Hit.\n*1 Excess points split between F\'luk\'ey Fabrics and Lucky Horseshoe.\n*2 Excess points can instead be placed into non-combat bonuses, depending on what you're looking for.",
    },
  ],
  class: Class.Journeyman,
};
