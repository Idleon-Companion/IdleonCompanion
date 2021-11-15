<template>
  <q-card v-if="currentCharacter" class="mx-auto m-4 md:w-3/4">
    <q-card-section>
      <div class="text-2xl font-medium">Equipment</div>
      <q-carousel animated v-model="equipmentTab">
        <q-carousel-slide v-for="tab in equipmentTabs" :name="tab">
          <div class="grid grid-cols-3 justify-items-stretch">
            <div class="grid grid-cols-2 p-2 mx-auto rounded-sm bg-primary">
              <div
                v-for="equip in equipmentSlots[equipmentTab]"
                class="
                  w-16
                  rounded
                  border border-gray-500
                  p-2
                  m-1
                  cursor-pointer
                "
                :class="
                  currentSlot.slot === equip.slot
                    ? 'border-3 border-green-500'
                    : ''
                "
              >
                <ICAsset
                  :image="
                    Assets.EquipmentImage(
                      getEquipped(equip.slot, equip.type).name
                    )
                  "
                  :title="equip.label"
                  size="medium"
                  @click="onSelectSlot(equip)"
                />
                <q-popup-proxy class="w-1/4">
                  <div class="flex flex-wrap p-2 bg-primary">
                    <ICAsset
                      v-for="(equipment, i) in getEquipmentByType(
                        EquipmentType[equip.type]
                      )"
                      :key="i"
                      :image="Assets.EquipmentImage(equipment.name)"
                      :title="equipment.name.replace(/_/g, ' ')"
                      size="small"
                      class="
                        character-class-img
                        rounded-full
                        cursor-pointer
                        p-2
                      "
                      @click="onEquip(equip.slot, equipment)"
                    />
                  </div>
                </q-popup-proxy>
              </div>
            </div>
            <div class="col-span-2 rounded-sm bg-primary p-4">
              <div class="text-xl font-medium">
                {{ currentSlotEquipped.name.replace(/_/g, " ") }}
              </div>
              <div class="mb-1 font-medium">
                Class: {{ currentSlotEquipped.class }}
              </div>
              <div v-for="stats in currentSlotStats">
                <div
                  v-if="currentSlotEquipped[stats.stat] > 0"
                  class="flex items-center mb-1"
                >
                  <div class="rounded font-medium mr-1" :class="stats.color">
                    {{ stats.label }}
                  </div>
                  {{ currentSlotEquipped[stats.stat] }}
                </div>
              </div>
              <div
                class="mb-1 font-medium"
                v-for="misc in currentSlotEquipped.miscellaneous"
              >
                {{ misc.value }}{{ misc.effect }}
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="flex flex-row justify-center">
        <q-btn-toggle
          v-model="equipmentTab"
          :options="[
            { label: 'Equipment', value: 'equipment' },
            { label: 'Tools', value: 'tools' },
            { label: 'Premium', value: 'premium' },
          ]"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Assets } from "~/composables/Utilities";
import {
  EquipmentSlot,
  EquipmentType,
  Equippable,
  useCharacters,
} from "~/composables/Characters";
import { computed, defineComponent, ref } from "vue";
import { useEquipment } from "~/composables/Equippable";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

type EquipmentSlotUI = {
  slot: EquipmentSlot;
  type: EquipmentType;
  label: string;
};

export default defineComponent({
  name: "Equipment",
  components: {
    ICAsset,
  },
  setup() {
    const { currentCharacter } = useCharacters();
    const { getEquipmentByType, getEmptyEquipment } = useEquipment();
    const currentSlot = ref<EquipmentSlotUI>({
      slot: "helmet",
      type: EquipmentType.Helmet,
      label: "Helmet",
    });

    const currentSlotEquipped = computed(() => {
      return getEquipped(currentSlot.value.slot, currentSlot.value.type);
    });

    const currentSlotStats = <const>[
      {
        color: "",
        label: "Weapon Power",
        stat: "weaponPower",
      },
      {
        color: "",
        label: "Speed",
        stat: "speed",
      },
      {
        color: "bg-red-600 px-1",
        label: "STR",
        stat: "strength",
      },
      {
        color: "bg-blue-400 px-1",
        label: "AGI",
        stat: "agility",
      },
      {
        color: "bg-purple-500 px-1",
        label: "WIS",
        stat: "wisdom",
      },
      {
        color: "bg-green-500 px-1",
        label: "LUK",
        stat: "luck",
      },
      {
        color: "bg-orange-400 px-1",
        label: "DEF",
        stat: "defense",
      },
      {
        color: "",
        label: "Reach",
        stat: "reach",
      },
    ];

    const equipmentSlots = <const>{
      equipment: <EquipmentSlotUI[]>[
        { slot: "helmet", type: EquipmentType.Helmet, label: "Helmet" },
        { slot: "weapon", type: EquipmentType.Weapon, label: "Weapon" },
        { slot: "shirt", type: EquipmentType.Shirt, label: "Shirt" },
        { slot: "pendant", type: EquipmentType.Pendant, label: "Pendant" },
        { slot: "pants", type: EquipmentType.Pants, label: "Pants" },
        { slot: "ring1", type: EquipmentType.Ring, label: "Ring 1" },
        { slot: "shoes", type: EquipmentType.Shoes, label: "Shoes" },
        { slot: "ring2", type: EquipmentType.Ring, label: "Ring 2" },
      ],
      tools: <EquipmentSlotUI[]>[
        { slot: "axe", type: EquipmentType.Axe, label: "Axe" },
        { slot: "pickaxe", type: EquipmentType.Pickaxe, label: "Pickaxe" },
        { slot: "rod", type: EquipmentType.Fishing_Rod, label: "Fishing Rod" },
        {
          slot: "net",
          type: EquipmentType.Catching_Net,
          label: "Catching Net",
        },
        { slot: "box", type: EquipmentType.Trap_Box, label: "Trapping Box" },
        {
          slot: "skull",
          type: EquipmentType.Worship_Skull,
          label: "Worship Skull",
        },
        {
          slot: "",
          type: EquipmentType.Nothing,
          label: "Empty",
        },
        {
          slot: "",
          type: EquipmentType.Nothing,
          label: "Empty",
        },
      ],
      premium: <EquipmentSlotUI[]>[
        {
          slot: "premiumHelmet",
          type: EquipmentType.Premium_Helmet,
          label: "Premium Helmet",
        },
        {
          slot: "keychain1",
          type: EquipmentType.Keychain,
          label: "Keychain 1",
        },
        { slot: "trophy", type: EquipmentType.Trophy, label: "Trophy" },
        {
          slot: "keychain2",
          type: EquipmentType.Keychain,
          label: "Keychain 2",
        },
        {
          slot: "",
          type: EquipmentType.Nothing,
          label: "Empty",
        },
        {
          slot: "premiumRing",
          type: EquipmentType.Premium_Ring,
          label: "Premium Ring",
        },
        {
          slot: "",
          type: EquipmentType.Nothing,
          label: "Empty",
        },
        {
          slot: "",
          type: EquipmentType.Nothing,
          label: "Empty",
        },
      ],
    };
    const equipmentTabs = ["equipment", "tools", "premium"];
    const equipmentTab = ref<keyof typeof equipmentSlots>("equipment");

    const getEquipped = (slot: EquipmentSlot, type: EquipmentType) => {
      if (currentCharacter.value) {
        return (
          currentCharacter.value.equipment[slot] ?? getEmptyEquipment(type)
        );
      }
      return getEmptyEquipment(type);
    };

    const onEquip = (slot: EquipmentSlot, equippable: Equippable) => {
      if (currentCharacter.value) {
        currentCharacter.value.equipment[slot] = equippable;
      }
    };

    const onSelectSlot = (data: EquipmentSlotUI) => {
      currentSlot.value = data;
    };

    return {
      Assets,
      currentCharacter,
      currentSlot,
      currentSlotEquipped,
      currentSlotStats,
      equipmentSlots,
      equipmentTab,
      equipmentTabs,
      EquipmentType,
      getEquipped,
      getEquipmentByType,
      onEquip,
      onSelectSlot,
    };
  },
});
</script>

<style scoped lang="sass"></style>
