<template>
  <div class="col table-responsive px-0 mt-3">
    <table
      v-for="(items, category) in checklistData"
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
        <tr v-for="(item, itemID) in items" :key="itemID">
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
              :src="getItemImagePath(itemID)"
            />
          </th>
          <td v-if="item.global" :colspan="numCharacters">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                v-model="checked"
                @change.stop="handleProgressCheck(item)"
              />
              <label
                class="custom-control-label"
                :for="'check-' + itemID"
              ></label>
            </div>
          </td>
          <td v-else v-for="n in numCharacters" :key="n">
            <div class="custom-control custom-checkbox">
              <input
                class="custom-control-input"
                type="checkbox"
                :id="'check-' + itemID + n"
                @change.stop.prevent="handleProgressCheck(item)"
              />
              <label
                class="custom-control-label"
                :for="'check-' + itemID + n"
              ></label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import checklistData from "../data/checklist.json";

export default defineComponent({
  name: "ProgressTracker",
  setup() {
    const numCharacters = ref(7);

    const checked = ref({});

    const handleProgressCheck = (item: any) => {
      console.log("Progress saved for item:", item);
    };

    return {
      checked,
      checklistData,
      handleProgressCheck,
      numCharacters,
    };
  },
  methods: {
    getItemImagePath(item: string): string {
      return `assets/checklist/${item}.png`;
    },
  },
});
</script>
