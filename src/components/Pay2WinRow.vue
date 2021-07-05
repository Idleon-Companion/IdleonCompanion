<template>
  <table class="text-light">
    <tr class="border-bottom">
      <th class="centered columnSpan-2"
        v-for="(item, index) in headers" :key="index">
        {{item}}
      </th>
    </tr>
    <tr class="alter-color"
      v-for="(n, index) in grouping" :key="n">
      <td class="columnSpan">
        {{n}}
      </td>
      <tr class="columnSpan-2"
        v-for="x in subGroupCount[index]" :key="x">
          {{x}}
        </tr>
    </tr>
  </table>  
</template>


<script lang="ts">
import { computed, defineComponent,} from "vue";
import { useState} from "~/State";
import GameAsset from "~/components/GameAsset.vue";
import { Assets, Growth } from "~/composables/Utilities";
import { Color , Alch} from "~/composables/Alchemy";
import bubblesData from "~/data/bubbles.json"



export default defineComponent({
  name: "Pay 2 Win row",
  components: {
    GameAsset,
  },
  setup(props) {
    const cauldType = ["Speed", "New bubble", "Boost req"]
    const liquidType = ["Capacity", "Rate"]

    const headers = ["Group", "Upgrade", "Level", "Goal", "Effect", "Gold"];
    const grouping = [
      "Power Cauldron", "Quicc Cauldron", "High IQ Cauldron", "Kazam Cauldron",
      "Water droplet", "Liquid Nitrogen", "3rd Liquid", "4th Liquid"];
    const subGroupCount = [
      cauldType, cauldType, cauldType, cauldType,
      liquidType, liquidType, liquidType, liquidType
    ];


      
    
    return {
      Alch, 
      headers,
      grouping,
      subGroupCount,
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