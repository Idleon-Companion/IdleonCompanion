import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Warrior / AFK (~35)",
  notes: "That's how your build should roughly look when pushing for subclass.",
  version: "1.23",
  level: 35,
  tabs: [
    {
      skills: {
        "5": "50",
        "8": "*1",
        "10": "40",
        "12": "20",
      },
      comment:
        '*1 = As much as you need to reach the farthest monster zone. Your goal is to reach Crabcakes to choose your subclass. For gaining levels, Sticks is a great farming zone.\nAfter improving Accuracy prioritise "Sharpened axe" > "Gilded Sword" > "Meatshank"',
    },
    {
      skills: {
        "1": "20",
        "2": "20",
        "4": "10",
        "5": "1",
        "8": "50",
      },
      comment:
        'Level "Carry a Big Stick" to 50, then your active damage skills to 20. Afterwards, bring "Double Strike" up to 10. Excess points can be used to level "Carry A Big Stick" past 50.\n1 point into "Firmly Grasp It" gives extra STR.',
    },
  ],
  class: Class.Warrior,
};
