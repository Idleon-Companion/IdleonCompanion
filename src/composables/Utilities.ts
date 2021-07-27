import { Character } from "./Characters";
import { EquipmentType } from "./Equipments";

export type GrowthFunc = (a: number, b: number, c: number) => number;

export const Growth: Record<string, GrowthFunc> = {
  Add: (level, par1, par2) => {
    if (par2 != 0) {
      return (
        (((par1 + par2) / par2 + 0.5 * (level - 1)) / (par1 / par2)) *
        level *
        par1
      );
    } else {
      return level * par1;
    }
  },
  Decay: (level, par1, par2) => {
    return (level * par1) / (level + par2);
  },
  IntervalAdd: (level, par1, par2) => {
    return par1 + Math.floor(level / par2);
  },
  DecayMulti: (level, par1, par2) => {
    return 1 + (level * par1) / (level + par2);
  },
  BigBase: (level, par1, par2) => {
    return par1 + par2 * level;
  },
};

export class Assets {
  static CardImage(c: string): string {
    return `assets/cards/${c}_Card.png`;
  }

  static CardBorderImage(tier: number): string {
    return `assets/cards/Tier${tier}_Border.png`;
  }

  static CharImage(char: Character): string {
    let image = char.class as string;
    if (char.subclass) {
      image = char.subclass as string;
    }
    return Assets.ClassImage(image);
  }

  static ClassImage(c: string): string {
    return `assets/classes/${c}.png`;
  }

  static FromDir(item: string, dir: string): string {
    let cleaned = item.replace(/ /g, "_");
    return `assets/${dir}/${cleaned}.png`;
  }

  static IconImage(icon: string): string {
    return `assets/icons/${icon}_Icon.png`;
  }

  static MaterialImage(item: string): string {
    return `assets/materials/${item}.png`;
  }

  static MiscImage(item: string): string {
    return `assets/misc/${item}.png`;
  }

  static StampImage(item: string): string {
    return `assets/stamps/${item}.png`;
  }

  static StatueImage(item: string): string {
    return `assets/statues/${item}_Statue.png`;
  }

  static TalentImage(role: string, tab: number, slot: number): string {
    let image = `${role}-${tab}-${slot}`;
    if (role === "") {
      image = "empty";
    }
    return `assets/talents/${image}.png`;
  }

  static EquipmentImage(item: string | undefined, equipmentType: EquipmentType) {
    const basePath = 'assets/equipments/';
    const cleaned = item ? item.replace(/ /g, "_") : `${equipmentType}_empty`;

    switch (equipmentType) {
      case EquipmentType.Weapon:
        return `${basePath}weapons/${cleaned}.png`;
      case EquipmentType.Helmet: 
      case EquipmentType.Shirt: 
      case EquipmentType.Pants: 
      case EquipmentType.Shoes: 
        return `${basePath}armor/${equipmentType}/${cleaned}.png`;
      case EquipmentType.Pendant: 
      case EquipmentType.Ring: 
        return `${basePath}armor/Accessories/${cleaned}.png`;
      case EquipmentType.Axe:
      case EquipmentType.Pickaxe:
      case EquipmentType.FishingRod:
      case EquipmentType.CatchingNet:
      case EquipmentType.TrapBox:
      case EquipmentType.WorshipSkull:
        return `${basePath}tools/${cleaned}.png`;
      case EquipmentType.Food:
        return `${basePath}food/${cleaned}.png`;
      case EquipmentType.PremiumHelmet:
      case EquipmentType.PremiumRing:
      case EquipmentType.Trophy:
        return `${basePath}premium/${equipmentType}/${cleaned}.png`
      case EquipmentType.FishingLine:
      case EquipmentType.FishingWeight:
          return `${basePath}fishing_accessories/${cleaned}.png`
      case EquipmentType.Nothing:
          return `${basePath}${cleaned}.png`
    }
  }
}

export type Item = {
  name: string;
  bagSlots?: number;
  cycle?: string;
  source?: string;
};

export type ItemGroup = {
  global: boolean;
  assetDir: string;
  items: Item[];
};


export class Text {
  static Item(item: Item): string {
    let text = item.name;
    if (item.bagSlots !== undefined) {
      text += `<br>+${item.bagSlots} Inventory Slots`;
    }
    if (item.source !== undefined) {
      text += `<br><em>Source: ${item.source}</em>`;
    }
    return text;
  }
}

enum BaseEffects {
  BaseAllStats = "All Stats",
  BaseDamage = "Base Damage",
  BaseDefense = "Base Defense",
  BaseAccuracy = "Base Accuracy",
  BaseSTR = "Base STR",
  BaseAGI = "Base AGI",
  BaseWIS = "Base WIS",
  BaseLUK = "Base LUK",
  BaseHP = "Base HP",
  BaseMP = "Base MP",
  MoveSpeed = "Move Speed",
  WeaponPower = "Weapon Power",
  MinimumDamage = "Minimum Damage",
  Accuracy = "Accuracy"
}

enum MultiplierEffects {
  FightingAfk = "% Fighting AFK Gain Rate",
  DoubleAfkChance = "% Double AFK Claim Chance",
  CritChance = "% Crit Chance",
  CritDamage = "% Crit Damage",
  TotalDamage = "% Total Damage",
  TotalHP = "% Total HP",
  TotalMP = "% Total MP",
  TotalDefense = "% Defense",
  TotalAccuracy = "% Total Accuracy",
  MPRegen = "% MP Regen Rate",
  EquipmentDefense = "% Defense from Equipment",
  CardChance = "% Card Drop Chance",
  CrystalChance = "% Crystal Mob Spawn Chance",
  FoodEffect = "% Food Effect",
  BoostFoodEffect = "% Boost Food Effect",
  NoFoodConsume = "% To not consume Food",
  GoldFoodEffect = "% Gold Food Effect",
  DropRate = "% Total Drop Rate",
  PercentAgility = "% Agility",
  PercentStrength = "% Strength",
  PercentWisdom = "% Wisdom",
  PercentLuck = "% Luck",
  PercentMoveSpeed = "% Movement Speed"
}

enum ClassAndMonsterEffects {
  ClassExp = "% Class Exp",
  ExpConversion = "% EXP Conversion (Talent)",
  MonsterExpActive = "% Monster EXP (Active)",
  MonsterExp = "% Monster EXP",
  MonsterMoney = "% Money from Monsters",
  BossDamage = "% Boss Damage",
  MobRespawn = "% Mob Respawn Rate",
  Mastery = "% Mastery"
}

enum SkillEffects {
  SkillAfk = "% Skill AFK Gain Rate",
  SkillExp = "% Skill EXP",
  SkillProwess = "% Skill Prowess",
  SmithingEfficiency = "% Total Smithing Efficiency",
  SmithingExp = "% Smithing EXP",
  AlchemyBrewSpeed = "% Alchemy Brew Speed",
  MiningAfk = "% Mining Away Gains",
  MiningBase = "Base Mining Power",
  MiningEfficiency = "% Total Mining Efficiency",
  MiningExp = "% Mining EXP",
  MiningMultiOre = "% Multi-Ore Chance",
  MiningPower = "% Mining Power",
  MiningSpeed = "% Mining Speed",
  ChoppinAfk = "% Choppin Away Gains",
  ChoppinBase = "Base Choppin Power",
  ChoppinEfficiency = "% Total Choppin Efficiency",
  ChoppinExp = "% Choppin EXP",
  ChoppinMultiLog = "% Multi-Log Chance",
  ChoppinPower = "% Choppin Power",
  ChoppinSpeed = "% Choppin Speed",
  FishingAfk = "% Fishing Away Gains",
  FishingBase = "Base Fishing Power",
  FishingEfficiency = "% Total Fishing Efficiency",
  FishingExp = "% Fishing EXP",
  FishingMultiFish = "% Multi-Fish Chance",
  FishingPower = "% Fishing Power",
  FishingSpeed = "% Fishing Speed",
  FishingPurpleDepth = "Fishing Purple Depth",
  FishingRedDepth = "Fishing Red Depth",
  FishingYellowDepth = "Fishing Yellow Depth",
  FishingGreenDepth = "Fishing Green Depth",
  WorshipCharge = "% Max Charge",
  WorshipChargeRate = "% Charge Rate",
  WorshipBase = "Base Worship Power",
  WorshipPoints = "Starting Points in Worship",
  TrappingShiny = "% Shiny Critter Chance",
  TrappingEfficiency = "% Trapping Efficiency",
  TrappingExp = "% Trapping EXP",
  TrappingBase = "Base Trapping Power",
  // FishingSpeed = "% Fishing Speed",
  CatchingAfk = "% Catching Away Gains",
  CatchingBase = "Base Catching Power",
  CatchingEfficiency = "% Total Catching Efficiency",
  CatchingExp = "% Catching EXP",
  CatchingMultiCatch = "% Multi-Catch Chance",
  CatchingPower = "% Catching Power",
}

enum PassiveEffects {
  ProductionSpeed = "% Total Production Speed",
  TownSkillSpeed = "% Speed in Town Skills",
  AlchemyExp = "% Alchemy EXP",
  CogSpeed = "% Cog Build Spd (Passive)",
  ConstructionExp = "% Construction Exp",
  ShrineEffect = "% Shrine Effects",
}

enum BonusEffects {
  CarryCapacity = "% Carry Capacity",
  ExtraTalentPoints = "Talent Points",
  MinigameReward = "% Minigame Reward",
  
}

enum JokeEffects {
  PlayerHeight = "% Player Height",
  Honk = "% HONK",
  SelfEsteem = "% Self Esteem",
  PureEvil = "% Pure Evil",
  PopChance = "% Pop Chance",
  Bob = "% Bob",
  Coolness = "% Coolness",
  AllNatural = "% All Natural",
  Love = "% Love",
  Novelty = "%_NOVELTY",
}

export const Effects = {
  ...BaseEffects,
  ...MultiplierEffects,
  ...ClassAndMonsterEffects,
  ...SkillEffects,
  ...PassiveEffects,
  ...BonusEffects,
  ...JokeEffects
};

type ValueOf<T> = T[keyof T];
export type EffectData = ValueOf<typeof Effects>;
