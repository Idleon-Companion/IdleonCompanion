import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter Trapping (~70)",
  notes: "",
  version: "1.23",
  level: 50,
  tabs: [
    {
      skills: {
        "7": "100",
        "11": "100+",
      },
      comment:
        'Max Elusive Efficiency, and then Quickness Boots for agility.',
    },
    {
      skills: {
        "7":"100",
        "9":"100",
        "12":"*1",
        "13":"*2",
        "14":"*2",
        "15": "100",
      },
      comment:
        'Put points into Sanic Speed, then Garb of Un\'agi\'in quality. Then max Focused Soul for EXP gain.\n*1 Excess points can be used to max ACME Anvil.\n*2 The rest of the points can be split between Yeah I Already Know and Godly Creation',
    },
    {
      skills: {
        "11": "100+",
        "12": "*1",
        "13": "100",
        "14": "*1"
      },
      comment:
        'Put 100+ points into Eagle Eye, and then Shroom Bait.\n*1 Excess points can be split between Invasive Species and Reflextice Eyesight ',
    },
  ],
  class: Class.Hunter,
};
