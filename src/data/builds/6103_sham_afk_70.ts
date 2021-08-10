import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Shaman AFK (70)",
  notes:
    "Active Skills directly increase AFK damage (multiplicative). The damage cap for a zone is the Monster’s HP. AFK damage increases above this cap will not increase your gains. AFK Damage = Minimum damage * Active Skill AFK multiplier",
  version: "1.21",
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
        "1": "70",
        "2": "70",
        "6": "60",
        "8": "50",
        "10": "40",
        "15": "15",
      },
      comment:
        'Go for ~50 in dmg active skill, then you want to max "Power Overwhelming", then mix "Individual Insight", "Knowledge is Power".\nPutting ~15 points into "Choppin it up EZ" can be a nice dmg boost depending on your chopping minigame score.',
    },
    {
      skills: {
        "1": "40",
        "2": "40",
        "3": "40",
        "6": "30",
      },
      comment:
        'Level up the damaging skills evenly. \n Put 20-30 points into "Virile Vials" (skip this part if you dont have many green vials.)',
    },
  ],
  class: Class.Mage,
  subclass: Subclass.Shaman,
};
