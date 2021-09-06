import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro Active (~70)",
  notes:
    " ",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "9": "100",
        "10": "100",
        "13": "*1",
      },
      comment:
        "Max Gilded Sword and Sharpened Axe. Then place 100 points into Lucky Clover.\n*1 Excess points can go to Feather Flight.",
    },
    {
      skills: {
        "1": "100",
        "2": "*2",
        "4": "100",
        "5": "*2",
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
    {
      skills: {
        "1": "100",
        "2": "*2",
        "4": "100",
        "6": "*2",
        "12": "1",
        "15": "*1",
      },
      comment:
        "Place 100 into Triple Jab, then Coin Toss. Place 1 point into Crystal Countdown.\n*1 Jman Was Better if you need more Tab 2 points.\n*2 Excess points can go into Lucky Charms for EXP or Skillage Damage for more Damage.",
    },
  ],
  class: Class.Maestro,
};
