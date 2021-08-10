import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Wizard / Active (~70)",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "100",
        "7": "*1",
        "8": "*2",
        "10": "100",
        "12": "100",
      },
      comment:
        '*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\nAfter improving Accuracy prioritise "Overclocked Energy" > "Gilded Sword" > "Sharpened Axe"\n*2 = Excess points into WIS for damage and worship EXP.',
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
        'Put 1 points into each active skill then max "Power Overwhelming".\n*1 = Spread excess points equally between "Knowledge is Power" and "Individual Insight"',
    },
    {
      skills: {
        "1": "*1",
        "2": "*1",
        "3": "*1",
        "5": "*1",
        "6": "40",
        "15": "100",
      },
      comment:
        'Put 1 point in every active skill, then 100 into "Earlier Education". Be sure to place points into "Paperwork Great..." for a nice damage boost.\n*1 = Excess points can be used to level active skills.',
    },
  ],
  class: Class.Mage,
  subclass: Subclass.Wizard,
};
