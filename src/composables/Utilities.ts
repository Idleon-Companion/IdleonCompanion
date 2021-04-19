import { Character } from "./Characters";

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
    if (slot >= 11 && slot < 15) {
      if (["sqr", "hun", "wiz"].includes(role)) {
        image = role + "-filler";
      }
    }
    return `assets/talents/${image}.png`;
  }
}

export enum Effects {
  // Base
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
  // Multiplier
  FightingAfk = "% Fighting AFK Gain Rate",
  DoubleAfkChance = "% Double AFK Claim Chance",
  CritChance = "% Crit Chance",
  CritDamage = "% Crit Damage",
  TotalDamage = "% Total Damage",
  TotalHP = "% Total HP",
  TotalMP = "% Total MP",
  TotalAccuracy = "% Total Accuracy",
  MPRegen = "% MP Regen Rate",
  EquipmentDefense = "% Defense from Equipment",
  CardChance = "% Card Drop Chance",
  CrystalChance = "% Crystal Mob Spawn Chance",
  FoodEffect = "% Food Effect",
  BoostFoodEffect = "% Boost Food Effect",
  NoFoodConsume = "% To not consume Food",
  ExpConversion = "% EXP Conversion (Talent)",
  MonsterExpActive = "% Monster EXP (Active)",
  MonsterExp = "% Monster EXP",
  MonsterMoney = "% Money from Monsters",
  DropRate = "% Total Drop Rate",
  // Skills
  SkillExp = "% Skill EXP",
  SkillAfk = "% Skill AFK Gain Rate",
  SmithingEfficiency = "% Total Smithing Efficiency",
  SmithingExp = "% Smithing EXP",
  MiningEfficiency = "% Total Mining Efficiency",
  MiningExp = "% Mining EXP",
  MiningAfk = "% Mining Away Gains",
  MiningSpeed = "% Mining Speed",
  ChoppinEfficiency = "% Total Choppin Efficiency",
  ChoppinExp = "% Choppin EXP",
  ChoppinAfk = "% Choppin Away Gains",
  ChoppinSpeed = "% Choppin Speed",
  FishingEfficiency = "% Total Fishing Efficiency",
  FishingExp = "% Fishing EXP",
  FishingAfk = "% Fishing Away Gains",
  // FishingSpeed = "% Fishing Speed",
  CatchingEfficiency = "% Total Catching Efficiency",
  CatchingExp = "% Catching EXP",
  CatchingAfk = "% Catching Away Gains",
}
