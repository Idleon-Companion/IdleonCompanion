<template>
  <div class="row">
    <div class="col-lg-12 mt-3">
      <div class="bs-component">
        <div class="progress">
          <div
            id="progress"
            class="progress-bar bg-success"
            role="progressbar"
            ref="progressBar"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-for="(tasks, category) in allTasks" :key="category">
    <div class="col-lg-12">
      <div class="bs-component">
        <div class="list-group">
          <a
            class="list-group-item list-group-item-action flex-column align-items-start active"
          >
            <div class="d-flex w-100 justify-content-between">
              <h3 class="mb-3">{{ category }}</h3>
              <p class="bs-component">
                <button
                  id="btnCheck"
                  type="button"
                  class="btn btn-primary btn-lg btn-block"
                >
                  Check All
                </button>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="list-group checkbox-container">
        <label
          v-for="(task, i) in tasks"
          :for="category + i"
          :key="category + i"
          class="list-group-item list-group-item-action active mb-0"
        >
          <div class="custom-control custom-checkbox">
            <input
              :id="category + i"
              type="checkbox"
              class="custom-control-input"
              :checked="task.Completed"
            />
            <p class="custom-control-label">{{ task.Message }}</p>
          </div>
        </label>
      </div>
      <!-- <div class="list-group checkbox-container">
        <label
          for="daily8"
          class="list-group-item list-group-item-action active mb-0"
        >
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="daily8"
              unchecked
            />
            <p class="custom-control-label">
              Kill Boops (in the secret area) and Dr Defecaus if possible
              <span class="badge badge-info mx-4" id="boopsBadge"> 0:00 </span>
            </p>
          </div>
        </label>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import taskData from "../pages/data/tasks.json";

type Task = {
  Category: string;
  Message: string;
  Completed: boolean;
};

export default defineComponent({
  name: "Tasks",
  setup() {
    // Load task data and create map to track completion
    let allTasks: Record<string, Array<Task>> = {};
    let numTasks = 0;
    for (const [category, tasks] of Object.entries(taskData)) {
      allTasks[category] = new Array<Task>();
      for (const t of tasks) {
        let task: Task = {
          Category: category,
          Message: t,
          Completed: false,
        };
        allTasks[category].push(task);
        numTasks += 1;
      }
    }

    const tasksCompleted = computed(() => {
      let completed = 0;
      for (const tasks of Object.values(allTasks)) {
        completed += tasks.filter((x) => x.Completed).length;
      }
      return completed;
    });

    const progressBar = ref();
    const updateProgressBar = () => {
      progressBar.value.style.width = `${
        (tasksCompleted.value / numTasks) * 100
      }%`;
    };

    onMounted(() => {
      updateProgressBar();
    });

    return {
      allTasks,
      progressBar,
      updateProgressBar,
    };
  },
});
</script>
