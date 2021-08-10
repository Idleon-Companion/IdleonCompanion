import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Journeyman AFK (~70)",
  notes:
    "This build is for leveling, and ignores all of the utility talents that provide help with drops and cash.",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "100",
        "9": "80",
        "10": "100",
        "15": "100",
      },
      comment:
        "Journeyman has 4 talents that impact damage in tab 1. Once you get those maxed, it is up to you what you want - you can go for HP/defense for survivability, movespeed, etc",
    },
    {
      skills: {
        "1": "100",
        "2": "1*",
        "4": "100",
        "5": "1*",
        "11": "1*",
        "14": "1*",
        "15": "1*",
      },
      comment:
        "Two Punch Man and Combat Skills effect AFK gain.\n*1 - At this point, you can start putting some points into non-combat bonuses, depending on what you are looking for",
    },
  ],
  class: Class.Journeyman,
};
