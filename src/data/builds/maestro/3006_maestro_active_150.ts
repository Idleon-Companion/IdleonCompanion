import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro Active (150)",
  notes:
    "The idea behind this build is to farm crystals for Crystal Countdown and Statues. Do not run active MMan if you can not tank several attacks from crystal mobs. ",
  version: "1.40b",
  level: 150,
  tabs: [
    {
      skills: {
        "1": "*1",
        "4": "*1",
        "5": "160",
        "9": "1+",
        "10": "160",
        "11": "*3",
        "13": "100+",
        "14": "*2",
      },
      comment:
        "*1 If you need Survivability. *2 Assign points here if you find yourself running out of space. \n *3 Happy Dude boosts EXP for Smithing and Alchemy. Put points int AGI and WIS to boost these skills even more.",
    },
    {
      skills: {
        "1": "*1",
        "4": "160",
        "5": "160",
        "6": "100+",
        "7": "100+",
        "8": "1+",
        "9": "100+",
        "10": "*2",
        "12": "160",
        "15": "160",
      },
      comment:
        "*1 Assign enough points for whip to 1shot. *2 Only lvl this if it doesn't reduce your kill speed.",
    },
    {
      skills: {
        "2": "160",
        "4": "160",
        "6": "*2",
        "8": "160",
        "11": "*3",
        "12": "1",
        "15": "*1",
      },
      comment:
        "Do not put more than 1 point into Crystal Countdown. *1 Use this to max tab 2. Use *2 for class EXP and *3 for more Smithing and Alchemy EXP.",
    },
  ],
  class: Class.Maestro,
};
