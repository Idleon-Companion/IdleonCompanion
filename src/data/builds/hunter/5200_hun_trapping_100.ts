import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Hunter Trapping (~100)",
  notes: "",
  version: "1.23",
  level: 100,
  tabs: [
    {
      skills: {
        "7": "200",
        "11": "100+",
      },
      comment:
        'Max Elusive Efficiency. Use Tab 3 to get Quickness boots to 200 after maxing Trapping Talents.',
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
        "9":"*1",
        "11": "100+",
        "12": "100+",
        "13": "100+",
        "14": "100+"
      },
      comment:
        'Put 100+ points into each Trapping skill.\n*1 Excess points to go Agi Again to level Quickness Boots on Tab 1.',
    },
  ],
  class: Class.Hunter,
};
