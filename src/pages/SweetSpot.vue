<template>
<div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
	A tool to give your top 3 <u>active</u> farming spots! The tool takes into account respawn time,
	map complexity, and number of monsters on the map. <u>Active gains will not be the same as your AFK gains!</u>
      </p>
    </div>
  </div>
<div class="text-light bg-primary rounded mt-2 p-4 w-100">
<div>
<label for="min-dmg" class="h5 m-2 ms-0">Damage</label>
<input
                    v-model.number="minDmg"
                    type="number"
                    min="1"
                    id="min-dmg"
		    placeholder="Minimum Damage"
                  /> 
<input
                    v-model.number="maxDmg"
                    type="number"
                    min="1"
                    id="max-dmg"
		    placeholder="Maximum Damage"
/>
</div>

<div>
<label for="critC" class="h5 m-2 ms-0">Crit Chance</label>
<input
                    v-model.number="critChance"
                    type="float"
                    min="0.00"
                    id="critC"
		    placeholder="Crit Chance Percent"
/>
</div>

<div>
<label for="critD" class="h5 m-2 ms-0">Crit Damage</label>
<input
                    v-model.number="critDmg"
                    type="float"
                    min="1.00"
                    id="critD"
		    placeholder="Crit Damage Multiplier"
/>
</div>


<div>
<label for="acc" class="h5 m-2 ms-0">Accuracy</label>
<input
                    v-model.number="accuracy"
                    type="number"
                    min="2"
                    id="acc"
		    placeholder=""
/>
</div>



<div class="input-group">
<label for="charSelector" class="h5 m-2 ms-0">Subclass</label>
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


<div class="input-group">
<label for="monstSelector" class="h5 m-2 ms-0">Currently Farming</label>
        <select v-model="curEXPMonst" class="" id="monstSelector">
          <option v-for="monster in monsters" :key="monster.name">
            {{ monster.name }}
          </option>
        </select>
</div>


<div>
<label for="expMonst" class="h5 m-2 ms-0">Ingame EXP</label>
<input
                    v-model.number="ingameEXPMonst"
                    type="number"
                    min="1"
                    id="expMonst"
		    placeholder=""
/>
</div>

<div>
<label for="cLevel" class="h5 m-2 ms-0">Character Level</label>
<input
                    v-model.number="charLevel"
                    type="number"
                    min="1"
                    id="cLevel"
/> 
</div>
<div>
    <label for="startTime" class="h5 m-2 ms-0">Starting Time</label>
      <input
        id="startTime"
        v-model="startExpTime"
        type="text"
        placeholder="HH:mm"
      />
<label for="startExp" class="h5 m-2 ms-0">&nbsp; Start EXP%</label>
<input
                    v-model.number="startExp"
                    type="float"
                    min="0.00"
                    id="startExp"
/>
</div>

<div>
    <label for="endTime" class="h5 m-2 ms-0">Ending Time</label>
      <input
        id="endTime"
        v-model="endExpTime"
        type="text"
        placeholder="HH:mm"
      />
<label for="endExp" class="h5 m-2 ms-0">&nbsp; End EXP%</label>
<input
                    v-model.number="endExp"
                    type="float"
                    min="0.00"
                    id="endExp"
/>
<br>
Required EXP for Level Up: {{ expNextLevel(charLevel).toFixed(0) }}
<br>Hours to next level: {{ timeToLevel()[0] }}
<br>EXP per hour {{ timeToLevel()[1] }}
</div>

Your top three spots are<br>
<div>
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
		<!-- <td>{{monsterWeight[monster.name][charClass]}}</td>
		<td>{{bestMobArray[monster.name]}}</td>  -->
	</tr> 
	</tbody>
</table>
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
		const activeKey = ref("1");
		const minDmg = ref("1");
		const maxDmg = ref("2");
		
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

		const monstEXPMul = computed(() => {
			// Make sure the user selected something
			if (curEXPMonst.value == "None") return 1;

			// JSON monster names have underscores instead of spaces
			let monstName = curEXPMonst.value;

			// Only calculate the multiplier if it's larger than the Wiki EXP
			if( monsters[monstName].exp > ingameEXPMonst.value) return 1;
			return  ingameEXPMonst.value / monsters[monstName].exp;
		})

	
		const accuracy = ref("2");
		const critChance = ref("17");
		const critDmg = ref("1");

		const charClass = ref("None");
		const charSkill1 = ref("41");
		const charSkill2 = ref("0");

		const curEXPMonst = ref("None");
		const ingameEXPMonst = ref("");
	
		/* For EXP Calculator */
		const charLevel = ref("");
		const startExpTime = ref("");
		const startExp = ref("");
		const endExpTime = ref("");
		const endExp = ref("");
		

		// For multi-hit talents
		const idleClasses = [
			"None", 
			"Warrior",
			"Archer", "Hunter",
			"Mage",
			"Journeyman"
		];

		/*const bestMobArray = computed(() => {
			let dict = {};
			/*for(const [key, monster] of Object.entries(monsters)){
				let curMobCalc = bestMob(monster);		
				dict[monster.name] = curMobCalc;
			}
			return dict;
		})
	
		const bestThreeMobs = computed(() => {
			//let dict = bestMobArray;
			//Get the number of keys - easy using the array 'length' property
		 	var keys = Object.keys(dict);
			let i, len = keys.length; 
			keys.sort();
					var sortedDict = [];
			for (i = 0; i < 3; i++){
			    let k = keys[i];
			    sortedDict.push({'key': k, 'value':dict[k]});
			}
			return sortedDict;  
			return 0;
		})*/	

		const expNextLevel = (level): number => {
			// Calculation taken from the Idleon toolbox
			let H = 15 + Math.pow(level, 1.9);	
			let W = 1.208 - Math.min(0.164, (0.215*level)/(level + 100));

			// I have no clue why Lava chose this formula
			return (H + 11*level)*Math.pow(W,level) - 15;
		}
	
		const timeToLevel = (): number => {
			var timeStart = new Date("01/01/2007 " + startExpTime.value);
			var timeEnd = new Date("01/01/2007 " + endExpTime.value);
			//console.log(timeStart);
			//console.log(timeEnd);
		
			var hourDiff = timeEnd - timeStart;
			if(hourDiff < 0) hourDiff = 24 + hourDiff;


			let curStart = expNextLevel(charLevel.value)*startExp.value/100;
			let expReq = expNextLevel(charLevel.value);
			let endExpReq = 0;
			let curEnd = 0;
			let expFarmed = 0;

			// Assume they leveled up if their ending EXP is lower than the starting one
			if(endExp.value < startExp.value) {
				curEnd = expNextLevel(charLevel.value + 1)*endExp.value/100;

				// If they leveled up, EXP required is for 1 level higher.
				endExpReq = expNextLevel(charLevel.value + 1);

				// Obtain the difference from their starting point to the level up
				let exp1 = expReq - expReq*startExp.value/100;
			
				// Obtain how much they earned since their level up
				let exp2 = curEnd;
				//console.log("exp1 :" + exp1);
				//console.log("exp2 :" + exp2);
				//console.log("+1 " + expNextLevel(charLevel.value + 1));
				expFarmed = exp1 + exp2;
			}
			else {
				// Current EXP of player
				curEnd = expNextLevel(charLevel.value)*endExp.value/100;
				// If they didn't level up, the EXP required is the one
				// needed for the original level
				endExpReq = expReq;
				expFarmed = curEnd - curStart;
			}

	
			hourDiff = hourDiff / 60 / 60 / 1000;
			let expHr = expFarmed / hourDiff;
			let remainTime = (endExpReq - curEnd) / expHr;

			//console.log("hourDiff " + hourDiff);
			//console.log("curStart " + curStart);
			//console.log("curEnd " + curEnd);
			//console.log("ExpFarmed " + expFarmed);
			//console.log("Remaing to farm" + (expReq - curEnd));
			//console.log("exp/Hr " + expHr);

			return [remainTime,expHr];
		}

		const chanceToHit = (monster: Monster): number  => {
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
			/*let offset = 1;
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
			*/
			let minHit = minHitToKill(monster);
			let maxHit = maxHitToKill(monster);

			return Math.ceil((minHit + maxHit)/2);
		}

		const avgSwingToKill = (monster: Monster): number => {
			let swingToHit = avgSwingToHit(monster);
			let hitToKill = avgHitToKill(monster);
			return swingToHit*hitToKill;
		}

		const monsterExpMul = (monster: Monster): number => {
			//console.log(ingameEXPMonst.value);
			//console.log(monstEXPMul.value);
			return monster.exp*monstEXPMul.value;
		}

		const expPerSwing = (monster: Monster): number => {
			let swingToKill = avgSwingToKill(monster);		
			let expMul = monsterExpMul(monster);
			return expMul/swingToKill;
		}
		
		const bestMob = (monster: Monster): number => {
			// World 3 not ready
			if(monster.numMobs == 1) return 0;

			if ( avgSwingToKill <= 0 ) return 0;

			// Edge case for Hunter
			let classWeight = charClass.value;
			if( classWeight == "Hunter") classWeight = "Archer";

			// The monsterWeight is basically regression by hand based off exp/hr data
			// Low respawn times are highly weighted
			let weight = (monster.numMobs - monsterWeight[monster.name][classWeight])/monster.respawnRate;
			// If the monster EXP is good, give a higher weight, but not too high
			// So we use a log to flatten the top a tad
			let magic = weight * Math.log10(monsterExpMul(monster));
			return expPerSwing(monster) * magic;
		}


		return {
		activeKey, 
		monsters, monsterWeight, minDmg, maxDmg, multiplier, monstEXPMul,
		accuracy, critChance, critDmg, curEXPMonst, ingameEXPMonst, 
		charClass, charSkill1, charSkill2, 

		startExpTime, startExp, endExpTime, endExp, charLevel, idleClasses,
		expNextLevel, timeToLevel,

		chanceToHit, avgSwingToHit, minHitToKill, maxHitToKill, avgHitToKill,
		avgSwingToKill, monsterExpMul, expPerSwing, bestMob };
	}
});
</script>
