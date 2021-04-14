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
      <div
        v-for="(task, i) in tasks"
        class="list-group-item list-group-item-action text-light py-3 task"
        :key="i"
        :data-complete="isTaskComplete(task)"
        @click="handleTaskCheck(task)"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex flex-column">
            <div class="task-text">{{ task.text }}</div>
            <div class="d-flex align-items-center mt-1">
              <div class="task-tags d-flex">
                <div v-for="(tag, j) in task.tags" :key="j" class="task-tag">
                  {{ tag }}
                </div>
              </div>
              <div class="task-timer">{{ taskResetTimeText(task) }}</div>
            </div>
          </div>
          <div class="task-delete" @click.stop="removeTask(i)">
            <div class="iconify" data-icon="mdi:delete"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mx-0 text-light mt-2">
    <div class="col-12 bg-primary rounded p-3 d-flex flex-column">
      <h4>Add New Task</h4>
      <label for="new-task-text">Task</label>
      <input
        id="new-task-text"
        type="text"
        v-model="newTask.text"
        placeholder="Collect 300 Green Spores"
      />
      <div class="d-flex mt-2 align-items-center">
        Reset every
        <input
          id="new-task-days"
          class="mx-1 col-2 col-md-1"
          type="numeric"
          :min="0"
          v-model="newTask.resetDays"
        />
        days
        <input
          id="new-task-hours"
          class="mx-1 col-2 col-md-1"
          type="numeric"
          :min="1"
          v-model="newTask.resetHours"
        />
        hours
      </div>
      <label for="new-task-categories">Categories</label>
      <input
        id="new-task-categories"
        type="text"
        v-model="newTask.categories"
        placeholder="guild, colosseum, quests"
      />
      <div class="new-task-sync-desc">
        Tasks will be reset according to the game clock (enable for daily tasks)
      </div>
      <div
        class="new-task-sync p-1 col-2 text-center rounded"
        @click="newTask.sync = !newTask.sync"
      >
        Sync: {{ newTask.sync ? "On" : "Off" }}
      </div>
      <button class="btn new-task-btn col-2 p-2 mt-2" @click="addTask">
        Add Task
      </button>
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
import timezone from "dayjs/plugin/timezone";
import { StateManager } from "../State";
dayjs.locale;
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

type Task = {
  lastCompleted: number; // Unix timestamp of last completion
  text: string; // Text to display for task
  tags: string[]; // Tags for filtering/sorting
  reset: number; // Milliseconds to reset task
  sync: boolean; // Handles time based on in-game clock
};

const HOUR = dayjs.duration({ hours: 1 }).asMilliseconds();
const DAY = dayjs.duration({ hours: 24 }).asMilliseconds();

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
      // Daily reset is at 5:50am for America/New York? (Needs confirmation)?
      for (const task of taskData) {
        let t: Task = {
          text: task.task,
          lastCompleted: 0,
          reset: task.reset * DAY,
          tags: ["Default"],
          sync: true,
        };
        tasks.push(t);
      }
    }

    const curTime = ref(dayjs().valueOf());
    setInterval(() => {
      curTime.value = dayjs().valueOf();
    }, 1000);

    const isTaskComplete = (task: Task): boolean => {
      let resetInterval = dayjs.duration(task.reset);
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
    const updateTasks = () => {
      progressBar.value.style.width = `${
        (tasksCompleted.value / tasks.length) * 100
      }%`;
      state.save("tasks", JSON.stringify(tasks));
    };

    const handleTaskCheck = (task: Task) => {
      if (isTaskComplete(task)) {
        task.lastCompleted = 0;
      } else {
        task.lastCompleted = dayjs().valueOf();
      }
      updateTasks();
    };

    // Add/remove tasks
    const newTask = reactive({
      text: "",
      categories: "",
      resetHours: 12,
      resetDays: 0,
      sync: false,
    });
    const addTask = () => {
      let t: Task = {
        lastCompleted: 0,
        text: newTask.text,
        reset: HOUR * newTask.resetHours + DAY * newTask.resetDays,
        tags: newTask.categories
          ? newTask.categories.split(",").map((x) => x.trim())
          : [],
        sync: newTask.sync,
      };
      tasks.push(t);
      updateTasks();
    };

    const removeTask = (i: number) => {
      tasks.splice(i, 1);
      updateTasks();
    };

    onMounted(() => {
      updateTasks();
    });

    return {
      addTask,
      curTime,
      handleTaskCheck,
      isTaskComplete,
      newTask,
      progressBar,
      removeTask,
      tasks,
    };
  },
  methods: {
    taskResetText(task: Task): string {
      let duration = dayjs.duration(task.reset);
      let text = "";
      if (duration.days() > 0) {
        text += `${duration.days()}D `;
      }
      if (duration.hours() > 0) {
        text += `${duration.hours()}H `;
      }
      return text;
    },
    taskResetTimeText(task: Task): string {
      if (this.isTaskComplete(task)) {
        let resetTime = task.lastCompleted + task.reset;
        if (task.sync) {
          let dailyReset = dayjs()
            .startOf("day")
            .add(dayjs.duration({ hours: 5, minutes: 50 }))
            .subtract(this.curTime)
            .valueOf();
          // Handle negative value
          if (dailyReset < 0) {
            dailyReset += DAY;
          }
          resetTime -= Math.min(DAY, task.reset) - dailyReset;
        }
        // Use for testing task reset time
        let diff = dayjs.duration(resetTime - this.curTime);
        return "Reset in " + diff.format("D[D] H[h] mm[m] ss[s]");
        // return dayjs(this.curTime).to(task.lastCompleted + task.reset);
      }
      return "";
    },
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
.task
  background: $primary
  cursor: pointer
  transition: 0.2s
  &[data-complete='true']
    .task-text
      color: $success !important
  &:hover
    background: darken($primary, 5%)
.task-delete *
  font-size: 1.5rem
  transition: 0.3s
  &:hover
    color: $danger
.task-timer
  font-size: 0.9rem
  font-style: italic
.task-tags
  margin-right: 0.25rem
.task-tag
  background: lighten($primary, 5%)
  border-radius: 5px
  font-size: 0.85rem
  font-weight: bold
  margin-right: 0.1rem
  padding: 0.1rem 0.35rem
  text-transform: uppercase
.new-task-sync-desc
  margin-top: 0.25rem
  font-style: italic
.new-task-sync
  background: lighten($primary, 8%)
  cursor: pointer
  font-size: 1.25rem
  font-weight: bold
  transition: 0.3s
  &:hover
    background: lighten($primary, 12%)
.new-task-btn
  background: lighten($primary, 10%)
  color: darken(white, 10%)
  transition: 0.3s
  &:hover
    color: darken(white, 10%)
    background: lighten($primary, 15%)
</style>
