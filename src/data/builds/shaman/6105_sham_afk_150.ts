import { Build } from "~/composables/Builds";
import { Class } from "~/composables/Characters";

export const build: Build = {
  title: "Shaman / AFK (~150)",
  notes: "After reaching 100 WIS your brewspeed is reduced until you hit 1300+ WIS. \n Active Skills act as a multiplyer to your total dmg for afk. \n lvl 25 on all of them should be enough to reach dmg cap. Put more points into attack talents if you are using Prayers that increase mob hp. ",
  version: "1.40b",
  level: 150,
  tabs: [
    {
      skills: {
	"1": "*1",
	"2": "100+",
	"4": "*1",
	"5": "160",
	"7": "100",
	"8": "260",
	"10": "160",
	"12": "100",
	"14": "160",
      },
      comment:
        "*1 Put points into talents for Survivablility. Quickness Boots for accuracy.",
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
	"14": "160",
	"15": "25",
      },
      comment:
        "Put points into Free Meal to reduce food consumption. \n*1 Chopping it up Ez is a has bad scaling, 25 points are enough.",
    },
    {
      skills: {
  "1": "25",
	"2": "25",
	"3": "25",
	"6": "160",
	"7": "1+",
	"8": "100+",
	"9": "160",
	"12": "160",
	"13": "160",
	"14": "160",
	"15": "1+",
      },
      comment:
        'Talents 12, 13  and 14 to boost your alchemy.\n*1 Excess points go into Stupendous Statues. \n Wis Wumbo is needed to reach lvl 260 on first tab talent Book of the wise.',
    },
  ],
  class: Class.Shaman,
};
