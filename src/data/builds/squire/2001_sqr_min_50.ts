import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Mining Active / AFK (Squire) 50+",
  notes: "",
  version: "1.23",
  level: 50,
  tabs: [
    {
      skills: {
        "11": "100",
        "15": "80",
      },
      comment:
        'Place points into Brute Efficiency, and then Idle Skilling. Excess points can be used to max Brute Efficiency.',
    },
    {
      skills: {
        "5": "1",
        "11": "100",
        "12": "30",
        "13": "30",
      },
      comment:
        'Place 1 point into Firmly Grasp It. Then place points into "Big Pick". Afterwards, equally upgrade Motherlode Miner and Copper Collector.',
      },
    {
      skills: {
        "8": "*1",
        "15": "100",
      },
      comment:
        "Max Back to Basics.\n*1 Excess points go into Shieldiest Statues.",
    },
    ],
    class: Class.Squire,
};
