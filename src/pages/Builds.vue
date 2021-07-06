<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Browse through our list of suggested builds, filtered by character
        class.
      </p>
    </div>
  </div>
  <div class="flex justify-between my-3 w-full">
    <div class="flex w-full">
      <div class="input-group">
        <span class="input-group-text">Class</span>
        <select v-model="buildClass" class="bg-primary" id="buildClass">
          <option v-for="(c, v) in classes" :key="c" :value="c">
            {{ v }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <span class="input-group-text">Subclass</span>
        <select v-model="buildSubclass" class="bg-primary" id="buildClass">
          <option value=""></option>
          <option v-for="(c, v) in subclasses" :key="c" :value="c">
            {{ v }}
          </option>
        </select>
      </div>
    </div>
    <div class="input-group">
      <span class="input-group-text bg-dark text-light">Build</span>
      <select
        v-model="showcaseBuildIndex"
        @change="
          loadBuildFromShowcase(showcaseBuildIndex);
          editingMode = false;
        "
        class="bg-primary w-2/3"
        id="buildSelector"
      >
        <option
          v-for="(build, i) in filteredBuilds"
          :key="build.title"
          :value="i"
        >
          {{ build.title }}
        </option>
      </select>
    </div>
  </div>

  <div class="flex my-2">
    <button
      class="bg-dark px-3 py-2 rounded"
      @click="
        createNewBuild(buildClass, buildSubclass);
        editingMode = true;
      "
    >
      Create New Build
    </button>
    <input
      v-if="currentBuild && editingMode"
      v-model="currentBuild.title"
      placeholder="Build Name"
      class="mx-2"
    />
  </div>

  <BuildSkills :editingMode="editingMode" />
  <div
    v-if="currentBuild || editingMode"
    class="flex items-center bg-primary border border-secondary rounded mt-4"
  >
    <textarea
      :value="currentBuild?.notes"
      :disabled="!editingMode"
      placeholder="Notes about your perfect build."
      class="text-light w-full resize border-0"
      id="notes"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";

import BuildSkills from "~/components/BuildSkills.vue";
import GameAsset from "~/components/GameAsset.vue";
import { useBuilds, Build } from "~/composables/Builds";
import { Class, Subclass, useCharacters } from "~/composables/Characters";

export default defineComponent({
  name: "Builds",
  components: {
    BuildSkills,
    GameAsset,
  },
  setup() {
    const { builds, createNewBuild, currentBuild, loadBuildFromShowcase } =
      useBuilds();
    const { curCharacter } = useCharacters();
    // Refs
    const buildClass = ref<Class>(Class.All);
    const buildSubclass = ref<Subclass | null>(null);
    const editingMode = ref(false);
    const showcaseBuildIndex = ref(-1);

    // Hooks
    onBeforeMount(() => {
      if (curCharacter.value) {
        buildClass.value = curCharacter.value.class;
        buildSubclass.value = curCharacter.value.subclass;
      }
    });

    const filteredBuilds = computed(() => {
      let filtered: Build[] = [];
      if (buildClass.value === Class.All) {
        return builds;
      }
      for (const build of builds) {
        if (build.class === buildClass.value) {
          if (buildSubclass.value && buildSubclass.value !== build.subclass) {
            continue;
          }
          filtered.push(build);
        }
      }
      return filtered;
    });

    return {
      buildClass,
      buildSubclass,
      createNewBuild,
      currentBuild,
      classes: Class,
      editingMode,
      filteredBuilds,
      loadBuildFromShowcase,
      showcaseBuildIndex,
      subclasses: Subclass,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
</style>
