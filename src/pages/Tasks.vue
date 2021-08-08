<template>
  <q-banner inline-actions>
    Use daily tasks to keep track of objectives you want to complete every day.
    They will reset according to your in-game reset time. Timers serve as ways
    to monitor different actions that take different amounts of time, such as
    AFK time or placing traps.
    <template v-slot:action>
      <q-btn-dropdown outline label="Wiki">
        <q-list separator>
          <a v-for="[label, link] in wikiLinks" :key="label" :href="link">
            <q-item clickable>
              <q-item-section>{{ label }}</q-item-section>
            </q-item>
          </a>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-banner>
  <q-card class="m-4">
    <q-card-section>
      <div class="text-lg pb-2">Create New Task</div>
      <q-input
        v-model="newTask.description"
        autogrow
        filled
        placeholder="Fight all minibosses in World 2"
        label="Task"
      />
      <div class="flex justify-between items-center py-2">
        <div class="flex">
          <q-input
            v-model="newTask.tags"
            filled
            placeholder="skills, guild, W3"
            label="Tags"
            hint="Separate tags with commas"
          />
          <div class="pl-2">
            <q-input
              v-model.number="newTask.steps"
              filled
              type="number"
              :min="1"
              label="Steps"
              hint="Number of goals for this task"
            />
          </div>
        </div>
        <q-btn color="info" label="Add Task" @click="addTask" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="flex justify-between">
        <div>
          <div class="text-lg">Daily Tasks</div>
          <div class="text-secondary">Resets in {{ dailyResetTimeText }}</div>
        </div>
        <div class="flex">
          <div class="flex flex-col">
            <q-input
              filled
              dense
              mask="##hr ##min ##sec"
              label="Reset Timer"
              placeholder="12hr 30min 42sec"
              @update:model-value="onUpdateDailyResetTime"
            />
            <div class="text-xs text-secondary m-1">
              Find your reset timer in game through tasks, shops, or your guild.
            </div>
          </div>
          <div class="ml-2">
            <q-btn
              color="info"
              label="Load Default Tasks"
              @click="onLoadDefaultTasks"
            />
          </div>
        </div>
      </div>
      <q-table
        :columns="taskTableColumns"
        :rows="tasks"
        :rows-per-page-options="[0]"
        bordered
        dense
        flat
        hide-bottom
        class="ic-table"
      >
        <template #top>
          <div class="flex flex-col w-full">
            <q-linear-progress
              stripe
              size="1.5rem"
              color="positive"
              :value="taskProgress"
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="primary"
                  text-color="white"
                  :label="`${(taskProgress * 100).toFixed(0)}% Complete`"
                />
              </div>
            </q-linear-progress>
          </div>
        </template>
        <template #body-cell-complete="props">
          <q-td>
            <div class="flex items-center">
              <q-btn
                dense
                flat
                round
                size="0.75rem"
                icon="mdi-minus"
                @click="onUpdateTask(props.rowIndex, -1)"
              />
              <div class="px-1">
                <q-knob
                  :model-value="props.row.completed"
                  :min="0"
                  :max="props.row.steps"
                  color="positive"
                  track-color="grey-7"
                  readonly
                  show-value
                >
                  <q-badge
                    >{{ props.row.completed }}/{{ props.row.steps }}</q-badge
                  >
                </q-knob>
              </div>
              <q-btn
                dense
                flat
                round
                size="0.75rem"
                icon="mdi-plus"
                @click="onUpdateTask(props.rowIndex, +1)"
              />
            </div>
          </q-td>
        </template>
        <template #body-cell-tags="props">
          <td>
            <div class="flex">
              <div
                v-for="tag in props.row.tags"
                class="bg-primary px-2 py-1 rounded uppercase font-medium"
              >
                {{ tag }}
              </div>
            </div>
          </td>
        </template>
        <template #body-cell-edit="props">
          <td>
            <Tooltip>
              <q-btn
                dense
                flat
                round
                color="negative"
                icon="mdi-delete"
                @click="removeTask(props.rowIndex)"
              ></q-btn>
              <template #content>Delete</template>
            </Tooltip>
          </td>
        </template>
        <template v-slot:body-cell="props">
          <q-td
            :props="props"
            :class="{
              'text-positive': props.row.completed === props.row.steps,
            }"
            >{{ props.value }}</q-td
          >
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="mx-4">
    <q-card-section>
      <div class="text-lg">Timers</div>
      <div class="flex justify-between items-center">
        <div class="flex w-1/2">
          <q-input
            v-model="newTimer.description"
            filled
            label="Name"
            placeholder="Collect Traps"
            class="w-1/2"
          />
          <div class="pl-4">
            <q-input
              v-model.number="newTimer.end"
              filled
              type="number"
              label="Duration (Hours)"
            />
          </div>
        </div>
        <q-btn color="info" @click="addTimer" label="Start Timer" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-list bordered separator class="rounded">
        <q-item v-for="(timer, index) in timers">
          <q-item-section class="flex justify-between">
            <div
              class="text-xl mb-1"
              :class="{ 'text-positive': currentTime > timer.end }"
            >
              {{ timer.description }}
            </div>
            <q-linear-progress
              stripe
              color="positive"
              size="1.5rem"
              :value="(currentTime - timer.start) / (timer.end - timer.start)"
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="primary"
                  text-color="white"
                  :label="getTimerText(timer)"
                />
              </div>
            </q-linear-progress>
          </q-item-section>
          <q-item-section side
            ><Tooltip>
              <q-btn
                dense
                flat
                round
                color="negative"
                icon="mdi-delete"
                @click="removeTimer(index)"
              ></q-btn>
              <template #content>Delete</template>
            </Tooltip></q-item-section
          >
        </q-item>
        <q-item v-if="timers.length === 0">
          <q-item-section>No timers created.</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import { DefaultTasks, Task, Timer } from "~/composables/Tasks";
import { Time } from "~/composables/Utilities";
import { useState } from "~/State";

dayjs.locale;
dayjs.extend(duration);
dayjs.extend(relativeTime);

const wikiLinks = new Map([
  ["Tasks", "https://idleon.info/wiki/Tasks"],
  ["Guild Tasks", "https://idleon.info/wiki/Guilds#Daily_Guild_Tasks"],
]);

export default defineComponent({
  name: "Tasks",
  setup() {
    const state = useState();
    const tasks = computed({
      get: () => state.value.tasks.tasks,
      set: (value) => (state.value.tasks.tasks = value),
    });
    const dailyReset = computed({
      get: () => state.value.tasks.dailyReset,
      set: (value) => (state.value.tasks.dailyReset = value),
    });
    const timers = computed({
      get: () => state.value.tasks.timers,
      set: (value) => (state.value.tasks.timers = value),
    });

    // Tasks
    const newTask = reactive({
      description: "",
      tags: "",
      steps: 0,
    });

    const addTask = () => {
      tasks.value.push({
        description: newTask.description,
        tags: newTask.tags ? newTask.tags.split(",").map((x) => x.trim()) : [],
        steps: newTask.steps,
        completed: 0,
        lastCompletion: 0,
      });
      newTask.description = "";
      newTask.tags = "";
      newTask.steps = 0;
    };

    const removeTask = (index: number) => {
      tasks.value.splice(index, 1);
    };

    const loadDefaultTasks = () => {
      const descriptions = tasks.value.map((t) => t.description);
      tasks.value.push(
        ...DefaultTasks.filter((x) => !descriptions.includes(x.description))
      );
    };

    const onUpdateDailyResetTime = (duration: string) => {
      const pattern = /[0-9]+/g;
      const numbers = (duration.match(pattern) ?? []).map((x) => parseInt(x));
      const resetTime = dayjs().add(
        dayjs.duration({
          hours: numbers[0],
          minutes: numbers[1],
          seconds: numbers[2],
        })
      );
      dailyReset.value = resetTime.format("HH:mm:ss");
    };

    const onUpdateTask = (index: number, delta: number) => {
      const completed = tasks.value[index].completed + delta;
      if (completed > 0) {
        tasks.value[index].lastCompletion = dayjs().valueOf();
      }
      tasks.value[index].completed = Math.max(
        Math.min(completed, tasks.value[index].steps),
        0
      );
    };

    const taskTableColumns = [
      {
        name: "complete",
      },
      {
        name: "description",
        label: "Task",
        field: (t: Task) => t.description,
      },
      {
        name: "tags",
        label: "Tags",
        field: (t: Task) => t.tags,
      },
      {
        name: "edit",
      },
    ];

    const currentTime = ref(dayjs().valueOf());
    const resetTime = ref(0);
    const tickCurrentTime = () => {
      currentTime.value = dayjs().valueOf();
      // Calculate offset from daily reset time
      const daily = dailyReset.value.split(":").map((x) => parseInt(x));
      resetTime.value = dayjs()
        .startOf("day")
        .add(
          dayjs.duration({
            hours: daily[0] ?? 0,
            minutes: daily[1] ?? 0,
            seconds: daily[2] ?? 0,
          })
        )
        .valueOf();
      // If overflows into negative value, reset time is tomorrow;
      if (resetTime.value < currentTime.value) {
        resetTime.value += Time.Day;
      }
      // Reset tasks that are completed
      for (const task of tasks.value) {
        if (resetTime.value - task.lastCompletion > Time.Day) {
          task.lastCompletion = 0;
          task.completed = 0;
        }
      }
    };

    // Timers
    const newTimer = reactive({
      description: "",
      end: 0,
    });

    const addTimer = () => {
      const resetTime = dayjs()
        .add(
          dayjs.duration({
            hours: newTimer.end,
          })
        )
        .valueOf();
      timers.value.push({
        description: newTimer.description,
        end: resetTime,
        start: currentTime.value,
      });
      newTimer.description = "";
      newTimer.end = 0;
    };

    const getTimerText = (timer: Timer): string => {
      const remainingTime = timer.end - currentTime.value;
      if (remainingTime <= 0) {
        return `Ready (${dayjs.duration(remainingTime).humanize(true)})`;
      }
      return `Ready ${dayjs.duration(remainingTime).humanize(true)}`;
    };

    const removeTimer = (index: number) => {
      timers.value.splice(index, 1);
    };

    // Computed
    const dailyResetTimeText = computed((): string => {
      return dayjs
        .duration(resetTime.value - currentTime.value)
        .format("H[h] mm[m] ss[s]");
    });

    const taskProgress = computed(() => {
      // Tasks that have all steps completed
      const tasksCompleted = tasks.value.filter(
        (task) => task.completed === task.steps
      ).length;
      return tasksCompleted / tasks.value.length;
    });

    onMounted(() => {
      // If no tasks exist, populate the task list with default tasks
      if (tasks.value.length === 0) {
        loadDefaultTasks();
      }
      // Start clock to tick timers
      tickCurrentTime();
      // Update dependencies to render time remaining
      setInterval(tickCurrentTime, 1000);
    });

    return {
      addTask,
      addTimer,
      currentTime,
      dailyReset,
      dailyResetTimeText,
      getTimerText,
      loadDefaultTasks,
      newTask,
      newTimer,
      onLoadDefaultTasks: loadDefaultTasks,
      onUpdateDailyResetTime,
      onUpdateTask,
      removeTask,
      removeTimer,
      taskProgress,
      tasks,
      taskTableColumns,
      timers,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped></style>
