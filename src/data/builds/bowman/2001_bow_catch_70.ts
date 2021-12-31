import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Catching Active / AFK 70+",
  notes:
    "With around 100k oak logs + ~400 agi you'll be able to catch fruitflies, but at very slow rate. \n Use Buttered Toasted Butter. Do not level your catching skill higher than your MMan's Catching skill.",
  version: "1.40b",
  level: 70,
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
        "7": "100",
        "9": "100",
        "15": "100",
      },
      comment:
        'Max "Sanic speed" and "Garb of Un\'AGI\'ng Quality" to boost "Briar patch runner on tab 3\n"Focused Soul" for xp gains',
    },
    {
      skills: {
        "11": "50",
        "12": "50",
        "13": "40",
        "14": "100",
      },
      comment:
        'You have ability to invest into 3 efficiency skills overall, "Briar patch runner" and "Teleki\'Net\'ic" are both great sources of that.\nConsider maxing out "Sunset on Hives" for more afk  gains, "Bug enthusiast" is for speeding up xp gain.',
    },
  ],
  class: Class.Bowman,
};
