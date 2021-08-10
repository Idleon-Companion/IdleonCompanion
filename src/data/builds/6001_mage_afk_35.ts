import { Class } from "~/composables/Characters";

export const build = {
  title: "Mage / AFK (~35)",
  notes: "That's how your build should roughly look when pushing for subclass.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "50",
        "7": "*1",
        "10": "40",
        "12": "20",
      },
      comment:
        '*1 = As much as you need to reach the farthest monster zone. Your goal is to reach Crabcakes to choose your subclass. For gaining levels, Sticks is a great farming zone.\nAfter improving Accuracy prioritise "Sharpened axe" > "Gilded Sword" > "Overclocked Energy"',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "8": "50",
      },
      comment:
        'Level "Power Overwhelming" to 50, then your active damage skills to 25. Excess points can be used to level "Power Overwhelming" past 50',
    },
  ],
  class: Class.Mage,
};
