import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro / AFK / Money (170)",
  notes:
    " This build heavily relies on how many talent points you have. Go for the regular afk build if you do not have those points or need that much money. ",
  version: "1.40b",
  level: 170,
  tabs: [
    {
      skills: {
        "1": "*1",
        "4": "*1",
        "5": "160",
        "9": "1+",
        "10": "160",
        "12": "160",
        "13": "160",
        "14": "1+",
        "15": "260",
      },
      comment:
        " *1 If you need Survivability. ",
    },
    {
      skills: {
        "1": "160",
        "2": "*1",
        "4": "160",
        "6": "100+",
        "7": "160",
        "8": "160",
        "9": "100+",
        "10": "160",
        "15": "160",
      },
      comment:
        "*1 Max this talents and use it after your afk claim, before you pick up your items from the ground.",
    },
    {
      skills: {
        "1": "100+",
        "2": "160",
        "4": "160",
        "6": "1+",
        "8": "160",
        "9": "160",
        "10": "160",
        "15": "160",
      },
      comment:
        "",
    },
  ],
  class: Class.Maestro,
};
