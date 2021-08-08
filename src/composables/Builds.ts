import {
  Assets,
  GameVersion,
  LatestGameVersion,
} from "~/composables/Utilities";
import { Class, getClassTree } from "~/composables/Characters";
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
  class: Class; // The (highest) class this build is for (e.g. Squire > Warrior)
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
const classAlias: Record<Class, string> = {
  [Class.Beginner]: "all",
  [Class.Journeyman]: "jma",
  [Class.Maestro]: "mae",
  [Class.Warrior]: "war",
  [Class.Barbarian]: "bar",
  [Class.Squire]: "sqr",
  [Class.Archer]: "arc",
  [Class.Bowman]: "bow",
  [Class.Hunter]: "hun",
  [Class.Mage]: "mag",
  [Class.Shaman]: "sha",
  [Class.Wizard]: "wiz",
};

const builds: Build[] = [
  {
    title: "My First Character / Level 1-10",
    version: "1.22",
    level: 1,
    class: Class.Beginner,
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
    class: Class.Shaman,
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

  const createNewBuild = (class_: Class) => {
    const numTabs = getClassTree(class_).length;
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
    const classTree = getClassTree(build.class);
    if (tab === 1 && slot <= 10) {
      role = classAlias[classTree.slice(-1)[0]];
    } else if ((tab === 1 && slot > 10) || tab === 2) {
      if (build.class !== Class.Beginner) {
        role = classAlias[classTree.slice(-2)[0]];
      }
    } else if (tab === 3) {
      role = classAlias[classTree.slice(-3)[0]];
    }
    return Assets.TalentImage(role, tab, slot);
  };

  const loadBuildFromDatabase = async (id: string) => {
    if (!id) {
      toast.warning("Invalid build ID.");
      return;
    }
    const buildSnapshot = await db.ref(`${DbRef.Builds}/${id}`).once("value");
    if (buildSnapshot.exists() && buildSnapshot.val()) {
      const buildData = buildSnapshot.val();
      currentBuild.value = JSON.parse(buildData.build) as Build;
      currentBuildMeta.value = {
        author: buildData.author,
        id,
        likes: buildData.likes,
        likedByCurrentUser: false,
      };
      if (user.value) {
        // Only extract liked by data if user is logged in
        const likedByCurrentUser = await db
          .ref(`${DbRef.Builds}/${id}/likedBy/${user.value.uid}`)
          .once("value");
        currentBuildMeta.value.likedByCurrentUser = likedByCurrentUser.val();
      }
      toast.info(`Loaded build "${currentBuild.value.title}"`);
    } else {
      toast.error("Failed to load build. It may have been deleted.");
    }
  };

  const likeBuild = async (buildId: string) => {
    if (!user.value) {
      toast.error("You must be logged in to do that!");
      return;
    }
    console.log(user.value.uid, buildId);
    db.ref(`${DbRef.Builds}/${buildId}/likedBy/${user.value.uid}`)
      .set(true)
      .then(() => {
        db.ref(`${DbRef.Builds}/${buildId}/likes`)
          .transaction((data) => {
            if (data !== null) {
              data += 1;
            }
            return data;
          })
          .then(() => {
            toast.success("Thanks for liking this build!");
          });
      });
  };

  const unlikeBuild = async (buildId: string) => {
    if (!user.value) {
      toast.error("You must be logged in to do that!");
      return;
    }
    db.ref(`${DbRef.Builds}/${buildId}/likedBy/${user.value.uid}`)
      .remove()
      .then(() => {
        db.ref(`${DbRef.Builds}/${buildId}/likes`).transaction((data) => {
          if (data !== null) {
            data -= 1;
          }
          return data;
        });
      });
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
    likeBuild,
    loadBuildFromDatabase,
    unlikeBuild,
    uploadBuild,
  };
}
