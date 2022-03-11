import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman / AFK (~50)",
  notes: "Active Skills act as a multiplyer to your total dmg for afk.",
  version: "1.40b",
  level: 50,
  tabs: [
    {
      skills: {
        "5": "25+",
        "7": "*1",
        "10": "25+",
        "12": "25+",
        "14": "50",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Casting" to 50 for 10% AFK gain rate.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "8": "60+",
      },
      comment:
        'Level "Power Overwhelming" to 60, then your active damage skills. Excess points can be used to level "Power Overwhelming" past 60.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "*1",
        "15": "2*",
      },
      comment:
        'Level the damage skills evenly.\n*1 = If you have many Green Vials, you can place 20+ points into "Virile Vials" for more damage.\n*2 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2.',
    },
  ],
  class: Class.Shaman,
};
