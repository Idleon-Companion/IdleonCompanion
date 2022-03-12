import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (~90)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk.",
  version: "1.40b",
  level: 90,
  tabs: [
    {
      skills: {
        "1": "*1",
        "4": "*1",
        "5": "75+",
        "6": "1+",
        "7": "1+",
        "10": "75+",
        "12": "10",
        "14": "100+",
        "15": "75",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. *1 If you need Survivability.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "50+",
        "6": "50+",
        "7": "1+",
        "8": "100+",
        "9": "1+",
      },
      comment:
        'Level "Polymer Limbs" to max, active damage skills to 70, and then value point into "Strafe" and activate it before going offline. \n Excess points into "Veins of the Infernal"',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "5": "25",
        "6": "100+",
        "11": "140+",
        "15": "*1",
      },
      comment:
        'Max "Eagle Eye" for trapping. With a high enough skill lvl and "Poison Froge Vial" you can collect more than 100% critters despite the skill saying otherwise. \n Excess points can be placed into "Previous Points".',
    },
  ],
  class: Class.Hunter,
};
