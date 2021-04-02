<template>
  <div class="col table-responsive">
    <table
      v-for="(data, category) in checklistData"
      :key="category"
      class="table text-center table-hover mx-auto"
      id="checklist"
    >
      <thead>
        <tr>
          <th class="table-info" colspan="8">{{ category }}</th>
        </tr>
        <tr class="text-light">
          <th scope="col">Character</th>
          <th v-for="n in numCharacters" :key="n" scope="col">{{ n }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data.items" :key="i">
          <th
            :title="item.name"
            scope="row"
            class="p-0"
          >
            <img
              class="m-1"
              loading="lazy"
              :src="getItemImagePath(item.name)"
            />
          </th>
          <td v-if="data.global" :colspan="numCharacters">
            <input
              class="form-check-input"
              type="checkbox"
              :id="item.name"
              :checked="checklist[item.name][0]"
              @change="handleProgressCheck(item.name)"
            />
            <label class="form-check-label" :for="item.name"></label>
          </td>
          <td v-else v-for="n in numCharacters" :key="n">
            <input
              class="form-check-input"
              type="checkbox"
              :id="item.name + n"
              :checked="checklist[item.name][n]"
              @change="handleProgressCheck(item.name, n)"
            />
            <label class="form-check-label" :for="item.name + n"></label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import checklistData from "../data/checklist.json";
import { StateManager } from "../State";

export default defineComponent({
  name: "ProgressTracker",
  setup() {
    const numCharacters = ref(7);

    const checklist: Record<string, Array<boolean>> = {};
    const state = inject("state") as StateManager;
    const saved = JSON.parse(state.load("checklist"));

    for (const data of Object.values(checklistData)) {
      for (const item of data.items) {
        if (data.global) {
          if (saved !== null && saved[item.name][0]) {
            checklist[item.name] = [true];
          } else {
            checklist[item.name] = [false];
          }
        } else {
          if (saved !== null) {
            checklist[item.name] = saved[item.name];
          } else {
            checklist[item.name] = new Array(numCharacters.value).fill(false);
          }
        }
      }
    }

    const handleProgressCheck = (item: string, n?: number) => {
      if (n !== undefined) {
        checklist[item][n] = !checklist[item][n];
      } else {
        checklist[item][0] = !checklist[item][0];
      }
      state.save("checklist", JSON.stringify(checklist));
    };

    return {
      checklist,
      checklistData,
      handleProgressCheck,
      numCharacters,
    };
  },
  methods: {
    getItemImagePath(item: string): string {
      let cleaned = item.replace(/ /g, "_");
      return `assets/checklist/${cleaned}.png`;
    },
  },
});
</script>
