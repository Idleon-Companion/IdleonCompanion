import { Class, Subclass } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Catching 100+",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "7": "200+",
        "10": "100+",
        "15": "*1",
      },
      comment:
        "Max Elusive Efficiency and Quickness Boots in that order. Extra Points can go into Broken Time and LUK.",
    },
    {
      skills: {
        "7": "100+",
        "9": "100+",
        "13": "*1",
        "15": "100+",
      },
      comment:
        "Max Sanic Speed, Garb Of Un'AGI'ing Quality and Focused Soul in that order. Extra points can go into Yea I Already Know.",
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
