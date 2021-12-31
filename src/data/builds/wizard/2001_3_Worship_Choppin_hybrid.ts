import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Worship / Choppin Hybrid (Wizard) 100+",
  notes:
    "skipping xp talents cause you usually dont have any need for xp when you decide to make hybrid build",
  version: "1.40b",
  level: 100,
  tabs: [
    {
      skills: {
        "2": "100+",
        "8": "100+",
        "9": "100",
        "11": "100+",
        "15": "100+",
      },
      comment: "11>15>8>2>9",
    },
    {
      skills: {
        "3": "*",
        "7": "100+",
        "9": "1+",
        "10": "100+",
        "11": "100+",
        "12": "100+",
        "13": "100+",
      },
      comment: "11>12>13>10>7>3. Free Meal to reduce food consumption. ",
    },
    {
      skills: {
        "8": "100+",
        "9": "100+",
        "11": "100+",
        "12": "100+",
        "14": "100+",
      },
      comment: "11>12>14>9>8",
    },
  ],
  class: Class.Wizard,
};
