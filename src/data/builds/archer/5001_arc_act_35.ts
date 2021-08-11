import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Archer / Active (~35)",
  notes: "",
  version: "1.23",
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
        "1": "1",
        "2": "1",
        "4": "1",
        "6": "*1",
        "8": "100",
      },
      comment:
        'Put 1 point into each active skill then max "High Polymer Limbs". *1 = Leftover points may be placed here.',
    },
  ],
  class: Class.Archer,
};
