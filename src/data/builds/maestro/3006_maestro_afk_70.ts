import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro AFK (~70)",
  notes:
    " ",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "9": "*1",
        "10": "100",
        "15": "100",
      },
      comment:
        "Max Gilded Sword and Sharpened Axe. Then place 100 points into Sleeping\' On The Job.\n*1 For more droprate, EXP, and damage, excess points can be placed into Lucky Clover.",
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
    {
      skills: {
        "1": "100",
        "2": "*2",
        "4": "100",
        "6": "*2",
        "15": "*1",
      },
      comment:
        "Place 100 into Coin Toss, then Triple Jab.\n*1 Jman Was Better if you need more Tab 2 points.\n*2 Excess points can go into Lucky Charms for EXP or Skillage Damage for more Damage.",
    },
  ],
  class: Class.Maestro,
};
