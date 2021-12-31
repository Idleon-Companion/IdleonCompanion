import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Squire / AFK (~150)",
  notes: "Active Skills directly increase AFK kills/hr.",
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
        "12": "260",
        "14": "160",
      },
      comment:
        "*1 = Boost WIS to have 150% of required accuracy needed for your current enemy. \n *2 Put points here for Survivability. \n *3 Dump unused points here for smithing gains and ms.",
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "160",
        "4": "41",
        "5": "160",
        "6": "160",
        "8": "160",
        "9": "160",
      },
      comment:
        'Put more points into attack talents and "Double Strike" if you are using Prayers that increase mob hp. ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "6": "160",
        "8": "160",
        "9": "160",
        "10": "160",
        "11": "160",
        "12": "100+",
        "13": "160",
        "14": "*1",
      },
      comment:
        'Put more points into attack talents if you are using Prayers that increase mob hp. \n If you do not have lvl 160 "Refinery Trottle" put multiple of 8 into it. \n *1 lvl super samples if you can reach 90% sample rate with it without Sample Prayer.',
    },
  ],
  class: Class.Squire,
};
