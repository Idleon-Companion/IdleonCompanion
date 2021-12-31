import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Archer / AFK (~35)",
  notes: "That's how your build should roughly look when pushing for subclass.",
  version: "1.40b",
  level: 35,
  tabs: [
    {
      skills: {
        "5": "50",
        "6": "*1",
        "10": "50",
      },
      comment:
        '*1 = As much as you need to reach the farthest monster zone. Your goal is to reach Crabcakes to choose your subclass. For gaining levels, Sticks is a great farming zone.\nAfter improving Accuracy prioritise "Sharpened axe" > "Gilded Sword", keep them within 10 levels of each other.',
    },
    {
      skills: {
        "1": "20",
        "2": "20",
        "4": "1",
        "5": "10",
        "6": "1",
        "8": "50",
      },
      comment:
        'Level "Polymer Limbs" to 50, active damage skills to 20, and then 1 value point into "Strafe". Activate it before going offline. Afterwards, level up "Have Another" to 10. Excess points can be used to level "Polymer Limbs" past 50.',
    },
  ],
  class: Class.Archer,
};
