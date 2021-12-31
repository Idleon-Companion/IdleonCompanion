import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman / AFK (~90)",
  notes: "100+ = Checkout books for these talents from the library.",
  version: "1.23",
  level: 90,
  tabs: [
    {
      skills: {
        "5": "100+",
        "7": "*1",
        "8": "*2",
        "10": "100+",
        "12": "100+",
        "14": "100+",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Casting" to 100 for 13% AFK gain rate.\nPriority switches to "Overclocked Energy" > "Gilded Sword" > "Sharpened Axe"\n*2 = Excess points into WIS for more damage and brewing speed. ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "6": "*2",
        "8": "100+",
        "10": "*2",
      },
      comment:
        'If you are not AFK damage capped, you can add more points into "Energy Bolt" and "Mini Fireball" until you hit cap.\n*2 = Spread excess points equally between "Knowledge is Power" and "Individual Insight".',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "100+",
        "13": "*2",
        "15": "*1",
      },
      comment:
        'Place points into "Virile Vials".\n*1 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2.\n *2 = If you have capped your damage, excess points can go into alchemy talents. This build does not prominently focus on alchemy, and so you are likely to only have enough talent points to level "Bubble Breakthrough".\n With 25 in all attack talents on 2nd and 3rd tab you should be dmg capped. Only put more points into these talents if you are not dmg capped.\n Do not forget to put them into your quick bar.  ',
    },
  ],
  class: Class.Shaman,
};
