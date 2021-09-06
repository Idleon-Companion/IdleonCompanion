import { Class } from "~/composables/Characters";

import { Build } from "~/composables/Builds";

export const build: Build = {
  title: "Alchemy / Choppin Hybrid (Shaman) 100+",
  notes: " ",
  version: "1.23",
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
        "4": "*",
        "7": "100+",
        "10": "100+",
        "11": "100+",
        "12": "100+",
        "13": "100+",
      },
      comment: "11>12>13>10>7>3",
    },
    {
      skills: {
        "8": "100+",
        "9": "100+",
        "12": "100+",
        "13": "100+",
        "14": "100+",
      },
      comment: "12>13(only if you still need alchemy xp on shaman)>14>8>9",
    },
  ],
  class: Class.Shaman,
};
