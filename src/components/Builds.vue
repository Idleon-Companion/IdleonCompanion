<template>
  <div class="jumbotron">
    <div class="row pl-3 mb-4">
      <div class="form-group">
        <select v-model="build" class="custom-select" id="buildSelector">
          <option value="" selected>Select Your Build</option>
          <option
            v-for="(build, buildID) in builds"
            :key="buildID"
            :value="buildID"
          >
            {{ build.title }}
          </option>
        </select>
      </div>
    </div>
    <!-- TALENTS -->
    <div v-if="build" class="row justify-content-center" id="buildContent">
      <div class="col-xl-4" style="max-width: 400px">
        <div class="card border-primary mb-2">
          <div class="card-header">Tab 1</div>
          <div class="card-body talent-container p-2" id="skill_tab_one">
            <div v-for="i in 10" :key="i" class="bs-component disabled">
              <img
                :src="getTalentImagePath('all', 1, i)"
                class="img-fuid img-thumbnail"
              />
              <p
                class="text-light text-center bg-secondary border rounded skill m-0"
              >
                {{ activeBuild.tab_one[i] }}
              </p>
            </div>
            <div v-for="i in 5" :key="i" class="bs-component disabled">
              <img
                :src="getTalentImagePath(activeBuild.class, 1, i)"
                class="img-fuid img-thumbnail"
              />
              <p
                class="text-light text-center bg-secondary border rounded skill m-0"
              >
                {{ activeBuild.tab_one[i + 10] }}
              </p>
            </div>
          </div>
          <div class="card-body border border-secondary rounded">
            <p class="card-text">{{ activeBuild.comments_one }}</p>
          </div>
        </div>
      </div>
      <div v-if="activeBuild.class" class="col-xl-4" style="max-width: 400px">
        <div class="card border-primary mb-2">
          <div class="card-header">Tab 2</div>
          <div class="card-body talent-container p-2" id="skill_tab_one">
            <div v-for="i in 15" :key="i" class="bs-component disabled">
              <img
                :src="getTalentImagePath(activeBuild.class, 2, i)"
                class="img-fuid img-thumbnail"
              />
              <p
                class="text-light text-center bg-secondary border rounded skill m-0"
              >
                {{ activeBuild.tab_two[i] }}
              </p>
            </div>
          </div>
          <div class="card-body border border-secondary rounded">
            <p class="card-text">{{ activeBuild.comments_two }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="activeBuild.subclass"
        class="col-xl-4"
        style="max-width: 400px"
      >
        <div class="card border-primary mb-2">
          <div class="card-header">Tab 3</div>
          <div class="card-body talent-container p-2" id="skill_tab_one">
            <div v-for="i in 15" :key="i" class="bs-component disabled">
              <img
                :src="getTalentImagePath(activeBuild.subclass, 3, i)"
                class="img-fuid img-thumbnail"
              />
              <p
                class="text-light text-center bg-secondary border rounded skill m-0"
              >
                {{ activeBuild.tab_three[i] }}
              </p>
            </div>
          </div>
          <div class="card-body border border-secondary rounded">
            <p class="card-text">{{ activeBuild.comments_three }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- NOTES -->
    <div v-if="build" class="row">
      <div class="col-xl-12 mt-4">
        <div class="card border-light">
          <div class="card-body">
            <p class="card-text" id="notes">{{ activeBuild.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import buildData from "../data/builds.json";

export default defineComponent({
  name: "Builds",
  setup() {
    const builds: Record<string, object> = buildData;
    const build = ref("");
    const activeBuild = computed(() => {
      if (build.value === "") {
        return {};
      }
      return builds[build.value];
    });

    return {
      activeBuild,
      build,
      builds,
    };
  },
  methods: {
    getTalentImagePath(role: string, tab: number, slot: number): string {
      let image = `${role}-${tab}-${slot}`;
      if (role === "") {
        image = "empty";
      }
      if (role === "sqr" && slot < 15 && slot >= 11) {
        image = "sqr-filler";
      }
      if (role === "hun" && slot < 15 && slot >= 11) {
        image = "hun-filler";
      }
      return `assets/talents/${image}.png`;
    },
  },
});
</script>
