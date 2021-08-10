import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Woodcutter Active / AFK (Mage) 30+",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "2": "100+",
        "8": "200+",
        "9": "*excess",
        "11": "100+",
        "15": "100+",
      },
      comment:
        "Max Smart Efficiency, Mana Booster, Book Of the Wise and Active AFK'er in that order. Excess points can go into LUK.",
    },
    {
      skills: {
        "3": "100+",
        "4": "*1",
        "10": "100+",
        "11": "100+",
        "12": "100+",
        "13": "100+",
      },
      comment:
        "Max Logs On Logs, Leaf Thief, Deforesting All Doubt, Mana Overdrive, Individual Insight, and Inner Peace in that order.\nExcess points can go into teleportation to move quicker.",
    },
    {
      skills: {
        "7": "100+",
        "8": "100+",
        "9": "100+",
        "15": "100+",
      },
      comment:
        "Max Earlier Education, Stupendous Statues,and WIS Mumbo in that order./nIf you are using WIS obols put excess points into Occult Obols",
    },
  ],
  class: Class.Mage,
  subclass: Subclass.Shaman,
};
