import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / AFK (~90)",
  notes:
    "Leveling up active skills directly increase AFK kills/hr, so we level them past 1.",
  version: "1.23",
  level: 90,
  tabs: [
    {
      skills: {
        "1": "*2",
        "5": "100+",
        "6": "*1",
        "7": "*2",
        "10": "100+",
        "12": "10",
        "14": "100+",
        "15": "*2",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n"Idle Shooting" to 100 for 13% AFK gain rate. \n Max "Gilded Sword" & "Sharpened Axe", 10 into "Featherweight" for MS. \n *2 = Excess points may go here.',
    },
    {
      skills: {
        "1": "70",
        "2": "70",
        "4": "1",
        "5": "50",
        "6": "20",
        "8": "100+",
      },
      comment:
        'Level "Polymer Limbs" to max, active damage skills to 70, and then value point into "Strafe" and activate it before going offline. Afterwards, level up "Have Another" to 50 & "Veins of the Infernal" to 20. \n Excess points into "Veins of the Infernal" or "Have Another".',
    },
    {
      skills: {
        "1": "50",
        "2": "50",
        "5": "30",
        "6": "50",
        "11": "*1",
        "15": "*1",
      },
      comment:
        'Level up "360 Noscope" and "Bear Trap" to 50. \n Then raise "Have another... Again" to 30 and "Looty Mcshooty" to 50 or so. \n "*1 = "Eagle Eye" should be taken here for trapping. Excess points can be placed into "Previous Points".',
    },
  ],
  class: Class.Hunter,
};
