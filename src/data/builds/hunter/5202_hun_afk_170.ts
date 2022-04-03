import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (~170)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. Put more points into attack talents and \"Have Another!\" if you are using Prayers that increase mob hp.",
  version: "1.40b",
  level: 170,
  tabs: [
    {
      skills: {
        "1": "*2",
        "4": "*2",
        "5": "160",
        "6": "100",
        "7": "260",
        "8": "100",
        "10": "160",
        "11": "*1",
        "12": "100",
        "14": "160",
        "15": "160",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. *1 If you got enough points and do not wish to change presets when placing traps. \n *2 assign points here if you wish to use no healing food during afk. 50 in "Bucklered Up" are enoguh rest into Hp. ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "*1",
        "4": "160",
        "6": "160",
        "7": "160",
        "8": "160",
        "9": "160",
        "11": "120",
        "13": "*2",
        "15": "*2",
      },
      comment:
        '*1 Max this and Hp from tab 1 if you wish to "No food". *2 Max these two if you can afford it. They are needed to lvl Smithing for "Vines of the Infernal"',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "6": "160",
        "8": "100+",
        "9": "160",
        "11": "140+",
        "12": "*1",
        "14": "100+",
      },
      comment:
        'Max "Eagle Eye" for trapping. With a high enough skill lvl and "Poison Froge Vial" you can collect more than 100% critters despite the skill saying otherwise. \n *1 If you got enough points and do not wish to change presets when placing traps.',
    },
  ],
  class: Class.Hunter,
};
