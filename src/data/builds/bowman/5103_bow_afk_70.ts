import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Bowman / AFK (~70)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. \n Activate Strafe and Extendo Rango before AFK.",
  version: "1.40b",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "90",
        "6": "*1",
        "10": "90",
        "12": "5-20",
        "14": "50",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n"Idle Shooting" to 50 for 10% AFK gain rate. \n Bowman\'s core concept is "SpeedNA" gives damage based on every 15% movement speed so we\'re aiming for 130% with "Featherweight" & "Strafe", or ideally 145%. Priority is "Featherweight" to 5-20 > "Gilded Sword" & "Sharpened Axe".',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "*1",
        "5": "15",
        "6": "30",
        "8": "100",
      },
      comment:
        'Level "Polymer Limbs" to 100, then your active damage skills to 25. Afterwards, level up "Have Another" to 15 & "Veins of the Infernal" to 30. \n *1 Level up "Strafe" to achieve 130% movement speed with points into featherweight into tab 1. This should be around 40 points.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "1",
        "6": "60",
        "15": "*1",
      },
      comment:
        'Level up "Homing Arrow" and "Magic Shortbow" to 25. Value point into "Extendo Rangeo" for that sweet 4 accuracy. \n Then raise "SpeedNA" to 60+. \n *1 Points can be invested back into tab 2. Eventually you want to aim for 145% MS. 50 points into Strafe would add another 15% MS for another "SpeedNA" bonus.',
    },
  ],
  class: Class.Bowman,
};
