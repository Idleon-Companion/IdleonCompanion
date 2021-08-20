import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Rams active hunter 150+",
  notes:
    "1* - boosted only if there's problems with survi. 2*- you need ~540 mana to sustain your skills. 3*-puttin 20 into 2nd/3rd arrow each would be good enough 4*-you can decide if you want more ms/crit for active or away gains talent to not loose as much when youre not actively farming",
  version: "1.23",
  level: 150,
  tabs: [
    {
      skills: {
        "1": "1*",
        "2": "2*",
        "4": "1*",
        "5": "100+",
        "7": "200+",
        "10": "100+",
        "12": "4*",
        "13": "4*",
        "14": "4*",
      },
      comment: "10>5>7>12&13/14>1&2&4",
    },
    {
      skills: {
        "1": "100+",
        "2": "1",
        "3": "1/2*",
        "5": "3*",
        "6": "100+",
        "7": "100+",
        "8": "100+",
        "9": "100+",
      },
      comment: "8>6>9>7>1>5",
    },
    {
      skills: {
        "1": "50",
        "2": "120/150",
        "3": "85",
        "4": "1",
        "5": "3*",
        "6": "100+",
        "7": "100+",
        "9": "100+",
        "10": "~100",
      },
      comment: "6>2>3>1>9>11>5>7",
    },
  ],
  class: Class.Hunter,
};
