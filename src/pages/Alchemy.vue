<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress for bubbles and vials, and see costs/bonuses
        for vials. This got updated. 
      </p>
    </div>
  </div>
  <ul class="nav nav-pills nav-fill mt-3" role="tablist">
    <li v-for="tab in colors" :key="tab" class="nav-item">
      <button
        class="nav-link text-light"
        data-bs-toggle="tab"
        :data-bs-target="'#' + tab"
        type="button"
        role="tab"
        aria-controls="profile"
        :aria-selected="tab === Orange"
        :style="{background: tab}"
        v-on:click="setGroup(tab)"
      >
        {{ tab.replace(/_/g, " ") }}
      </button>
    </li>
  </ul>


  <div class="d-flex flex-column alchemy-wrapper mt-3">
    <div class="h2 text-light">Alchemy Upgrades</div>
    <table 
      class="border-top border-bottom text-light"
      :style="{width: '50%'}">
      <tr><th :style="{textAlign: 'center', width: '100%'}"> Cost Reductions </th></tr>
      <tr :style="{display: 'flex', justifyContent: 'space-between'}">
        <th :style="{width: '25%', whiteSpace: 'pre'}">
          Cauldron <br> Level: <br>
          <input
            v-model="cauldRedux"
            :style="{width: '70px'}"
            type="number"
            :min="0"
            @change="handleDiscountRecalc()"
          />
        </th>
        <th :style="{width: '25%', whiteSpace: 'pre'}">
          Bargain tag <br> Level: <br>
          <input
            v-model="bargainLvl"
            :style="{width: '70px'}"
            type="number"
            :min="0"
            @change="handleDiscountRecalc()"
          />
        </th>


        <th
          :style="{width: '25%', whiteSpace: 'pre'}"
          v-for="d in ['XII Bubble', 'Yellow VI and\nIron bar vial', 'Total']"
          :key="d">
          {{d}}
        </th>
      </tr>
      <tr :style="{display: 'flex'}">
        <!-- <td>{{discount}}</td> -->
        <td
          :style="{width: '25%', textAlign: 'right', paddingRight: '25px'}"
          v-for="(d, index) in discount" 
          :key="index">
          {{d.toFixed(2)}}%
        </td>
      </tr>
    </table>
    <br><br>
    <AlchemyRow @custom-change="handleDiscountRecalc()" :group="activeGroup" :discount="discount" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useState} from "~/State";
import GameAsset from "~/components/GameAsset.vue";
import AlchemyRow from "~/components/AlchemyRow.vue";
import { Assets } from "~/composables/Utilities";
import { Color, Vial, Vials, VialCost, Alch } from "~/composables/Alchemy";


export default defineComponent({
  name: "Alchemy",
  components: {
    GameAsset,
    AlchemyRow,
  },
  setup() {
    const state = useState();
    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });

    const colors: Color[] = ["Orange", "Green", "Purple", "Yellow"];
    const activeGroup = ref("Orange"); 
    const cauldRedux = ref(0);
    const bargainLvl = ref(0);
    let discount = ref([0,0,0,0,0]);

    const handleDiscountRecalc = () => {
      console.log("Recalculate the discount");
      // console.log(`Color: ${activeGroup.value}`)
      let twelveBubbleLevel = alchemy.value.upgrades[activeGroup.value][14];
      let undevLevel = alchemy.value.upgrades["Yellow"][6];
      let discountMulti = Alch['Discount'](
        Number(cauldRedux.value), 
        undevLevel, 
        5, // TODO: Missing vial info
        twelveBubbleLevel, 
        Number(bargainLvl.value)
        ); 
      // console.log(`${discountMulti} => ${discount.value}`);
      Object.assign(discount.value, discountMulti);
      // console.log(`${discountMulti} => ${discount.value}`);
      // discount.value = discountMulti;
      
    };

    


    return {      
      Assets,
      handleDiscountRecalc,
      discount,
      alchemy,
      colors,
      activeGroup,
      Vials,
      cauldRedux,
      bargainLvl,
      
    };
  },
  methods: {
    setGroup(tab: string) {
      this.activeGroup = tab;
    },
  },
});
</script>

<style lang="sass" scoped>
.vial-wrapper
  position: relative
  width: 72px
  top: 0.5rem
  height: 96px
  .vial-material
    height: auto
    pointer-events: none
    position: absolute
  .vial-bottle
    cursor: pointer
    bottom: 22px
    left: -14px
    position: absolute
</style>
