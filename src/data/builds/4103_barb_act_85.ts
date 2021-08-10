import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / Active (~85)",
  notes: "100+ = Checkout books for these talents from the library.",
  version: "1.23",
  level: 85,
  tabs: [
    {
      skills: {
        "1": "*2",
        "5": "100+",
        "6": "100",
        "8": "*1",
        "10": "100+",
        "12": "100",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the zone you\'re farming in.\n*2 = After maxing damage talents, go for HP to boost "Meatshank" bonus',
    },
    {
      skills: {
        "1": "1",
        "2": "26",
        "3": "*1",
        "4": "41",
        "5": "100",
        "6": "100+",
        "8": "100+",
        "9": "*60",
      },
      comment:
        '*60 After maxing "Carry a Big Stick", place excess points into "Absolute Unit" and level it above 60. \n*1 = The rest of the excess points go into HP to try and improve "Meatshank" bonus.',
    },
    {
      skills: {
        "1": "*1",
        "2": "*1",
        "3": "1",
        "6": "99+",
        "15": "100+",
      },
      comment:
        'Put 1 point in every active skill. Max "Apocalypse Zow" (To either 99 or 132, level in-between are useless), then 100 into "Back To Basics".\n*1 = Excess points can be split between the two active skills.',
    },
  ],
  class: Class.Barbarian,
};
