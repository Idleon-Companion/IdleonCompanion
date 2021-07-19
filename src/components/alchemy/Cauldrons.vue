<template>
  <!-- Description -->
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress of bubbles and see the costs/bonuses of those upgrades. <br>
        Hover over the bubble icons to get a tooltip showing the effect of each bubble.
      </p>
    </div>
  </div>
  <!-- Cauldron selector -->
  <ul class="nav nav-pills nav-fill mt-3" role="tablist" :style="{background: ColorData[activeGroup].hex}">
    <li v-for="tab in colors" :key="tab" class="nav-item nav-item-alch">
      <button
        class="nav-link text-dark"
        data-bs-toggle="tab"
        :data-bs-target="'#' + tab"
        type="button"
        role="tab"
        aria-controls="profile"
        :aria-selected="tab === 'Orange'"
        :style="{background: ColorData[tab].hex}"
        v-on:click="changeCauldron(tab)"
      >
        {{ColorData[tab].name}} Cauldron
      </button>
    </li>
  </ul>
  <div class="d-flex flex-column alchemy-wrapper mt-3">
    <!-- Discount table -->
    <table class="border-top border-bottom text-light">
      <tr class="border-bottom">
        <th class="centered"> Cost Reductions </th>
      </tr>
      <tr :style="{display: 'flex', justifyContent: 'space-between'}">
        <th class="quarter centered">
          Cauldron Level: <br>
          <input class="columnSpan"
            v-model.number="cauldRedux"
            type="number" :min="0"
            @change="handleDiscountRecalc"/>
        </th>
        <th class="quarter centered">
          Bargain tag Level: <br>
          <input class="columnSpan"
            v-model="bargainLvl"
            type="number" :min="0"
            @change="handleDiscountRecalc"/>
        </th>
       <th class="quarter centered whitespace-pre"
          v-for="d in costHeaders"
          :key="d">
          {{d}}
        </th>
      </tr>
      <tr :style="{display: 'flex'}">
        <td class="quarter centered"
          v-for="(d, index) in discount" :key="index">
          {{d.toFixed(2)}}%
        </td>
      </tr>
    </table>
    <!-- Data table -->
    <table class="text-light">
      <tr class="border-bottom">
        <th class="centered columnSpan"
          v-for="(item, index) in headers" :key="index">
          {{item}}
        </th>
        <th>Materials</th>
      </tr>
      <tr class="alter-color"
        v-for="n in 15" :key="n">
        <AlchemyRow @customChange="handleDiscountRecalc()" :group="activeGroup" :idx="amountBubbles-n" :discount="discount"/>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useState} from "~/State";
  import AlchemyRow from "~/components/alchemy/AlchemyRow.vue";
  import { Alch, Color, BARGAIN_BUBBLE, UNDEV_COST_BUBBLE, IRON_BAR_VIAL } from "~/composables/Alchemy";

  const ColorData: Record<Color, Object> = {
    "Orange": {
      name: "Power",
      hex: "#ff9420",
    },
    "Green": {
      name: "Quicc",
      hex: "#47db5a",
    },
    "Purple": {
      name: "High IQ",
      hex: "#cb79e3",
    },
    "Yellow": {
      name: "Kazam",
      hex: "#edc300",
    },
  };

  export default defineComponent({
      name: "Cauldrons",
      components: {
          AlchemyRow,
      },
      setup() {
          const state = useState();
          const alchemy = computed({
            get: () => state.value.alchemy,
            set: (value) => (state.value.alchemy = value),
          });

          // Initialize some of the headers of the tables and other values needed for making the UI
          const colors: Color[] = ["Orange", "Green", "Purple", "Yellow"];
          const headers = ["Icon", "Level", "Goal", "Effect"];
          const costHeaders = ['XII Bubble', 'Undeveloped cost \nbubble and Iron bar vial', 'Total'];
          const amountBubbles = 15;
          const activeGroup = ref(<Color>"Orange"); 

          // Initialize the variables used for the discount table
          const cauldRedux = ref(0);
          const bargainLvl = ref(0);
          let discount = ref([0,0,0,0,0]);

          // Handler for discount calculations
          const handleDiscountRecalc = () => {
            let twelveBubbleLevel = alchemy.value.upgrades[activeGroup.value][BARGAIN_BUBBLE];
            let undevLevel = alchemy.value.upgrades[UNDEV_COST_BUBBLE.color][UNDEV_COST_BUBBLE.number];
            let vialLevel = alchemy.value.vials[IRON_BAR_VIAL] ?? 0;
            let discountMulti = Alch.discount(
                Number(cauldRedux.value), 
                undevLevel, vialLevel, 
                twelveBubbleLevel, 
                Number(bargainLvl.value));
            Object.assign(discount.value, discountMulti);
          };
          

          return {      
            handleDiscountRecalc,
            ColorData,
            discount,
            alchemy,
            colors,
            costHeaders,
            activeGroup,
            cauldRedux,
            bargainLvl,
            headers,
            amountBubbles,
          };
      },
      methods: {
          changeCauldron(tab: Color) {
            this.activeGroup = tab;
            this.cauldRedux = 0;
            this.bargainLvl = 0;
            this.handleDiscountRecalc();
          },
      },
  });
</script>

<style lang="sass" scoped>
  .nav-item-alch  
    margin: 2%

  .alter-color:nth-child(even) 
    background-color: #d3d3d336

  .centered
    text-align: center
    margin: auto

  .quarter
    width: 25%
    margin-top: 0

  .effect
    white-space: pre
    font-family: Courier new

  .columnSpan
    width: 85px

  .columnSpan-2
    width: 170px

  .columnSpan input
    width: 65px 
    margin: auto
    display: flex
</style>