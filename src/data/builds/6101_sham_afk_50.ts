import { Class, Subclass } from "~/composables/Characters";


 export const build = {
  "title": "Shaman AFK (50)",
  "notes": "Active Skills directly increase AFK damage (multiplicative). The damage cap for a zone is the Monster’s HP. AFK damage increases above this cap will not increase your gains. AFK Damage = Minimum damage * Active Skill AFK multiplier",
  "version": "1.21",
  "tabs": [
    {
      "skills": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "20",
        "6": "0",
        "7": "*1",
        "8": "0",
        "9": "0",
        "10": "30",
        "11": "0",
        "12": "50",
        "13": "0",
        "14": "75",
        "15": "0"
      },
      "comment": "*1= Boost agi  to have 308 accuracy (Sand castles) as thats the zone you will be spending quite some time at this level.\n\"Idle Casting\" to 75 for 12%\nPriority switches to  Overclocked energy > Gilded sword > Sharpened axe"
    },
    {
      "skills": {
        "1": "50",
        "2": "50",
        "3": "0",
        "4": "0",
        "5": "0",
        "6": "0",
        "7": "0",
        "8": "40",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "You want to level up \"Energy bolt\" and \"Mini fireball\" to about 50\n\"Power overwhelming\", \"Individual insight\" and \"Knowledge is power\" have less priority in afk builds."
    },
    {
      "skills": {
        "1": "20",
        "2": "20",
        "3": "20",
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