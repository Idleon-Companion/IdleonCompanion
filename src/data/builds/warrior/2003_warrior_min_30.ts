import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Mining Active / AFK (Warrior) 30+",
  notes: "",
  version: "1.23",
  level: 30,
  tabs: [
    {
      skills: {
        "11": "80",
        "15": "50",
      },
      comment:
        'Place points into Brute Efficiency, and then Idle Skilling. Excess points can be used to max Brute Efficiency.',
    },
    {
      skills: {
        "5": "1",
        "11": "50",
        "12": "15",
        "13": "15",
      },
      comment:
        'Place 1 point into Firmly Grasp It. Then place points into "Big Pick". Afterwards, equally upgrade Motherlode Miner and Copper Collector.',
    },
  ],
  class: Class.Warrior,
};
