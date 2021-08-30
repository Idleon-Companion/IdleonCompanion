<template>
  <div v-if="currentBuild" class="flex justify-evenly">
    <q-card
      flat
      bordered
      v-for="(tab, tabIndex) in currentBuild.tabs"
      v-bind:key="tab + ':' + tabIndex"
    >
      <div class="bg-purple-400 text-lg p-2">Tab {{ tabIndex + 1 }}</div>
      <q-card-section class="grid grid-cols-5 gap-2">
        <div
          v-for="slot in 15"
          class="flex flex-col bg-primary border border-gray-500 rounded-sm"
          v-bind:key="slot"
        >
          <div class="p-1">
            <ICAsset
              size="medium"
              class="bg-primary"
              :image="getTalentAsset(currentBuild, tabIndex + 1, slot)"
              :enabled="isTalentEnabled(tab.skills[slot])"
            />
          </div>
          <q-input
            v-model="tab.skills[slot]"
            filled
            square
            dense
            class="build-talent-input"
            input-class="text-center"
            placeholder="0"
          />
        </div>
      </q-card-section>

      <q-input
        v-model="tab.comment"
        type="input"
        autogrow
        filled
        class="m-4 mt-0"
        :placeholder="`Comments for Tab ${tabIndex + 1}`"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useBuilds } from "~/composables/Builds";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "BuildSkills",
  components: {
    ICAsset,
  },
  props: {
    editingMode: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { currentBuild, getTalentAsset } = useBuilds();

    const isTalentEnabled = (text?: string): boolean => {
      return ![undefined, "0", ""].includes(text);
    };

    return { currentBuild, getTalentAsset, isTalentEnabled };
  },
});
</script>

<style lang="sass">
@import '../styles/base.sass'
.build-talent-input
  width: calc(48px + 0.5rem)
  margin-top: 0.25rem
  .q-field__control
    padding: 0 !important
</style>
