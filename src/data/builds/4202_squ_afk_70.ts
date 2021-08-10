import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Squire / AFK (~70)",
  notes: "Active Skills directly increase AFK kills/hr.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "70",
        "8": "*1",
        "10": "85",
        "12": "70",
        "14": "50",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Brawling" to 50 for 10% AFK gain rate.\nPriority switches to Gilded sword > Meatshank > Sharpened axe',
    },
    {
      skills: {
        "1": "50",
        "2": "50",
        "4": "41",
        "5": "1",
        "6": "*1",
        "8": "100",
        "9": "*1",
      },
      comment:
        'Level "Carry A Big Stick" to 100, then your active damage skills to 50. Afterwards, bring "Double-Strike" up to 41.\n*1 = Spread excess points equally between "Absolute Unit" and "Strength In Numbers".\n 1 point into "Firmly Grasp It" gives extra STR.',
    },
    {
      skills: {
        "1": "70",
        "2": "70",
        "15": "*1",
      },
      comment:
        'Level "Shockwave Slash" and "Daggerang" to around 70.\n*1 = You can put some points into "Back to basics" if you\'re lacking points on tab 2.\n',
    },
  ],
  class: Class.Warrior,
  subclass: Subclass.Squire,
};
