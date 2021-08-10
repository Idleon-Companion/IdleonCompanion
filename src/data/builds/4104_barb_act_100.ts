import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Barbarian / Active (~100)",
  notes: "100+ = Checkout books for these talents from the library.",
  version: "1.21",
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
        '*1 = Boost WIS to have as much accuracy as you need for the zone you\'re farming in. \n*2 = After maxing damage talents, go for HP to boost "Meatshank" bonus.',
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
        "9": "100",
      },
      comment:
        '*1 = Excess points go into HP to try and improve "Meatshank" bonus.',
    },
    {
      skills: {
        "1": "*1",
        "2": "*1",
        "3": "1",
        "5": "*2",
        "6": "99+",
        "15": "100+",
      },
      comment:
        'Put 1 point in every active skill. Max "Apocalypse Zow" (To either 99 or 132, levels in-between are useless), then 100 into "Back To Basics".\n*1 = Excess points can be split between the two active skills.\n*2 = Points can also go into "Monster Decimator" for "Apocalypse Zow".',
    },
  ],
  class: Class.Warrior,
  subclass: Subclass.Barbarian,
};
