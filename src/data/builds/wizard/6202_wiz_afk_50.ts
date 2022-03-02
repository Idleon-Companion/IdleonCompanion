import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Wizard / AFK (~50)",
  notes: " Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. \n How many points you need depends on your "Attacks on Simmer" Star Talent and "All for Kill" bubble. If you got spare talent resets, reset your build at your fighting area and lvl attack talents last till you do not gain any more kills per hour.",
  version: "1.40b",
  level: 50,
  tabs: [
    {
      skills: {
        "5": "50",
        "7": "*1",
        "10": "75",
        "12": "50",
        "14": "50",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Casting" to 50 for 10% AFK gain rate.\nPriority switches to "Overclocked Energy" > "Gilded Sword" > "Sharpened axe"',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "8": "60",
      },
      comment:
        'Level "Power Overwhelming" to 60, then your active damage skills. Excess points can be used to level "Power Overwhelming" past 60.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "30",
        "15": "*1",
      },
      comment:
        'Level the damage skills evenly. Be sure to place points into "Paperwork Great..." for a nice damage boost.\n*1 = You can put some points into "Earlier Education" if you\'re lacking points on Tab 2.',
    },
  ],
  class: Class.Wizard,
};
