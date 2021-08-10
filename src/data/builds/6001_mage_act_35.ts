import { Class } from "~/composables/Characters";

export const build = {
  title: "Mage / Active (~35)",
  notes: "That's how your build should roughly look when pushing for subclass.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "50",
        "7": "1*",
        "10": "40",
        "12": "20",
      },
      comment:
        '*1 = As much as you need to reach the farthest monster zone. Your goal is to reach Crabcakes to choose your subclass. For gaining levels, Sticks is a great farming zone.\nAfter improving Accuracy prioritise "Sharpened axe" > "Gilded Sword" > "Overclocked Energy"',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "6": "*1",
        "8": "100",
        "10": "*1",
      },
      comment:
        'Put 1 points into each active skill then max "Power Overwhelming".\n*1 = Excess points can be evenly split between "Knowledge is Power" and "Individual Insight".',
    },
  ],
  class: Class.Mage,
};
