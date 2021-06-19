<template>
  <div class="row ">
    <div>
    <p class="h6 text-light bg-primary p-3 mb-4 rounded">
      This page shows a list of all available stamps, and allows you to calculate how much money and materials are needed for each level. 
      <br/>Due to some limitations in the formula, atm it doesn't take into account the cost-decreasing effect of bribes and other factors.
    </p>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-12 col-md-8">
      <div class="input-group">
        <select v-model="stamp" class="" id="stampSelector">
          <option value="" selected>Select Your Stamp</option>
          <option v-for="(stamp, id) in stamps" :key="id" :value="id">
            {{ stamp.name }}
          </option>
        </select>
      </div>
      <div v-if="activeStamp" class="col-12 d-flex" id="stampContent">
        <div class="text-light bg-primary rounded mt-2 p-4 w-100">
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex me-4">
              <GameAsset
                :image="Assets.StampImage(activeStamp.name.replace(/ /g, '_'))"
                :height="96"
                :title="activeStamp.name"
              />
            </div>
            <div class="d-block-flex">
              <div class="py-2 d-block-flex w-100">
                <strong class="h3">{{ activeStamp.name }}</strong>
                <div>
                  <label for="stamp-lvl" class="h5 m-2 ms-0">Level</label>
                  <input
                    v-model.number="lvl"
                    type="number"
                    min="1"
                    id="stamp-lvl"
                  />
                </div>
              </div>
              <ul class="rounded list-group list-group-flush">
                <li class="list-group-item text-light bg-secondary">
                  +{{
                    calculateBonus(activeStamp, lvl) + " " + activeStamp.bonus
                  }}
                </li>
                <li class="list-group-item text-light bg-secondary">
                  <CoinDisplay :value="calculateCoinCost(activeStamp, lvl)" />
                </li>
                <li class="list-group-item text-light bg-secondary">
                  <span v-if="Number(lvl) % activeStamp.diffRatio == 0">
                    <GameAsset
                      :image="
                        Assets.MaterialImage(
                          activeStamp.material.replace(/ /g, '_')
                        )
                      "
                      :height="64"
                    />
                    {{
                      calculateMaterialsCost(activeStamp, lvl) +
                      " " +
                      activeStamp.material
                    }}
                  </span>
                  <span v-else class="text-light bg-secondary">
                    Next Material cost in
                    {{ activeStamp.diffRatio - (lvl % activeStamp.diffRatio) }}
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
import { Growth } from "~/composables/Utilities";
import stampsData from "~/data/stampsData.json";

import CoinDisplay from "~/components/CoinDisplay.vue";
import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";

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
    GameAsset,
  },
  setup() {
    const stamps: Record<any, Stamp> = stampsData;
    const stamp = ref("");
    const lvl = ref(1);
    const activeStamp = computed(() => {
      if (stamp.value === "") {
        return null;
      }
      return stamps[stamp.value];
    });

    return {
      activeStamp,
      Assets,
      stamp,
      stamps,
      lvl,
    };
  },
  methods: {
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
      return Growth[s.func](lvl, s.par1, s.par2);
    },
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
</style>