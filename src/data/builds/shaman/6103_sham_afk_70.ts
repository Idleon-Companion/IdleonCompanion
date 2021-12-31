import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Shaman AFK (70)",
  notes:
    "Active Skills directly increase AFK damage (multiplicative). The damage cap for a zone is the Monster’s HP. AFK damage increases above this cap will not increase your gains. AFK Damage = Minimum damage * Active Skill AFK multiplier",
  version: "1.23",
  level: 70,
  tabs: [
    {
      skills: {
        "5": "100",
        "7": "*1",
        "10": "100",
        "12": "100",
        "14": "100",
      },
      comment:
        'Priority is "Idle Casting"  then "Quickness Boots" then dmg talents.\n*1 = As much as needed for the zone you want to afk in.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "6": "60",
        "8": "50",
        "10": "40",
        "15": "15",
      },
      comment:
        'Go for 25 in dmg active skill, then you want to max "Power Overwhelming", then mix "Individual Insight", "Knowledge is Power".\nPutting ~25 points into "Choppin it up EZ" can be a nice dmg boost depending on your chopping minigame score.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "30",
      },
      comment:
        'Level up the damaging skills evenly. \n Put 20-30 points into "Virile Vials" (getting more green vials is essential for Shaman.)',
    },
  ],
  class: Class.Shaman,
};
