import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro / AFK  (150)",
  notes:
    "  ",
  version: "1.40b",
  level: 150,
  tabs: [
    {
      skills: {
        "1": "*1",
        "4": "*1",
        "5": "160",
        "9": "1+",
        "10": "160",
        "13": "160",
        "14": "1+",
        "15": "260",
      },
      comment:
        " *1 If you need Survivability. Assign unused points in AGI and WIS for gains in Smithing and Alchemy. ",
    },
    {
      skills: {
        "1": "160",
        "2": "*1",
        "4": "160",
        "6": "100+",
        "7": "160",
        "9": "100+",
        "15": "160",
      },
      comment:
        "*1 Use this talent after your afk claim, before you pick up your items from the ground.",
    },
    {
      skills: {
        "1": "100+",
        "2": "160",
        "4": "160",
        "6": "1+",
        "8": "1+",
        "9": "160",
        "10": "160",
        "13": "*1",
        "14": "*1",
      },
      comment:
        "*1 Use hand buffs as needed.",
    },
  ],
  class: Class.Maestro,
};
