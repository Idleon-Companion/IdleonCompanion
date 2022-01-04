import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / AFK (~70)",
  notes:
    'Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents and "Double Strike" if you are using Prayers that increase mob hp.',
  version: "1.40b",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "70",
        "8": "*1",
        "10": "85",
        "12": "70",
        "14": "50",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Brawling" to 50 for 10% AFK gain rate.\nPriority switches to Gilded sword > Meatshank > Sharpened axe',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "41",
        "5": "1",
        "6": "*1",
        "8": "100",
        "9": "*1",
      },
      comment:
        'Level "Carry A Big Stick" to 100, then your active damage skills to 25. Afterwards, bring "Double-Strike" up to 41.\n*1 = Spread excess points equally between "Absolute Unit" and "Strength In Numbers".\n 1 point into "Firmly Grasp It" gives extra STR.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "*2",
        "15": "*1",
      },
      comment:
        'Level "Bear Strike" and "Axe hurl" to around 70.\n*1 = You can put some points into "Back to Basics" if you\'re lacking points on Tab 2.\n *2 Be carefull with NPNG as it reduces your survivability. ',
    },
  ],
  class: Class.Barbarian,
};
