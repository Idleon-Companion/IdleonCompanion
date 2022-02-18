import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (~90)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents and "Have Another!" if you are using Prayers that increase mob hp.",
  version: "1.40b",
  level: 90,
  tabs: [
    {
      skills: {
        "1": "*1",
        "4": "*1",
        "5": "100+",
        "6": "1+",
        "7": "1+",
        "10": "100+",
        "12": "10",
        "14": "100+",
        "15": "100+",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. *1 If you need Survivability.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "50+",
        "5": "25",
        "6": "100+",
        "7": "100+",
        "8": "100+",
        "9": "1+",
      },
      comment:
        'Level "Polymer Limbs" to max, active damage skills to 70, and then value point into "Strafe" and activate it before going offline. Afterwards, level up "Have Another" to 50 & "Veins of the Infernal" to 20. \n Excess points into "Veins of the Infernal" or "Have Another".',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "5": "25",
        "6": "100+",
        "11": "160",
        "15": "*1",
      },
      comment:
        'Max "Eagle Eye" for trapping. With a high enough skill lvl and "Poison Froge Vial" you can collect more than 100% critters despite the skill saying otherwise. \n Excess points can be placed into "Previous Points".',
    },
  ],
  class: Class.Hunter,
};
