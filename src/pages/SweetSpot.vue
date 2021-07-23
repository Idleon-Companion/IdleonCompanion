<template>
<div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
	A tool to give your top 3 <u>active</u> farming spots! The tool takes into account respawn time,
	map complexity, and number of monsters on the map. <u>Active gains will not be the same as your AFK gains!</u> <br>
	<b> World 3 Not Yet Implemented </b>
      </p>
    </div>
  </div>
<div class="text-light bg-primary rounded mt-2 p-4 w-100">

<a-divider>Character Input for Best Active Zone</a-divider>

<div class="space-align-container">
	<div class="space-align-block">
		<table class="input-align-table">
			<tr>	
			<td><label for="monstSelector" class="h5 m-2 ms-0">Currently Farming</label></td>
			<td>
			<select v-model="curEXPMonst" class="" id="monstSelector">
				  <option v-for="monster in monsters" :key="monster.name">
				    {{ monster.name }}
				  </option>
			</select>
			</td>
			</tr>
			<tr>	
			<td><label for="expMonst" class="h5 m-2 ms-0">Ingame EXP</label></td>
			<td>
			<input
					    v-model.number="ingameEXPMonst"
					    type="number"
					    min="1"
					    id="expMonst"
					    placeholder=""
			/>
			</td>
			</tr>
					</table>
	</div>
	<div class="space-align-block">

		<table class="input-align-table">
			<tr>
			<td class="damage"><label class="h5 m-2 ms-0">Damage</label></td>
			<td>
			<table class="dmg-table">
				<tr>
				<td><label for="min-dmg" class="">Minimum</label></td>
				<td><label for="min-dmg" class="">Maximum</label></td></tr>
				<tr>
				<td><input
				    v-model.number="minDmg"
				    type="number"
				    min="1"
				    id="min-dmg"
				    placeholder="Minimum Damage"
				/></td>
				<td><input
				    v-model.number="maxDmg"
				    type="number"
				    min="1"
				    id="max-dmg"
				    placeholder="Maximum Damage"
				/></td></tr>
			</table>
			</td>
			</tr>
			<tr>
			<td><label for="critC" class="h5 m-2 ms-0">Crit Chance</label></td>
			<td>
			<input
			    v-model.number="critChance"
			    type="number"
			    step="0.01"
			    min="0.00"
			    id="critC"
			    placeholder="Crit Chance Percent"
			/>
			</td>
			</tr>
			<tr>
			<td><label for="critD" class="h5 m-2 ms-0">Crit Damage</label></td>
			<td>
			<input
			    v-model.number="critDmg"
			    type="float"
			    min="1.00"
			    id="critD"
			    placeholder="Crit Damage Multiplier"
			/>
			</td>
			</tr>
		</table>
	</div>
	<div class="space-align-block">
		<table class="input-align-table">
			<tr>
			<td><label for="acc" class="h5 m-2 ms-0">Accuracy</label></td>
			<td><input
			    v-model.number="accuracy"
			    type="number"
			    min="2"
			    id="acc"
			    placeholder=""
			/></td>
			</tr>
			<tr>
			<td><label for="charSelector" class="h5 m-2 ms-0">Class</label></td>
			<td><select v-model="charClass" class="" id="charSelector">
			  <option v-for="idleClass in idleClasses">
			    {{ idleClass }}
			  </option>
			</select></td>
			</tr>
			<template v-if="skill1_IMG != ''">
			<tr>
			<td></td>
			<td style="display: flex;">
			<GameAsset
				  :height="40"
				  :image="skill1_IMG"
			/>
			<label for="skill1" class="h5 m-2 ms-0"> {{skill1_name}}</label> 
			</td>
			<td><input
			    v-model.number="charSkill1"
			    type="number"
			    min="0"
			    id="skill1"
			/></td>
			</tr>
			</template>
			<template v-if="skill2_IMG != ''">
			<tr>
			<td></td>
			<td style="display:flex;">
			<GameAsset
				  :height="40"
				  :image="skill2_IMG"
			/>
			<label for="skill1" class="h5 m-2 ms-0">{{skill2_name}}</label>
			</td>
			<td><input
			    v-model.number="charSkill2"
			    type="number"
			    min="0"
			    id="skill2"
			/></td>
			</tr>
			</template>
		</table>
	</div>
</div>
Your top three spots are<br>
<div v-for="monster in bestThreeMobs">
{{monster.value}}<br>
</div>


<a-divider>EXP Calculator</a-divider>
<div>
	<table class="exp-table">
	<tr>
		<td><label for="cLevel" class="h5 m-2 ms-0">Character Level</label></td>
		<td>	
		<input
				    v-model.number="charLevel"
				    type="number"
				    min="1"
				    id="cLevel"
		/> 
		</td>
	</tr>
	  <tr>
	   <td><label for="startTime" class="h5 m-2 ms-0">Starting Time</label></td>
	   <td><a-time-picker
		id="startTime"
		v-model:value="startExpTime"
		format="HH:mm"
	      /></td>
	     <td><label for="startExp" class="h5 m-2 ms-0">&nbsp; Start EXP%</label></td>
	<td>	<input
		    v-model.number="startExp"
		    type="float"
		    min="0.00"
		    id="startExp"
		/></td>
		</tr>
		<tr>
	      <td><label for="endTime" class="h5 m-2 ms-0">Ending Time</label></td>
	      <td><a-time-picker
		id="endTime"
		v-model:value="endExpTime"
		format="HH:mm"
	      /></td>
		<td><label for="endExp" class="h5 m-2 ms-0">&nbsp; End EXP%</label></td>
		<td><input
		    v-model.number="endExp"
		    type="float"
		    min="0.00"
		    id="endExp"
		/></td></tr>
	</table>
<br>
Required EXP for Level Up: {{ expNextLevel(charLevel).toFixed(0) }}
<br>Hours to next level: {{ timeToLevel()[0] }}
<br>EXP per hour {{ timeToLevel()[1].toFixed(0) }}
</div>

<a-divider>Details</a-divider>

<div>
    <a-collapse v-model:activeKey="activeKey" accordion>
      <a-collapse-panel key="1" header="Monster Table">
	<div>
	<table class="sweetspot_table">
		<thead>
		<tr>
		      <th scope="col">Name</th>
		      <th scope="col">HP</th>
		      <th scope="col">Acc to hit 5%</th>
		      <th scope="col">Acc to hit 100%</th>
		      <th scope="col">Chance to hit %</th>	
		      <th scope="col">Min hit to kill</th>	
		      <th scope="col">Max Hit to kill</th>	
		      <th scope="col">Avg Swing to Kill</th>	
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
			<td>{{monster.accLow}}</td>
			<td>{{monster.accHigh}}</td>
			<td>{{chanceToHit(monster).toFixed(2)}}</td>
			<td>{{minHitToKill(monster).toFixed(2)}}</td>
			<td>{{maxHitToKill(monster).toFixed(2)}}</td>
			<td>{{avgSwingToKill(monster).toFixed(2)}}</td>
			<td>{{monster.exp}}</td>
			<td>{{monsterExpMul(monster).toFixed(2)}}</td>
			<td>{{expPerSwing(monster).toFixed(2)}}</td>
			<td>{{monsterWeight[monster.name][charClass]}}</td>
			<td>{{bestMob(monster).toFixed(4)}}</td>
		</tr> 
		</tbody>
	</table>
	</div>
      </a-collapse-panel>
    </a-collapse>
</div>

</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import monsterData from "~/data/monsterData.json";
import { monsterWeight } from "~/composables/SweetSpotWeight";

import GameAsset from "~/components/GameAsset.vue";
import { Assets } from "~/composables/Utilities";

import { Collapse }  from "ant-design-vue";
import { Space }  from "ant-design-vue";
import { Divider }  from "ant-design-vue";
import { Cascader }  from "ant-design-vue";
import { TimePicker }  from "ant-design-vue";
import moment from 'moment';

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
	components: {
		GameAsset,
	},
	setup() {
		const monsters: Record<string, Monster> = monsterData;

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
			
		// Code for skills
		const skill1_IMG = computed(() => {
			let imgString = ""
			switch(charClass.value) {
				case "Warrior":
					imgString = "war-2-4";
					break;
				case "Archer":
				case "Hunter":
					imgString = "arc-2-5";
					break;
				case "Journeyman":
					imgString = "jma-2-4";
					break;
				default:
					return "";
			}
			if(imgString != "")
				return Assets.FromDir(imgString,'talents');
			else return "";
		})
		const skill1_name = computed(() => {
			switch(charClass.value) {
				case "Warrior":
					return "Double Strike"
				case "Archer":
				case "Hunter":
					return "Have Another!"
				case "Journeyman":
					return "Two Punch Man"
				default:
					return "N/A";
			}
		})
		const skill2_IMG = computed(() => {
			let imgString = "";
			switch(charClass.value) {
				case "Hunter":
					imgString = "hun-3-5";
					break;
				case "Maestro":
					imgString = "";
					break;
				default:
					imgString = "";
			}
			if(imgString != "")
				return Assets.FromDir(imgString,'talents');
			else return "";
		})
		const skill2_name = computed(() => {
			switch(charClass.value) {
				case "Hunter":
					return "Have Another... Again!"
				case "Maestro":
					return "Triple Jab"
				default:
					return "N/A";
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


		const activeKey = ref([]);

		const minDmg = ref(1);
		const maxDmg = ref(2);
		
		const accuracy = ref(2);
		const critChance = ref(0);
		const critDmg = ref(0);

		const charClass = ref("None");
		const charSkill1 = ref(0);
		const charSkill2 = ref(0);

		const curEXPMonst = ref("None");
		const ingameEXPMonst = ref("");
	
		/* For EXP Calculator */
		const charLevel = ref(1);
		const startExpTime = ref(moment('12:00', 'HH:mm'));;
		const startExp = ref(0);
		const endExpTime = ref(moment('13:00', 'HH:mm'));
		const endExp = ref(100);
		

		// For multi-hit talents
		const idleClasses = [
			"None", 
			"Warrior",
			"Archer", "Hunter",
			"Mage",
			"Journeyman"
		];

		const bestMobArray = computed(() => {
			let dict = {};
			// Create a key/monster pair for the "Best Mob".
			// This will later allow us to sort the keys, and obtain
			// the corresponding monster.
			for(const [key, monster] of Object.entries(monsters)){
				let curMobCalc = bestMob(monster);		
				dict[curMobCalc] = monster.name;
			}
			return dict;
		})
	
		const bestThreeMobs = computed(() => {
			let dict = bestMobArray.value;

			// Obtain the keys (This is Best Mob)
			var keys = Object.keys(dict);
			
			// Sort the keys to obtain our best mob
			let i, len = keys.length; 
			keys.sort(function(a, b){return b-a});
			var sortedDict = [];
			
			// If the first key is Infinity, remove it
			if (keys[0] == "Infinity"){
			    let removed = keys.splice(0,1);
			}
			
			// Give us a sorted dir
			for (i = 0; i < 3; i++){
			    let k = keys[i];
			    sortedDict.push({'key': k, 'value':dict[k]});
			    // Check that it isn't Zero (No good mobs).
			    if (sortedDict[i].key == 0) sortedDict[i].value = "N/A";
			}

			return sortedDict;  
		})	
	
		const expNextLevel = (level): number => {
			// Calculation taken from the Idleon toolbox
			let H = 15 + Math.pow(level, 1.9);	
			let W = 1.208 - Math.min(0.164, (0.215*level)/(level + 100));

			// I have no clue why Lava chose this formula
			return (H + 11*level)*Math.pow(W,level) - 15;
		}
	
		const timeToLevel = (): number => {
			var timeStart = new Date("01/01/2007 " + startExpTime.value.format("HH:mm"));
			var timeEnd = new Date("01/01/2007 " + endExpTime.value.format("HH:mm"));

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

			/*console.log("hourDiff " + hourDiff);
			console.log("curStart " + curStart);
			console.log("curEnd " + curEnd);
			console.log("ExpFarmed " + expFarmed);
			console.log("Remaing to farm" + (expReq - curEnd));
			console.log("exp/Hr " + expHr);*/

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

		/* 
		 * The next two functions are technically not the real min/max
		 * They are used to calculate avgHitToKill.
		 */
		const minHitToKill = (monster: Monster): number => {
			let hit = monster.health / (maxDmg.value*multiplier.value);
			return Math.ceil(hit);	
		}

		const maxHitToKill = (monster: Monster): number => {
			let hit = monster.health / (minDmg.value*multiplier.value);
			return Math.ceil(hit);	
		}

		const avgHitToKill = (monster: Monster): number => {
			let minHit = minHitToKill(monster);
			let maxHit = maxHitToKill(monster);

			return ((minHit + maxHit)/2);
		}

		const avgSwingToKill = (monster: Monster): number => {
			let swingToHit = avgSwingToHit(monster);
			let hitToKill = avgHitToKill(monster);
			return swingToHit*hitToKill;
		}

		const monsterExpMul = (monster: Monster): number => {
			return monster.exp*monstEXPMul.value;
		}

		const expPerSwing = (monster: Monster): number => {
			let swingToKill = avgSwingToKill(monster);		
			let expMul = monsterExpMul(monster);
			return expMul/swingToKill;
		}
		
		const bestMob = (monster: Monster): number => {
			// World 3 not ready
			if(monster.numMobs === 1) return 0;

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
		Assets,
		activeKey,	
		monsters, monsterWeight, minDmg, maxDmg, multiplier, monstEXPMul,
		accuracy, critChance, critDmg, curEXPMonst, ingameEXPMonst, 
		charClass, charSkill1, charSkill2, skill1_IMG, skill1_name, 
		skill2_IMG, skill2_name, 

		startExpTime, startExp, endExpTime, endExp, charLevel, idleClasses,
		expNextLevel, timeToLevel,

		chanceToHit, avgSwingToHit, minHitToKill, maxHitToKill, avgHitToKill,
		avgSwingToKill, monsterExpMul, expPerSwing, bestMob,

		bestMobArray, bestThreeMobs};
	}
});
</script>

<style scoped>
.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.space-align-container .space-align-block {
  margin: 8px 4px;
  padding-right: 40px;
  flex: none;
}

.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}

.ant-divider-horizontal.ant-divider-with-text {
	color: white;
	border-top-color: white;
}

.input-align-table td{
	text-align:left;
}

.input-align-table td:first-child{
	text-align:right;
}

.input-align-table .dmg-table td{
	text-align:center;
	font-size:
}

.input-align-table .dmg-table td:first-child{
	text-align:center;
}

.exp-table td {
	text-align:left;
}

.exp-table td:first-child{
	text-align:right;
}

.exp-table td:nth-child(3){
	text-align:right;
}

.damage {
	vertical-align: bottom;
}

input.ant-time-picker-input {
	background-color: transparent;
}

</style>

