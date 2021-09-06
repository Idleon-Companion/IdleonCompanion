import { Build } from "~/composables/Builds";
import { Class } from "~/composables/Characters";

export const build: Build = {
  title: "Woodcutter Active / AFK (Mage) 30+",
  notes: " ",
  version: "1.23",
  level: 30,
  tabs: [
    {
      skills: {
        "11": "80",
        "15": "50",
      },
      comment:
        "Place points into Smart Efficiency, and then Active AFK'er. Excess points can be used to max Smart Efficiency.",
    },
    {
      skills: {
        "11": "50",
        "12": "*15",
        "13": "50",
      },
      comment:
        "Place points into Logs on Logs and Deforesting All Doubt.\n*15 If you have lots of leaves, some points may be played into Leaf Theif",
    },
  ],
  class: Class.Mage,
};
