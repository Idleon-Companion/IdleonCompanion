import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Bowman Boss Killer",
  notes:
    "This build works best with 4 movement speed food, Boost food effect: cards/Yum Yum Desert set/PO box and King of Food trophy. If you have only 3 ms food I'd use boss card set.  ",
  version: "1.23",
  level: 100,
  tabs: [
    {
      skills: {
        "5": "100+",
        "7": "200+",
        "10": "100+",
        "12": "100+",
        "13": "100+",
      },
      comment:
        "Library order: Gilded>Sharpened>Featherweigh(not possible atm)> Agi> I see you",
    },
    {
      skills: {
        "4": "100+",
        "6": "100+",
        "7": "100+",
        "8": "100+",
        "9": "100+",
      },
      comment:
        "Library order: High Polymer Limbs>Strafe>Veins>Sanic Speed>Garb of Un'AGI'ng Quality",
    },
    {
      skills: {
        "1": "100+",
        "6": "100+",
        "7": "100+",
        "8": "100+",
        "9": "100+",
        "15": "*",
      },
      comment:
        "Library order: SpeeDNA>Homing arrows>Agi again>Schwifty statues>Shoeful of obols",
    },
  ],
  class: Class.Bowman,
};
