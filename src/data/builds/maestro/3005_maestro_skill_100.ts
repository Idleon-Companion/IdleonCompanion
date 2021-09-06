import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro Skilling (~100)",
  notes:
    "This build is created to level Maestro's skills as quickly as possible.",
  version: "1.23",
  level: 100,
  tabs: [
    {
      skills: {
        "1": "1*",
        "2": "1*",
        "6": "1*",
        "7": "1*",
        "8": "1*",
        "11": "100+",
      },
      comment:
        "Place as many points as you can into Happy Dude. Getting 300+ will require upgrading Bliss n Chips from Tab 3. \n1* Once Happy Dude is maximally upgraded, the rest of Tab 1 is used for improving skill efficiency in a particular skill. ",
    },
    {
      skills: {
        "7":"*2",
        "9":"*2",
        "10":"100",
        "11": "100+",
        "14": "*1",
        "15":"100",
      },
      comment:
        "Place points into It's your Birthday! for some gems. Then put 100 into Mr Looty Booty and Rares Everywhere for higher statue drop.\n*2 Excess points can be placed points into F\'luk\'ey Fabrics and Lucky Horseshoe for LUK to increase droprate.\n*1 If you need cards, you can use cards galore.",
    },
    {
      skills: {
        "3":"*4",
        "8": "1*",
        "9": "100+",
        "11":"*2",
        "13": "*3",
        "14": "*3",
      },
      comment:
        "Use the Library to place 100+ into Bliss n Chips. \n1* Extra points can go into here to increase EhExPee Statue (+% Skill Exp)\n*2 If the Eff drop is not a big deal, you can place points into Transfusion. This will also increase the EXP gained from balloons.\n*3 Excess points can go into Left/Right hand to help your other skillers.\n*4 Excess points can be put into Printer Go Brrr",
    },
  ],
  class: Class.Maestro,
};
