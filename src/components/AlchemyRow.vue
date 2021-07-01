<template>
  <table class="text-light">
    <tr class="border-bottom">
      <th class="centered columnSpan"
        v-for="(item, index) in headers" :key="index">
        {{item}}
      </th>
      <th>Materials</th>
    </tr>
    <tr class="alter-color"
      v-for="n in amountBubbles" :key="group + n">
      <td class="columnSpan">
        <GameAsset class="centered"
          :image="Assets.FromDir(group + ((amountBubbles + 1)-n), 'alchemy')"
          :height="64"/>
      </td>
      <td class="columnSpan">
        <input class="columnSpan"
          type="number" :id="n" :min="0"
          :value="alchemy.upgrades[group][(amountBubbles + 1)-n-1]"
          @change='customChange'/>
      </td>
      <td class="columnSpan">
        <input class="columnSpan"
          type="number" :min="alchemy.upgrades[group][(amountBubbles + 1)-n-1]"
          :value="alchemy.goals[group][(amountBubbles + 1)-n-1]"
          @change="handleAlchemyGoal($event, group, (amountBubbles + 1)-n-1)"
        />
      </td>
      <td class="centered columnSpan-2 effect"> 
        {{effectChange(bubblesData[group][amountBubbles -(n)], n-1)}}
      </td>
      <table class="filled">
        <tr :style="{display: 'flex'}">
          <td
            :style="{width: '25%', whiteSpace: 'pre', marginRight: '5%'}" 
            v-for="(thing, idx) in computeMaterials(bubblesData[group][amountBubbles -(n)], n-1)"
            :key="idx"
          >
            <th>{{thing[0]}}</th>
            <tr :style="{display: 'inline-block', textAlign: 'right', width: '100%'}">
              {{thing[1]}}
              </tr>
          </td>
        </tr>
      </table>
    </tr>
  </table>  
</template>


<script lang="ts">
import { computed, defineComponent,} from "vue";
import { useState} from "~/State";
import GameAsset from "~/components/GameAsset.vue";
import { Assets, Growth } from "~/composables/Utilities";
import { Color } from "~/composables/Alchemy";
import bubblesData from "~/data/bubbles.json"

type Material = {
  Name: string;
  Amount: number;
  isLiquid: number;
}

type Bubble = {
  Name: string;
  'Effect X1': string;
  'Effect X2': string;
  Func: string;
  Materials: Material[];
}


export default defineComponent({
  name: "AlchemyRow",
  components: {
    GameAsset,
  },
  props: {
    group: {
      required: true,
      type: String,
    },
    discount: {
      required: true,
      type: Array,
    }
  },
  methods: {
    customChange (event) {
      console.log("Handle leveling bubble input")
      console.log("Only emit when id == 14 or (id == 6 and group == yellow)")
      this.alchemy.upgrades[this.props.group][15-event.target.id] = parseInt(event.target.value);
      if (15-event.target.id == 14 || (15-event.target.id == 6 && this.props.group == "Yellow")) {
        this.$emit("custom-change", event.target.value);
        console.log(`Emitted [${15-event.target.id}] ${event.target.value}`);
      }
    }
  },
  setup(props) {
    const headers = ["Icon", "Level", "Goal", "Effect"];
    const amountBubbles = 15;
    const state = useState();

    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });
   
    //  TODO: I think this should be done in State.ts
    //    Possibly also needed for goals.
    if (alchemy.value.upgrades[props.group] !== undefined) {
      let upgradeDiff = amountBubbles - alchemy.value.upgrades[props.group].length;
      for (let i = 0; i < upgradeDiff; i += 1) {
        console.log(`Adding values in ${props.group} ${upgradeDiff}`)
        alchemy.value.upgrades[props.group].push(0);
      }
    } 

    // TODO:  This could maybe move to the customChange method
    const handleAlchemyGoal = (ev: Event, color: Color, i: number) => {
      let target = <HTMLInputElement>ev.target;
      let val = target ? target.value : "0";
      alchemy.value.goals[color][i] = parseInt(val);
    };
    
    // Calculate the effect a certain bubble gives
    const effect = (bubble: Bubble, level: number) => {
      let funcStr = bubble.Func;
      let funcStrCap = funcStr.charAt(0).toUpperCase() + funcStr.slice(1);

      let effect = Growth[funcStrCap](level, Number(bubble["Effect X1"]), Number(bubble["Effect X2"]));
      // TODO: Could the following check be changed to nullish coalescence
      effect = (level === 0 ? 0 : effect);
      if (isNaN(effect)) {
        effect = 0;
      }
      return Number(effect);
    }

    // Compute all materials needed for the wanted upgrades
    const computeMaterials = (bubble: Bubble, idx: number) =>  {
      // Discounts are stored as e.g. 70 (%), however calculation the form of 0.3
      let discountCalc = props.discount.map((a) => {return (100-a)/100;});
      let bubbleIDX = amountBubbles-(idx+1);
    
      let levelNow = alchemy.value.upgrades[props.group][bubbleIDX] ?? 0;
      let levelGoal = alchemy.value.goals[props.group][bubbleIDX] ?? 0;
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

    // Return the string that shows the effect change in the table
    const effectChange = (bubble: Bubble, idx: number) => {
      let bubbleIDX = amountBubbles-(idx+1);
      let levelNow = alchemy.value.upgrades[props.group][bubbleIDX] ?? 0;
      let levelGoal = alchemy.value.goals[props.group][bubbleIDX] ?? 0;
      let effectNow = effect(bubble, levelNow) ?? 0;
      let effectGoal = effect(bubble, levelGoal);
      effectGoal = (effectGoal < effectNow ? effectNow : effectGoal);
      return `${Number(effectNow).toFixed(2).padStart(6, ' ')} => ${Number(effectGoal).toFixed(2).padStart(6, ' ')}`;
    };
   

    return {
      handleAlchemyGoal,      
      effect,
      computeMaterials,
      effectChange,
      amountBubbles,
      bubblesData,
      alchemy,
      headers,
      props,
      Assets,
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