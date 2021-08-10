import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Mining / Construction Hybrid (Squire) 100+",
  notes: "",
  version: "1.23",
  level: 100,
  tabs: [
    {
      skills: {
        "1": "100+",
        "6": "100+",
        "9": "100",
        "11": "100+",
        "15": "100+",
      },
      comment: "11>15>6>1>9",
    },
    {
      skills: {
        "3": "100+",
        "5": "1*",
        "9": "100+",
        "10": "*",
        "11": "100+",
        "12": "100+",
        "13": "100+",
        "14": "100+",
      },
      comment:
        "11>12>14>13>3>5/8>9(gold food if you have plenty of golden peanuts and jam",
    },
    {
      skills: {
        "8": "100+",
        "9": "*",
        "11": "100+",
        "12": "100+",
        "13": "100+",
      },
      comment: "11>12>13>8>9",
    },
  ],
  class: Class.Squire,
};
