import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / AFK (~150)",
  notes:
    'Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents and "Double Strike" if you are using Prayers that increase mob hp.',
  version: "1.40b",
  level: 150,
  tabs: [
    {
      skills: {
        "1": "160",
        "4": "*2",
        "5": "160",
        "6": "260",
        "7": "*3",
        "8": "*1",
        "10": "160",
        "12": "100",
        "14": "160",
      },
      comment:
        "*1 = Boost WIS to have as much accuracy as you need for the best AFK gains.*2 Assign points to increase survivability. *3 Boost AGI for smithing gains if you have the points.",
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "150",
        "4": "41",
        "5": "160",
        "6": "160",
        "8": "160",
        "9": "160",
      },
      comment: " Please read main description below.",
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "160",
        "5": "160",
        "6": "132*",
        "8": "160",
        "9": "1+",
        "15": "*1",
      },
      comment:
        'Put multiples of 33 into ZOW. Max at 132.\n*1 = You can put some points into "Back to Basics" if you\'re lacking points on Tab 2. \n NPNG will reduce your survivability you make up for this with food.\n MONSTER DECIMATOR works for zow, monster samples and deathnote. ',
    },
  ],
  class: Class.Barbarian,
};
