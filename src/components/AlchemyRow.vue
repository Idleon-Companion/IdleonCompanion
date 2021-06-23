<template>
  <div class="text-light">
    {{group}} cauldron reduction level: 
    <input
      v-model="cauldRedux"
      :style="{width: '70px'}"
      type="number"
      :min="0"
      @change="handleAlchemyCauldron($event, group)"
    /><br><br>
    <table 
      class="border-top border-bottom"
      :style="{width: '50%'}">
      <tr><th :style="{textAlign: 'center', width: '100%'}"> Cost Reductions </th></tr>
      <tr :style="{display: 'flex', justifyContent: 'space-between'}">
        <th
          :style="{width: '25%', whiteSpace: 'pre'}"
          v-for="d in ['Cauldron', 'XII Bubble', 'Yellow VI and\nIron bar vial', 'Total']"
          :key="d">
          {{d}}
        </th>
      </tr>
      <tr :style="{display: 'flex'}">
        <td
          :style="{width: '25%', textAlign: 'right', paddingRight: '25px'}"
          v-for="d in discount" 
          :key="d">
          {{d.toFixed(2)}}%
        </td>
      </tr>
    </table>
    <br>
  </div>

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
          :min="0"
          :value="alchemy.upgrades[group][(amountBubbles + 1)-n-1]"
          @change="handleAlchemyUpgrade($event, group, (amountBubbles + 1)-n-1)"
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
    }
  },

  setup(props) {
    const headers = ["Icon", "Level", "Goal", "Effect"];
    const amountBubbles = 15;
    const state = useState();
    const cauldRedux = ref(0);
   
    
    const alchemy = computed({
      get: () => state.value.alchemy,
      set: (value) => (state.value.alchemy = value),
    });
  
    if (alchemy.value.upgrades[props.group] !== undefined) {
      let upgradeDiff = amountBubbles - alchemy.value.upgrades[props.group].length;
      for (let i = 0; i < upgradeDiff; i += 1) {
        console.log(`Adding values in ${props.group} ${upgradeDiff}`)
        alchemy.value.upgrades[props.group].push(0);
      }

      let goalDiff = amountBubbles - alchemy.value.goals[props.group].length;
      for (let i = 0; i < goalDiff; i += 1) {
        console.log(`Adding values in ${props.group} ${goalDiff}`)
        alchemy.value.goals[props.group].push(0);
      }
    }

    let twelveBubbleLevel = alchemy.value.upgrades[props.group][14];
    let undevLevel = alchemy.value.upgrades["Yellow"][6];

    const discount = ref([0,0,0,0]);

    const handleAlchemyCauldron = (ev: Event, color: Color) => {
      let target = <HTMLInputElement>ev.target;
      twelveBubbleLevel = alchemy.value.upgrades[props.group][14];
      discount.value = Alch['Discount'](0, Number(cauldRedux.value), undevLevel, 5, twelveBubbleLevel ); 
      console.log(discount.value);
    };

    const handleAlchemyUpgrade = (ev: Event, color: Color, i: number) => {
      let target = <HTMLInputElement>ev.target;
      let val = target ? target.value : "0";
      alchemy.value.upgrades[color][i] = parseInt(val);
      twelveBubbleLevel = alchemy.value.upgrades[props.group][14];
      undevLevel = alchemy.value.upgrades["Yellow"][6];
      discount.value = Alch['Discount'](0, Number(cauldRedux.value), undevLevel, 5, twelveBubbleLevel ); 
      console.log(discount);
    };

    const handleAlchemyGoal = (ev: Event, color: Color, i: number) => {
      let target = <HTMLInputElement>ev.target;
      let val = target ? target.value : "0";
      alchemy.value.goals[color][i] = parseInt(val);
      twelveBubbleLevel = alchemy.value.upgrades[props.group][14];
      undevLevel = alchemy.value.upgrades["Yellow"][6];
      discount.value = Alch['Discount'](0, Number(cauldRedux.value), undevLevel, 5, twelveBubbleLevel ); 
      console.log(discount);
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
      let bubbleIDX = amountBubbles-(idx+1);
      let twelveBubbleLevel = alchemy.value.upgrades[props.group][14];
      let undevLevel = alchemy.value.upgrades["Yellow"][6];

      let levelNow = alchemy.value.upgrades[props.group][bubbleIDX];
      levelNow = (levelNow === undefined ? 0 : levelNow);
      let levelGoal = alchemy.value.goals[props.group][bubbleIDX];
      levelGoal = (levelGoal === undefined ? 0 : levelGoal);
      let matHisto = [0,0,0,0];
      for (var i = levelNow; i < levelGoal; i++) {
        var multi = Alch["Multi"](i, Number(cauldRedux.value), undevLevel, 5, twelveBubbleLevel );
        bubble.Materials.forEach((m, y) => {
          if(m.isLiquid) {
            matHisto[y] += m.Amount + Math.floor(i/20);
          } else {
            matHisto[y] += Math.round(m.Amount*multi);
          }
        });
      }
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
      handleAlchemyCauldron,
      handleAlchemyUpgrade,
      handleAlchemyGoal,
      effect,
      computeMaterials,
      effectChange,
      amountBubbles,
      bubblesData,
      alchemy,
      headers,
      props,
      cauldRedux,
      discount,
      Assets,
    };
  },
});
</script>
