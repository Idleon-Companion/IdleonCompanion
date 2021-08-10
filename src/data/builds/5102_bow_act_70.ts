import { Class, Subclass } from "~/composables/Characters";

export const build = {
  title: "Bowman / Active (~70)",
  notes: "",
  version: "1.21",
  tabs: [
    {
      skills: {
        "5": "100",
        "6": "*1",
        "10": "100",
        "12": "20",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n Bowman\'s core concept is "SpeedNA", gives damage based on every 15% movement speed so we\'re aiming for 145% with "Featherweight" & "Strafe". \n Priority is "Featherweight" to 20, then "Gilded Sword" > "Sharpened Axe". Excess points may be placed into Agi or "Broken Time".',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "4": "1*",
        "5": "50",
        "6": "20",
        "8": "100",
      },
      comment:
        'Put 1 point into the active skills, then max "High Polymer Limbs" followed by 50 points into "Have Another" & 20 into "Veins of the Infernal". \n *1 = Level up "Strafe" to achieve 145% movement speed with points into "Featherweight" into tab 1. This should be around 85 points.',
    },
    {
      skills: {
        "1": "1",
        "2": "1",
        "4": "1",
        "6": "100",
        "15": "100",
      },
      comment:
        'Put 1 point into active skills, then get speedNA maxed. \n Points will be invested back into tab 2 for "Strafe" to aim for 145% MS.',
    },
  ],
  class: Class.Archer,
  subclass: Subclass.Bowman,
};
