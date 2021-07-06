<template>
  <!-- Description -->
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress of bubbles and see the costs/bonuses of those upgrades.
      </p>
    </div>
  </div>

  <!-- Cauldron selector -->
  <ul class="nav nav-pills nav-fill mt-3" role="tablist" :style="{background: colorTo(activeGroup, 'Hex')}">
    <li v-for="tab in colors" :key="tab" class="nav-item nav-item-alch">
      <button
        class="nav-link text-dark"
        data-bs-toggle="tab"
        :data-bs-target="'#' + tab"
        type="button"
        role="tab"
        aria-controls="profile"
        :aria-selected="tab === 'Orange'"
        :style="{background: colorTo(tab, 'Hex')}"
        v-on:click="setGroup(tab)"
      >
        {{colorTo(tab, "Name")}} Cauldron
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
            v-model="cauldRedux"
            type="number" :min="0"
            @change="handleDiscountRecalc()"/>
        </th>
        <th class="quarter centered">
          Bargain tag Level: <br>
          <input class="columnSpan"
            v-model="bargainLvl"
            type="number" :min="0"
            @change="handleDiscountRecalc()"/>
        </th>
       <th class="quarter centered spaced"
          v-for="d in ['XII Bubble', 'Undeveloped cost \nbubble and Iron bar vial', 'Total']"
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
        <AlchemyRow @customChange="handleDiscountRecalc()" :group="activeGroup" :idx="amountBubbles-n" :discount="discount" />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useState} from "~/State";
  import AlchemyRow from "~/components/AlchemyRow.vue";
  import { Color, Alch } from "~/composables/Alchemy";


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

          const colors: Color[] = ["Orange", "Green", "Purple", "Yellow"];
          const colorScheme = ["#ff9420", "#47db5a", "#cb79e3", "#edc300"];
          const naming = ["Power", "Quicc", "High IQ", "Kazam"];

          const headers = ["Icon", "Level", "Goal", "Effect"];
          const amountBubbles = 15;

          const activeGroup = ref("Orange"); 
          const cauldRedux = ref(0);
          const bargainLvl = ref(0);
          let discount = ref([0,0,0,0,0]);

          // Handler for discount calculations
          const handleDiscountRecalc = () => {
            let twelveBubbleLevel = alchemy.value.upgrades[activeGroup.value][14];
            let undevLevel = alchemy.value.upgrades["Yellow"][6];
            let vialLevel = alchemy.value.vials["Barley Brew"] ?? 0;
            let discountMulti = Alch.discount(
                Number(cauldRedux.value), 
                undevLevel, vialLevel, 
                twelveBubbleLevel, 
                Number(bargainLvl.value));

            Object.assign(discount.value, discountMulti);
          };
          
          // TODO: I have the feeling this can be solved differently with some sort of enum system. Not sure
          //        how those  work in JS/Vue though.
          const colorTo = (color: Color, option: string) => {
            let idx = colors.indexOf(color);
            switch(option) {
              case "Name":
                return naming[idx];
              case "Hex":
                return colorScheme[idx];
            }
          };


          return {      
            handleDiscountRecalc,
            colorTo,
            discount,
            alchemy,
            colors,
            activeGroup,
            cauldRedux,
            bargainLvl,
            headers,
            amountBubbles,
          };
      },
      methods: {
          setGroup(tab: string) {
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

  .filled
    width: 100%

  .spaced
    white-space: pre

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
