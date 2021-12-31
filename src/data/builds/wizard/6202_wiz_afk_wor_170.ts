import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Wizard / AFK / WOR (170)",
  notes: "Active Skills act as a multiplyer to your total dmg for afk. lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents if you are using Prayers that increase mob hp. \n To turn this into a regular afk build do not lvl anything related to eff or worship.",
  version: "1.40b",
  level: 170,
  tabs: [
    {
      skills: {
        "1": "*1",
        "2": "160",
        "4": "*1",
        "5": "160",
        "7": "1+",
        "8": "*2",
        "10": "160",
        "11": "160",
        "12": "260",
        "14": "160",
      },
      comment:
        '*1 Put points into talents for Survivablility. Quickness Boots for accuracy. \n *2 This build uses many talent points. If you lack points do not lvl Book of the Wise too high. ',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "160",
        "6": "160",
        "7": "160",
        "8": "160",
        "9": "1+",
        "10": "160",
        "15": "25+",
      },
      comment:
        'Put points into Free Meal to reduce food consumption. \n*1 Chopping it up Ez is a has bad scaling, put in a few points and only max it when you have no other use for points.',
    },
    {
      skills: {
        "1": "25",
        "2": "25",
        "3": "25",
        "6": "160",
        "8": "1+",
        "9": "160",
        "10": "160",
        "12": "160",
        "14": "120+",
      },
      comment:
        ' Lvling Mage is Best bubble for Fuscia Flasks is currently very hard. Do not lvl Fuscia Flasks higher than you can use it. \n Charge Syphon can be used to boost the worship lvl on your wizard or get more souls per charge, with Prayer nerf and MMan you likely do not want to use this. ',
    },
  ],
  class: Class.Wizard,
};
