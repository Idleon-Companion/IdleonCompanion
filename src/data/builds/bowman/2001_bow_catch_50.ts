import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Catching Active / AFK 50+",
  notes:
    " Only use Buttered Toasted Butter if you can afford it. ",
  version: "1.40b",
  level: 50,
  tabs: [
    {
      skills: {
        "7": "100",
        "11": "100",
        "15": "*1",
      },
      comment:
        'Max out both "Elusive efficiency"  and "Quickness boots"\n*1- you can invest into "Broken time" with excess points.',
    },
    {
      skills: {
        "7": "*1",
        "9": "100",
        "15": "*2",
      },
      comment:
        'Max "Sanic speed" to boost "Briar Patch Runner" on tab 3\n*1 Rest of the points are placed into "Garb of Un\'AGI\'ng Quality". \n*2 Excess points can be placed into "Focused Soul" for xp gains',
    },
    {
      skills: {
        "11": "50",
        "12": "50",
        "13": "*1",
        "14": "*1",
      },
      comment:
        'Place points into Teleki\'Net\'Ic Logs. Then put points into Briar Patch Runner\n*1 Excess points can be placed into Bug Enthusiastic and Sunset on the Hives',
    },
  ],
  class: Class.Bowman,
};
