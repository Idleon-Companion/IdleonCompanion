import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Bowman / AFK (~50)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. \n  If you\'re low on defense, by this point equipping food to stay alive is normal and expected.",
  version: "1.40b",
  level: 50,
  tabs: [
    {
      skills: {
        "5": "60",
        "6": "*1",
        "10": "60",
        "12": "5-20",
        "14": "50",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. \n"Idle Shooting" to 50 for 10% AFK gain rate. \n Bowman\'s core concept is "SpeedNA" gives damage based on every 15% movement speed so we\'re aiming for 130% with "Featherweight" & "Strafe". Priority is "Featherweight" to 5-20 > "Gilded Sword" > "Sharpened Axe". ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "*1",
        "5": "10",
        "6": "*5-15",
        "8": "50",
      },
      comment:
        'Level "Polymer Limbs" to 50, then your active damage skills to 25. Afterwards, level up "Have Another" to 10. \n *1 = Level up "Strafe" to achieve 130% movement speed with points into featherweight into tab 1. This should be around 40 points. \n Excess points goes into "Veins of the Infernal". ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "1",
        "6": "40",
      },
      comment:
        'Level up "Homing Arrow" and "Magic Shortbow" to 30. Value point into "Extendo Rangeo" for that sweet 3 accuracy. Activate before AFK. \n Then raise "SpeedNA" to 40+.',
    },
  ],
  class: Class.Bowman,
};
