import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Bowman / AFK (~150)",
  notes:
    'Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents and "Have Another!" if you are using Prayers that increase mob hp.',
  version: "1.40b",
  level: 150,
  tabs: [
    {
      skills: {
        "1": "*1",
        "5": "160",
        "6": "1+",
        "7": "260",
        "8": "100",
        "10": "160",
        "12": "100+",
        "14": "160",
        "15": "160",
      },
      comment:
        " Level WIS and STR after you max other talents. Featherweight falls off heavily at high lvl max it out last. *1 If you need Survivability",
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "*1",
        "4": "160",
        "5": "25",
        "6": "160",
        "7": "160",
        "8": "160",
        "9": "*3",
        "10": "160",
        "11": "*2",
        "13": "*4",
        "15": "160",
      },
      comment:
        " *1 Assign points here for Survivability. \n *2 Excess points here to help with forge. \n *3 Put points here instead of Garb of Unaging if your gear is bad. \n *4 Points here for faster Townskill lvls (due to a bug).",
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "*2",
        "6": "160",
        "7": "100+",
        "8": "160",
        "9": "160",
        "10": "*1",
        "15": "1+",
      },
      comment:
        "*1 Level this last as you will level Featherweight last. *2 Aaccuracy should not be a problem anymore apply points here if it is.",
    },
  ],
  class: Class.Bowman,
};
