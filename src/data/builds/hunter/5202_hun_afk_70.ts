import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (~70)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents and "Have Another!" if you are using Prayers that increase mob hp.",
  version: "1.40b",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "6": "*1",
        "10": "100",
        "14": "50",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n"Idle Shooting" to 50 for 10% AFK gain rate. \n Priority is then "Gilded Sword" & "Sharpened Axe".',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "25",
        "5": "30",
        "6": "50",
        "8": "100",
      },
      comment:
        'Equip attack talents in your attack bar and activate "Strafe" before going offline.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "5": "25",
        "6": "100",
        "11": "*1",
      },
      comment:
        '*1 Excess points may be placed into "Eagle Eye" for Trapping',
    },
  ],
  class: Class.Hunter,
};
