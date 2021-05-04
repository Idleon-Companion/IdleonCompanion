import { ref } from "vue";
import checklistData from "~/data/checklist.json";

const checklist = ref({} as Record<string, boolean>);

export function useChecklist() {
  return {
    checklist,
    checklistData,
  };
}
