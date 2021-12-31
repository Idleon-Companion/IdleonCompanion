import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Bowman / AFK (~90)",
  notes:
    "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. \n Activate Strafe and Extendo Rango before AFK.",
  version: "1.40b",
  level: 90,
  tabs: [
    {
      skills: {
        "4": "*2",
        "5": "100+",
        "6": "*1",
        "7": "*2",
        "10": "100+",
        "12": "20",
        "14": "100+",
        "15": "*2",
      },
      comment:
        '*1 = Boost STR to have as much accuracy as you need for the best AFK gains. Usually this will be the farthest monster you can reach without dying. If you\'re low on defense, by this point equipping food to stay alive is normal and expected. \n"Idle Shooting" to 100 for 13% AFK gain rate. \n Bowman\'s core concept is "SpeedNA" gives damage based on every 15% movement speed so we\'re aiming for 145% with "Featherweight" & "Strafe". Priority is "Featherweight" to 20 > "Gilded Sword" & "Sharpened Axe". \n *2 = Excess points may go here.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "*1",
        "4": "100+",
        "5": "25",
        "6": "100+",
        "8": "100+",
      },
      comment:
        ' Try to reach "100 + multiple of 15" movement speed ( 115%, 130%, 145%, etc.) \n *1 Assing points here for Survivability. ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "4": "*1",
        "6": "100",
        "8": "*2",
        "15": "1+",
      },
      comment:
        ' Put points into extendo so you need less acc from tab 1. \n *2 Excess points here.',
    },
  ],
  class: Class.Bowman,
};
