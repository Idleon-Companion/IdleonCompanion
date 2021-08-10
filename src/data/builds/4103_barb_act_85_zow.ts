import { Class, Subclass } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / Active ZOW Farming (~85)",
  notes: "The goal of this build is to get as many Zow stacks as fast you can.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "1": "60",
        "5": "100",
        "6": "100",
        "8": "*1",
        "10": "100",
        "12": "100",
      },
      comment:
        '*1 = Boost your WIS to reliably hit every mob up to the end of World 2. After maxing dmg talents you want to go for hp talents, to boost "Meatshank" bonus',
    },
    {
      skills: {
        "1": "1",
        "2": "26",
        "3": "*1",
        "4": "*41",
        "5": "100",
        "6": "100",
        "8": "100",
        "9": "60",
      },
      comment:
        'After maxing damage talents you want to go for hp talents, to boost "Meatshank" bonus\n*41 = After you get minimum damage high enough to 1 shot the mob your farming, move these points to %HP',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "3": "1",
        "4": "*20",
        "5": "100",
        "6": "*1",
        "15": "100",
      },
      comment:
        'Max "Monster Decimator" and "Back to Basics", then put points into active skills.\n*1 = Max it around 5 "Apocalypse zow" procs\n*20 = Max this after maxing Zow',
    },
  ],
  class: Class.Barbarian,
};
