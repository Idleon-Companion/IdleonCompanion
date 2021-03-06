import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman / Active C.Amarok Killer (~90)",
  notes:
    "FMJ Bullet, Midnight Cookie, Golden Kebabs, and Golden Nomwich if you are not afraid to step away and swap to healing food as needed. A single properly used crazy concoctions can one shot Chaotic Amarok in combination with your auto attack. Perfect vial usage is 350 ms (.35 seconds) then release for damage vial, if fast enough you can throw 4 vials making this fight very easy.\n100+ = Checkout books for these talents from the library.",
  version: "1.23",
  level: 90,
  tabs: [
    {
      skills: {
        "2": "3*",
        "5": "100",
        "7": "*1",
        "10": "100+",
        "12": "100+",
        "13": "2*",
      },
      comment:
        '*1 = Boost AGI to have 2.6k+ accuracy AFTER accuracy cards are equipped.\n 2* = After maxing the damage talents, place excess points into "Farsight".\n3* = If you have maxed Farsight, the rest of the points can go into mana.',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "3": "*1",
        "5": "50",
        "6": "100",
        "8": "100+",
        "10": "100",
      },
      comment:
        'Put 1 points into each active skill then max "Power Overwhelming", "Knowledge is Power" and "Individual Insight". Afterwards, put 50 points into "You\'re Next"\n*1 = Extra points can be placed into mana.',
    },
    {
      skills: {
        "1": "100",
        "2": "*2",
        "3": "*2",
        "6": "100+",
        "15": "*1",
      },
      comment:
        'Put 1 point in every active skill. Max "Virile Vials", this will be a huge source of damage. For burst damage, max "Crazy Concoctions".\n*1 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2.\n*2 = Excess points can be used to improve skills. Note that "Auspicious Aura" increases in size every 35 points.',
    },
  ],
  class: Class.Shaman,
};
