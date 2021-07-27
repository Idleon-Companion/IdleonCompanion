import { Class, useCharacters } from "./Characters";
import { Effects } from "./Utilities";
import equipmentsData from "~/data/equipments.json";
import { computed, Ref} from "vue";

export enum EquipmentType {
    Weapon = "Weapon",
  
    Helmet = "Helmet",
    Shirt = "Shirt",
    Pants = "Pants",
    Shoes = "Shoes",
    Pendant = "Pendant",
    Ring = "Ring",
  
    Axe = "Axe",
    Pickaxe = "Pickaxe",
    FishingRod = "FishingRod",
    CatchingNet = "CatchingNet",
    TrapBox = "TrapBox",
    WorshipSkull = "WorshipSkull",
  
    Food = "Food",
  
    PremiumHelmet = "PremiumHelmet",
    PremiumRing = "PremiumRing",
    Trophy = "Trophy",

    FishingLine = "FishingLine",
    FishingWeight = "FishingWeight",
  
    Nothing = "Nothing"
}

type MiscEffect = {
    line: typeof Effects,
    value: number,
}

export type Equipment = {
    name: string,
    type: EquipmentType,
    class: Class,
    weaponPower: number,
    speed: number,
    defense: number,
    strength: number,
    agility: number,
    wisdom: number,
    luck: number,
    reach: number,
    miscellaneous: MiscEffect[]
}

export class EquipmentUtilities {
    static getNamesFromEquipmentType(equipmentType: EquipmentType) {
        return equipmentsData.filter(e => e.type == equipmentType).map(e => e.name);
    }
    
    static getEquipmentFromName(equipmentName: string): any {
        return equipmentsData.find(e => e.name == equipmentName);
    }
    
    // FIXME: Will throw an error if no character is selected.
    // I made sure that it SHOULDNT be called if no character exist
    // But it's quite ugly. I personally couldn't fix it,
    // since making it possibly null made errors elsewhere vue files
    static useEquipment() {
        const { curCharacter } = useCharacters();
        
        return computed(() => curCharacter.value!.equipment)
    }

    // FIXME: Same as useEquipment()
    static useEquipmentSlot(slotId: Ref<string>) {
        const curEquipment = this.useEquipment();

        return computed({
            get: () => curEquipment.value![slotId.value],
            set: (value) => (curEquipment.value![slotId.value] = value),
        })
    }

    static getCurrentSlotStats() {
        const curEquipment = this.useEquipment();

        return computed(() => {
            if (Object.values(curEquipment.value).length < 1)
                return this.getEmptyEquipment();

            return Object.values(curEquipment.value).reduce((acc, cur) => {
                return <any>{
                    weaponPower: acc.weaponPower + (cur.weaponPower || 0),
                    speed: acc.speed + (cur.speed || 0),
                    defense: acc.defense + (cur.defense || 0),
                    strength: acc.strength + (cur.strength || 0),
                    agility: acc.agility + (cur.agility || 0),
                    wisdom: acc.wisdom + (cur.wisdom || 0),
                    luck: acc.luck + (cur.luck || 0),
                    reach: acc.reach + (cur.reach || 0),
                    miscellaneous: acc.miscellaneous.concat(cur.miscellaneous)
                }
            }, this.getEmptyEquipment())
        })
    }

    static getEmptyEquipment(): Equipment {
        return {
            name: "",
            type: EquipmentType.Nothing,
            class: Class.Beginner,
            weaponPower: 0,
            speed: 0,
            defense: 0,
            strength: 0,
            agility: 0,
            wisdom: 0,
            luck: 0,
            reach: 0,
            miscellaneous: []
        }
    }
}

