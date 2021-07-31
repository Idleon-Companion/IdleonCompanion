import { Class, Subclass } from "~/composables/Characters";

export const build = {
  "title": "Bowman Afk (~50)",
  "notes": "",
  "version": "1.21",
  "tabs": [
    {
      "skills": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "0",
        "5": "100",
        "6": "*1",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "100",
        "11": "5-20",
        "12": "0",
        "13": "0",
        "14": "100",
        "15": "0"
      },
      "comment": "*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you're low on defense by this point, equipping food to stay alive is normal and expected.\n\n" +
      "\"Idle Shooting\" to 100 for 13% AFK gain rate\n\n"+
      "Bowman's core concept is \"SpeedNA\" which gives damage based on ever 15% movement speed above 100% so we're aiming for 130% or ideally 145%. Priortity is \"Featherweight\" to 5-20 > \"Gilded Sword\" > \"Sharpened Axe\""
    },
    {
      "skills": {
        "1": "40",
        "2": "40",
        "3": "0",
        "4": "*1",
        "5": "30",
        "6": "15",
        "7": "0",
        "8": "100",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "Level \"Polymer Limbs\" to 100, then your active damage skills to 40. Afterwards level up \"Have Another\" to 30 and \"Veins of the infernal\" to 15\n\n" +
      "*1 level up \"Strafe\" to achieve 130% movement speed with points into featherweight into tab 1. This should be around 40 points\n\n"
    },
    {
      "skills": {
        "1": "40",
        "2": "40",
        "3": "0",
        "4": "0",
        "5": "0",
        "6": "60+",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "*"
      },
      "comment": "Level up \"Magic Bow\" and \"Shortbow\" to 30, then raise \"SpeedNA\" to 40\n\n" +
      "then raise \"SpeedNA\" to 60+\n\n" + 
      "*1 Points can be invested back into tab 2. Eventually you want to aim for 145% MS. 50 points into \"Strafe\" would add another 15%MS for another \"SpeedNA\" bonus"
    }
  ],
  "class": Class.Archer,
  "subclass": Subclass.Bowman
};