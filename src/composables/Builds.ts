import {
  Assets,
  GameVersion,
  LatestGameVersion,
} from "~/composables/Utilities";
import { Class, Subclass } from "~/composables/Characters";
import { Ref, ref } from "vue";
import { useAuth, useDB } from "~/State";
import { useToast } from "vue-toastification";
import dayjs from "dayjs";
import md5Hex from "md5-hex";

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
type BuildMeta = {
  author: string;
  id: string;
  likes: number;
  likedByCurrentUser: boolean;
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
        comment: 'Max "Book of the Wise"',
      },
      {
        skills: {
          7: "100",
          10: "100",
        },
        comment: 'Max "Individual Insight" and "Untwisted Robes"',
      },
      {
        skills: {
          12: "*100",
          13: "*100",
          14: "*100",
        },
        comment:
          '"Cranium Cooking" has too long cooldown to be considered effective right now. Pick the alchemy talents as needed for your current goal. Most likely, you will do brew speed and sharing talent first.',
      },
    ],
  },
];

const currentBuild: Ref<Build | null> = ref(null);
const currentBuildMeta: Ref<BuildMeta> = ref({
  author: "",
  id: "",
  likes: 0,
  likedByCurrentUser: false,
});
const { db, DbRef } = useDB();
export function useBuilds() {
  const { user } = useAuth();
  const toast = useToast();

  const createNewBuild = (class_: Class, subclass: Subclass | null) => {
    let numTabs = 3;
    if ((class_ === Class.Beginner && !subclass) || class_ === Class.All) {
      numTabs = 1;
    } else if (!subclass) {
      numTabs = 2;
    }
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
    currentBuildMeta.value = {
      author: "",
      id: "",
      likes: 0,
      likedByCurrentUser: false,
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

  const loadBuildFromDatabase = async (id: string) => {
    const buildSnapshot = await db
      .ref(`${DbRef.Builds}/${id}/build`)
      .once("value");
    if (buildSnapshot.exists()) {
      const buildData = buildSnapshot.val();
      currentBuild.value = buildData.build;
      currentBuildMeta.value = {
        author: "1a2b3c",
        id,
        likes: 42,
        likedByCurrentUser: true,
      };
      // Extract likes + likedByCurrentUser
      // const likes = await db.ref(`${DbRef.Builds}/${id}/likes`).once('value');
      // const likedByCurrentUser = await db.ref(`${DbRef.Builds}/${id}/likedBy/${user.id}`).once('value');
      // currentBuildMeta.value = {likes, likedByCurrentUser}
      toast.info(`Loaded build "${currentBuild.value?.title}"`);
    }
  };

  const loadBuildFromShowcase = (index: number) => {
    currentBuild.value = builds[index] ?? null;
  };

  const uploadBuild = () => {
    if (!user.value) {
      toast.error("You must be logged in to do that!");
      return;
    }
    if (
      !currentBuild.value ||
      !currentBuild.value.title ||
      !currentBuild.value.notes
    ) {
      toast.warning("Your build is missing a title/notes.");
      return;
    }
    const buildEncoded = JSON.stringify(currentBuild.value);
    const buildHash = md5Hex(dayjs().toString() + buildEncoded).slice(0, 12);
    const buildData = {
      author: user.value.uid,
      build: buildEncoded,
      likes: 0,
      likedBy: {},
    };
    db.ref(`${DbRef.Builds}/${buildHash}`)
      .set(buildData)
      .then((_) => {
        toast.success("Your build was uploaded successfully!");
        currentBuildMeta.value = {
          author: buildData.author,
          id: buildHash,
          likes: 0,
          likedByCurrentUser: false,
        };
      });
  };

  return {
    builds,
    createNewBuild,
    currentBuild,
    currentBuildMeta,
    getTalentAsset,
    loadBuildFromDatabase,
    loadBuildFromShowcase,
    uploadBuild,
  };
}
