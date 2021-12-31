import { Build } from "~/composables/Builds";
import { Class } from "~/composables/Characters";

export const build: Build = {
  title: "Shaman / COLO (100+)",
  notes: "Auspicious Aura and Tenteyecle are the most important talents for this build. \n Crazy Concoctions can be used while you walk. Tab on a spot and drop it while running past mobs. \n Mini Fireball and Sizzling Skull can be used to clear up mobs that you missed. \n To get the best scores you need 3x speed potions and Crows Nest. Only use Crows Nest if you got enough DMG.",
  version: "1.40b",
  level: 100,
  tabs: [
    {
      skills: {
	"2": "100+",
	"4": "1+",
	"5": "100+",
	"7": "1+",
	"8": "100+",
	"10": "100+",
	"12": "100",
      },
      comment:
        "Quickness Boots for accuracy, you need enough to hit the strongest mob. Missing on mobs will screw over your cooldowns.",
    },
    {
      skills: {
	"2": "100+",
	"3": "100",
	"6": "100+",
  "7": "1+",
	"8": "100+",
	"10": "1+",
	"15": "25",
      },
      comment:
        "Put unused points into WIS talents.",
    },
    {
      skills: {
  "1": "100+",
	"2": "140+",
	"3": "1+",
  "4": "120+",
	"6": "100+",
	"11": "*1",
      },
      comment:
        'Auspicious Aura needs to be atleast lvl 105, 140 would be best. Tenteyecle resets the cd of your skills on kills, you need to have this talent. \n *1 Put addional points here for Alchemy gains. Activate it when you start killing.',
    },
  ],
  class: Class.Shaman,
};
