<template>
  <td class="columnSpan">
    <GameAsset class="m-auto"
      :image="Assets.FromDir(`${group}${idx+1}`, 'alchemy')"
      :height="64"/>
  </td>
  <td class="columnSpan">
    <input class="columnSpan"
      type="number" :min="0"
      :value="alchemy.upgrades[group][idx]"
      @change='customChange'/>
  </td>
  <td class="columnSpan">
    <input class="columnSpan"
      type="number" :min="alchemy.upgrades[group][idx]"
      :value="alchemy.goals[group][idx]"
      @change="handleAlchemyGoal($event, group, idx)"/>
  </td>
  <td class="centered columnSpan-2 effect"> 
    {{effectChange()}}
  </td>
  <table class="w-full">
    <tr class="flex">
      <td class="whitespace-pre w-1/4 mr-6"
        v-for="(matCost, idx) in computeMaterials()" :key="idx">
        <th>{{matCost[0]}}</th>
        <tr class="w-full text-right inline-block">
          {{matCost[1]}}
        </tr>
      </td>
    </tr>
  </table> 
</template>

<script lang="ts">
import { computed, defineComponent, PropType,} from "vue";
import { useState} from "~/State";
import GameAsset from "~/components/GameAsset.vue";
import { Alch, Color, BARGAIN_BUBBLE, UNDEV_COST_BUBBLE } from "~/composables/Alchemy";
import { Assets } from "~/composables/Utilities";
import bubblesData from "~/data/bubbles.json"

export default defineComponent({
  name: "AlchemyRow",
  components: {
    GameAsset,
  },
  props: {
    group: {
      required: true,
      type: String as PropType<Color>,
    },
    discount: {
      required: true,
      type: Array as PropType<number[]>,
    },
    idx: {
      required: true, 
      type: Number,
    }
  },
  emits: ["custom-change"],
  methods: {
    customChange (event: { target: { value: string; id: number; }; }) {
      this.alchemy.upgrades[this.props.group][this.props.idx] = parseInt(event.target.value);
      if (this.props.idx == BARGAIN_BUBBLE || (this.props.group == UNDEV_COST_BUBBLE.color && this.props.idx == UNDEV_COST_BUBBLE.number )) {
        this.$emit("custom-change", event.target.value);
      }
    }
  },
  setup(props) {
    const state = useState();
    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });
   
    // Storing the changes made to the goals into local storages
    const handleAlchemyGoal = (ev: Event, color: Color, i: number) => {
      let target = <HTMLInputElement>ev.target;
      let val = target ? target.value : "0";
      alchemy.value.goals[color][i] = parseInt(val);
    };
  
    // Compute all materials needed for the wanted upgrades
    const computeMaterials = () =>  {
      // Discounts are stored as e.g. 70 (%), however calculation need the form of 0.3
      let discountCalc = props.discount.map((a) => {return (100-a)/100;});    
      let levelNow = alchemy.value.upgrades[props.group][props.idx] ?? 0;
      let levelGoal = alchemy.value.goals[props.group][props.idx] ?? 0;
      let materialHistogram = [0,0,0,0];
      let bubble = bubblesData[props.group][props.idx];

      // Sum all materials of the different levels together into the histogram
      for (var i = levelNow; i < levelGoal; i++) {
        let levelMulti = Math.pow(1.35 - (0.3 * i) / (50 + i), i);
        bubble.Materials.forEach((m, y) => {
          if(m.isLiquid) {
            materialHistogram[y] += m.Amount + Math.floor(i/20);
          } else {
            materialHistogram[y] += Math.round(m.Amount*levelMulti*discountCalc[discountCalc.length -1]);
          }
        });
      }
      // Return the histogram combined with the material name and leave empty when no material name in that slot
      return materialHistogram.map(function(e, x) {
        if (x < bubble.Materials.length) {
          return [bubble.Materials[x].Name,e.toLocaleString()];
        }
        return ""
      });
    };

    // Returns the effect changes as a string in the form:
    // a => b, where a is the effect right now and b is the effect at the goal level.
    const effectChange = () => {
      let bubble = bubblesData[props.group][props.idx];
      let levelNow = alchemy.value.upgrades[props.group][props.idx];
      let levelGoal = alchemy.value.goals[props.group][props.idx] ?? 0;
      return Alch.effectChange(bubble, levelNow, levelGoal);
    };

    return {
      Alch, 
      Assets,
            
      computeMaterials,
      effectChange,
      handleAlchemyGoal,

      bubblesData,
      alchemy,
      props,
    };
  },
});
</script>

<style lang="sass" scoped>
  .alter-color:nth-child(even) 
    background-color: #d3d3d336

  .centered
    text-align: center
    margin: auto

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