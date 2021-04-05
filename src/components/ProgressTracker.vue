<template>
  <div class="col progress-tracker">
    <div
      v-for="(data, category) in globalChecklist"
      :key="category"
      class="progress-group"
      id="checklist"
    >
      <div class="progress-category text-light col-12 col-md-6 my-3">
        {{ category }}
      </div>
      <div class="progress-items">
        <div v-for="(item, i) in data.items" :key="i">
          <div class="progress-item">
            <img
              class="m-1"
              loading="lazy"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              :title="item.name"
              :src="getItemImagePath(item.name)"
              :data-enabled="checklist[item.name]"
              @click="handleProgressCheck(item.name)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import checklistData from "../data/checklist.json";
import { StateManager } from "../State";

export default defineComponent({
  name: "ProgressTracker",
  setup() {
    const checklist = ref({} as Record<string, boolean>);
    const state = inject("state") as StateManager;
    const saved = JSON.parse(state.load("checklist"));

    const globalChecklist = computed(() => {
      // Non-global items are managed on the characters page
      return Object.entries(checklistData)
        .filter(([_, value]) => value.global)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {} as Record<string, any>);
    });

    for (const data of Object.values(globalChecklist.value)) {
      for (const item of data.items) {
        if (saved !== null && saved[item.name]) {
          checklist.value[item.name] = true;
        } else {
          checklist.value[item.name] = false;
        }
      }
    }

    const handleProgressCheck = (item: string) => {
      checklist.value[item] = !checklist.value[item];
      state.save("checklist", JSON.stringify(checklist.value));
    };

    return {
      checklist,
      globalChecklist,
      handleProgressCheck,
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
