import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / AFK (~50)",
  notes: "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap.  ",
  version: "1.40b",
  level: 50,
  tabs: [
    {
      skills: {
        "5": "25+",
        "8": "*1",
        "10": "25+",
        "12": "25+",
        "14": "50",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the best AFK gains.\n"Idle Brawling" to 50 for 10% AFK gain rate.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "5": "1",
        "8": "60",
      },
      comment:
        'Level "Carry A Big Stick" to 60, then your active damage skills to 25. \n 1 point into "Firmly Grasp It" gives extra STR. \n Excess points can be used to level "Carry A Big Stick" past 60.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "15": "*1",
      },
      comment:
        'Level "Bear Strike" and "Axe hurl" to around 25.\n*1 = You can put some points into "Back to Basics" if you\'re lacking points on Tab 2. ',
    },
  ],
  class: Class.Barbarian,
};
