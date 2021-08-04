import { Class, Subclass } from "~/composables/Characters";


 export const build = {
  "title": "Hunter / AFK (~50)",
  "notes": "Leveling up active skills directly increase AFK kills/hr, so we level them past 1.",
  "version": "1.21",
  "tabs": [
    {
      "skills": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "80",
        "6": "*1",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "80",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "50",
        "15": "0"
      },
      "comment": "*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you're low on defense, by this point equipping food to stay alive is normal and expected. \n\"Idle Shooting\" to 50 for 10% AFK gain rate. \n Priority is \"Gilded Sword\" > \"Sharpened Axe\". "
    },
    {
      "skills": {
        "1": "40",
        "2": "40",
        "3": "0",
        "4": "1",
        "5": "20",
        "6": "10-15",
        "7": "0",
        "8": "50",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "Level \"Polymer Limbs\" to 50, active damage skills to 40, then value point into \"Strafe\" and activate it before going offline. Afterwards, level up \"Have Another\" to 20 & \"Veins of the Infernal\" to 10-15 if you can afford."
    },
    {
      "skills": {
        "1": "30",
        "2": "30",
        "3": "0",
        "4": "0",
        "5": "20",
        "6": "20",
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
      "comment": "Level up \"360 Noscope\" and \"Bear Trap\" to 30. \n Then raise \"Have another... Again\" and \"Looty Mcshooty\" to 20."
    }
  ],
  "class": Class.Archer,
  "subclass": Subclass.Hunter
}