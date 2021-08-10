import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Hunter / Active (~50)",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "100",
        "6": "*1",
        "10": "100",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n Priority is "Gilded sword" > "Sharpened Axe" ',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "4": "1",
        "5": "*1",
        "6": "15",
        "8": "100",
      },
      comment:
        'Put 1 point into the active skills, then max "High Polymer Limbs". \n Put 15 points into "Veins of the Infernal". \n *1 = Excess points can be used to level "Have Another".',
    },
    {
      skills: {
        "1": "*1",
        "2": "*1",
        "5": "20",
        "6": "70",
      },
      comment:
        'Put 1 point into active skills, 30 into "Have Another... Again", then put remaining points into "Looty McShooty". \n *1 = Unequip 360NoScope and/or "Bear Trap" due to mana issues. \n Excess points can be put into "Have Another... Again"',
    },
  ],
  class: Class.Archer,
  subclass: Subclass.Hunter,
};
