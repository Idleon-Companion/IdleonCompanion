import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman / AFK (~90)",
  notes: "100+ = Checkout books for these talents from the library.",
  version: "1.40b",
  level: 90,
  tabs: [
    {
      skills: {
        "5": "75+",
        "7": "*1",
        "8": "*2",
        "10": "75+",
        "12": "75+",
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
        "12": "*2",
        "13": "*2",
        "15": "*1",
      },
      comment:
        'Place points into "Virile Vials".\n*1 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2.\n *2 excess points go here. Use "Bubble Breakthrough" to unlock new bubbles. ',
    },
  ],
  class: Class.Shaman,
};
