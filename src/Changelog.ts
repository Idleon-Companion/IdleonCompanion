// This object represents the changes made to the site shown on the credits page
type ChangelogEntry = {
  version: string;
  changes: {
    features?: string[];
    changes?: string[];
    fixes?: string[];
  };
  date: string;
};
export const Changelog: ChangelogEntry[] = [
  {
    version: "0.0.0 (Vue 3 Port)",
    changes: {
      features: ["Ported all existing code to Vue 3", "Add character creation"],
      changes: [
        "Builds and tasks load dynamically",
        "Modified how data is stored locally (this results in previous data being incompatible going forward, but data input is easier)",
      ],
    },
    date: "March 30, 2021",
  },
  {
    version: "0.1.0",
    changes: {
      features: [
        "Add stamps to progress tracker",
        "Add statue tracker",
        "Characters selector: change characters from anywhere",
      ],
      changes: [
        "Characters and data is persisted locally",
        "Migrate styles to Bootstrap 5",
      ],
    },
    date: "April 2, 2021",
  },
  {
    version: "0.1.1",
    changes: {
      features: [
        "Pack Mule Crafter: helps with the W1 task to craft without moving or using a chest",
        "Stamps: calculator for material and money cost + effect bonus",
      ],
      changes: [
        "Statues: improvements to UI, change the way tracking works",
        "Checklist: items are now updated globally here, with character-specific items moved",
        "Checklist: stamps are now trackable",
        "Dev: create GameAsset component for dynamic images",
        "Dev: add VueTippy tooltip library to replace Bootstrap tooltips",
      ],
      fixes: ["Characters: limit name to 14 characters"],
    },
    date: "April 8, 2021",
  },
  {
    version: "0.1.2",
    changes: {
      features: [
        "Tasks: create your own tasks, sync them with your game daily reset, and customize with categories and reset timers",
        "Characters: add character editor for name, level, class, skills, etc.",
        "Statues: show cost, levels, and total bonuses",
        "Alchemy: track vials and upgrade levels, with different effects calculated",
      ],
      changes: ["Progress: add cards + different tiers"],
      fixes: [
        "Characters: unable to switch characters",
        "UI: general overhaul with readability and responsiveness improvements",
        "Dev: ensure build is working, add CI/AD tools for testing",
        "Dev: content improvements/updates (thanks to Nymiir)",
      ],
    },
    date: "April 20, 2021",
  },
  {
    version: "0.2.0 (Public Release)",
    changes: {
      features: [
        "Characters: add inventory slots + top skills, make characters the default tab",
      ],
      changes: [
        "UI: add logo and changelog to website",
        "Tracking: capacity pouches now scroll, similar to alchemy vials",
        "Dev: organize tabs and add path alias",
      ],
      fixes: [
        "Tracking: order of items to match game",
        "Tasks: fix time clock sync issues",
      ],
    },
    date: "May 5, 2021",
  },
  {
    version: "0.2.1 (Cloud Storage)",
    changes: {
      features: [
        "Accounts: Create an account to save your data to the cloud and sync between multiple devices",
        "Recipe Calculator: select an Anvil recipe and a quantity, and get a list of materials needed",
      ],
      changes: ["UI: compact Layout for Picnic Quest calc"],
      fixes: [
        "Statues rearrenged to display in the same order as they are ingame",
        "Build info now correctly wrap to a newline",
      ],
    },
    date: "May 31, 2021",
  },
  {
    version: "0.2.2 (Calculators / Star Signs)",
    changes: {
      features: [
        "Constellations: Track constellations unlocked on each character as well as equipped star signs",
        "W3 Data: Cards, Stamps, Skills, Materials, Recipes and Alchemy updated to Latest Version",
      ],
      changes: ["UI: improved design of the recipe calculator"],
    },
    date: "June 2021",
  },
  {
    version: "0.2.3",
    changes: {
      changes: [
        "UI: New Tree View for the recipe calculator",
        "Tracking: Hard Resource Cards added to Progress Tracker",
      ],
    },
    date: "June 2021",
  },
  {
    version: "0.2.4",
    changes: {
      changes: ["Builds: All builds has been reworked for W3."],
    },
    date: "August 2021",
  },
  {
    version: "0.3.0 (Site Redesign)",
    changes: {
      features: [
        "Builds: Create and share builds directly through Idleon Companion! Yes, we are a social network now :)",
        "Tasks: Now supporting multi-step tasks and custom timers (for traps and more!)",
        "Sweet Spot: Find your best EXP farming spots! Your favorite feature from the Idleon Toolbox, now on Idleon Companion!",
      ],
      changes: [
        "UI: Complete rework to use Quasar design framework + better navigation control with Vue Router",
        "UI: All pages have a brief explanation of the feature + links to Wiki pages if applicable",
        "Dev: A number of internal changes to make features easier to contribute to (such as builds/card sets)",
      ],
      fixes: [
        "Account level total will display correctly",
        "Sign in flow improved and will always keep you signed in on the same device!",
        "Alchemy: tracking + material calculation fixed",
      ],
    },
    date: "August 2021",
  },
  {
    version: "0.3.1 (Builds Update)",
    changes: {
      changes: [
        "Builds: A variety of builds have been updated on the website. Some new builds were added.",
      ],
    },
    date: "August 2021",
  },
  {
    version: "0.3.2 (SweetSpot Update)",
    changes: {
      changes: [
        "SweetSpot: World 3 is now included in the calculator! Calculation of the Average hit to kill has been refined. A \"Calculate\" button has been added to prevent uneeded computation. In-depth Table has been made easier to view"
      ],
    },
    date: "October 2021",
  },
  {
    version: "0.3.3 (Bugfixes)",
    changes: {
      fixes: [
        "Statues: Statues are now able to be imported",
        "Stamps: Image of Sukka Foo and Steve Sword now show correctly",
        "Cards: Name and source of Summer Cards updated"
      ],
    },
    date: "October 2021",
  },
  {
    version: "1.0.0 (Imports are Here!)",
    changes: {
      changes: [
        "Import: The import sidepannel has been introduced! Use tools created by our idleon community to generate a JSON file with all your character info! Import this file and all your progress in the Idleon Companion is automatically filled! The tool is able to take your data from the Steam Version!",
      ],
    },
    date: "October 2021",
  },
  {
    version: "1.0.1 (Stamps & Alchemy Bugfixes)",
    changes: {
      fixes: [
        "Stamps: Costs are now accurate",
        "Alchemy: Costs are now accurate. Introduced checkbox for SMRT achievement."
      ],
    },
    date: "October 2021",
  },
];
