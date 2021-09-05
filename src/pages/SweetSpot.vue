<template>
  <q-banner inline-actions>
    Find the best EXP farming spot for your character! This tool takes into
    account respawn time, map complexity, and the number of monsters that appear
    on the map.
    <u>Active gains will not be the same as your AFK gains.</u> World 3 is WIP.
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
          class="ml-2"
          type="number"
          label="In-game EXP"
        />
      </div>
      <div>
        Enter your character's stats. In the future, this will be calculated
        based on your equipment and unlocks.
      </div>
      <div class="flex py-2">
        <q-input
          filled
          dense
          v-model.number="stats.minDmg"
          :min="1"
          class="mr-2"
          type="number"
          label="Minimum Damage"
        />
        <q-input
          filled
          dense
          v-model.number="stats.maxDmg"
          class="mr-2"
          type="number"
          label="Maximum Damage"
        />
        <q-input
          filled
          dense
          v-model.number="stats.critChance"
          :min="2"
          class="mr-2"
          type="number"
          label="Crit Chance"
        />
        <q-input
          filled
          dense
          v-model.number="stats.critDmg"
          :min="0"
          class="mr-2"
          type="number"
          label="Crit Damage"
        />
        <q-input
          filled
          dense
          v-model.number="stats.accuracy"
          :min="0"
          type="number"
          label="Accuracy"
        />
      </div>
      <div v-if="skillInfo">
        <div class="text-lg">Multi-hit Skills</div>
        <div class="flex flex-col">
          <div class="flex my-1">
            <ICAsset
              v-if="skillInfo.skill1"
              :image="Assets.FromDir(skillInfo.skill1.image, 'talents')"
              :title="skillInfo.skill1.name"
            />
            <q-input
              filled
              dense
              v-model.number="stats.skill1Lvl"
              :min="0"
              class="m-1"
              type="number"
              label="Skill 1"
            />
          </div>
          <div class="flex my-1">
            <ICAsset
              v-if="skillInfo.skill2"
              :image="Assets.FromDir(skillInfo.skill2.image, 'talents')"
              :title="skillInfo.skill2.name"
            />
            <q-input
              filled
              dense
              v-model.number="stats.skill2Lvl"
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
        <br>
        World 3 is not implemented! This calculator is only able to recommend up to Snelbies.
      </div>
      <div class="flex p-4">
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
              {{ expPerSwing(monster).toFixed(2) }} EXP/swing
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-table
        bordered
        hide-bottom
        flat
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
  useCharacters,
  useCombat,
} from "~/composables/Characters";
import { Monster, Monsters } from "~/composables/SweetSpot";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

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
    const stats = reactive({
      skill1Lvl: 0,
      skill2Lvl: 0,
      minDmg: 1,
      maxDmg: 2,
      accuracy: 2,
      critChance: 0,
      critDmg: 0,
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

    const multiHitMultiplier = computed(() => {
      switch (currentCharacter.value?.class) {
        case Class.Warrior:
          return 1 + (110 * stats.skill1Lvl) / (stats.skill1Lvl + 50) / 100;
        case Class.Archer:
          return 1 + (120 * stats.skill1Lvl) / (stats.skill1Lvl + 40) / 100;
        case Class.Hunter:
          return (
            1 +
            (120 * stats.skill1Lvl) / (stats.skill1Lvl + 40) / 100 +
            (120 * stats.skill2Lvl) / (stats.skill2Lvl + 40) / 100
          );
      }
      return 1;
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
          image: "",
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
          field: (m: Monster) => `${(hitChance(m) * 100).toPrecision(3)}%`,
        },
        {
          name: "minHits",
          label: "Min. Hits",
          field: (m: Monster) => minHitToKill(m),
        },
        {
          name: "maxHits",
          label: "Max. Hits",
          field: (m: Monster) => maxHitToKill(m),
        },
        {
          name: "avgHit",
          label: "Average Hits",
          field: (m: Monster) => avgHitToKill(m).toFixed(1),
        },
        {
          name: "exp",
          label: "EXP",
          field: (m: Monster) => m.exp,
          sortable: true,
        },
        {
          name: "expMultiplier",
          label: "EXP Multiplier",
          field: (m: Monster) => monsterExpMul(m),
        },
        {
          name: "expPerSwing",
          label: "EXP / Swing",
          field: (m: Monster) => expPerSwing(m).toFixed(1),
          sortable: true,
        },
        {
          name: "monsterValue",
          label: "Farming Value",
          field: (m: Monster) => monsterFarmingValue(m).toFixed(3),
          sortable: true,
        },
      ];
    });

    // Determines the best monsters for the player to farm
    const sortedMonstersForFarming = computed(() => {
      return Monsters.slice().sort((a, b) => {
        return monsterFarmingValue(b) - monsterFarmingValue(a);
      });
    });

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

    /*
     * The next two functions are technically not the real min/max
     * They are used to calculate avgHitToKill.
     */
    const minHitToKill = (monster: Monster): number => {
      let hit = monster.health / (stats.maxDmg * multiHitMultiplier.value);
      if (!isValidNumber(hit)) {
        return 0;
      }
      return Math.ceil(hit);
    };

    const maxHitToKill = (monster: Monster): number => {
      let hit = monster.health / (stats.minDmg * multiHitMultiplier.value);
      if (!isValidNumber(hit)) {
        return 0;
      }
      return Math.ceil(hit);
    };

    const avgHitToKill = (monster: Monster): number => {
      let minHit = minHitToKill(monster);
      let maxHit = maxHitToKill(monster);
      return (minHit + maxHit) / 2;
    };

    const avgSwingToKill = (monster: Monster): number => {
      let swingToHit = avgSwingToHit(monster);
      let hitToKill = avgHitToKill(monster);
      return swingToHit * hitToKill;
    };

    const monsterExpMul = (monster: Monster): number => {
      return monster.exp * monsterExpMultiplier.value;
    };

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
      avgSwingToKill,
      currentMonsterName,
      expPerSwing,
      expToNextLevel,
      hitChance,
      maxHitToKill,
      minHitToKill,
      monsterExpInGame,
      monsterExpMul,
      monsterFarmingValue,
      stats,
      skillInfo,
      sortedMonstersForFarming,
      sweetSpotColumns,
      wikiLinks,
    };
  },
});
</script>

<style scoped lang="sass"></style>
