<template>
  <div class="row mb-4 justify-content-center">
    <div class="col-8">
      <div class="input-group">
        <select v-model="stamp" class="form-select" id="stampSelector">
          <option value="" selected>Select Your Stamp</option>
          <option v-for="(stamp, id) in stamps" :key="id" :value="id">
            {{ stamp.name }}
          </option>
        </select>
      </div>

      <div v-if="activeStamp" class="col-12 d-flex" id="stampContent">
        <div class="card mb-3 w-100">
          <div class="row g-0">
            <div class="col-md-4 d-flex p-4">
              <img
                :src="getStampImagePath(activeStamp.name)"
                class="img-fluid w-100 align-self-center m-auto"
              />
            </div>
            <div class="col-md-8 d-block-flex">
              <div
                class="card-header d-inline-flex w-100 justify-content-between"
              >
                <strong class="align-self-center">{{
                  activeStamp.name
                }}</strong>
                <input
                  v-model="lvl"
                  class="form-control w-25"
                  type="number"
                  min="1"
                  id="Stamplvl"
                  placeholder="Insert you stamp level"
                />
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  {{
                    calculateBonus(activeStamp, Number(lvl)) +
                    " " +
                    activeStamp.bonus
                  }}
                </li>
                <li class="list-group-item">
                  <CoinDisplay
                    :value="String(calculateCoinCost(activeStamp, Number(lvl)))"
                  />
                </li>
                <li class="list-group-item">
                  <span v-if="Number(lvl) % activeStamp.diffRatio == 0">
                    <img
                      :src="getMaterialImagePath(activeStamp.material)"
                      class="img-fluid h-auto"
                    />
                    {{
                      calculateMaterialsCost(activeStamp, Number(lvl)) +
                      " " +
                      activeStamp.material
                    }}
                  </span>
                  <span v-else class="text-muted">
                    Next Material cost in
                    {{
                      activeStamp.diffRatio -
                      (Number(lvl) % activeStamp.diffRatio)
                    }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { calculateGrowth } from "../composables/Utilities";
import stampsData from "../data/stampsData.json";
import CoinDisplay from "./CoinDisplay.vue";

type Stamp = {
  name: string;
  material: string;
  bonus: string;
  baseCoinCost: number;
  baseMatCost: number;
  powCoinBase: number;
  powMatBase: number;
  diffRatio: number;
  par1: number;
  par2: number;
  func: string;
};

export default defineComponent({
  name: "Stamps",
  components: {
    CoinDisplay,
  },
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
    getMaterialImagePath(name: string): string {
      let image = name.split(" ").join("_");
      return `assets/materials/${image}.png`;
    },
    getStampImagePath(name: string): string {
      let image = name.split(" ").join("_");
      image = image.replace("'", "-");
      return `assets/stamps/${image}.png`;
    },
    calculateCoinCost(activeStamp: Stamp, lvl: number): number {
      let s = activeStamp;
      return Math.floor(
        s.baseCoinCost *
          Math.pow(
            s.powCoinBase - (lvl / (lvl + 5 * s.diffRatio)) * 0.25,
            lvl * (10 / s.diffRatio)
          )
      );
    },
    calculateMaterialsCost(activeStamp: Stamp, lvl: number): number {
      let s = activeStamp;
      return Math.floor(
        s.baseMatCost *
          Math.pow(
            s.powMatBase,
            Math.pow(Math.round(lvl / s.diffRatio - 1), 0.8)
          )
      );
    },
    calculateBonus(activeStamp: Stamp, lvl: number): number {
      let s = activeStamp;
      return calculateGrowth(s.func, lvl, s.par1, s.par2);
    },
  },
});
</script>
