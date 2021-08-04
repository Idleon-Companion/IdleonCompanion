import { Class, Subclass } from "~/composables/Characters";


 export const build = {
  "title": "Shaman AFK (70)",
  "notes": "Active Skills directly increase AFK damage (multiplicative). The damage cap for a zone is the Monster’s HP. AFK damage increases above this cap will not increase your gains. AFK Damage = Minimum damage * Active Skill AFK multiplier",
  "version": "1.21",
  "tabs": [
    {
      "skills": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "100",
        "6": "0",
        "7": "*1",
        "8": "0",
        "9": "0",
        "10": "100",
        "11": "0",
        "12": "100",
        "13": "0",
        "14": "100",
        "15": "0"
      },
      "comment": "Priority is \"Idle Casting\"  then \"Quickness Boots\" then dmg talents.\n*1 = As much as needed for the zone you want to afk in."
    },
    {
      "skills": {
        "1": "70",
        "2": "70",
        "3": "0",
        "4": "0",
        "5": "0",
        "6": "60",
        "7": "0",
        "8": "50",
        "9": "0",
        "10": "40",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "15"
      },
      "comment": "Go for ~50 in dmg active skill, then you want to max \"Power Overwhelming\", then mix \"Individual Insight\", \"Knowledge is Power\".\nPutting ~15 points into \"Choppin it up EZ\" can be a nice dmg boost depending on your chopping minigame score."
    },
    {
      "skills": {
        "1": "40",
        "2": "40",
        "3": "40",
        "4": "0",
        "5": "0",
        "6": "30",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "Level up the damaging skills evenly. \n Put 20-30 points into \"Virile Vials\" (skip this part if you dont have many green vials.)"
    }
  ],
  "class": Class.Mage,
  "subclass": Subclass.Shaman
}