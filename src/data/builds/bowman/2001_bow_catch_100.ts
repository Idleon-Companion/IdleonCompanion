import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Catching Active / AFK 100+",
  notes: "Use Buttered Toasted Butter. Do not level your catching skill higher than your Mman's Catching skill.",
  version: "1.40b",
  level: 100,
  tabs: [
    {
      skills: {
        "7": "200+",
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Elusive Efficiency, Quickness Boots, and Broken Time in that order. Extra Points can go into LUK and WIS.",
    },
    {
      skills: {
        "7": "100+",
        "9": "100+",
        "10": "*1",
        "15": "100+",
      },
      comment:
        "Max Sanic Speed, Garb Of Un'AGI'ing Quality and Focused Soul in that order. Extra points can go into Robbinghood. Yea I Already Know doesn't work on catching right now..",
    },
    {
      skills: {
        "8": "100+",
        "9": "100+",
        "11": "100+",
        "12": "100+",
        "14": "100+",
        "15": "*1",
      },
      comment:
        "Max Sunset On The Hives, Briar Patch Runner, Teleki'net'ic Logs, Swifty Statues, AGI Again and Shoeful Of Obol.\nExtra points can go into Previous Points.",
    },
  ],
  class: Class.Bowman,
};
