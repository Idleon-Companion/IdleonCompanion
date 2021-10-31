import { Item, ItemGroup } from "./Utilities";

const InventoryBags: Item[] = [
  {
    name: "Inventory Bag A",
    bagSlots: 1,
    source: "Quest (Scripticus)",
  },
  {
    name: "Inventory Bag B",
    bagSlots: 1,
    source: "Quest (Scripticus)",
  },
  {
    name: "Inventory Bag C",
    bagSlots: 1,
    source: "Quest (Scripticus)",
  },
  {
    name: "Inventory Bag D",
    bagSlots: 2,
    source: "Quest (Promotheus)",
  },
  {
    name: "Inventory Bag E",
    bagSlots: 2,
    source: "Quest (Cowbo Jones)",
  },
  {
    name: "Inventory Bag F",
    bagSlots: 2,
    source: "Quest (Cowbo Jones)",
  },
  {
    name: "Inventory Bag G",
    bagSlots: 2,
    source: "DropTable6",
  },
  {
    name: "Inventory Bag H",
    bagSlots: 2,
    source: "Quest (Cowbo Jones)",
  },
  {
    name: "Inventory Bag I",
    bagSlots: 2,
  },
  {
    name: "Snakeskinventory Bag",
    bagSlots: 2,
    source: "Drop (Baby Boa)",
  },
  {
    name: "Totally Normal and not fake Bag",
    bagSlots: 2,
    source: "Drop (Mimic)",
  },
  {
    name: "Mamooth Hide Bag",
    bagSlots: 1,
    source: "Drop (Mamooth)",
  },
  {
    name: "Blunderbag",
    bagSlots: 4,
    source: "Smithing",
  },
  {
    name: "Sandy Satchel",
    bagSlots: 4,
    source: "Smithing",
  },
  {
    name: "Shivering Sack",
    bagSlots: 3,
    source: "Smithing",
  },
  {
    name: "Bummo Bag",
    bagSlots: 1,
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Capitalist Case",
    bagSlots: 1,
    source: "Vendor (Encroaching Forest Villas)",
  },
  {
    name: "Wealthy Wallet",
    bagSlots: 1,
    source: "Vendor (YumYum Grotto)",
  },
  {
    name: "Prosperous Pouch",
    bagSlots: 1,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Sack of Success",
    bagSlots: 2,
  },
];

const GemShopBags: Item[] = [
  {
    name: "Inventory Bag U",
    bagSlots: 4,
    source: "Gem Shop",
  },
  {
    name: "Inventory Bag V",
    bagSlots: 4,
    source: "Gem Shop",
  },
  {
    name: "Inventory Bag W",
    bagSlots: 4,
    source: "Gem Shop",
  },
  {
    name: "Inventory Bag X",
    bagSlots: 4,
    source: "Gem Shop",
  },
  {
    name: "Inventory Bag Y",
    bagSlots: 4,
    source: "Gem Shop",
  },
  {
    name: "Inventory Bag Z",
    bagSlots: 4,
    source: "Gem Shop",
  },
];

const MaterialPouches: Item[] = [
  {
    name: "Mini Materials Pouch",
    source: "Quest (Scripticus)",
  },
  {
    name: "Cramped Materials Pouch",
    source: "Smithing",
  },
  {
    name: "Small Materials Pouch",
    source: "Quest (Scripticus)",
  },
  {
    name: "Average Materials Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Materials Pouch",
    source: "Smithing",
  },
  {
    name: "Big Materials Pouch",
    source: "Smithing",
  },
  {
    name: "Large Materials Pouch",
    source: "Smithing",
  },
];

const MiningPouches: Item[] = [
  {
    name: "Miniature Mining Pouch",
    source: "Quest (Glumlee)",
  },
  {
    name: "Cramped Mining Pouch",
    source: "Smithing",
  },
  {
    name: "Small Mining Pouch",
    source: "Smithing",
  },
  {
    name: "Average Mining Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Mining Pouch",
    source: "Smithing",
  },
  {
    name: "Big Mining Pouch",
    source: "Smithing",
  },
  {
    name: "Large Mining Pouch",
    source: "Smithing",
  },
];

const FishingPouches: Item[] = [
  {
    name: "Miniature Fish Pouch",
  },
  {
    name: "Cramped Fish Pouch",
    source: "Smithing",
  },
  {
    name: "Small Fish Pouch",
    source: "Smithing",
  },
  {
    name: "Average Fish Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Fish Pouch",
    source: "Smithing",
  },
  {
    name: "Big Fish Pouch",
    source: "Smithing",
  },
  {
    name: "Large Fish Pouch",
    source: "Smithing",
  },
];

const FoodPouches: Item[] = [
  {
    name: "Miniscule Food Pouch",
    source: "Quest (Picnic Stowaway)",
  },
  {
    name: "Cramped Food Pouch",
    source: "Smithing",
  },
  {
    name: "Small Food Pouch",
    source: "Quest (Funguy)",
  },
  {
    name: "Average Food Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Food Pouch",
    source: "Smithing",
  },
  {
    name: "Big Food Pouch",
    source: "Smithing",
  },
  {
    name: "Large Food Pouch",
    source: "Smithing",
  },
];

const ChoppinPouches: Item[] = [
  {
    name: "Miniature Choppin Pouch",
    source: "Quest (Woodsman)",
  },
  {
    name: "Cramped Choppin Pouch",
    source: "Smithing",
  },
  {
    name: "Small Choppin Pouch",
    source: "Smithing",
  },
  {
    name: "Average Choppin Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Choppin Pouch",
    source: "Smithing",
  },
  {
    name: "Big Choppin Pouch",
    source: "Smithing",
  },
  {
    name: "Large Choppin Pouch",
    source: "Smithing",
  },
];

const BugPouches: Item[] = [
  {
    name: "Miniature Bug Pouch",
  },
  {
    name: "Cramped Bug Pouch",
    source: "Smithing",
  },
  {
    name: "Small Bug Pouch",
    source: "Smithing",
  },
  {
    name: "Average Bug Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Bug Pouch",
    source: "Smithing",
  },
  {
    name: "Big Bug Pouch",
    source: "Smithing",
  },
  {
    name: "Large Bug Pouch",
    source: "Smithing",
  },
];

const CritterPouches: Item[] = [
  {
    name: "Small Critter Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Critter Pouch",
    source: "Smithing",
  },
  {
    name: "Big Critter Pouch",
    source: "Smithing",
  },
  {
    name: "Large Critter Pouch",
    source: "Smithing",
  },
];

const SoulPouches: Item[] = [
  {
    name: "Small Soul Pouch",
    source: "Smithing",
  },
  {
    name: "Sizable Soul Pouch",
    source: "Smithing",
  },
  {
    name: "Big Soul Pouch",
    source: "Smithing",
  },
  {
    name: "Large Soul Pouch",
    source: "Smithing",
  },
];

const StorageChests: Item[] = [
  {
    name: "Storage Chest 1",
    bagSlots: 3,
    source: "Quest (Hamish)",
  },
  {
    name: "Storage Chest 2",
    bagSlots: 3,
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Storage Chest 3",
    bagSlots: 3,
    source: "Quest (Krunk)",
  },
  {
    name: "Storage Chest 4",
    bagSlots: 3,
    source: "Quest (Cowbo Jones)",
  },
  {
    name: "Storage Chest 5",
    bagSlots: 3,
    source: "Quest (Mutton)",
  },
  {
    name: "Storage Chest 6",
    bagSlots: 4,
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Storage Chest 7",
    bagSlots: 4,
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Storage Chest 8",
    bagSlots: 4,
    source: "Vendor (Encroaching Forest Villas)",
  },
  {
    name: "Storage Chest 9",
    bagSlots: 4,
    source: "Vendor (YumYum Grotto)",
  },
  {
    name: "Storage Chest 10",
    bagSlots: 5,
    source: "Vendor (YumYum Grotto)",
  },
  {
    name: "Storage Chest 11",
    bagSlots: 5,
    source: "Quest (Snake Jar)",
  },
  {
    name: "Storage Chest 12",
    bagSlots: 5,
    source: "Vendor (Encroaching Forest Villas)",
  },
  {
    name: "Storage Chest 13",
    bagSlots: 5,
    source: "Vendor (YumYum Grotto)",
  },
  {
    name: "Storage Chest 14",
    bagSlots: 5,
  },
  {
    name: "Storage Chest 15",
    bagSlots: 6,
    source: "Vendor (YumYum Grotto)",
  },
  {
    name: "Storage Chest 16",
    bagSlots: 6,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Storage Chest 17",
    bagSlots: 6,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Storage Chest 18",
    bagSlots: 6,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Storage Chest 19",
    bagSlots: 6,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Storage Chest 20",
    bagSlots: 7,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Storage Chest 21",
    bagSlots: 7,
    source: "Vendor (Frostbite Towndra)",
  },
  {
    name: "Storage Chest 90",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 91",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 92",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 93",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 94",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 95",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 96",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 97",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 98",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 99",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 99B",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Storage Chest 99C",
    bagSlots: 6,
    source: "Gem Shop",
  },
  {
    name: "Dank Paypay Chest",
    bagSlots: 6,
    source: "Drop (Frog)",
  },
];

const CombatStamps: Item[] = [
  {
    name: "Sword Stamp",
    source: "Start",
  },
  {
    name: "Heart Stamp",
    source: "Start",
  },
  {
    name: "Mana Stamp",
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Tomahawk Stamp",
    source: "Quest (Hamish)",
  },
  {
    name: "Target Stamp",
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Shield Stamp",
    source: "Vendor (Blunder Hills)",
  },
  {
    name: "Longsword Stamp",
    source: "Drop (Baby Boa)",
  },
  {
    name: "Kapow Stamp",
    source: "Drop (Gigafrog)",
  },
  {
    name: "Fist Stamp",
    source: "Quest (Mutton)",
  },
  {
    name: "Battleaxe Stamp",
    source: "Drop (Gigafrog)",
  },
  {
    name: "Agile Stamp",
    source: "DropTable12",
  },
  {
    name: "Vitality Stamp",
    source: "Vendor (Encroaching Forest Villas)",
  },
  {
    name: "Book Stamp",
    source: "DropTable10",
  },
  {
    name: "Manamoar Stamp",
    source: "Quest (Mutton)",
  },
  {
    name: "Clover Stamp",
    source: "Vendor (Faraway Piers)",
  },
  {
    name: "Scimitar Stamp",
    source: "Quest (Mutton)",
  },
  {
    name: "Bullseye Stamp",
    source: "Quest (Mutton)",
  },
  {
    name: "Feather Stamp",
    source: "Quest (Snouts)",
  },
  {
    name: "Polearm Stamp",
    source: "Quest (Papua Piggea)",
  },
  {
    name: "Violence Stamp",
    source: "DropTable15",
  },
  {
    name: "Buckler Stamp",
    source: "Quest (Snouts)",
  },
  {
    name: "Sukka Foo",
    source: "Alchemy (Level Up Gift)",
  },
  {
    name: "Arcane Stamp",
    source: "Quest (Wellington)",
  },
  {
    name: "Steve Sword",
    source: "Quest (Mutton)",
  },
  {
    name: "Blover Stamp",
    source: "DropTable16",
  },
  {
    name: "Stat Graph Stamp",
    source: "Quest (XxX Cattleprod XxX)",
  },
];

const SkillStamps: Item[] = [
  {
    name: "Pickaxe Stamp",
    source: "Start",
  },
  {
    name: "Hatchet Stamp",
    source: "Start",
  },
  {
    name: "Anvil Zoomer Stamp",
    source: "DropTable1",
  },
  {
    name: "Lil' Mining Baggy Stamp",
    source: "Quest (XxX Cattleprod XxX)",
  },
  {
    name: "Twin Ores Stamp",
    source: "Drop (Sheepie)",
  },
  {
    name: "Choppin' Bag Stamp",
    source: "Quest (Hamish)",
  },
  {
    name: "Duplogs Stamp",
    source: "Drop (Frost Flake)",
  },
  {
    name: "Matty Bag Stamp",
    source: "Vendor (Faraway Piers)",
  },
  {
    name: "Smart Dirt Stamp",
    source: "DropTable5",
  },
  {
    name: "Cool Diggy Tool Stamp",
    source: "Drop (Snowman)",
  },
  {
    name: "High IQ Lumber Stamp",
    source: "DropTable4",
  },
  {
    name: "Swag Swingy Tool Stamp",
    source: "Drop (Thermister)",
  },
  {
    name: "Smartas Smithing Stamp",
  },
  {
    name: "Alch Go Brrr Stamp",
    source: "DropTable11",
  },
  {
    name: "Brainstew Stamps",
    source: "Quest (Wellington)",
  },
  {
    name: "Drippy Drop Stamp",
    source: "DropTable6",
  },
  {
    name: "Droplots Stamp",
    source: "DropTable7",
  },
  {
    name: "Fishing Rod Stamp",
    source: "Quest (Fishpaste97)",
  },
  {
    name: "Fishhead Stamp",
    source: "Quest (XxX Cattleprod XxX)",
  },
  {
    name: "Catch Net Stamp",
    source: "Quest (XxX Cattleprod XxX)",
  },
  {
    name: "Fly Intel Stamp",
    source: "Quest (Wellington)",
  },
  {
    name: "Bag o Heads Stamp",
    source: "DropTable12",
  },
  {
    name: "Holy Mackerel Stamp",
    source: "Quest (Wellington)",
  },
  {
    name: "Bugsack Stamp",
    source: "DropTable9",
  },
  {
    name: "Buzz Buzz Stamp",
    source: "DropTable8",
  },
  {
    name: "Hidey Box Stamp",
    source: "DropTable17",
  },
  {
    name: "Purp Froge Stamp",
    source: "Quest (Snouts)",
  },
  {
    name: "Spikemouth Stamp",
    source: "DropTable18",
  },
  {
    name: "Stample Stamp",
    source: "DropTable14",
  },
  {
    name: "Saw Stamp",
    source: "SuperDropTable3",
  },
  {
    name: "Flowin Stamp",
    source: "DropTable16",
  },
  {
    name: "Banked Pts Stamp",
    source: "DropTable14",
  },
];

const MiscStamps: Item[] = [
  {
    name: "Questin Stamp",
    source: "Quest (Tiki Chief)",
  },
  {
    name: "Mason Jar Stamp",
    source: "Quest (XxX Cattleprod XxX)",
  },
  {
    name: "Crystallin",
    source: "Drop (Crystal Monsters)",
  },
  {
    name: "Apple Stamp",
  },
  {
    name: "Potion Stamp",
    source: "Quest (Papua Piggea)",
  },
  {
    name: "Golden Apple Stamp",
    source: "Quest (Mutton)",
  },
  {
    name: "Card Stamp",
    source: "Alchemy (Level Up Gift)",
  },
  {
    name: "Talent I Stamp",
  },
  {
    name: "Talent II Stamp",
    source: "Quest (Wellington)",
  },
  {
    name: "Talent III Stamp",
    source: "Quest (Snouts)",
  },
  {
    name: "Talent IV Stamp",
  },
  {
    name: "Talent V Stamp",
  },
  {
    name: "Talent S Stamp",
  },
  {
    name: "Multikill Stamp",
    source: "DropTable15",
  },
  {
    name: "Biblio Stamp",
    source: "Quest (Snouts)",
  },
];

export const CharacterChecklist: Record<string, ItemGroup[]> = {
  "Inventory Bags": [
    {
      assetDir: "checklist",
      items: InventoryBags,
      cycle: false,
    },
  ],
  "Capacity Pouches": [
    {
      assetDir: "checklist",
      items: MaterialPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: MiningPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: FishingPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: FoodPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: ChoppinPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: BugPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: CritterPouches,
      cycle: true,
    },
    {
      assetDir: "checklist",
      items: SoulPouches,
      cycle: true,
    },
  ],
};

export const GlobalChecklist: Record<string, ItemGroup[]> = {
  "Gem Shop Bags": [
    {
      assetDir: "checklist",
      items: GemShopBags,
      cycle: false,
    },
  ],
  "Storage Chests": [
    {
      assetDir: "checklist",
      items: StorageChests,
      cycle: false,
    },
  ],
  "Combat Stamps": [
    {
      assetDir: "stamps",
      items: CombatStamps,
      cycle: false,
    },
  ],
  "Skill Stamps": [
    {
      assetDir: "stamps",
      items: SkillStamps,
      cycle: false,
    },
  ],
  "Misc Stamps": [
    {
      assetDir: "stamps",
      items: MiscStamps,
      cycle: false,
    },
  ],
};

export const CompleteChecklist = {
  ...CharacterChecklist,
  ...GlobalChecklist,
};

type HasItemFunc = (item: string) => boolean;
type SetItemFunc = (item: string, state: boolean) => void;
export function useChecklist() {
  const getChecklistItemText = (item: Item): string => {
    let text = item.name;
    if (item.bagSlots !== undefined) {
      text += `<br>+${item.bagSlots} Inventory Slots`;
    }
    if (item.source !== undefined) {
      text += `<br><em>Source: ${item.source}</em>`;
    }
    return text;
  };

  const getItemGroupCompletion = (
    groups: ItemGroup[],
    hasItem: HasItemFunc
  ) => {
    // Returns a percentage completion of an item group
    let totalComplete = 0;
    let totalItems = 0;
    for (const group of groups) {
      totalComplete += group.items.filter((item) => hasItem(item.name)).length;
      totalItems += group.items.length;
    }
    return (totalComplete / totalItems) * 100;
  };

  const handleChecklistItemClick = (
    clicked: Item,
    group: ItemGroup,
    hasItem: HasItemFunc,
    setItem: SetItemFunc,
    direction?: number
  ) => {
    // Handler for clicking a checklist item
    // Handle cycling for items with a cycle (e.g. capacity pouches)
    if (group.cycle) {
      const cycleIndex = group.items.indexOf(clicked);
      let goalIndex = cycleIndex + (direction ?? 0);
      if (goalIndex === -1 && !hasItem(clicked.name)) {
        goalIndex = group.items.length - 1;
      } else if (goalIndex === 1 && !hasItem(clicked.name)) {
        goalIndex = 0;
      } else if (goalIndex === group.items.length) {
        goalIndex = -1;
      }
      // Enable all items up to and including the goal index
      for (const [index, item] of group.items.entries()) {
        setItem(item.name, index <= goalIndex);
      }
    } else {
      // Normal items only toggle between enabled/disabled
      setItem(clicked.name, !hasItem(clicked.name));
    }
  };

  const highestUnlockedItemFromCycle = (
    group: ItemGroup,
    hasItem: HasItemFunc
  ): Item => {
    // Returns the highest item from a cyclical item group, or the first item
    // For example, this will return the highest unlocked mining pouch from that group
    for (const item of group.items.slice().reverse()) {
      if (hasItem(item.name)) {
        return item;
      }
    }
    // No items unlocked from cycle
    return group.items[0];
  };

  return {
    getChecklistItemText,
    getItemGroupCompletion,
    handleChecklistItemClick,
    highestUnlockedItemFromCycle,
  };
}
