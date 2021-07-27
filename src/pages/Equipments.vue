<template>
    <div v-if="curCharacter">
      <div class="flex-row justify-content-center">
        <div>
          <div class="tab-select">
            <button class="tab-name" @click="currentTab = 0">Equips</button>
            <button class="tab-name" @click="currentTab = 1">Tools</button>
            <button class="tab-name" @click="currentTab = 2">Food</button>
            <button class="tab-name" @click="currentTab = 3">Premium</button>
          </div>
          <div v-if="currentTab === 0">
            <div class="flex-column">
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Helmet"
                  v-bind:equipmentId="'helmet'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Weapon"
                  v-bind:equipmentId="'weapon'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Shirt"
                  v-bind:equipmentId="'shirt'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Pendant"
                  v-bind:equipmentId="'pendant'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Pants"
                  v-bind:equipmentId="'pants'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Ring"
                  v-bind:equipmentId="'ring1'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Shoes"
                  v-bind:equipmentId="'shoes'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Ring"
                  v-bind:equipmentId="'ring2'"
                  @clicked="equipmentSelected"
                />
              </div>
            </div>
          </div>
          <div v-if="currentTab === 1">
            <div class="flex-column">
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Pickaxe"
                  v-bind:equipmentId="'pickaxe'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Axe"
                  v-bind:equipmentId="'axe'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.FishingRod"
                  v-bind:equipmentId="'fishingrod'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.CatchingNet"
                  v-bind:equipmentId="'catchingnet'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.TrapBox"
                  v-bind:equipmentId="'trapbox'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.WorshipSkull"
                  v-bind:equipmentId="'worshipskull'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.FishingLine"
                  v-bind:equipmentId="'fishingline'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.FishingWeight"
                  v-bind:equipmentId="'fishingweight'"
                  @clicked="equipmentSelected"
                />
              </div>
            </div>
          </div>
          <div v-if="currentTab === 2">
            <div class="flex-column">
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Food"
                  v-bind:equipmentId="'food1'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Food"
                  v-bind:equipmentId="'food2'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Food"
                  v-bind:equipmentId="'food3'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Food"
                  v-bind:equipmentId="'food4'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Food"
                  v-bind:equipmentId="'food5'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Food"
                  v-bind:equipmentId="'food6'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
              </div>
            </div>
          </div>
          <div v-if="currentTab === 3">
            <div class="flex-column">
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.PremiumHelmet"
                  v-bind:equipmentId="'premiumhelmet'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Trophy"
                  v-bind:equipmentId="'trophy'"
                  @clicked="equipmentSelected"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.PremiumRing"
                  v-bind:equipmentId="'premiumring'"
                  @clicked="equipmentSelected"
                />
              </div>
              <div class="flex-row">
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
                <EquipmentsIcon 
                  v-bind:equipmentType="EquipmentType.Nothing"
                  v-bind:equipmentId="'nothing'"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <EquipmentsSelector 
            v-bind:selectedType="currentSelectedType"
            v-bind:selectedId="currentSelectedId"
          />
        </div>
      </div>
      <div v-if="curEquipmentStats">
        <span class="stat-line">Stats for the current equipment : </span>
        <span class="stat-line">Weapon Power : {{ curEquipmentStats.weaponPower }}</span>
        <span class="stat-line">Speed : {{ curEquipmentStats.speed }}</span>
        <span class="stat-line">Defense : {{ curEquipmentStats.defense }}</span>
        <span class="stat-line">Strength : {{ curEquipmentStats.strength }}</span>
        <span class="stat-line">Agility : {{ curEquipmentStats.agility }}</span>
        <span class="stat-line">Wisdom : {{ curEquipmentStats.wisdom }}</span>
        <span class="stat-line">Luck : {{ curEquipmentStats.luck }}</span>
        <span class="stat-line">Reach : {{ curEquipmentStats.reach }}</span>

        <span class="stat-line" 
          v-for="(misc, i) in curEquipmentStats.miscellaneous"
          :key="i"
        >
          {{ misc.value }} {{ misc.line }}
        </span>

      </div>
    </div> 
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import EquipmentsIcon from "~/components/equipments/EquipmentsIcon.vue"
import EquipmentsSelector from "~/components/equipments/EquipmentsSelector.vue";

import { useCharacters } from "~/composables/Characters";
import { Equipment, EquipmentType, EquipmentUtilities } from "~/composables/Equipments";

export default defineComponent({
  name: "Equipments",
  components: {
    EquipmentsIcon,
    EquipmentsSelector
  },
  
  setup() {
    const { curCharacter } = useCharacters();

    let curEquipmentStats = EquipmentUtilities.getCurrentSlotStats();

    let currentTab = ref(<number>0);
    let currentSelectedId = ref(<string>"Nothing");
    let currentSelectedType = ref(<EquipmentType>EquipmentType.Nothing);

    return {
      EquipmentType,
      currentTab,
      currentSelectedId,
      currentSelectedType,
      curEquipmentStats,
      curCharacter
    }
  },
  methods: {
    equipmentSelected(value: any) {
      this.currentSelectedId = value.id;
      this.currentSelectedType = value.type;
    }
  }
});
</script>

<style lang="sass" scoped>
.flex-column
  display: flex
  flex-direction: column

.flex-row
  display: flex
  flex-direction: row

.build:deep(img)
  margin: 2px 4px

.tab-select
  margin-bottom: 10px

.tab-name
  margin-right: 5px
  color: white

.stat-line
  display: block
  color: darken(white, 15%)
</style>
