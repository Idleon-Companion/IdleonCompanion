import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter / Active (~70)",
  notes:
    "**430 mana is required to sustain Piercing Arrow, Traps, and UWU Rawr, your main damaging talents.",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "2": "*2",
        "5": "100",
        "6": "*1",
        "7": "*2",
        "10": "100",
        "15": "*2",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n Priority is "Gilded Sword" > "Sharpened Axe".  \n *2 = Excess points may be placed into Mana**, then Agi or "Broken Time".',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "4": "1",
        "5": "40",
        "6": "20",
        "8": "100",
      },
      comment:
        'Put 1 point into the active skills, then max "High Polymer Limbs" followed by 40 points into "Have Another". The remaining points go to "Veins of the Infernal". ',
    },
    {
      skills: {
        "2": "1",
        "3": "1+",
        "5": "40",
        "6": "100",
      },
      comment:
        'Put 1 point into Bear Trap and Uwu Rawrrr. 40 into "Have Another... Again", then get "Looty McShooty" maxed. \n With 430 mana, uwu rawr can be sustained and points should be put in to better match mob\'s respawn timer.',
    },
  ],
  class: Class.Hunter,
};
