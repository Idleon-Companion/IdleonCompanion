import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / Active (~90)",
  notes:
    "**430 mana is required to sustain Piercing Arrow, Traps, and UWU Rawr, your main damaging talents.",
  version: "1.23",
  level: 90,
  tabs: [
    {
      skills: {
        "2": "*2",
        "4": "*3",
        "5": "100+",
        "6": "*1",
        "7": "*3",
        "10": "100+",
        "15": "*3",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n Max "Gilded Sword" & "Sharpened Axe". \n *2 = Get 430 **mana to sustain active talents. \n *3 = Excess points may be placed into preferably Agi, can do HP/Def, or "Broken Time".',
    },
    {
      skills: {
        "1": "40",
        "2": "1",
        "3": "*1",
        "4": "1",
        "5": "100",
        "6": "100+",
        "8": "100+",
      },
      comment:
        'Level 40 "Piercing Arrow" to be able to hit 3 mobs, and 1 point into kick. Max "High Polymer Limbs" followed by "Have Another" and "Veins of the Infernal". \n *1 = Excess points may be put into HP/MP',
    },
    {
      skills: {
        "2": "30+",
        "3": "*1",
        "5": "40",
        "6": "100+",
      },
      comment:
        'Put 30 points into "Bear Trap" for an additional trap placed, 40 into "Have Another... Again", then get "Looty McShooty" maxed. \n *1 = With 430 mana, uwu rawr can be sustained and points should be put in.',
    },
  ],
  class: Class.Hunter,
};
