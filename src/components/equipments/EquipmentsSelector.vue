<template>
    <div v-if="curSlot && selectedIdRef !== 'Nothing'" class="equipment-editor bg-primary p-3 rounded">
      <div class="flex flex-wrap">
        <div class="flex flex-col">
          <div class="flex flex-row align-center">
            <img
            class="equipment-img border border-secondary me-3 mt-3"
            :src="Assets.EquipmentImage(curSlot.name, selectedTypeRef)"
            data-bs-toggle="modal"
            data-bs-target="#equipment-selector"
          />

            <span id="equipment-name">{{ curSlot.name }}</span>
          </div>

          <div class="flex flex-row" v-if="curSlot.name !== ''">
            <div class="flex flex-col">
              <label for="equipment-wpower">Weapon Power</label>
              <input
                id="equipment-wpower"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.weaponPower"
              />
              <label for="equipment-speed">Speed</label>
              <input
                id="equipment-speed"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.speed"
              />
              <label for="equipment-defense">Defense</label>
              <input
                id="equipment-defense"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.defense"
              />
              <label for="equipment-strength">Strength</label>
              <input
                id="equipment-strength"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.strength"
              />
            </div>
            <div class="flex flex-col">
              <label for="equipment-agility">Agility</label>
              <input
                id="equipment-agility"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.agility"
              />
              <label for="equipment-wisdom">Wisdom</label>
              <input
                id="equipment-wisdom"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.wisdom"
              />
              <label for="equipment-luck">Luck</label>
              <input
                id="equipment-luck"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.luck"
              />
              <label for="equipment-reach">Reach</label>
              <input
                id="equipment-reach"
                class="equipment-input"
                type="number"
                :min="0"
                v-model.number="curSlot.reach"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="equipment-selector"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content bg-primary">
          <div class="modal-header">
            <h5 class="modal-title text-light">
              Select {{ selectedTypeRef }}
            </h5>
            <button
              type="button"
              class="iconify equipment-close"
              data-icon="mdi-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="d-flex flex-wrap modal-body">
            <GameAsset
              v-for="(equipment_, i) in EquipmentUtilities.getNamesFromEquipmentType(selectedTypeRef)"
              :key="i"
              :image="Assets.EquipmentImage(equipment_, selectedTypeRef)"
              :height="72"
              :width="72"
              :title="equipment_"
              class="equipment-img m-1"
              @click="
                curCharacter !== null && updateEquipmentSlot(equipment_)
              "
              data-bs-dismiss="modal"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, PropType, toRef, watch } from "vue";

import GameAsset from "~/components/GameAsset.vue";

import {
  useCharacters,
  Class,
  Subclass
} from "~/composables/Characters";
import { Assets } from "~/composables/Utilities";
import { EquipmentType, EquipmentUtilities } from "~/composables/Equipments";

export default defineComponent({
  name: "EquipmentsSelector",
  components: {
    GameAsset,
  },
  props: {
    selectedType: {
      type: String as PropType<EquipmentType>,
      required: true
    },
    selectedId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { curCharacter } = useCharacters();

    const selectedTypeRef = toRef(props, 'selectedType');
    const selectedIdRef = toRef(props, 'selectedId');

    let curSlot = EquipmentUtilities.useEquipmentSlot(selectedIdRef);
    
    watch(selectedIdRef, () => {

      if (curCharacter.value && (!curSlot!.value || Object.keys(curSlot!.value).length === 0)) { // Tests if object exists and is not {}
        curSlot!.value = EquipmentUtilities.getEmptyEquipment();
      }
    })

    return {
      Assets,
      curCharacter,
      curSlot,
      Class,
      Subclass,
      selectedTypeRef,
      selectedIdRef,
      EquipmentUtilities
    };
  },
  methods: {
    updateEquipmentSlot(equipmentName: string) {
      let newEquipment = EquipmentUtilities.getEquipmentFromName(equipmentName);

      if (!newEquipment) {
        if (process.env.NODE_ENV === "development")
          console.error(`Equipment with name "${equipmentName}" and type "${this.selectedId}" not found.`)
        
        return;
      }

      // FIXME: This is an ugly but working way to deep-clone an object... 
      this.curSlot = JSON.parse(JSON.stringify(newEquipment));
    }
  }
});

</script>

<style scoped lang="sass">
@import '../../styles/base.sass'
.equipment-editor
  label
    color: darken(white, 15%)
    font-size: 1.15rem
    font-weight: bold
    margin: 0.1rem 0
  .equipment-img
    border-radius: 50%
    cursor: pointer
    height: 5rem
    width: 5rem
    padding: 0.25rem
    object-fit: contain
    transition: 0.3s
    &:hover
      transform: scale(1.1)
      background: rgba(white, 0.05)
  .equipment-input
    &.skill-input
      width: 5rem
  .align-center
    align-items: center
  #equipment-name
    color: darken(white, 15%)
.equipment-close
  color: white
</style>