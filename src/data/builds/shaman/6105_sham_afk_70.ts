import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman / AFK (~70)",
  notes: "Active Skills directly increase AFK kills/hr if equipped in the talent bar.",
  version: "1.40b",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "70",
        "7": "*1",
        "10": "85",
        "12": "70",
        "14": "50",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Casting" to 50 for 10% AFK gain rate.\nPriority switches to "Overclocked Energy" > "Gilded Sword" > "Sharpened Axe"',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "6": "*1",
        "8": "100",
        "10": "*1",
      },
      comment:
        'Level "Power Overwhelming" to 100, then 25 to Fireball and Energy Bolt.\n*1 = Spread excess points equally between "Knowledge is Power" and "Individual Insight".',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "*1",
        "15": "*2",
      },
      comment:
        'With 25 points in active talents you should be damage capped, only put more points into them if you are not.\n*1 = If you have many(Think 7+) Green Vials, you can place the rest of points into "Virile Vials" for more damage.\n*2 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2. ',
    },
  ],
  class: Class.Shaman,
};
