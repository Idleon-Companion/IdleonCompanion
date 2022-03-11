import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Squire / AFK (~70)",
  notes: "Active Skills directly increase AFK kills/hr.",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "50+",
        "8": "*1",
        "10": "50+",
        "12": "50+",
        "14": "100",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\nPriority switches to Gilded sword > Meatshank > Sharpened axe',
    },
    {
      skills: {
        "1": "55",
        "2": "55",
        "5": "1",
        "6": "*1",
        "8": "100",
        "9": "*1",
      },
      comment:
        'Level "Carry A Big Stick" to 100, then your active damage skills to 55.\n*1 = Spread excess points equally between "Absolute Unit" and "Strength In Numbers".\n 1 point into "Firmly Grasp It" gives extra STR.',
    },
    {
      skills: {
        "1": "30",
        "2": "30",
        "6": "*2",
        "15": "*1",
      },
      comment:
        'Level "Shockwave Slash" and "Daggerang" to around 30.\n*1 = You can put some points into "Back to basics" if you\'re lacking points on tab 2.\n*2 If you have the required acc lvl this.',
    },
  ],
  class: Class.Squire,
};
