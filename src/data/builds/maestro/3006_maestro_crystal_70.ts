import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro Active - Crystal Cards (~70)",
  notes:
    "The goal of this build is to farm Crystal Cards",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "9": "*2",
        "10": "100",
        "12": "*1",
        "13": "100",
      },
      comment:
        "Max Gilded Sword and Sharpened Axe. Then place 100 points into Feather Flight.\n*1 For more damage, excess points can go into Knucklebuster.\n*2 For more droprate and EXP, points can be placed into Lucky Clover.",
    },
    {
      skills: {
        "4": "100",
        "5": "100",
        "12":"100",
        "14":"*1",
      },
      comment:
        "Max Cmon Out Crystals, and Two Punch Man. Then max Gimme Gimme.\n*1 Excess points can go into Cards Galore.",
    },
    {
      skills: {
        "2": "100",
        "4": "100",
        "6": "*1",
        "12": "1",
      },
      comment:
        "Place 1 point into Crystal Countdown. The skill is bugged, so you do not want to level it further. Place 100 into Triple Jab, then Skillage Damage.\n*1 Excess poitns can go into Lucky Charms.",
    },
  ],
  class: Class.Maestro,
};
