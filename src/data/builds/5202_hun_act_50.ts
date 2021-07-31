import { Class, Subclass } from "~/composables/Characters";


 export const build = {
  "title": "Bowman / Active (~50)",
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
        "11": "0",
        "12": "5-20",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "*1 = Boost STR to have as much accuracy as you need. Usually this will be the farthest monster you can reach without dying. If you're low on defense, by this point equipping food to stay alive is normal and expected. \n Bowman's core concept is \"SpeedNA\", gives damage based on every 15% movement speed so we're aiming for 130% or ideally with spare points, 145%. Priority is \"Featherweight\" to 5-20 > \"Gilded sword\" > \"Sharpened Axe\" "
    },
    {
      "skills": {
        "1": "1",
        "2": "1",
        "3": "0",
        "4": "*1",
        "5": "*2",
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
      "comment": "Put 1 point into the active skills, then max \"High Polymer Limbs\" . \n *1 Level up \"Strafe\" to achieve 130% movement speed with points into featherweight into tab 1. This should be around 40 points. \n Excess points can be used to level \"Have Another\"."
    },
    {
      "skills": {
        "1": "1",
        "2": "1",
        "3": "0",
        "4": "1",
        "5": "0",
        "6": "70-90",
        "7": "0",
        "8": "0",
        "9": "0",
        "10": "0",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "*1"
      },
      "comment": "Put 1 point into active skills, then get speedNA up to 70-90. \n *1 Points can be invested back into tab 2 if necessary. Eventually you want to aim for 145% MS. 50 points into Strafe would add another 15% MS for another \"SpeedNA\" bonus."
    }
  ],
  "class": Class.Archer,
  "subclass": Subclass.Bowman
}