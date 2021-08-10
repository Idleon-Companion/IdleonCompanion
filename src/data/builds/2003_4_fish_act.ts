import { Class, Subclass } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Fishing Active / AFK (Barb) 30+",
  notes:
    "Due to prowess effect not working active, AFK fishing will always be better if you have at least 2x prowess.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "6": "100",
        "11": "100",
        "15": "100",
      },
      comment:
        'You want to max "Idle Skilling" and "Brute Efficiency", then  "Fist of Rage"',
    },
    {
      skills: {
        "5": "100",
        "9": "100",
        "15": "100",
      },
      comment:
        'Maxing "Absolute Unit" and "Firmly Grasp it" gives some efficiency.\n"Tempestous Emotions" provide extra xp.',
    },
    {
      skills: {
        "8": "*2",
        "11": "100",
        "12": "*1",
        "13": "50",
        "14": "100",
      },
      comment:
        'Max "Worming Undercover" and "Catching some ZZZ\'s", boost "All fish diet" if you\'re going for xp\n*1 = Boost it to around your minigame score.\n*2 = Excess points here.',
    },
  ],
  class: Class.Barbarian,
};
