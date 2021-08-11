import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman / Active (~50)",
  notes: "",
  version: "1.23",
  level: 50,
  tabs: [
    {
      skills: {
        "5": "50",
        "7": "*1",
        "10": "70",
        "12": "70",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\nAfter improving Accuracy prioritise "Overclocked Energy" > "Gilded Sword" > "Sharpened Axe"',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "6": "*1",
        "8": "100",
        "10": "*1",
      },
      comment:
        'Put 1 points into each active skill then max "Power Overwhelming".\n*1 = Spread excess points equally between "Knowledge is Power" and "Individual Insight".',
    },
    {
      skills: {
        "1": "*1",
        "2": "*1",
        "3": "*1",
        "6": "*2",
        "15": "100",
      },
      comment:
        'Put 1 point in every active skill, then 100 into "Earlier Education".\nIf you are having trouble with mana, un-equip "Sizzling Skull" due to its low cooldown and high mana cost. Also "Crazy Concoctions" only works if you\'re actively clicking on the screen to aim it.\n*1 = Excess points can be used to level active skills.\n*2 = If you have many Green Vials, you can place 20-30 points into "Virile Vials".',
    },
  ],
  class: Class.Shaman,
};
