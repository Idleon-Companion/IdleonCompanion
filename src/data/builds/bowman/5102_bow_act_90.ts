import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Bowman / Active (~90)",
  notes: "",
  version: "1.23",
  level: 90,
  tabs: [
    {
      skills: {
        "1": "*2",
        "4": "*2",
        "5": "100+",
        "6": "*1",
        "7": "*2",
        "10": "100+",
        "12": "20",
        "15": "*2",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n Bowman\'s core concept is "SpeedNA", gives damage based on every 15% movement speed so we\'re aiming for 145% with "Featherweight" & "Strafe". \n Priority is "Featherweight" to 20, then "Gilded Sword" > "Sharpened Axe". *2 = Excess points may be placed into HP/Def/"Broken Time" or Agi.',
    },
    {
      skills: {
        "1": "40",
        "2": "1",
        "3": "*2",
        "4": "1*",
        "5": "50",
        "6": "100",
        "7": "*2",
        "8": "100+",
        "9": "*2",
        "15": "*2",
      },
      comment:
        'Level 40 "Piercing Arrow" to be able to hit 3 mobs, and 1 point into kick. Max "High Polymer Limbs" followed by 50 points into "Have Another" & 100 into "Veins of the Infernal". \n *1 = Level up "Strafe" to achieve 145% movement speed with points into "Featherweight" into tab 1. This should be around 85 points. \n *2 = Excess points may be put into HP/MP, Smithing EXP, or more Agi.',
    },
    {
      skills: {
        "1": "1+",
        "2": "1",
        "4": "1+",
        "6": "100+",
        "15": "100+",
      },
      comment:
        'Put 1 point into active skills, then get speedNA maxed. \n Points will be invested back into tab 2 for "Strafe" to aim for 145% MS. Excess points may be used for "Homing Arrow" for bossing, or "Extendo Range" to reach required accuracy.',
    },
  ],
  class: Class.Bowman,
};
