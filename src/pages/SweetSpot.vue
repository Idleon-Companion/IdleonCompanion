<template>
  <q-banner inline-actions>
    Find the best EXP farming spot for your character! This tool takes into
    account respawn time, map complexity, and the number of monsters that appear
    on the map.
    <u>Active gains will not be the same as your AFK gains.</u>
    <template v-slot:action>
      <q-btn-dropdown outline label="Wiki">
        <q-list separator>
          <a v-for="[label, link] in wikiLinks" :key="label" :href="link">
            <q-item clickable>
              <q-item-section>{{ label }}</q-item-section>
            </q-item>
          </a>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-banner>
  <q-card class="m-4 p-2">
    <q-card-section>
      <div class="text-xl">Sweet Spot</div>
      <div>
        Select a monster and enter your in-game EXP to figure out the EXP
        multiplier. This is to account for external EXP multipliers, such as
        post office, alchemy, statues, etc. 
        <div class="text-secondary">
          To obtain your in-game EXP, kill the Monster selected below. At the
          lower-left of the Idleon screen, you'll see how much EXP you obtain per Monster kill.
          Type that EXP in the "In-game EXP" box.
        </div>
      </div>
      <div class="flex my-2">
        <q-select
          dense
          outlined
          v-model="currentMonsterName"
          label="Monster"
          option-value="name"
          option-label="name"
          class="w-full md:w-1/3"
          :options="allMonsters"
        />
        <q-input
          filled
          dense
          v-model.number="monsterExpInGame"
          :min="0"
          class="ml-2"
          type="number"
          label="In-game EXP"
        />
      </div>
      <div>
        Enter your character's stats.
      </div>
      <div class="flex py-2">
        <q-input
          filled
          dense
          v-model.number="statsBuffer.minDmg"
          :min="1"
          class="mr-2"
          type="number"
          label="Minimum Damage"
        />
        <q-input
          filled
          dense
          v-model.number="statsBuffer.maxDmg"
          :min="2"
          class="mr-2"
          type="number"
          label="Maximum Damage"
          debounce="1000"
        />
        <q-input
          filled
          dense
          v-model.number="statsBuffer.critChance"
          :min="0"
          class="mr-2"
          type="number"
          label="Crit Chance"
          step=".01"
          suffix="%"
        />
        <q-input
          filled
          dense
          v-model.number="statsBuffer.critDmg"
          :min="0"
          class="mr-2"
          type="number"
          label="Crit Damage"
          step=".01"
          suffix="x"
        />
        <q-input
          filled
          dense
          v-model.number="statsBuffer.accuracy"
          :min="1"
          type="number"
          label="Accuracy"
        />
      </div>
      <div v-if="skillInfo">
        <div class="text-lg">Multi-hit Skills</div>
        <div class="flex flex-col">
          <div class="flex my-1" v-if="skillInfo.skill1">
            <ICAsset
              v-if="skillInfo.skill1"
              :image="Assets.FromDir(skillInfo.skill1.image, 'talents')"
              :title="skillInfo.skill1.name"
            />
            <q-input
              filled
              dense
              v-model.number="statsBuffer.skill1Lvl"
              :min="0"
              class="m-1"
              type="number"
              label="Skill 1"
            />
          </div>
          <div class="flex my-1" v-if="skillInfo.skill2">
            <ICAsset
              v-if="skillInfo.skill2"
              :image="Assets.FromDir(skillInfo.skill2.image, 'talents')"
              :title="skillInfo.skill2.name"
            />
            <q-input
              filled
              dense
              v-model.number="statsBuffer.skill2Lvl"
              :min="0"
              class="m-1"
              type="number"
              label="Skill 2"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-xl font-medium">Best Monsters (EXP)</div>
      <div class="text-secondary">
        These are your top 5 monsters for active EXP/swing. Note that movement
        speed, respawn rate, and other factors affect total farming value. 
      </div>
      <q-btn @click="computeMonsters" color="secondary" label="Calculate Best Farming Spot"></q-btn>
      <div class="flex p-4" v-if="sortedMonstersForFarming">
        <div
          v-for="(monster, index) in sortedMonstersForFarming.slice(0, 5)"
          :key="monster.name"
          class="bg-primary flex-1 mx-4 p-4 rounded-sm"
        >
          <div class="flex flex-col justify-center items-center">
            <q-img
              height="64px"
              width="64px"
              fit="contain"
              class="m-2"
              :src="Assets.MonsterAnimated(monster.name)"
            />
            <div class="font-medium">{{ monster.name }}</div>
            <div class="text-secondary">
              {{ expPerSwingContainer[index].toFixed(2) }} EXP/swing
            </div>
          </div>
        </div>
      </div>
      <div class="text-xl">Feedback</div>
      <div>
        The SweetSpot logic is maintained by #100mar with the UI created by #adapap. If there are any questions regarding the best farming spots, please visit the public Idleon Companion discord server found in the <a href="/Changelog" style="color:#5bc0de">Changelog</a>.
        This tool was created using data from multiple Idleon characters to tweak the results of the calculator. <br>
        Below is an in-depth table of values. For any monster that takes 15+ Average hits to kill, The Exp/Swing and Farming Value is not calculated.
      </div>
    </q-card-section>
    <q-card-section>
      <q-table
        bordered
        hide-bottom
        flat
        class="sweetspot-table"
        :columns="sweetSpotColumns"
        :rows="allMonsters"
        :rows-per-page-options="[0]"
        title="EXP Info"
        row-key="name"
      >
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";

import { Assets, Time, useNumberAbbr } from "~/composables/Utilities";
import {
  Class,
  getClassTree,
  Subclass,
  useCharacters,
  useCombat,
} from "~/composables/Characters";
import { Monster, Monsters } from "~/composables/SweetSpot";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";
import { truncateSync } from "fs";
import { isNull } from "util";

const wikiLinks = new Map([
  ["Bestiary", "https://idleon.miraheze.org/wiki/Bestiary"],
]);

export default defineComponent({
  name: "SweetSpot",
  components: {
    ICAsset,
  },
  setup() {
    const currentMonsterName = ref("");
    const statsBuffer = reactive({
      skill1Lvl: 0,
      skill2Lvl: 0,
      minDmg: 1,
      maxDmg: 2,
      accuracy: 2,
      critChance: 0,
      critDmg: 1.00,
    });

    const stats = reactive({
      skill1Lvl: 0,
      skill2Lvl: 0,
      minDmg: 1,
      maxDmg: 2,
      accuracy: 2,
      critChance: 0,
      critDmg: 1.00,
    });

    /* Key = Monster name */ 

    const monsterCalcArray = computed(() => {
      var monsterDict:any = [];
      Monsters.forEach(monster =>{
        let monsterElem = {
              hitChance: hitChance(monster),
              avgMinHitToKill: avgMinHitToKill(monster),
              avgMaxHitToKill: avgMaxHitToKill(monster),
              avgHitToKill: avgHitToKill(monster),
              monsterExpMul: monsterExpMul(monster),
              expPerSwing: expPerSwing(monster),
              monsterFarmingValue: monsterFarmingValue(monster)
          }
          monsterDict[monster.name] = monsterElem;
        });
      return monsterDict;
    });

    const monsterExpInGame = ref(0);

    const { currentCharacter } = useCharacters();
    const { attackSpeed } = useCombat();

    const currentMonster = computed(() => {
      if (!currentMonsterName.value) {
        return null;
      }
      return Monsters.filter((x) => x.name === currentMonsterName.value)[0];
    });

    const multiHitChance= computed(() => {
      // 100 is for the 100% chance of hitting your basic attack
      let chanceArr = [100];
      switch (currentCharacter.value?.class) {
        case Class.Warrior:
          chanceArr.push((110 * stats.skill1Lvl) / (stats.skill1Lvl + 50));
          break;
        case Class.Archer:
          chanceArr.push((120 * stats.skill1Lvl) / (stats.skill1Lvl + 40));
          break;
        case Class.Hunter:
          chanceArr.push((120 * stats.skill1Lvl) / (stats.skill1Lvl + 40));
          chanceArr.push((120 * stats.skill2Lvl) / (stats.skill2Lvl + 40));
          break;
        case Class.Journeyman:
          // Double Hit, 100% chance of a 2nd punch.
          chanceArr.push(100);
          break;
        case Class.Maestro:
          // Maestro has Triple Jab. 100% chance of 3 punches.
          chanceArr.push(100);
          chanceArr.push(100);
          break
      }
      return chanceArr;
    });

    const multiHitDamage = computed(() => {
       let damageArr = [1.00];
      switch (currentCharacter.value?.class) {
        case Class.Warrior:
          damageArr.push(1.00);
          break;
        case Class.Archer:
          damageArr.push(1.00);
          break;
        case Class.Hunter:
          damageArr.push(1.00);
          damageArr.push(1.00);
          break;
        case Class.Journeyman:
          // Basic attacks do more damage
          damageArr[0] = 1*(1+0.6*stats.skill1Lvl/100);
          damageArr.push((25 + Math.floor(stats.skill1Lvl/3))/100);
          break;
        case Class.Maestro:
          // Increase the damage of the other hits.
          damageArr[0] = 1*(1+0.6*stats.skill1Lvl/100)*(1+0.5*stats.skill2Lvl/100);
          damageArr.push((25 + Math.floor(stats.skill1Lvl/3) + 0.5*stats.skill2Lvl)/100);
          damageArr.push(((20 + Math.floor(stats.skill1Lvl/4)))/100);
          break;
      }
      return damageArr;
    });

    const numberOfAttacks = computed(() => {
       let numAttacks = 1;
       switch (currentCharacter.value?.class) {
        case Class.Warrior:
          if(stats.skill1Lvl > 0) numAttacks++;
          break;
        case Class.Archer:
          if(stats.skill1Lvl > 0) numAttacks++;
          break;
        case Class.Journeyman:
          if(stats.skill1Lvl > 0) numAttacks++;
          break;
        case Class.Hunter:
          if(stats.skill1Lvl > 0) numAttacks++;
          if(stats.skill2Lvl > 0) numAttacks++;
          break;
        case Class.Maestro:
          if(stats.skill1Lvl > 0) numAttacks++;
          if(stats.skill2Lvl > 0) numAttacks++;
          break;
      }
      return numAttacks;
    });

    const monsterExpMultiplier = computed(() => {
      if (!currentMonster.value) {
        return 1;
      }
      if (currentMonster.value.exp > monsterExpInGame.value) {
        return 1;
      }
      return monsterExpInGame.value / currentMonster.value.exp;
    });

    const skillInfo = computed(() => {
      let skill1 = null;
      let skill2 = null;
      if (!currentCharacter.value) {
        return null;
      }
      const classes = getClassTree(currentCharacter.value.class);
      // Skill 1
      if (classes.includes(Class.Warrior)) {
        skill1 = {
          image: "war-2-4",
          name: "Double Strike",
        };
      }
      if (classes.includes(Class.Archer)) {
        skill1 = {
          image: "arc-2-5",
          name: "Have Another!",
        };
      }
      if (classes.includes(Class.Journeyman)) {
        skill1 = {
          image: "jma-2-4",
          name: "Two Punch Man",
        };
      }
      // Skill 2
      if (classes.includes(Class.Hunter)) {
        skill2 = {
          image: "hun-3-5",
          name: "Have Another... Again!",
        };
      }
      if (classes.includes(Class.Maestro)) {
        skill2 = {
          image: "mae-3-4",
          name: "Triple Jab",
        };
      }
      if (!skill1 && !skill2) {
        return null;
      }
      return {
        skill1,
        skill2,
      };
    });

    const sweetSpotColumns = computed(() => {
      return [
        {
          name: "monster",
          label: "Monster",
          field: (m: Monster) => m.name,
          sortable: true,
        },
        {
          name: "hp",
          label: "HP",
          field: (m: Monster) => useNumberAbbr(m.health),
        },
        {
          name: "5%acc",
          label: "Accuracy (5%)",
          field: (m: Monster) => m.accLow,
        },
        {
          name: "100%acc",
          label: "Accuracy (100%)",
          field: (m: Monster) => m.accHigh,
        },
        {
          name: "hitChance",
          label: "Hit Chance",
          field: (m: Monster) => `${(monsterCalcArray.value[m.name].hitChance * 100).toPrecision(3)}%`,
        },
        {
          name: "minHits",
          label: "Min. Hits",
          field: (m: Monster) => monsterCalcArray.value[m.name].avgMinHitToKill,
        },
        {
          name: "maxHits",
          label: "Max. Hits",
          field: (m: Monster) => monsterCalcArray.value[m.name].avgMaxHitToKill,
        },
        {
          name: "avgHit",
          label: "Average Hits",
          field: (m: Monster) => {
            if (monsterCalcArray.value[m.name].avgHitToKill == 0.0)
              return "15+"
            else
              return monsterCalcArray.value[m.name].avgHitToKill.toFixed(1)
            },
        },
        {
          name: "exp",
          label: "EXP",
          field: (m: Monster) => m.exp,
          sortable: true,
        },
        {
          name: "expMultiplier",
          label: "EXP w/Multiplier",
          field: (m: Monster) => monsterCalcArray.value[m.name].monsterExpMul,
        },
        {
          name: "expPerSwing",
          label: "EXP / Swing",
          field: (m: Monster) => {
            if (monsterCalcArray.value[m.name].avgHitToKill == 0.0)
              return "N/A"
            else 
              return monsterCalcArray.value[m.name].expPerSwing.toFixed(2)
          },
          sortable: true,
          sort: (a: number, b: number) => a - b,
        },
        {
          name: "monsterValue",
          label: "Farming Value",
          field: (m: Monster) => {
            if (monsterCalcArray.value[m.name].avgHitToKill == 0.0)
              return "N/A"
            else
              return monsterCalcArray.value[m.name].monsterFarmingValue.toFixed(3)
          },
          sortable: true,
          sort: (a: number, b: number) => a - b,
        },
      ];
    });

    // Determines the best monsters for the player to farm
    const sortedMonstersForFarming = ref([] as Monster[])

    const sortMonsters = (): any => {
      return Monsters.slice().sort((a, b) => {
        //return monsterFarmingValue(b) - monsterFarmingValue(a);
        return monsterCalcArray.value[b.name].monsterFarmingValue - monsterCalcArray.value[a.name].monsterFarmingValue
      });
    };

    const expToNextLevel = (level: number): number => {
      // Calculation taken from the Idleon toolbox
      let H = 15 + Math.pow(level, 1.9);
      let W = 1.208 - Math.min(0.164, (0.215 * level) / (level + 100));
      // I have no clue why Lava chose this formula
      return (H + 11 * level) * Math.pow(W, level) - 15;
    };

    const hitChance = (monster: Monster): number => {
      // Edge Case
      if (stats.accuracy < 2) {
        return 0;
      }

      let hitChance =
        ((stats.accuracy - monster.accLow) /
          (monster.accHigh - monster.accLow)) *
          95 +
        5;
      // 5% is minimum required to hit a mob
      if (hitChance < 5) {
        return 0;
      }
      return Math.min(hitChance, 100) / 100;
    };

    const avgSwingToHit = (monster: Monster): number => {
      const chance = hitChance(monster);
      return chance === 0 ? 0 : 1 / chance;
    };

    // Helper function to prevent invalid numbers from showing up in the table
    const isValidNumber = (n: number): boolean => {
      return n !== Infinity && !isNaN(n);
    };

    const avgMinHitToKill = (monster: Monster): number => {
      let dmgMul = 0;
      // Assume you hit your multi-hit skills 100% of the time.
      for(let i = 0; i < numberOfAttacks.value; i++){
        dmgMul = dmgMul + multiHitDamage.value[i];
      }
      // Assume crit
      let bestHit = stats.maxDmg*stats.critDmg*dmgMul;
      let hit = monster.health / (bestHit);
      if (!isValidNumber(hit)) {
        return 0;
      }
      return Math.ceil(hit);
    };

    const avgMaxHitToKill = (monster: Monster): number => {
      let hit = monster.health / (stats.minDmg);
      if (!isValidNumber(hit)) {
        return 0;
      }
      return Math.ceil(hit);
    };

    const avgHitToKill = (monster: Monster): number => {
      // If the min hit is too low, don't bother
      if(avgMinHitToKill(monster) >= 10) return 0;

      // If the hit chance is 0, don't bother.
      if(hitChance(monster) == 0) return 0;

      // Check Max DMG < min DMG, do nothing if so.
      if(stats.maxDmg < stats.minDmg) return 0;

      // If the Monster HP < Min Hit, trivially we will always kill it in 1 hit
      if(monster.health < stats.minDmg) return 1;

      // Check there is a minDMG
      if(stats.minDmg < 1) return 0;

      // If critDMG < 1
      if(stats.critDmg < 1) return 0;

      // If crit chance isn't between 0 & 100
      if(stats.critChance < 0 || stats.critChance > 100) return 0;

      // Simulate monster kill
      let totalHits = [];
      for(var i=0; i < 100; i ++){
        var curHP = monster.health;
        var numHits = 0;
        while( curHP > 0){
          // Multi-hit needs to act like one full attack
          for( let curAttack = 0; curAttack < numberOfAttacks.value; curAttack ++){
            // We will always hits our basic attack. If we have more than 1 attack, then check that we hit.
            var didHit = true;
            if(curAttack >= 1){
              didHit =  Math.floor(Math.random() * 101) <= multiHitChance.value[curAttack];
            }
            // If we didn't hit, continue.
            if(!didHit) continue;

            // Did we crit?
            var isCrit = Math.floor(Math.random() * 101) <= stats.critChance;

            // If we crit, our maximum and minimum damage have increased by the crit DMG amount
            // However, account for our maxDmg being lower (Due to Two Punch man, for example)
            var curHit;
            if(isCrit){
              curHit = Math.floor(Math.random() * stats.maxDmg*stats.critDmg*multiHitDamage.value[curAttack]) + stats.minDmg*stats.critDmg*multiHitDamage.value[curAttack];
            }
            else {
              curHit = Math.floor(Math.random() * stats.maxDmg*multiHitDamage.value[curAttack]) + stats.minDmg*multiHitDamage.value[curAttack];
            }

            // Deal DMG to the monster.
            curHP = curHP - curHit;
          }
          numHits = numHits + 1;
        }
        totalHits.push(numHits);
      }

      // Calculate average number of hits
      var total = 0;
      for(var i = 0; i < totalHits.length; i++) {
          total += totalHits[i];
      }
      var avg = total / totalHits.length;
      return avg;
      
    };

    const avgSwingToKill = (monster: Monster): number => {
      let swingToHit = avgSwingToHit(monster);
      let hitToKill = avgHitToKill(monster);
      return swingToHit * hitToKill;
    };

    const monsterExpMul = (monster: Monster): number => {
      return monster.exp * monsterExpMultiplier.value;
    };

    const expPerSwingContainer = ref([] as any);

    const expPerSwing = (monster: Monster): number => {
      let swingToKill = avgSwingToKill(monster);
      let expMul = monsterExpMul(monster);
      const exp = expMul / swingToKill;
      if (!isValidNumber(exp)) {
        return 0;
      }
      return exp;
    };

    const expPerHour = (monster: Monster): number => {
      // TODO: calculate exp/hour for better comparisons
      // const attacks = Time.Hour / attackSpeed(weaponSpeed, weaponType);
      // return attacks * expPerSwing(monster);
      return 0;
    };

    const monsterFarmingValue = (monster: Monster): number => {
      // Exclude missing W3 data
      if (monster.numMobs === 1 || avgSwingToKill(monster) <= 0) {
        return 0;
      }
      // The monsterWeight is basically regression by hand based off exp/hr data
      // Low respawn times are highly weighted
      let weight = (monster.numMobs - monster.weight) / monster.respawnRate;
      // If the monster EXP is good, give a higher weight, but not too high
      // So we use a log to flatten the top a tad
      let magic = weight * Math.log10(monsterExpMul(monster));
      return expPerSwing(monster) * magic;
    };

    return {
      Assets,
      allMonsters: Monsters,
      monsterCalcArray,
      avgSwingToKill,
      currentMonsterName,
      expPerSwing,
      expPerSwingContainer,
      expToNextLevel,
      hitChance,
      avgMaxHitToKill,
      avgMinHitToKill,
      avgHitToKill,
      monsterExpInGame,
      monsterExpMul,
      monsterFarmingValue,
      stats,
      statsBuffer,
      skillInfo,
      sortedMonstersForFarming,
      sortMonsters,
      sweetSpotColumns,
      wikiLinks,
    };
  },

  methods: {
    computeMonsters: function() {
      Object.assign(this.stats, this.statsBuffer);

      this.sortedMonstersForFarming = this.sortMonsters();
      
      this.expPerSwingContainer = [];
      this.sortedMonstersForFarming.forEach((monster: Monster) => {
        this.expPerSwingContainer.push(this.monsterCalcArray[monster.name].expPerSwing);
      });
    }
  }
});
</script>

<style lang="sass">
.sweetspot-table
  /* Code copied from https://quasar.dev/vue-components/table */
  /* height or max-height is important */
  height: 500px

  td:first-child
    background-color: #272b30 !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    background: #272b30

  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
