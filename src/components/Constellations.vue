<template>
  <div class="h4 text-white mt-4 text-2xl">Constellations / Star Signs</div>
  <div class="d-flex jumbotron">
    <div class="w-50">
      <div
        v-for="(constellation, i) in constellations"
        :key="i"
        class="constellation d-flex p-2 bg-primary text-light mb-1 rounded-1"
      >
        <div class="constellation-name">{{ constellation.name }}</div>
        <div class="constellation-area ms-2">{{ constellation.area }}</div>
      </div>
    </div>
    <div class="w-50 ms-4">
      <div
        v-for="(starSign, i) in starSigns"
        :key="i"
        class="
          star-sign
          d-flex
          align-items-center
          p-2
          bg-primary
          text-light
          mb-1
          rounded-1
        "
      >
        <input :v-model="true" type="checkbox" class="mt-1 me-1" />
        <div class="star-sign-name">
          ({{ starSign.id }}) {{ starSign.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Constellations, StarSigns } from "~/composables/StarSigns";
import { useState } from "~/State";

export default defineComponent({
  name: "Constellations",
  setup() {
    return {
      constellations: Constellations,
      starSigns: StarSigns,
    };
  },
});
</script>

<style scoped lang="sass"></style>
