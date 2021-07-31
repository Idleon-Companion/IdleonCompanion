import { Class, Subclass } from "~/composables/Characters";

export const build = {
  "title": "Wizard / AFK (~70)",
  "notes": "Active Skills directly increase AFK kills/hr.",
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
      "comment": "*1 = Boost AGI to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you're low on defense, by this point equipping food to stay alive is normal and expected.\n\"Idle Casting\" to 100 for 13% AFK gain rate.\nPriority switches to \"Overclocked Energy\" > \"Gilded Sword\" > \"Sharpened Axe\""
    },
    {
      "skills": {
        "1": "*1",
        "2": "70",
        "3": "0",
        "4": "0",
        "5": "0",
        "6": "*2",
        "7": "0",
        "8": "100",
        "9": "0",
        "10": "*2",
        "11": "0",
        "12": "0",
        "13": "0",
        "14": "0",
        "15": "0"
      },
      "comment": "Level \"Power Overwhelming\" to 100, then 70 to Fireball.\n*1 = If you are not AFK damage capped, you can add more points into \"Energy Bolt\" until you hit cap.\n*2 = Spread excess points equally between \"Knowledge is Power\" and \"Individual Insight\"."
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
        "15": "*1"
      },
      "comment": "Level the damage skills evenly. Be sure to place 30 points into \"Paperwork Great...\" for a nice damage boost.\n*1 = You can put some points into \"Earlier Education\" if you're lacking points on Tab 2. "
    }
  ],
  "class": Class.Mage,
  "subclass": Subclass.Wizard
};