<template>
  <div class="row">
    <div class="col-lg-12 mt-3">
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
  <div class="row">
    <div class="col-lg-12">
      <div v-for="(task, i) in tasks" :key="i">
        <label
          :for="'task' + i"
          class="list-group-item list-group-item-action py-3"
        >
        <input
          :id="'task' + i"
          type="checkbox"
          class="form-check-input me-2"
          :checked="isTaskComplete(task)"
          @change="handleTaskCheck(task)"
        />
        {{ taskText(task) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
} from "vue";
import taskData from "../data/defaultTasks.json";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { StateManager } from "../State";
dayjs.extend(duration);
dayjs.extend(relativeTime);

type Task = {
  lastCompleted: number;
  message: string;
  resetInterval: Record<string, number>;
};

export default defineComponent({
  name: "Tasks",
  setup() {
    let tasks = reactive(Array<Task>());
    // Load task data from state first if it exists
    const state = inject("state") as StateManager;
    let saved = JSON.parse(state.load("tasks"));
    if (saved !== null) {
      for (let task of saved) {
        tasks.push(task);
      }
    } else {
      // Load default task data and reset all timers
      for (const task of taskData) {
        let t: Task = {
          message: task.task,
          lastCompleted: 0,
          resetInterval: task.reset,
        };
        tasks.push(t);
      }
    }

    const isTaskComplete = (task: Task): boolean => {
      let resetInterval = dayjs.duration(task.resetInterval);
      let resetTime = dayjs(task.lastCompleted).add(resetInterval);
      if (dayjs().isBefore(resetTime)) {
        return true;
      }
      return false;
    };

    const tasksCompleted = computed(() => {
      return tasks.filter((x) => isTaskComplete(x)).length;
    });

    const progressBar = ref();
    const updateProgressBar = () => {
      progressBar.value.style.width = `${
        (tasksCompleted.value / tasks.length) * 100
      }%`;
    };

    const handleTaskCheck = (task: Task) => {
      if (isTaskComplete(task)) {
        task.lastCompleted = 0;
      } else {
        task.lastCompleted = dayjs().valueOf();
      }
      updateProgressBar();
      state.save("tasks", JSON.stringify(tasks));
    };

    onMounted(() => {
      updateProgressBar();
    });

    return {
      handleTaskCheck,
      isTaskComplete,
      progressBar,
      tasks,
      updateProgressBar,
    };
  },
  methods: {
    taskText(task: Task) {
      let text = task.message;
      if (this.isTaskComplete(task)) {
        let diff = dayjs(task.lastCompleted).from(dayjs());
        text += ` - Completed ${diff}`;
      }
      return text;
    },
  },
});
</script>
