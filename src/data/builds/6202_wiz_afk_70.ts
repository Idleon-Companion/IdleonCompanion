import { Class, Subclass } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Wizard / AFK (~70)",
  notes: "Active Skills directly increase AFK kills/hr.",
  version: "1.21",
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
        "1": "*1",
        "2": "70",
        "6": "*2",
        "8": "100",
        "10": "*2",
      },
      comment:
        'Level "Power Overwhelming" to 100, then 70 to Fireball.\n*1 = If you are not AFK damage capped, you can add more points into "Energy Bolt" until you hit cap.\n*2 = Spread excess points equally between "Knowledge is Power" and "Individual Insight".',
    },
    {
      skills: {
        "1": "40",
        "2": "40",
        "3": "40",
        "6": "30",
        "15": "*1",
      },
      comment:
        'Level the damage skills evenly. Be sure to place 30 points into "Paperwork Great..." for a nice damage boost.\n*1 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2. ',
    },
  ],
  class: Class.Wizard,
};
