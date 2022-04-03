import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Catching Active / AFK 100+",
  notes: "Use Buttered Toasted Butter. Do not level your catching skill higher than your Mman's Catching skill. Godly Creation on 2nd tab can be used if you got enough points to max everything else and wish to gamble for its bonus.",
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
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Sanic Speed, Garb Of Un'AGI'ing Quality and Focused Soul in that order. \n *1 ACME Anvil should be maxed on this preset. *2 Extra points can go into Robbinghood for rare drops. Yea I Already Know doesn't work on catching right now but it still helps with smithing lvls.",
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
