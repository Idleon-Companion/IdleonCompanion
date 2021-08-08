import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { computed } from "vue";
import { useQuasar } from "quasar";
import numeral from "numeral";

import { Character } from "~/composables/Characters";

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
    return Assets.FromDir(`${c}_Card`, "cards");
  }

  static CardBorderImage(tier: number): string {
    return Assets.FromDir(`Tier${tier}_Border`, "cards");
  }

  static CharImage(char: Character): string {
    return Assets.ClassImage(char.class);
  }

  static ClassImage(c: string): string {
    return Assets.FromDir(c, "classes");
  }

  static FromDir(item: string, dir: string): string {
    const cleaned = item.replace(/ /g, "_");
    // Use base URL here for GH pages support
    return import.meta.env.BASE_URL + `assets/${dir}/${cleaned}.png`;
  }

  static IconImage(icon: string): string {
    return Assets.FromDir(`${icon}_Icon`, "icons");
  }

  static MaterialImage(item: string): string {
    return Assets.FromDir(item, "materials");
  }

  static MiscImage(item: string): string {
    return Assets.FromDir(item, "misc");
  }

  static StampImage(item: string): string {
    return Assets.FromDir(item, "stamps");
  }

  static StatueImage(item: string): string {
    return Assets.FromDir(`${item}_Statue`, "statues");
  }

  static TalentImage(role: string, tab: number, slot: number): string {
    let image = `${role}-${tab}-${slot}`;
    if (role === "") {
      image = "empty";
    }
    return Assets.FromDir(image, "talents");
  }
}

export type Item = {
  name: string;
  bagSlots?: number;
  source?: string;
};

export type ItemGroup = {
  assetDir: string;
  items: Item[];
  cycle: boolean;
};

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
  DropRate = "% Total Drop Rate",
}

enum ClassAndMonsterEffects {
  ClassExp = "% Class Exp",
  ExpConversion = "% EXP Conversion (Talent)",
  MonsterExpActive = "% Monster EXP (Active)",
  MonsterExp = "% Monster EXP",
  MonsterMoney = "% Money from Monsters",
  BossDamage = "% Boss Damage",
  MobRespawn = "% Mob Respawn Rate",
}

enum SkillEffects {
  SkillAfk = "% Skill AFK Gain Rate",
  SkillExp = "% Skill EXP",
  SkillProwess = "% Skill Prowess",
  SmithingEfficiency = "% Total Smithing Efficiency",
  SmithingExp = "% Smithing EXP",
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

export const Effects = {
  ...BaseEffects,
  ...MultiplierEffects,
  ...ClassAndMonsterEffects,
  ...SkillEffects,
  ...PassiveEffects,
  ...BonusEffects,
};

type ValueOf<T> = T[keyof T];
export type EffectData = ValueOf<typeof Effects>;

// Game Versions
export const GameVersions = <const>["1.23", "1.22", "1.21", "1.20"];
export type GameVersion = typeof GameVersions[number];
export const LatestGameVersion: GameVersion = GameVersions[0];

// Layout Utilities
export function useLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const $q = useQuasar();
  const isDarkMode = computed(() => $q.dark.isActive);

  const toggleDarkMode = () => {
    $q.dark.set(!isDarkMode.value);
    const bgPrimary = isDarkMode.value ? "#3a3f44" : "#ffffff";
    document.documentElement.style.setProperty("--bg-primary", bgPrimary);
  };
  const isMobile = computed(() => breakpoints.smaller("md")).value;

  return {
    isDarkMode,
    isMobile,
    toggleDarkMode,
  };
}

// Coins
export enum Coin {
  Bronze,
  Silver,
  Gold,
  Platinum,
  Dementia,
}
export const CoinTiers = 5;
export function useMoney() {
  const splitCoinsFromValue = (value: number) => {
    const coins = [];
    let v = value;
    let n = CoinTiers; // number of distinct coin types
    while (n--) {
      const c = Math.pow(100, n);
      coins.push(Math.floor(v / c));
      v %= c;
    }
    // Return lowest value at the start
    return coins;
  };

  return {
    splitCoinsFromValue,
  };
}

export const useNumberAbbr = (n: number) => numeral(n).format("0a.[000]");

// Common durations in milliseconds
export enum Time {
  Millisecond = 1,
  Second = Time.Millisecond * 1000,
  Minute = Time.Second * 60,
  Hour = Time.Minute * 60,
  Day = Time.Hour * 24,
  Week = Time.Day * 7,
}
