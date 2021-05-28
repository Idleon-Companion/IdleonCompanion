	<template>
<div class="text-light bg-primary rounded mt-2 p-4 w-100">
<table class="sweetspot_table">
	<thead>
	<tr>
		<th scope="col">Name</th>
	      <th scope="col">HP</th>
	      <th scope="col">Chance to hit %</th>	
	      <th scope="col">Avg Swings to kill</th>	
	      <th scope="col">Monster EXP</th>	
	      <th scope="col">Monster EXP with multiplier </th>	
	      <th scope="col">EXP per Swing</th>	
	      <th scope="col">Weight</th>	
	      <th scope="col">Best Mob</th>	
	</tr>
	</thead>
	<tbody>
	<tr
		v-for="monster in monsters"
		:key="monster.name"
	>
		<td>{{monster.name}}</td>
		<td>{{monster.health}}</td>
		<td>{{chanceToHit(monster).toFixed(2)}}</td>
		<td>{{avgSwingToKill(monster).toFixed(2)}}</td>
		<td>{{monster.exp}}</td>
		<td>{{monsterExpMul(monster).toFixed(2)}}</td>
		<td>{{expPerSwing(monster).toFixed(2)}}</td>
		<td>{{monsterWeight[monster.name][charClass]}}</td>
		<td>{{bestMob(monster).toFixed(4)}}</td>
	</tr>
	</tbody>
</table>
<div>
<label for="min-dmg" class="h5 m-2 ms-0">Minimum Damage</label>
<input
                    v-model.number="minDmg"
                    type="number"
                    min="1"
                    id="min-dmg"
                  /></div>
<div>
<label for="max-dmg" class="h5 m-2 ms-0">Maximum Damage</label>
<input
                    v-model.number="maxDmg"
                    type="number"
                    min="1"
                    id="max-dmg"
/>
</div>

<div>
<label for="acc" class="h5 m-2 ms-0">Accuracy</label>
<input
                    v-model.number="accuracy"
                    type="number"
                    min="2"
                    id="acc"
/>
</div>

<div>
<label for="critC" class="h5 m-2 ms-0">Crit Chance</label>
<input
                    v-model.number="critChance"
                    type="float"
                    min="0.00"
                    id="critC"
/>
</div>

<div>
<label for="critD" class="h5 m-2 ms-0">Crit Damage</label>
<input
                    v-model.number="critDmg"
                    type="float"
                    min="1.00"
                    id="critD"
/>
</div>




<div class="input-group">
        <select v-model="charClass" class="" id="charSelector">
          <option v-for="idleClass in idleClasses">
            {{ idleClass }}
          </option>
        </select>
</div>

<div>
<label for="skill1" class="h5 m-2 ms-0">Skill 1</label>
<input
                    v-model.number="charSkill1"
                    type="number"
                    min="0"
                    id="skill1"
/>
</div>

<div>
<label for="skill1" class="h5 m-2 ms-0">Skill 2</label>
<input
                    v-model.number="charSkill2"
                    type="number"
                    min="0"
                    id="skill2"
/>
</div>



</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import monsterData from "~/data/monsterData.json";
import { monsterWeight } from "~/composables/SweetSpotWeight";

type Monster = {
	name: string;
	attack: number;
	health: number;
	exp: number;
	accLow: number;
	accHigh: number;
	respawnRate: number;
	numMobs: number;
}


export default defineComponent({
	name: "SweetSpot",
	setup() {
		const monsters: Record<string, Monster> = monsterData;
		const minDmg = ref(1);
		const maxDmg = ref(2);
		
		// Code for double-hit skills
		const multiplier = computed(() => {
			switch(charClass.value) {
				case "None":
					return 1;
				case "Warrior":
					return 1 + (110*charSkill1.value/(charSkill1.value + 50))/100;
				case "Archer":
					return 1 + (120*charSkill1.value/(charSkill1.value + 40))/100;
				case "Hunter":
					return 1 + (120*charSkill1.value/(charSkill1.value + 40))/100
						 + (120*charSkill2.value/(charSkill2.value + 40))/100;
				case "Mage":
					return 1;
				default:
					return 1;
			}
		})

		const accuracy = ref(2);
		const critChance = ref(0);
		const critDmg = ref(1.00);
		const expMul = ref(1);

		const charClass = ref("None");
		const charSkill1 = ref(0);
		const charSkill2 = ref(0);

		// For multi-hit talents
		const idleClasses = [
			"None", 
			"Warrior",
			"Archer", "Hunter",
			"Mage",
			"Journeyman"
		];

		const chanceToHit = (monster: Monster): number  => {
			// Prevent high integer calculations so that my computer fans calm down 
			if(accuracy.value > monsters["Frog"].accHigh) return 1;

			// Edge Case
			if(accuracy.value < 2) return 0;
	
			let hitChance = ((accuracy.value - monster.accLow)/(monster.accHigh - monster.accLow)*95) + 5;
			// 5% is minimum required to hit a mob
			if (hitChance < 5) { return 0 };
			return Math.min(hitChance,100)/100;

		}

		const avgSwingToHit = (monster: Monster): number => {
			let hitChance = chanceToHit(monster);
			if (hitChance == 0) { return 0 };
			return 1/hitChance;
		}

		/* The next two functions are not used in the calculations */
		const minHitToKill = (monster: Monster): number => {
			let hit = monster.health / (maxDmg.value*multiplier.value);
			return Math.ceil(hit);	
		}

		const maxHitToKill = (monster: Monster): number => {
			let hit = monster.health / (minDmg.value*multiplier.value);
			return Math.ceil(hit);	
		}
		/***********************************************************/

		const avgHitToKill = (monster: Monster): number => {
			let sum = 0;

			// Prevent high calculation loads.
			// If the range is too high, this will become approximate guess
			// of the avg number of hits needed to kill the mob
			let offset = 1;
			let maxNumCalc = 100000;
					if(maxDmg.value - minDmg.value > maxNumCalc) {
				offset = Math.round((maxDmg.value - minDmg.value)/maxNumCalc);
			}

			// Init variables
			let critAvgDmg = 0;
			let numElements = 0;
			let curCritChance = critChance.value/100;
			let curCritDmg = critDmg.value;

			// Bound
			if(curCritChance > 1) curCritChance = 1;
			if(curCritChance < 0) curCritChance = 0;
			if(curCritDmg < 1) curCritDmg = 1;
			
			// Calculate average hits
			for (let i=minDmg.value; i <= maxDmg.value; i= i + offset) {
				// Calculate average dmg including crits for this particular dmg number: i
				critAvgDmg = (1 - curCritChance) * i + curCritChance * curCritDmg * i

				// How many hits would it take to kill this monster at the current damage number
				sum = sum + Math.ceil(monster.health/(critAvgDmg*multiplier.value));
				numElements++;
			}
			return sum/numElements;
		}

		const avgSwingToKill = (monster: Monster): number => {
			let swingToHit = avgSwingToHit(monster);
			let hitToKill = avgHitToKill(monster);
			return swingToHit*hitToKill;
		}

		const monsterExpMul = (monster: Monster): number => {
			return monster.exp*expMul.value;
		}

		const expPerSwing = (monster: Monster): number => {
			let swingToKill = avgSwingToKill(monster);		
			let expMul = monsterExpMul(monster);
			return expMul/swingToKill;
		}
		
		const bestMob = (monster: Monster): number => {
			if ( avgSwingToKill <= 0 ) return 0;
			// The monsterWeight is basically regression by hand based off exp/hr data
			// Low respawn times are highly weighted
			let weight = (monster.numMobs - monsterWeight[monster.name][charClass.value])/monster.respawnRate;
			// If the monster EXP is good, give a higher weight, but not too high
			// So we use a log to flatten the top a tad
			let magic = weight * Math.log10(monsterExpMul(monster));
			return expPerSwing(monster) * magic;
		}


		return { 
		monsters, monsterWeight, minDmg, maxDmg, multiplier, accuracy, critChance, critDmg, expMul, 
		charClass, charSkill1, charSkill2, idleClasses,
		chanceToHit, avgSwingToHit, minHitToKill, maxHitToKill, avgHitToKill,
		avgSwingToKill, monsterExpMul, expPerSwing, bestMob };
	},

	methods: {
	}
});
</script>
