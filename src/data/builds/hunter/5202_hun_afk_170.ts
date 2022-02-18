import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (170+)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents and "Have Another!" if you are using Prayers that increase mob hp.",
  version: "1.40b",
  level: 150,
  tabs: [
    {
      skills: {
        "1": "100+",
        "4": "50",
        "5": "160",
        "7": "260",
        "10": "160",
        "11": "160",
        "12": "100",
        "14": "160",
        "15": "160",
      },
      comment:
        'Book "Idle Shooting" and "Broken Time" to max lvl first. Increase WIS for alchemy gains if you have spare points. Max "Elusive Efficiency" if you can afford it and do not wish to switch presets when placing traps.',
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
        "6": "160",
        "8": "100+",
        "9": "160",
        "11": "160",
        "12": "160",
        "14": "160",
        "15": "*1",
      },
      comment:
        'Max "Eagle Eye" for trapping. With a high enough skill lvl and "Poison Froge Vial" you can collect more than 100% critters despite the skill saying otherwise. Max "Invasive Species" and "Reflective Eyesight" if you can afford it and do not wish to switch presets when placing traps',
    },
  ],
  class: Class.Hunter,
};
