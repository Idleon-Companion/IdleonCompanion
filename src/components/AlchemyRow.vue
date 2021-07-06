<template>
  <td class="columnSpan">
    <GameAsset class="centered"
      :image="Assets.FromDir(`${props.group}${props.idx+1}`, 'alchemy')"
      :height="64"/>
  </td>
  <td class="columnSpan">
    <input class="columnSpan"
      type="number" :min="0"
      :value="alchemy.upgrades[group][props.idx]"
      @change='customChange'/>
  </td>
  <td class="columnSpan">
    <input class="columnSpan"
      type="number" :min="alchemy.upgrades[group][props.idx]"
      :value="alchemy.goals[group][props.idx]"
      @change="handleAlchemyGoal($event, group, props.idx)"/>
  </td>
  <td class="centered columnSpan-2 effect"> 
    {{effectChange()}}
  </td>
  <table class="filled">
    <tr :style="{display: 'flex'}">
      <td
        :style="{width: '25%', whiteSpace: 'pre', marginRight: '5%'}" 
        v-for="(thing, idx) in computeMaterials()"
        :key="idx"
      >
        <th>{{thing[0]}}</th>
        <tr :style="{display: 'inline-block', textAlign: 'right', width: '100%'}">
          {{thing[1]}}
          </tr>
      </td>
    </tr>
  </table> 
</template>


<script lang="ts">
import { computed, defineComponent, PropType,} from "vue";
import { useState} from "~/State";
import GameAsset from "~/components/GameAsset.vue";
import { Assets, Growth } from "~/composables/Utilities";
import { Color , Alch, Bubble} from "~/composables/Alchemy";
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
      console.log("Handle leveling bubble input")
      console.log("Only emit when id == 14 or (id == 6 and group == yellow)")
      this.alchemy.upgrades[this.props.group][this.props.idx] = parseInt(event.target.value);
      if (this.props.idx == 14 || (this.props.idx == 6 && this.props.group == "Yellow")) {
        this.$emit("custom-change", event.target.value);
        console.log(`Emitted [${15-event.target.id}] ${event.target.value}`);
      }
    }
  },
  setup(props) {
    const state = useState();

    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });
   
    // TODO:  This could maybe move to the customChange method
    const handleAlchemyGoal = (ev: Event, color: Color, i: number) => {
      let target = <HTMLInputElement>ev.target;
      let val = target ? target.value : "0";
      alchemy.value.goals[color][i] = parseInt(val);
    };
    

    // Compute all materials needed for the wanted upgrades
    const computeMaterials = () =>  {
    
      let bubble = bubblesData[props.group][props.idx];


      // Discounts are stored as e.g. 70 (%), however calculation the form of 0.3
      let discountCalc = props.discount.map((a) => {return (100-a)/100;});    
      let levelNow = alchemy.value.upgrades[props.group][props.idx] ?? 0;
      let levelGoal = alchemy.value.goals[props.group][props.idx] ?? 0;
      let materialHistogram = [0,0,0,0];
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
      // Return the histogram combined with the material name and leave empty when no material was used
      return materialHistogram.map(function(e, test) {
        if (test < bubble.Materials.length) {
          return [bubble.Materials[test].Name,e.toLocaleString()];
        }
        return ""
      });
    };

    const effectChange = () => {
      let bubble = bubblesData[props.group][props.idx];
      let levelNow = alchemy.value.upgrades[props.group][props.idx];
      let levelGoal = alchemy.value.goals[props.group][props.idx] ?? 0;
      return Alch.effectChange(bubble, levelNow, levelGoal);
    };


    return {
      Alch, 
      Assets,

      handleAlchemyGoal,      
      computeMaterials,
      effectChange,

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

  .filled
    width: 100%

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