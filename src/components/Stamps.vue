<template>
  <div class="row pl-3 mb-4">
    <div class="input-group">
      <select v-model="stamp" class="form-select" id="stampSelector">
        <option value="" selected>Select Your Stamp</option>
        <option
          v-for="(stamp, id) in stamps"
          :key="id"
          :value="id"
        >
          {{ stamp.name }}
        </option>
      </select>
    </div>
  </div>
  <!-- TALENTS -->
  <div v-if="activeStamp" class="row justify-content-left" id="stampContent">
    <div class="col">
        <img
            :src="getStampImagePath(activeStamp.name)"
            class="img-fuid img-thumbnail"
        />
        <p class="text-light mt-2">Base Cost: {{ activeStamp.baseCoinCost }}</p>
    </div>
    <div class="col">
        <div class="input-group">
            <input v-model="lvl" class="form-control" type="number" min="1" id="Stamplvl" placeholder="Insert you stamp level"/>
        </div>
    </div>
    <div class="col">
        <p class="text-light">Next level cost is: {{ calculateBonus(activeStamp, Number(lvl)) }}</p>
        <p v-if="(Number(lvl)%activeStamp.diffRatio == 0)" class="text-light">Material Cost!</p>
        <p v-else class="text-light">Next Material cost in {{ activeStamp.diffRatio - (Number(lvl)%activeStamp.diffRatio) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { calculateGrowth } from "../composables/Utilities"
import stampsData from "../data/stampsData.json";


type Stamp = {
    name: string,
    material: string,
    bonus: string,
    baseCoinCost: number,
    baseMatCost: number,
    powCoinBase: number,
    powMatBase: number,
    diffRatio: number,
    par1: number,
    par2: number,
    func: string,
};

export default defineComponent({
  name: "Stamps",
  setup() {
    const stamps: Record<any, Stamp> = stampsData;
    const stamp = ref("");
    const lvl = ref("1");
    const activeStamp = computed(() => {
      if (stamp.value === "") {
        return null;
      }
      return stamps[stamp.value];
    });

    return {
      activeStamp,
      stamp,
      stamps,
      lvl,
    };
  },
  methods: {
    getMaterialImagePath(name : string): string{
        let image = name.split(' ').join('_');
        return `assets/materials/${image}.png`;
    },
    getStampImagePath(name: string): string{
        let image = name.split(' ').join('_');
        return `assets/stamps/${image}.png`;
    },
    calculateCoinCost(activeStamp : Stamp, lvl : number): number{
        let s = activeStamp;
        return Math.floor( 
            s.baseCoinCost *
            Math.pow(
                (s.powCoinBase - (lvl/(lvl + 5*s.diffRatio))*0.25),
                (lvl * (10/s.diffRatio))
                )
            )
    },
    calculateMaterialsCost(activeStamp : Stamp, lvl : number): number{
        let s = activeStamp;
        return  Math.floor(
            s.baseMatCost *
            Math.pow( 
                s.powMatBase, 
                Math.pow(Math.round(lvl/s.diffRatio - 1), 0.8)
            ))
    },
    calculateBonus(activeStamp: Stamp, lvl : number): number{
        let s = activeStamp;
        return calculateGrowth (s.func, lvl, s.par1, s.par2)
    }
  },
});
</script>
