import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Wizard / AFK (~70)",
  notes: "Active Skills directly increase AFK kills/hr.",
  version: "1.40b",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "50+",
        "7": "*1",
        "10": "50+",
        "12": "50+",
        "14": "50",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Casting" to 50 for 10% AFK gain rate.\nPriority switches to "Overclocked Energy" > "Gilded Sword" > "Sharpened Axe"',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "*2",
        "6": "*2",
        "8": "100",
        "10": "*2",
      },
      comment:
         '*1 Max "Knowledge is Power" and then "Individual Insight". *2 If excess points go here. ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "30+",
        "15": "*1",
      },
      comment:
        'Be sure to place 30+ points into "Paperwork Great..." for a nice damage boost.\n*1 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2. ',
    },
  ],
  class: Class.Wizard,
};
