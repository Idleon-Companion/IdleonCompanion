import { Class, Subclass } from "~/composables/Characters";


 export const build = {
  "title": "Bowman AFK (50)",
  "notes": "Damaging Skills directly increase AFK damage (multiplicative). The damage cap for a zone is the Monster’s HP. AFK damage increases above this cap will not increase your gains. AFK Damage = Minimum damage * Active Skill AFK multiplier",
  "version": "1.21",
  "tabs": [
    {
      "skills": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "40",
        "6": "*1",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "50",
        "11": "0",
        "12": "5-15",
        "13": "0",
        "14": "75",
        "15": "0"
      },
      "comment": "*1= Boost str to have enough accuracy for the zone you want to afk in.\n"
    },
    {
      "skills": {
        "1": "30",
        "2": "30",
        "3": "0",
        "4": "*1",
        "5": "30",
        "6": "10",
        "7": "0",
        "8": "30",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "*1= As much as needed for 130% with 5-15 points in \"Featherweight\". 130% is to get to \"SpeeDna\" breakpoint.\n\"Piercing Arrow\" and \"Kung Fu Kick\" give afk exp multiplier.\n \"Have Another\", \"High polymer limbs\", and \"Veins of the Infernal\" increase damage."
    },
    {
      "skills": {
        "1": "30",
        "2": "30",
        "3": "0",
        "4": "0",
        "5": "0",
        "6": "40",
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
      "comment": "\"Homing Arrow\" and \"Magic shortbow\" give afk exp multiplier.\n\"SpeeDna\" increases damage."
    }
  ],
  "class": Class.Archer,
  "subclass": Subclass.Bowman
}