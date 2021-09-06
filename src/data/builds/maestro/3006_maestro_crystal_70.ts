import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Maestro Crystal Cards (~70)",
  notes:
    "The goal of this build is to farm Crystal Cards",
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
        "11": "100+",
      },
      comment:
        "This tab doesn't matter. Place points into 'It's your Birthday!' for some gems. \n1* Excess points can be placed anywhere.",
    },
    {
      skills: {
        "8": "1*",
        "9": "100+",
        "13": "100+",
        "14": "50*",
      },
      comment:
        "Place as many points as possible into Bliss n Chips. Then into Left Hand of Learning. Afterwards, place 50+ into Right Hand of Action. You can split the excess between the Right Hand or Skilliest Statue \n1* Extra points can go into here to increase EhExPee Statue (+% Skill Exp)",
    },
  ],
  class: Class.Maestro,
};
