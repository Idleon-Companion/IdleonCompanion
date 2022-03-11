import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Squire / AFK (~50)",
  notes: "Active Skills act as a multiplyer to your total dmg for afk. ",
  version: "1.40b",
  level: 50,
  tabs: [
    {
      skills: {
        "5": "25+",
        "8": "*1",
        "10": "25+",
        "12": "25+",
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
        "8": "60+",
      },
      comment:
        'Level "Carry A Big Stick" to 60, then your active damage skills to 55. Excess points can be used to level "Carry A Big Stick" past 60.\n 1 point into "Firmly Grasp It" gives extra STR.',
    },
    {
      skills: {
        "1": "30",
        "2": "30",
        "15": "*1",
      },
      comment:
        'Level "Shockwave Slash" and "Daggerang" to around 30.\n*1 = You can put some points into "Back to Basics" if you\'re lacking points on Tab 2.',
    },
  ],
  class: Class.Squire,
};
