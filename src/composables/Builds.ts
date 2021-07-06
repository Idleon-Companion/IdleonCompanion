import { ref, Ref } from "vue";
import { Class, Subclass } from "~/composables/Characters";
import {
  Assets,
  GameVersion,
  LatestGameVersion,
} from "~/composables/Utilities";

export type BuildTab = {
  skills: Record<number, string>; // Skill index -> points
  comment?: string;
};
export type Build = {
  title: string; // Build name
  version: GameVersion; // Version of Idleon for the build
  level?: number; // Recommended character level
  class: Class;
  subclass?: Subclass | null;
  tabs: BuildTab[];
  notes?: string;
};

// This mapping is used to determine the filename for a certain talent
const classAlias: Record<Class | Subclass, string> = {
  [Class.All]: "all",
  [Class.Beginner]: "all",
  [Class.Warrior]: "war",
  [Class.Archer]: "arc",
  [Class.Mage]: "mag",
  [Subclass.Barbarian]: "bar",
  [Subclass.Bowman]: "bow",
  [Subclass.Hunter]: "hun",
  [Subclass.Journeyman]: "jma",
  [Subclass.Shaman]: "sha",
  [Subclass.Squire]: "sqr",
  [Subclass.Wizard]: "wiz",
};

const builds: Build[] = [
  {
    title: "My First Character / Level 1-10",
    version: "1.22",
    level: 1,
    class: Class.All,
    tabs: [
      {
        skills: {
          5: ">10",
        },
        comment:
          "For your very first character in Legends of Idleon, you would put at least 10 points into 'Sharpened Axe', which gives you a flat damage bonus",
      },
    ],
    notes:
      "Welcome to the game! It will be a great journey, hope we'll see you again!",
  },
  {
    title: "Alchemy / AFK Shaman",
    version: "1.22",
    class: Class.Mage,
    subclass: Subclass.Shaman,
    tabs: [
      {
        skills: {
          8: "100",
        },
        comment: `Max "Book of the Wise"`,
      },
      {
        skills: {
          7: "100",
          10: "100",
        },
        comment: `Max "Individual Insight" and "Untwisted Robes"`,
      },
      {
        skills: {
          12: "*100",
          13: "*100",
          14: "*100",
        },
        comment: `"Cranium Cooking" has too long cooldown to be considered effective right now. Pick the alchemy talents as needed for your current goal. Most likely, you will do brew speed and sharing talent first.`,
      },
    ],
  },
];

const currentBuild: Ref<Build | null> = ref(null);
export function useBuilds() {
  const createNewBuild = (class_: Class, subclass: Subclass | null) => {
    const numTabs =
      class_ !== Class.All && class_ !== Class.Beginner
        ? subclass
          ? 3
          : 2
        : 1;
    const tabs = [];
    for (const _ of Array(numTabs)) {
      tabs.push({
        skills: {},
      });
    }
    currentBuild.value = {
      title: "",
      level: 1,
      version: LatestGameVersion,
      class: class_,
      tabs: tabs,
      subclass,
    };
  };

  const getTalentAsset = (build: Build, tab: number, slot: number) => {
    let role = "";
    if (tab === 1 && slot <= 10) {
      role = classAlias[Class.All];
    } else if ((tab === 1 && slot > 10) || tab === 2) {
      if (build.class !== Class.All && build.class !== Class.Beginner) {
        role = classAlias[build.class];
      }
    } else if (tab === 3) {
      role = build.subclass ? classAlias[build.subclass] : "";
    }
    return Assets.TalentImage(role, tab, slot);
  };

  const loadBuildFromShowcase = (index: number) => {
    currentBuild.value = builds[index] ?? null;
  };

  return {
    builds,
    createNewBuild,
    currentBuild,
    getTalentAsset,
    loadBuildFromShowcase,
  };
}
