import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Journeyman AFK (~55)",
  notes:
    "This build is for leveling, and ignores all of the utility talents that provide help with drops and cash",
  version: "1.40b",
  level: 55,
  tabs: [
    {
      skills: {
        "5": "50+",
        "9": "*1",
        "10": "50+",
        "15": "100",
      },
      comment: "*1 = As much as you need accuracy for the zone you want to afk in. Check your AFK Info window or mob cards to find the acc requirements.",
    },
    {
      skills: {
        "1": "75",
        "4": "45",
        "11": "1",
      },
      comment: "Two Punch Man and Combat Skills effect AFK gains.",
    },
  ],
  class: Class.Journeyman,
};
