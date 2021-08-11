import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / Active (~70)",
  notes: "",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "6": "*2",
        "8": "*1",
        "10": "100",
        "12": "100",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\nAfter improving Accuracy prioritise "Sharpened axe" > "Gilded Sword" > "Meatshank"\n*2 = Excess points into STR for damage.',
    },
    {
      skills: {
        "1": "1",
        "2": "*2",
        "4": "41",
        "5": "1",
        "6": "*1",
        "8": "100",
        "9": "*1",
      },
      comment:
        'Put 1 points into each active skill then max "Carry a Big Stick". Then, place 41 points into Double Strike.\n*1 = Spread excess points equally between "Absolute Unit" and "Strength in Numbers".\n*2 = Excess points can be placed here for better mob clear. Place up to 26 points.\n1 point into "Firmly Grasp It" gives extra STR.',
    },
    {
      skills: {
        "1": "*1",
        "2": "*1",
        "3": "1",
        "6": "*2",
        "15": "100",
      },
      comment:
        'Put 1 point in every active skill, then 100 into "Back To Basics".\n*1 = Excess points can be used to level active skills.\n*2 = If you have reached World 3 and unlocked the Death Note, start preparing for "Apocalypse Zow". Have 5 mobs at 100k kills by level 85-90. Once that\'s done, place excess points into ZOW instead of active skills. If you are ready to start progress on ZOW, you will need to respec into a ZOW build. There is an example of a LVL 85 Barbarian ZOW build in the builds list.',
    },
  ],
  class: Class.Barbarian,
};
