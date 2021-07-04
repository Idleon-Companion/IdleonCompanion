type ChecklistItem = {
  name: string;
  source?: string;
}

type StorageItem = ChecklistItem & {
  bagSlots: number;
}

type CapacityPouchesItem = ChecklistItem & {
  cycle: string;
}

const InventoryBags: StorageItem[] = [
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
    name: "Totally Normal And Not Fake Bag",
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
]

const GemShopBags: StorageItem[] = [
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
]

const CapacityPouches: CapacityPouchesItem[] = [
  {
    name: "Mini Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Cramped Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Small Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Average Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Sizable Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Big Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Large Materials Pouch",
    cycle: "Materials Pouch",
  },
  {
    name: "Miniature Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Cramped Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Small Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Average Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Sizable Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Big Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Large Mining Pouch",
    cycle: "Mining Pouch",
  },
  {
    name: "Miniature Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Cramped Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Small Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Average Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Sizable Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Big Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Large Fish Pouch",
    cycle: "Fishing Pouch",
  },
  {
    name: "Miniscule Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Cramped Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Small Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Average Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Sizable Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Big Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Large Food Pouch",
    cycle: "Food Pouch",
  },
  {
    name: "Miniature Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Cramped Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Small Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Average Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Sizable Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Big Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Large Choppin Pouch",
    cycle: "Choppin Pouch",
  },
  {
    name: "Miniature Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Cramped Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Small Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Average Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Sizable Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Big Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Large Bug Pouch",
    cycle: "Bug Pouch",
  },
  {
    name: "Small Critter Pouch",
    cycle: "Critter Pouch",
  },
  {
    name: "Sizable Critter Pouch",
    cycle: "Critter Pouch",
  },
  {
    name: "Big Critter Pouch",
    cycle: "Critter Pouch",
  },
  {
    name: "Large Critter Pouch",
    cycle: "Critter Pouch",
  },
  {
    name: "Small Soul Pouch",
    cycle: "Soul Pouch",
  },
  {
    name: "Sizable Soul Pouch",
    cycle: "Soul Pouch",
  },
  {
    name: "Big Soul Pouch",
    cycle: "Soul Pouch",
  },
  {
    name: "Large Soul Pouch",
    cycle: "Soul Pouch",
  },
]

const StorageChests: StorageItem[] = [
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
]

const CombatStamps: ChecklistItem[] = [
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
    source: "Vendor (Encroaching Forest Villas)"
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
    name: "Sukka Foo Stamp",
    source: "Alchemy (Level Up Gift)",
  },
  {
    name: "Arcane Stamp",
    source: "Quest (Wellington)",
  },
  {
    name: "Steve Sword Stamp",
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
]

const SkillStamps: ChecklistItem[] = [
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
    source: "Drop (Sheepie)"
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
    source: "DropTable5"
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
    name: "Brainstew Stamp",
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
    name: "Sample Stamp",
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
]

const MiscStamps: ChecklistItem[] = [
  {
    name: "Questin Stamp",
  },
  {
    name: "Mason Jar Stamp",
  },
  {
    name: "Crystallin Stamp",
  },
  {
    name: "Apple Stamp",
  },
  {
    name: "Potion Stamp",
  },
  {
    name: "Golden Apple Stamp",
  },
  {
    name: "Card Stamp",
  },
  {
    name: "Talent I Stamp",
  },
  {
    name: "Talent II Stamp",
  },
  {
    name: "Talent III Stamp",
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
  },
  {
    name: "Biblio Stamp",
  },
]

export const checklistData = {
  "Inventory Bags": {
    global: false,
    assetDir: "checklist",
    items: InventoryBags,
  },
  "Gem Shop Bags": {
    global: true,
    assetDir: "checklist",
    items: GemShopBags,
  },
  "Capacity Pouches": {
    global: false,
    assetDir: "checklist",
    items: CapacityPouches,
  },
  "Storage Chests": {
    global: true,
    assetDir: "checklist",
    items: StorageChests,
  },
  "Combat Stamps": {
    global: true,
    assetDir: "stamps",
    items: CombatStamps,
  },
  "Skill Stamps": {
    global: true,
    assetDir: "stamps",
    items: SkillStamps,
  },
  "Misc Stamps": {
    global: true,
    assetDir: "stamps",
    items: MiscStamps,
  },
}
