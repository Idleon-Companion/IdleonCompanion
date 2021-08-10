import { Class, Subclass } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Barbarian / AFK (~50)",
  notes: "Active Skills directly increase AFK kills/hr.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "50",
        "8": "*1",
        "10": "75",
        "12": "50",
        "14": "50",
      },
      comment:
        '*1 = Boost WIS to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected.\n"Idle Brawling" to 50 for 10% AFK gain rate.\nPriority switches to Gilded sword > Meatshank > Sharpened axe',
    },
    {
      skills: {
        "1": "45",
        "2": "45",
        "4": "20",
        "5": "1",
        "8": "60",
      },
      comment:
        'Level "Carry A Big Stick" to 60, then your active damage skills to 45. Afterwards, bring "Double-Strike" up to 20. Excess points can be used to level "Carry A Big Stick" past 60.\n 1 point into "Firmly Grasp It" gives extra STR.',
    },
    {
      skills: {
        "1": "30",
        "2": "30",
        "3": "1",
        "15": "*1",
      },
      comment:
        'Level "Bear Strike" and "Axe hurl" to around 30.\n*1 = You can put some points into "Back to Basics" if you\'re lacking points on Tab 2.\n "Mocking Shout" does not improve AFK gains, but is useful at times you want to be active. ',
    },
  ],
  class: Class.Barbarian,
};
