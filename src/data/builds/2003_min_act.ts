import { Class, Subclass } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Mining Active / AFK (Warrior) 30+",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "1": "*1",
        "6": "100+",
        "11": "100",
        "15": "100",
      },
      comment:
        'You want to max "Brute Efficiency" and "Idle Skilling", then "Fist of Rage".\n*1 - You can invest here if your alchemy bubble is giving nice bonus to efficiency.',
    },
    {
      skills: {
        "3": "*1",
        "5": "*2",
        "11": "100",
        "12": "100",
        "13": "50",
        "14": "50",
        "15": "100",
      },
      comment:
        'You want to max "Big Pick", then "Tempestuous Emotions", and mix the mining talents.\n*1 - You can invest here if your alchemy bubble is giving nice bonus to efficiency.\n*2 You can max "Firmly Grasp It" If you\'ve maxed mining talents already.',
    },
    {
      skills: {
        "8": "100",
        "9": "*1",
        "15": "100",
      },
      comment:
        'Get "Strongest Statues" and "Back to Basics" to 100.\nExcess points can go towards "Str Summore"',
    },
  ],
  class: Class.Barbarian,
};
