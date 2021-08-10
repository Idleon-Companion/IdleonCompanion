import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Fishing Active / AFK (Barb) 100+",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "6": "200+",
        "9": "*1",
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Brute Efficiency, Fist of Rage and Idle Skilling in that order.\nLeftover points can be put into LUK.",
    },
    {
      skills: {
        "5": "100+",
        "7": "*1",
        "9": "100+",
        "15": "100+",
      },
      comment:
        "Max Firmly Grasp It, Absolute Unit and Tempestuous Emotions in that order. Points can also be put into 'Str'ess Tested Garb if more STR is desired.",
    },
    {
      skills: {
        "7": "*2",
        "8": "100+",
        "9": "100+",
        "11": "100+",
        "12": "100+",
        "13": "100+",
        "14": "100+",
        "15": "*1",
      },
      comment:
        "Max Worming Undercover, Bobbin' Bobbers, STR Summore, Strongest Statues, All Fish Diet and Catching Some ZZZ's.\nPut Points into Back To Basics and Fistful of Obol if you have extra points.",
    },
  ],
  class: Class.Warrior,
  subclass: Subclass.Barbarian,
};
