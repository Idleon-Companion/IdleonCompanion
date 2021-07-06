<template>
  <div v-if="currentBuild" class="flex justify-center" id="buildContent">
    <div
      v-for="(tab, tabIndex) in currentBuild.tabs"
      :key="tabIndex"
      class="card h-auto border-secondary m-2 w-1/4"
    >
      <div class="card-header">Tab {{ tabIndex + 1 }}</div>
      <div class="talent-container p-3">
        <div
          v-for="slot in 15"
          :key="slot"
          :data-enabled="tab.skills[slot] ?? '0' !== '0'"
          class="mb-2"
        >
          <GameAsset
            :image="getTalentAsset(currentBuild, tabIndex + 1, slot)"
            :thumbnail="true"
          />
          <input
            v-model="tab.skills[slot]"
            :disabled="!editingMode"
            class="skill rounded-0 rounded-bottom"
            placeholder="0"
          />
        </div>
      </div>
      <textarea
        v-model="tab.comment"
        :disabled="!editingMode"
        :placeholder="`Comments for Tab ${tabIndex + 1}`"
        class="
          border-0
          rounded-0
          border-top border-secondary
          rounded-bottom
          card-text
        "
      >
            {{ currentBuild.tabs[tabIndex].comment }}>
      </textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GameAsset from "~/components/GameAsset.vue";
import { useBuilds } from "~/composables/Builds";

export default defineComponent({
  name: "BuildSkills",
  components: {
    GameAsset,
  },
  props: {
    editingMode: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { currentBuild, getTalentAsset } = useBuilds();

    return { currentBuild, getTalentAsset };
  },
});
</script>

<style scoped lang="sass">
@import '../styles/base.sass'
.card
  background: $primary
  color: #aaaaaa

.card-header
  background: $secondary
  color: darken(white, 10%)
  font-weight: bold

.talent-container
  display: grid
  grid-template-columns: repeat(5, 1fr)
  grid-template-rows: repeat(3, 1fr)
  gap: 3px 3px
  grid-template-areas: "....." "....." "....."

  img
    background: none
    border-bottom: 0
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

.skill
  background: $secondary
  color: $light
  text-align: center
  width: 100%
  padding: 0
</style>
