import { Class } from "~/composables/Characters";

export const build = {
  title: "Journeyman AFK 40",
  notes:
    "This build is for leveling, and ignores all of the utility talents that provide help with drops and cash",
  version: "1.21",
  tabs: [
    {
      skills: {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "35",
        "6": "0",
        "7": "0",
        "8": "0",
        "9": "*1",
        "10": "20",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "50",
      },
      comment: "*1 = As much as needed for the zone you want to afk in.",
    },
    {
      skills: {
        "1": "50",
        "2": "0",
        "3": "0",
        "4": "45",
        "5": "0",
        "6": "0",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "0",
        "11": "1",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0",
      },
      comment: "Two Punch Man and Combat Skills effect AFK gain.",
    },
  ],
  class: Class.Journeyman,
};
