import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (~70)",
  notes:
    "Leveling up active skills directly increase AFK kills/hr, so we level them past 1.",
  version: "1.23",
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
        "1": "50",
        "2": "50",
        "4": "1",
        "5": "30",
        "6": "15",
        "8": "100",
      },
      comment:
        'Level "Polymer Limbs" to 100, active damage skills to 50, and then value point into "Strafe" and activate it before going offline. Afterwards, level up "Have Another" to 30 & "Veins of the Infernal" to 15.',
    },
    {
      skills: {
        "1": "50",
        "2": "50",
        "5": "30",
        "6": "40",
        "11": "*1",
      },
      comment:
        'Level up "360 Noscope" and "Bear Trap" to 50. \n Then raise "Have another... Again" to 30 and "Looty Mcshooty" to 40 or so. \n *1 = Points may be taken from active skills or excess points may be placed into "Eagle Eye" for Trapping',
    },
  ],
  class: Class.Hunter,
};
