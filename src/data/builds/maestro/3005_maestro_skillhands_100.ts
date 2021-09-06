import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro Skilling: Left + Right Hands (~100)",
  notes:
    "The goal of this build is to allow your other characters to get level 20+ on their non-specialized skills. The focus is not to level Maestro's skill. However, it's expected Maestro will be skilling using this build.",
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
        "For the first tab, place as many points as you can into Happy Dude. Getting 300+ will require upgrading Bliss n Chips from Tab 3. \n1* Once Happy Dude is maximally upgraded, the rest of Tab 1 is used for improving skill efficiency in a particular skill. ",
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
        "8": "1*",
        "9": "100+",
        "11":"*2",
        "13": "100+",
        "14": "100+",
      },
      comment:
        "Place points into Left Hand of Learning and Right Hand of Action. Once those are maxed, put 100+ into Bliss n Chips. \n1* Extra points can go into here to increase EhExPee Statue (+% Skill Exp)\n*2 If the Eff drop is not a big deal, you can place points into Transfusion. This will also increase the EXP gained from balloons.",
    },
  ],
  class: Class.Maestro,
};
