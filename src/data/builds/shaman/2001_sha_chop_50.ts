import { Build } from "~/composables/Builds";
import { Class } from "~/composables/Characters";

export const build: Build = {
  title: "Woodcutter Active / AFK (Shaman) 50+",
  notes: " ",
  version: "1.23",
  level: 50,
  tabs: [
    {
      skills: {
        "8": "*1",
        "11": "100",
        "15": "100",
      },
      comment:
        "Place points into Smart Efficiency, and then Active AFK'er.\n*1 Excess points can be placed into WIS.",
    },
    {
      skills: {
        "10": "*1",
        "11": "100",
        "12": "20",
        "13": "20",
      },
      comment:
        "Place points into Logs on Logs. Split points evenely between Leaf Thief and Deforesting All Doubt.\n*1 Excess points can go into Individual Insight",
    },
    {
      skills: {
        "8": "*1",
        "15": "100",
      },
      comment:
        'Earlier Education.\n*1 Excess points go into Stupendous Statues.',
    },
  ],
  class: Class.Shaman,
};
