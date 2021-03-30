<template>
  <div class="col table-responsive px-0 mt-3">
    <table
      v-for="(data, category) in checklistData"
      :key="category"
      class="table text-center table-hover w-50 mx-auto"
      id="checklist"
      style="background-color: rgba(39, 43, 48, 0.8)"
    >
      <thead>
        <tr>
          <th class="table-info" colspan="8">{{ category }}</th>
        </tr>
        <tr>
          <th scope="col">Character</th>
          <th v-for="n in numCharacters" :key="n" scope="col">{{ n }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data.items" :key="i">
          <th
            data-toggle="tooltip"
            data-trigger="click"
            data-delay='{"show":"100", "hide":"100"}'
            :title="item.name"
            scope="row"
            class="p-0"
          >
            <img
              class="w-50 h-auto"
              loading="lazy"
              :src="getItemImagePath(item.name)"
            />
          </th>
          <td v-if="data.global" :colspan="numCharacters">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                :id="item.name"
                :checked="checklist[item.name]"
                @change="handleProgressCheck(item.name)"
              />
              <label class="custom-control-label" :for="item.name"></label>
            </div>
          </td>
          <td v-else v-for="n in numCharacters" :key="n">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                :id="item.name + n"
                :checked="checklist[item.name + '-' + n]"
                @change="handleProgressCheck(item.name + '-' + n)"
              />
              <label class="custom-control-label" :for="item.name + n"></label>
            </div>
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

    const checklist: Record<string, boolean> = {};
    const state = inject("state") as StateManager;
    const saved = JSON.parse(state.load("checklist"));

    for (const data of Object.values(checklistData)) {
      for (const item of data.items) {
        if (data.global) {
          if (saved !== null && saved[item.name]) {
            checklist[item.name] = true;
          } else {
            checklist[item.name] = false;
          }
        } else {
          for (const n of Array(numCharacters.value).keys()) {
            let key = `${item.name}-${n}`;
            if (saved !== null && saved[key]) {
              checklist[key] = true;
            } else {
              checklist[key] = false;
            }
          }
        }
      }
    }

    const handleProgressCheck = (item: string) => {
      checklist[item] = !checklist[item];
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
