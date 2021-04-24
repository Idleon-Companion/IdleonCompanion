<template>
  <div class="row mx-0 text-light mt-2">
    <div class="bg-primary rounded p-3 m-0 d-flex row">
      <div class="d-flex align-items-end justify-content-between">
        <h4>Add New Task</h4>
        <button
          class="btn btn-info text-light p-2 mt-2"
          @click="loadDefaultTasks"
        >
          <b>Add Default Tasks</b>
        </button>
      </div>
      <div class="d-flex flex-column col-12 col-md-6">
        <label for="new-task-text">Task</label>
        <textarea
          id="new-task-text"
          v-resizable
          v-model="newTask.text"
          placeholder="Collect 300 Green Spores"
        />
        <label for="new-task-categories" class="mt-1">Categories</label>
        <input
          id="new-task-categories"
          type="text"
          v-model="newTask.categories"
          placeholder="guild, colosseum, quests"
        />
      </div>
      <div
        class="d-flex flex-column col-12 col-md-6 my-1 justify-content-center"
      >
        <div class="new-task-sync-desc">
          Enable sync to reset according to game clock (set your in-game reset
          time below)
        </div>
        <div class="d-flex flex-wrap new-task-time-row">
          <div class="new-task-reset-time me-2">
            <input type="time" v-model="dailyReset" @change="updateTasks" />
          </div>
          <div
            class="new-task-sync p-1 col-2 text-center rounded"
            @click="newTask.sync = !newTask.sync"
          >
            Sync: {{ newTask.sync ? "On" : "Off" }}
          </div>
        </div>
        <div
          class="d-flex flex-wrap align-items-center mt-2 new-task-reset-row"
        >
          <div class="d-flex align-items-center new-task-reset-input">
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
          <button class="btn new-task-btn col-2 p-2 mt-2" @click="addTask">
            Add Task
          </button>
        </div>
      </div>
    </div>
  </div>
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
    <div class="col-lg-12 rounded-bottom">
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
import taskData from "~/data/defaultTasks.json";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { StateManager } from "~/State";
dayjs.locale;
dayjs.extend(duration);
dayjs.extend(relativeTime);

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
    let dailyReset = ref("12:00");

    const loadDefaultTasks = () => {
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
        if (tasks.filter((x) => x.text === task.task).length === 0) {
          tasks.push(t);
        }
      }
    };

    // Load task data from state first if it exists
    const state = inject("state") as StateManager;
    let saved = JSON.parse(state.load("tasks"));
    if (saved !== null) {
      for (let task of saved.tasks) {
        tasks.push(task);
      }
      dailyReset.value = saved.dailyReset;
    } else {
      loadDefaultTasks();
    }

    const curTime = ref(dayjs().valueOf());
    const offsetTime = ref(0);
    const setOffsetTime = () => {
      curTime.value = dayjs().valueOf();
      // Calculate offset from daily reset time
      let daily = dailyReset.value.split(":");
      let offset = dayjs()
        .startOf("day")
        .subtract(curTime.value)
        .add(
          dayjs.duration({
            hours: parseInt(daily[0]),
            minutes: parseInt(daily[1]),
          })
        )
        .valueOf();
      // Handle negative value
      if (offset < 0) {
        offset += DAY;
      }
      offsetTime.value = offset;
    };
    setOffsetTime();
    // Update day intervals
    setInterval(setOffsetTime, 1000);

    const timeUntilReset = (task: Task): number => {
      if (task.sync) {
        if (curTime.value - task.lastCompleted > task.reset) {
          return -1;
        }
        return task.reset - (DAY - offsetTime.value);
      }
      return task.lastCompleted + task.reset - curTime.value;
    };

    const isTaskComplete = (task: Task): boolean => {
      return task.lastCompleted > 0 && timeUntilReset(task) > 0;
    };

    const tasksCompleted = computed(() => {
      return tasks.filter((x) => isTaskComplete(x)).length;
    });

    const progressBar = ref();
    const updateTasks = () => {
      progressBar.value.style.width = `${
        (tasksCompleted.value / tasks.length) * 100
      }%`;
      state.save(
        "tasks",
        JSON.stringify({
          tasks: tasks,
          dailyReset: dailyReset.value,
        })
      );
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
      resetHours: 0,
      resetDays: 1,
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
      newTask.text = "";
      newTask.categories = "";
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
      dailyReset,
      handleTaskCheck,
      isTaskComplete,
      loadDefaultTasks,
      newTask,
      progressBar,
      removeTask,
      tasks,
      timeUntilReset,
      updateTasks,
    };
  },
  methods: {
    taskResetTimeText(task: Task): string {
      if (this.isTaskComplete(task)) {
        let diff = dayjs.duration(this.timeUntilReset(task));
        let format = diff.format("H[h] mm[m] ss[s]");
        if (diff.days() > 0) {
          format = diff.format("D[d] H[h] mm[m] ss[s]");
        }
        return "Reset in " + format;
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
  margin-right: 0.25rem
  padding: 0.1rem 0.35rem
  text-transform: uppercase
.new-task-sync-desc
  margin-top: 0.25rem
  font-style: italic
.new-task-time-row > *
  margin-top: 0.25rem
.new-task-sync
  min-width: 100px
  background: lighten($primary, 8%)
  cursor: pointer
  font-size: 1.25rem
  font-weight: bold
  transition: 0.3s
  &:hover
    background: lighten($primary, 12%)
.new-task-reset-input
  flex: 4
  min-width: 265px
.new-task-reset-input > input
  min-width: 2.5rem
.new-task-btn
  flex: 1
  min-width: 100px
  background: lighten($primary, 10%)
  color: darken(white, 10%)
  transition: 0.3s
  &:hover
    color: darken(white, 10%)
    background: lighten($primary, 15%)
</style>
