import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Warrior / Active (~35)",
  notes: "That's how your build should roughly look when pushing for subclass.",
  version: "1.21",
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
        "1": "1",
        "2": "1",
        "4": "*1",
        "5": "1",
        "8": "100",
      },
      comment:
        'Put 1 points into each active skill then max "Carry a Big Stick".\n*1 = Excess points can go into Double Strike up to 41 PTS.\n 1 point into "Firmly Grasp It" gives extra STR.',
    },
  ],
  class: Class.Warrior,
};
