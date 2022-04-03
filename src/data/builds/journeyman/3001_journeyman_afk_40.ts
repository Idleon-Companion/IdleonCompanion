import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Journeyman AFK (~40)",
  notes:
    "This build is for leveling, and ignores all of the utility talents that provide help with drops and cash",
  version: "1.40b",
  level: 40,
  tabs: [
    {
      skills: {
        "5": "35",
        "9": "*1",
        "10": "20",
        "15": "50",
      },
      comment: "*1 = As much as you need accuracy for the zone you want to afk in. Check your AFK Info window or mob cards to find the acc requirements.",
    },
    {
      skills: {
        "1": "50",
        "4": "45",
        "11": "1",
      },
      comment: "Two Punch Man and Combat Skills effect AFK gain.",
    },
  ],
  class: Class.Journeyman,
};
