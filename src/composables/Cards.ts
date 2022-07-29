import { EffectData, Effects } from "./Utilities";

export enum CardCategory {
  BlunderHills = "Blunder Hills",
  YumYumDesert = "Yum Yum Desert",
  EasyResources = "Easy Resources",
  MediumResources = "Medium Resources",
  FrostbiteTundra = "Frostbite Tundra",
  HardResources = "Hard Resources",
  HyperionNebula = "Hyperion Nebula",
  Dungeons = "Dungeons",
  Bosses = "Bosses",
  Events = "Events",
}

export type Card = {
  id: string;
  category: CardCategory;
  effect: EffectData;
  base: number;
  chance?: string;
};

const BlunderHillCards: Card[] = [
  {
    id: 'Green Mushroom',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseHP,
    base: 12.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Red Mushroom',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseLUK,
    base: 3.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Frog',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseMP,
    base: 10.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Bored Bean',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseDamage,
    base: 7.0,
    chance: '1 in 10,300'
  },
  {
    id: 'Slime',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseWIS,
    base: 2.0,
    chance: '1 in 10,500'
  },
  {
    id: 'Baby Boa',
    category: CardCategory.BlunderHills,
    effect: Effects.MoveSpeed,
    base: 1.0,
    chance: '1 in 10,600'
  },
  {
    id: 'Carrotman',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseAGI,
    base: 2.0,
    chance: '1 in 11,100'
  },
  {
    id: 'Glublin',
    category: CardCategory.BlunderHills,
    effect: Effects.TotalHP,
    base: 2.0,
    chance: '1 in 11,600'
  },
  {
    id: 'Wode Board',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseSTR,
    base: 2.0,
    chance: '1 in 12,500'
  },
  {
    id: 'Gigafrog',
    category: CardCategory.BlunderHills,
    effect: Effects.CardChance,
    base: 5.0,
    chance: '1 in 14,300'
  },
  {
    id: 'Poop',
    category: CardCategory.BlunderHills,
    effect: Effects.CrystalChance,
    base: 10.0,
    chance: '1 in 16,700'
  },
  {
    id: 'Rat',
    category: CardCategory.BlunderHills,
    effect: Effects.CritChance,
    base: 1.0,
    chance: '1 in 20,000'
  },
  {
    id: 'Walking Stick',
    category: CardCategory.BlunderHills,
    effect: Effects.BaseWIS,
    base: 5.0,
    chance: '1 in 16,700'
  },
  {
    id: 'Nutto',
    category: CardCategory.BlunderHills,
    effect: Effects.MonsterMoney,
    base: 5.0,
    chance: '1 in 20,000'
  },
  {
    id: 'Crystal Carrot',
    category: CardCategory.BlunderHills,
    effect: Effects.DropRate,
    base: 5.0,
    chance: '1 in 100'
  },
  {
    id: 'Wood Mushroom',
    category: CardCategory.BlunderHills,
    effect: Effects.TotalAccuracy,
    base: 5.0,
    chance: '1 in 10,000'
  }
];

const YumYumDesertCards: Card[] = [
  {
    id: 'Sandy Pot',
    category: CardCategory.YumYumDesert,
    effect: Effects.ExpConversion,
    base: 12.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Mimic',
    category: CardCategory.YumYumDesert,
    effect: Effects.DropRate,
    base: 2.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Crabcake',
    category: CardCategory.YumYumDesert,
    effect: Effects.NoFoodConsume,
    base: 5.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Mafioso',
    category: CardCategory.YumYumDesert,
    effect: Effects.BaseAGI,
    base: 5.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Sand Castle',
    category: CardCategory.YumYumDesert,
    effect: Effects.TotalAccuracy,
    base: 4.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Pincermin',
    category: CardCategory.YumYumDesert,
    effect: Effects.WeaponPower,
    base: 1.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Mashed Potato',
    category: CardCategory.YumYumDesert,
    effect: Effects.CritDamage,
    base: 3.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Tyson',
    category: CardCategory.YumYumDesert,
    effect: Effects.BaseSTR,
    base: 5.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Moonmoon',
    category: CardCategory.YumYumDesert,
    effect: Effects.MonsterExpActive,
    base: 8.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Sand Giant',
    category: CardCategory.YumYumDesert,
    effect: Effects.MinimumDamage,
    base: 2.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Snelbie',
    category: CardCategory.YumYumDesert,
    effect: Effects.CardChance,
    base: 8.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Dig Doug',
    category: CardCategory.YumYumDesert,
    effect: Effects.BaseLUK,
    base: 6.0,
    chance: '1 in 25.0'
  },
  {
    id: 'Crystal Crabal',
    category: CardCategory.YumYumDesert,
    effect: Effects.MonsterExp,
    base: 2.0,
    chance: '1 in 125'
  },
  {
    id: 'Bandit Bob',
    category: CardCategory.YumYumDesert,
    effect: Effects.MonsterMoney,
    base: 1.0,
    chance: '1 in 1.00'
  }
];

const EasyResourcesCards: Card[] = [
  {
    id: 'Copper',
    category: CardCategory.EasyResources,
    effect: Effects.BaseAccuracy,
    base: 4.0,
    chance: '1 in 5,000'
  },
  {
    id: 'Iron',
    category: CardCategory.EasyResources,
    effect: Effects.MiningEfficiency,
    base: 5.0,
    chance: '1 in 7,690'
  },
  {
    id: 'Gold',
    category: CardCategory.EasyResources,
    effect: Effects.MiningExp,
    base: 5.0,
    chance: '1 in 9,090'
  },
  {
    id: 'Fire Forge',
    category: CardCategory.EasyResources,
    effect: Effects.SmithingExp,
    base: 4.0,
    chance: '1 in 100'
  },
  {
    id: 'Oak Tree',
    category: CardCategory.EasyResources,
    effect: Effects.BaseDefense,
    base: 3.0,
    chance: '1 in 2,500'
  },
  {
    id: 'Birch Tree',
    category: CardCategory.EasyResources,
    effect: Effects.ChoppinEfficiency,
    base: 5.0,
    chance: '1 in 3,450'
  },
  {
    id: 'Jungle Tree',
    category: CardCategory.EasyResources,
    effect: Effects.ChoppinExp,
    base: 5.0,
    chance: '1 in 4,760'
  },
  {
    id: 'Forest Tree',
    category: CardCategory.EasyResources,
    effect: Effects.ExpConversion,
    base: 8.0,
    chance: '1 in 5,880'
  },
  {
    id: 'Goldfish',
    category: CardCategory.EasyResources,
    effect: Effects.TotalMP,
    base: 3.0,
    chance: '1 in 500'
  },
  {
    id: 'Hermit Can',
    category: CardCategory.EasyResources,
    effect: Effects.FishingEfficiency,
    base: 5.0,
    chance: '1 in 556'
  },
  {
    id: 'Jellyfish',
    category: CardCategory.EasyResources,
    effect: Effects.FishingExp,
    base: 5.0,
    chance: '1 in 625'
  },
  {
    id: 'Fly',
    category: CardCategory.EasyResources,
    effect: Effects.MonsterExpActive,
    base: 4.0,
    chance: '1 in 2,380'
  },
  {
    id: 'Butterfly',
    category: CardCategory.EasyResources,
    effect: Effects.CatchingEfficiency,
    base: 5.0,
    chance: '1 in 3,330'
  }
];

const MediumResourcesCards: Card[] = [
  {
    id: 'Platinum',
    category: CardCategory.MediumResources,
    effect: Effects.MiningAfk,
    base: 2.0,
    chance: '1 in 12,500'
  },
  {
    id: 'Dementia',
    category: CardCategory.MediumResources,
    effect: Effects.MiningSpeed,
    base: 4.0,
    chance: '1 in 16,700'
  },
  {
    id: 'Void',
    category: CardCategory.MediumResources,
    effect: Effects.MiningEfficiency,
    base: 6.0,
    chance: '1 in 16,700'
  },
  {
    id: 'Cinder Forge',
    category: CardCategory.MediumResources,
    effect: Effects.SmithingExp,
    base: 7.0,
    chance: '1 in 100'
  },
  {
    id: 'Palm Tree',
    category: CardCategory.MediumResources,
    effect: Effects.ChoppinAfk,
    base: 2.0,
    chance: '1 in 9,090'
  },
  {
    id: 'Toilet Tree',
    category: CardCategory.MediumResources,
    effect: Effects.ChoppinSpeed,
    base: 4.0,
    chance: '1 in 8,330'
  },
  {
    id: 'Stump Tree',
    category: CardCategory.MediumResources,
    effect: Effects.TotalAccuracy,
    base: 3.0,
    chance: '1 in 7,690'
  },
  {
    id: 'Bloach',
    category: CardCategory.MediumResources,
    effect: Effects.FishingAfk,
    base: 2.0,
    chance: '1 in 714'
  },
  {
    id: 'Sentient Cereal',
    category: CardCategory.MediumResources,
    effect: Effects.CatchingExp,
    base: 5.0,
    chance: '1 in 3,570'
  },
  {
    id: 'Fruitfly',
    category: CardCategory.MediumResources,
    effect: Effects.CatchingAfk,
    base: 2.0,
    chance: '1 in 4,000'
  },
  {
    id: 'Forest Soul',
    category: CardCategory.MediumResources,
    effect: Effects.EquipmentDefense,
    base: 3.0,
    chance: '1 in 4,550'
  },
  {
    id: 'Dune Soul',
    category: CardCategory.MediumResources,
    effect: Effects.WorshipPoints,
    base: 4.0,
    chance: '1 in 5,560'
  },
  {
    id: 'Froge',
    category: CardCategory.MediumResources,
    effect: Effects.TrappingShiny,
    base: 3.0,
    chance: '1 in 4,550'
  },
  {
    id: 'Crabbo',
    category: CardCategory.MediumResources,
    effect: Effects.TrappingEfficiency,
    base: 5.0,
    chance: '1 in 5,560'
  },
  {
    id: 'Scorpie',
    category: CardCategory.MediumResources,
    effect: Effects.TrappingExp,
    base: 5.0,
    chance: '1 in 6,250'
  }
];

const FrostbiteTundraCards: Card[] = [
  {
    id: 'Sheepie',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.EquipmentDefense,
    base: 3.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Frost Flake',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.BaseSTR,
    base: 7.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Sir Stache',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.CardChance,
    base: 9.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Bloque',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.BaseAGI,
    base: 7.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Mamooth',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.TotalHP,
    base: 3.5,
    chance: '1 in 10,000'
  },
  {
    id: 'Snowman',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.TotalDamage,
    base: 3.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Penguin',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.BaseWIS,
    base: 7.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Thermister',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.CritDamage,
    base: 4.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Quenchie',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.BaseLUK,
    base: 7.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Cryosnake',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.MPRegen,
    base: 5.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Bop Box',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.DropRate,
    base: 3.5,
    chance: '1 in 10,000'
  },
  {
    id: 'Neyeptune',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.TotalAccuracy,
    base: 5.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Dedotated Ram',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.WeaponPower,
    base: 2.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Xylobone',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.CritChance,
    base: 1.0,
    chance: '1 in 100'
  },
  {
    id: 'Bloodbone',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.TotalDamage,
    base: 3.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Crystal Cattle',
    category: CardCategory.FrostbiteTundra,
    effect: Effects.MonsterExp,
    base: 3.0,
    chance: '1 in 125'
  }
];

const HardResourcesCards: Card[] = [
  {
    id: 'Lustre',
    category: CardCategory.HardResources,
    effect: Effects.MiningSpeed,
    base: 5.0,
    chance: '1 in 16,700'
  },
  {
    id: 'Starfire',
    category: CardCategory.HardResources,
    effect: Effects.MiningExp,
    base: 8.0,
    chance: '1 in 33,300'
  },
  {
    id: 'Saharan Foal',
    category: CardCategory.HardResources,
    effect: Effects.ChoppinAfk,
    base: 2.5,
    chance: '1 in 10,000'
  },
  {
    id: 'Wispy Tree',
    category: CardCategory.HardResources,
    effect: Effects.ChoppinSpeed,
    base: 6.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Alien Tree',
    category: CardCategory.HardResources,
    effect: Effects.ChoppinEfficiency,
    base: 8.0,
    chance: '1 in 100,000'
  },
  {
    id: 'Cubed Tree',
    category: CardCategory.HardResources,
    effect: Effects.ChoppinSpeed,
    base: 7.0,
    chance: '1 in 25,000'
  },
  {
    id: 'Skelefish',
    category: CardCategory.HardResources,
    effect: Effects.FishingEfficiency,
    base: 8.0,
    chance: '1 in 1,000'
  },
  {
    id: 'Sand Shark',
    category: CardCategory.HardResources,
    effect: Effects.FishingSpeed,
    base: 4.0,
    chance: '1 in 2,500'
  },
  {
    id: 'Manta Ray',
    category: CardCategory.HardResources,
    effect: Effects.FishingExp,
    base: 10.0,
    chance: '1 in 10,000'
  },
  {
    id: 'Kraken',
    category: CardCategory.HardResources,
    effect: Effects.FishingAfk,
    base: 3.0,
    chance: '1 in 40,000'
  },
  {
    id: 'Mosquisnow',
    category: CardCategory.HardResources,
    effect: Effects.CatchingEfficiency,
    base: 7.0,
    chance: '1 in 4,000'
  },
  {
    id: 'Flycicle',
    category: CardCategory.HardResources,
    effect: Effects.CatchingAfk,
    base: 2.5,
    chance: '1 in 4,000'
  },
  {
    id: 'Worker Bee',
    category: CardCategory.HardResources,
    effect: Effects.CatchingEfficiency,
    base: 8.0,
    chance: '1 in 20,000'
  },
  {
    id: 'Fairy',
    category: CardCategory.HardResources,
    effect: Effects.CatchingSpeed,
    base: 4.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Mousey',
    category: CardCategory.HardResources,
    effect: Effects.TrappingShiny,
    base: 5.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Owlio',
    category: CardCategory.HardResources,
    effect: Effects.MonsterExp,
    base: 1.25,
    chance: '1 in 1.00'
  },
  {
    id: 'Pingy',
    category: CardCategory.HardResources,
    effect: Effects.TrappingShiny,
    base: 6.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Bunny',
    category: CardCategory.HardResources,
    effect: Effects.SkillAfk,
    base: 1.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Dung Beat',
    category: CardCategory.HardResources,
    effect: Effects.TrappingEfficiency,
    base: 7.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Honker',
    category: CardCategory.HardResources,
    effect: Effects.TrappingExp,
    base: 8.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Blobfish',
    category: CardCategory.HardResources,
    effect: Effects.TrappingShiny,
    base: 8.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Rooted Soul',
    category: CardCategory.HardResources,
    effect: Effects.WorshipPoints,
    base: 6.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Frigid Soul',
    category: CardCategory.HardResources,
    effect: Effects.WorshipCharge,
    base: 7.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Squishy Soul',
    category: CardCategory.HardResources,
    effect: Effects.WorshipChargeRate,
    base: 5.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Squiddy Soul',
    category: CardCategory.HardResources,
    effect: Effects.WorshipChargeRate,
    base: 5.0,
    chance: 'unobtainable'
  }
];

const HyperionNebulaCards: Card[] = [
  {
    id: 'Purp Mushroom',
    category: CardCategory.HyperionNebula,
    effect: Effects.MonsterMoney,
    base: 8.0,
    chance: '1 in 50,000'
  },
  {
    id: 'TV',
    category: CardCategory.HyperionNebula,
    effect: Effects.BreedingExp,
    base: 5.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Donut',
    category: CardCategory.HyperionNebula,
    effect: Effects.EquipmentDefense,
    base: 4.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Demon Genie',
    category: CardCategory.HyperionNebula,
    effect: Effects.CrystalChance,
    base: 15.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Soda Can',
    category: CardCategory.HyperionNebula,
    effect: Effects.StarTalentPts,
    base: 5.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Flying Worm',
    category: CardCategory.HyperionNebula,
    effect: Effects.BaseWIS,
    base: 12.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Gelatinous Cuboid',
    category: CardCategory.HyperionNebula,
    effect: Effects.LabExp,
    base: 4.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Choccie',
    category: CardCategory.HyperionNebula,
    effect: Effects.WeaponPower,
    base: 2.5,
    chance: '1 in 50,000'
  },
  {
    id: 'Biggole Wurm',
    category: CardCategory.HyperionNebula,
    effect: Effects.BaseAGI,
    base: 12.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Clammie',
    category: CardCategory.HyperionNebula,
    effect: Effects.Multikill,
    base: 1.5,
    chance: '1 in 50,000'
  },
  {
    id: 'Octodar',
    category: CardCategory.HyperionNebula,
    effect: Effects.BaseSTR,
    base: 12.0,
    chance: '1 in 50,000'
  },
  {
    id: 'Flombeige',
    category: CardCategory.HyperionNebula,
    effect: Effects.CritChancePas,
    base: 1.5,
    chance: '1 in 50,000'
  },
  {
    id: 'Stilted Seeker',
    category: CardCategory.HyperionNebula,
    effect: Effects.BaseAllStats,
    base: 0.5,
    chance: '1 in 50,000'
  },
  {
    id: 'Crystal Custard',
    category: CardCategory.HyperionNebula,
    effect: Effects.LineWidthPas,
    base: 2.0,
    chance: '1 in 125'
  }
]


const DungeonsCards: Card[] = [
  {
    id: 'Poisonic Frog',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonMP,
    base: 2.0,
    chance: '1 in 250'
  },
  {
    id: 'Globohopper',
    category: CardCategory.Dungeons,
    effect: Effects.BlockChance,
    base: 2.0,
    chance: '1 in 400'
  },
  {
    id: 'King Frog',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonDamage,
    base: 1.5,
    chance: '1 in 400'
  },
  {
    id: 'Lava Slimer',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonCardChance,
    base: 6.0,
    chance: '1 in 400'
  },
  {
    id: 'Chromatium Frog',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonCredits,
    base: 2.5,
    chance: '1 in 400'
  },
  {
    id: 'Eldritch Croaker',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonStartRNG,
    base: 20.0,
    chance: '1 in 250'
  },
  {
    id: 'Grandfrogger',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonStartRNG,
    base: 15.0,
    chance: '1 in 25.0'
  },
  {
    id: 'Rotting Grandfrogger',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonFlurbos,
    base: 4.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Forlorn Grandfrogger',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonCredits,
    base: 5.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Vengeful Grandfrogger',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonMoveSpeed,
    base: 7.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Target',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonHP,
    base: 2.0,
    chance: '1 in 200'
  },
  {
    id: 'Grumblo',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonCardChance,
    base: 8.0,
    chance: '1 in 125'
  },
  {
    id: 'Beefie',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonMoney,
    base: 6.0,
    chance: '1 in 400'
  },
  {
    id: 'Lazlo',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonRNGRarity,
    base: 10.0,
    chance: '1 in 14.3'
  },
  {
    id: 'Cactopunk',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonBossDamage,
    base: 3.0,
    chance: '1 in 400'
  },
  {
    id: 'Crescent Spud',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonMPRegen,
    base: 5.0,
    chance: '1 in 400'
  },
  {
    id: 'Snakenhotep',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonDropRate,
    base: 4.0,
    chance: '1 in 50.0'
  },
  {
    id: 'Enraged Snakenhotep',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonTotalDamage,
    base: 5.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Inevitable Snakenhotep',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonFlurbos,
    base: 5.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Ice Guard',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonMPRegen,
    base: 8.0,
    chance: '1 in 58.8'
  },
  {
    id: 'Glaciaxus',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonCardChance,
    base: 15.0,
    chance: '1 in 50.0'
  },
  {
    id: 'Golden Glaciaxus',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonCredits,
    base: 8.0,
    chance: '1 in 1.00'
  },
  {
    id: 'Caustic Glaciaxus',
    category: CardCategory.Dungeons,
    effect: Effects.DungeonTotalDamage,
    base: 8.0,
    chance: '1 in 1.00'
  }
];

const BossesCards: Card[] = [
  {
    id: 'Baba Yaga',
    category: CardCategory.Bosses,
    effect: Effects.MonsterMoney,
    base: 10.0,
    chance: '1 in 33.3'
  },
  {
    id: 'Dr Defecaus',
    category: CardCategory.Bosses,
    effect: Effects.TotalDamage,
    base: 5.0,
    chance: '1 in 33.3'
  },
  {
    id: 'Boop',
    category: CardCategory.Bosses,
    effect: Effects.FightingAfk,
    base: 1.0,
    chance: '1 in 667'
  },
  {
    id: 'Amarok',
    category: CardCategory.Bosses,
    effect: Effects.SkillAfk,
    base: 2.5,
    chance: '1 in 25.0'
  },
  {
    id: 'Chaotic Amarok',
    category: CardCategory.Bosses,
    effect: Effects.FightingAfk,
    base: 2.5,
    chance: '1 in 50.0'
  },
  {
    id: 'Radiant Amarok',
    category: CardCategory.Bosses,
    effect: Effects.WeaponPower,
    base: 3.0,
    chance: '1 in 50.0'
  },
  {
    id: 'Biggie Hours',
    category: CardCategory.Bosses,
    effect: Effects.DoubleAfkChance,
    base: 3.0,
    chance: '1 in 41.7'
  },
  {
    id: 'King Doot',
    category: CardCategory.Bosses,
    effect: Effects.DropRate,
    base: 6.0,
    chance: '1 in 25.0'
  },
  {
    id: 'Efaunt',
    category: CardCategory.Bosses,
    effect: Effects.MonsterExp,
    base: 5.0,
    chance: '1 in 40.0'
  },
  {
    id: 'Chaotic Efaunt',
    category: CardCategory.Bosses,
    effect: Effects.SkillExp,
    base: 3.75,
    chance: '1 in 62.5'
  },
  {
    id: 'Gilded Efaunt',
    category: CardCategory.Bosses,
    effect: Effects.StarTalentPts,
    base: 15.0,
    chance: '1 in 50.0'
  },
  {
    id: 'Dilapidated Slush',
    category: CardCategory.Bosses,
    effect: Effects.MonsterMoney,
    base: 12.0,
    chance: '1 in 5.00'
  },
  {
    id: 'Chizoar',
    category: CardCategory.Bosses,
    effect: Effects.CogSpeed,
    base: 8.0,
    chance: '1 in 143'
  },
  {
    id: 'Chaotic Chizoar',
    category: CardCategory.Bosses,
    effect: Effects.ShrineEffect,
    base: 5.0,
    chance: '1 in 250'
  },
  {
    id: 'Blighted Chizoar',
    category: CardCategory.Bosses,
    effect: Effects.BaseAllStats,
    base: 1.5,
    chance: '1 in 50.0'
  },
  {
    id: 'Mutated Mush',
    category: CardCategory.Bosses,
    effect: Effects.CookingExp,
    base: 6.0,
    chance: '1 in 5.00'
  },
  {
    id: 'Massive Troll',
    category: CardCategory.Bosses,
    effect: Effects.KitchenSpeed,
    base: 6.0,
    chance: '1 in 250'
  },
  {
    id: 'Chaotic Troll',
    category: CardCategory.Bosses,
    effect: Effects.SkillEff,
    base: 10.0,
    chance: '1 in 500'
  },
  {
    id: 'Blitzkrieg Troll',
    category: CardCategory.Bosses,
    effect: Effects.TotalDamage,
    base: 7.0,
    chance: '1 in 333'
  }
];

const EventsCards: Card[] = [
  {
    id: 'Ghost (Event)',
    category: CardCategory.Events,
    effect: Effects.MonsterExpActive,
    base: 3.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Giftmas Blobulyte',
    category: CardCategory.Events,
    effect: Effects.DropRate,
    base: 3.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Ghost',
    category: CardCategory.Events,
    effect: Effects.MonsterExpActive,
    base: 3.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Meaning of Giftmas',
    category: CardCategory.Events,
    effect: Effects.MonsterMoney,
    base: 3.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Valentslime',
    category: CardCategory.Events,
    effect: Effects.EquipmentDefense,
    base: 3.0,
    chance: '1 in 11.8'
  },
  {
    id: 'Loveulyte',
    category: CardCategory.Events,
    effect: Effects.TotalHP,
    base: 5.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Chocco Box',
    category: CardCategory.Events,
    effect: Effects.BoostFoodEffect,
    base: 4.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Floofie',
    category: CardCategory.Events,
    effect: Effects.MPRegen,
    base: 3.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Egggulyte',
    category: CardCategory.Events,
    effect: Effects.CardChance,
    base: 1.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Shell Snake',
    category: CardCategory.Events,
    effect: Effects.BaseLUK,
    base: 3.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Egg Capsule',
    category: CardCategory.Events,
    effect: Effects.CritDamage,
    base: 1.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Plasti Doug',
    category: CardCategory.Events,
    effect: Effects.BaseDefense,
    base: 2.0,
    chance: '1 in 33.3'
  },
  {
    id: 'Mr Blueberry',
    category: CardCategory.Events,
    effect: Effects.DropRate,
    base: 3.0,
    chance: '1 in 33.3'
  },
  {
    id: 'Coastiolyte',
    category: CardCategory.Events,
    effect: Effects.FishingAfk,
    base: 1.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Summer Spirit',
    category: CardCategory.Events,
    effect: Effects.CatchingExp,
    base: 4.0,
    chance: '1 in 20.0'
  },
  {
    id: 'Golden Giftmas Box',
    category: CardCategory.Events,
    effect: Effects.EquipmentDefense,
    base: 3.0,
    chance: '1 in 16.7'
  }
];

export const Cards: Record<CardCategory, Card[]> = {
  [CardCategory.BlunderHills]: BlunderHillCards,
  [CardCategory.YumYumDesert]: YumYumDesertCards,
  [CardCategory.FrostbiteTundra]: FrostbiteTundraCards,
  [CardCategory.HyperionNebula]: HyperionNebulaCards,
  [CardCategory.EasyResources]: EasyResourcesCards,
  [CardCategory.MediumResources]: MediumResourcesCards,
  [CardCategory.HardResources]: HardResourcesCards,
  [CardCategory.Dungeons]: DungeonsCards,
  [CardCategory.Bosses]: BossesCards,
  [CardCategory.Events]: EventsCards,
};

export function useCards() {
  const getCardText = (card: Card, tier: number): string => {
    const bonus = tier * card.base;
    let text = `${card.id}<br>+${bonus} ${card.effect}`;
    if (card.chance) {
      text += `<br><em>Drop chance: ${card.chance}</em>`;
    }
    return text;
  };

  return {
    getCardText,
  };
}
