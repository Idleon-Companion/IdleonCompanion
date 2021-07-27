<template>
    <GameAsset
        :image="Assets.EquipmentImage(curSlot?.name, equipmentTypeRef)"
        :thumbnail="true"
        @click="$emit('clicked', {type: equipmentType, id: equipmentId})"
    />
</template>

<script lang="ts">
import {defineComponent, PropType, toRef } from "vue";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";
import { EquipmentType, EquipmentUtilities } from "~/composables/Equipments";

export default defineComponent({
  name: "EquipmentsIcon",
  components: {
    GameAsset,
  },
  props: {
    equipmentType: {
      type: String as PropType<EquipmentType>,
      required: true
    },
    equipmentId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const equipmentTypeRef = toRef(props, 'equipmentType') 
    const equipmentIdRef = toRef(props, 'equipmentId') 

    const curSlot = EquipmentUtilities.useEquipmentSlot(equipmentIdRef);

    return {
      Assets,
      EquipmentType,
      equipmentTypeRef,
      curSlot,
    }
  }
});
</script>

<style lang="sass" scoped>

</style>
