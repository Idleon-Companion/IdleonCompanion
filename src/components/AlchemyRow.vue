<template>
  <table 
    class="text-light"
    :style="{width: '100%'}">
    <tr class="border-bottom">
      <th 
        :style="{width: '85px', textAlign: 'center'}"
        v-for="(item, index) in headers"
        :key="index"
      >
        {{item}}
      </th>
      <th>Materials</th>
    </tr>
    <tr
      v-for="n in amountBubbles" 
      :key="group + n"
    >
      <td
        :style="{width: '85px'}"
      >
        <GameAsset
          :style="{margin: 'auto'}"
          :image="Assets.FromDir(group + ((amountBubbles + 1)-n), 'alchemy')"
          :height="64"
        />
      </td>
      <td>
        <input
          :style="{width: '70px'}"
          type="number"
          :id="n"
          :min="0"
          :value="alchemy.upgrades[group][(amountBubbles + 1)-n-1]"
          @change='customChange'
        />
      </td>
      <td>
        <input
          :style="{width: '70px'}"
          type="number"
          :min="0"
          :value="alchemy.goals[group][(amountBubbles + 1)-n-1]"
          @change="handleAlchemyGoal($event, group, (amountBubbles + 1)-n-1)"
        />
      </td>
      <td
        :align="'char'" :char="'='"
        :style="{textAlign: 'center', width: '200px'}"
      > 
        {{effectChange(bubblesData[group][amountBubbles -(n)], n-1)}}
      </td>
        <table 
          :style="{width: '100%'}"
        >
          <tr 
            :style="{display: 'flex'}"
          >
            <td
              :style="{width: '25%', whiteSpace: 'pre', marginRight: '5%'}" 
               v-for="(thing, idx) in computeMaterials(bubblesData[group][amountBubbles -(n)], n-1)"
              :key="'idk'+idx"
            >
              <th>{{thing[0]}}</th>
              <tr :style="{display: 'inline-block', textAlign: 'right', width: '100%'}">{{thing[1]}}</tr>
            </td>
          </tr>
        </table>
      <td 
      >  
        
       <!-- {{bubblesData[group][amountBubbles -n]['Materials']}}  -->
      </td>
    </tr>
  </table>  
</template>


<script lang="ts">
import { computed, defineComponent, ref, PropType } from "vue";
import { useState} from "~/State";
import GameAsset from "~/components/GameAsset.vue";
import { Assets, Growth } from "~/composables/Utilities";
import { Color, Vials, Alch} from "~/composables/Alchemy";
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
      if (15-event.target.id == 14 || (15-event.target.id == 6 && this.props.group == "Yellow")) {
        this.$emit("custom-change", event.target.value);
        console.log(`Emitted [${15-event.target.id}] ${event.target.value}`);
      }
      this.alchemy.upgrades[this.props.group][15-event.target.id] = parseInt(event.target.value);
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
  
    // // TODO: Not sure if this is actually needed. 
    // if (alchemy.value.upgrades[props.group] !== undefined) {
    //   let upgradeDiff = amountBubbles - alchemy.value.upgrades[props.group].length;
    //   for (let i = 0; i < upgradeDiff; i += 1) {
    //     console.log(`Adding values in ${props.group} ${upgradeDiff}`)
    //     alchemy.value.upgrades[props.group].push(0);
    //   }
    // } 

    const handleAlchemyGoal = (ev: Event, color: Color, i: number) => {
      let target = <HTMLInputElement>ev.target;
      let val = target ? target.value : "0";
      alchemy.value.goals[color][i] = parseInt(val);
    };
    

    const effect = (bubble: Bubble, level: number) => {
      let funcStr = bubble.Func;
      let funcStrCap = funcStr.charAt(0).toUpperCase() + funcStr.slice(1);

      let effect = Growth[funcStrCap](
        level, 
        Number(bubble["Effect X1"]), 
        Number(bubble["Effect X2"]));
      effect = (level === 0 ? 0 : effect);
      if (isNaN(effect)) {
        effect = 0;
      }
      return Number(effect);
    }



    const computeMaterials = (bubble: Bubble, idx: number) =>  {
      // console.log(`Going to compute mats for: ${bubble.Name} [${idx}] with discount ${props.discount}`)
      let discountCalc = props.discount.map((a) => {return (100-a)/100;});
      // console.log(discountCalc);
      
      let bubbleIDX = amountBubbles-(idx+1);
      // let twelveBubbleLevel = alchemy.value.upgrades[props.group][14];
      // let undevLevel = alchemy.value.upgrades["Yellow"][6];

      let levelNow = alchemy.value.upgrades[props.group][bubbleIDX] ?? 0;
      let levelGoal = alchemy.value.goals[props.group][bubbleIDX] ?? 0;
      let matHisto = [0,0,0,0];
      for (var i = levelNow; i < levelGoal; i++) {
        let levelMulti = Math.pow(1.35 - (0.3 * i) / (50 + i), i);
        // console.log(levelMulti,discountCalc[discountCalc.length -1]);
        bubble.Materials.forEach((m, y) => {
          if(m.isLiquid) {
            matHisto[y] += m.Amount + Math.floor(i/20);
          } else {
            // console.log(m.Name, m.Amount*levelMulti*discountCalc[discountCalc.length -1]);
            matHisto[y] += Math.round(m.Amount*levelMulti*discountCalc[discountCalc.length -1]);
          }
        });
      }
      // console.log(matHisto);
      return matHisto.map(function(e, test) {
        if (test < bubble.Materials.length) {
          return [bubble.Materials[test].Name,e.toLocaleString()];
        }
        return ""
      });
    };

    const effectChange = (bubble: Bubble, idx: number) => {
      let bubbleIDX = amountBubbles-(idx+1);

      let levelNow = alchemy.value.upgrades[props.group][bubbleIDX];
      levelNow = (levelNow === undefined ? 0 : levelNow);
      let levelGoal = alchemy.value.goals[props.group][bubbleIDX];
      levelGoal = (levelGoal === undefined ? 0 : levelGoal);
      let effectNow = effect(bubble, levelNow);
      effectNow = (levelNow === 0 ? 0 : effectNow);
      let effectGoal = effect(bubble, levelGoal);
      effectGoal = (effectGoal < effectNow ? effectNow : effectGoal);
      return `${Number(effectNow).toFixed(2)} => ${Number(effectGoal).toFixed(2)}`;
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
      // discount,
      Assets,
    };
  },
});
</script>
