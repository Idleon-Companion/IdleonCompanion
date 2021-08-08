<template>
  <q-banner inline-actions>
    Track your statue levels, golden progress, and see calculated costs and
    bonuses.
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
  <q-card class="m-4 p-4">
    <div class="text-2xl">Statues</div>
    <div class="mt-2 mx-auto md:w-[80%]">
      <q-markup-table separator="cell" bordered>
        <thead>
          <tr>
            <th
              class="bg-primary"
              v-for="header in [
                'Statue',
                'Level',
                'Statues to Next Level',
                'Golden',
                'Bonus',
              ]"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(statue, name) in statues"
            class="text-center"
            :class="{ 'text-yellow-400': statue.golden }"
          >
            <td>
              <Tooltip>
                <q-img width="48px" :src="Assets.StatueImage(name)" />
                <template #content> {{ name }} Statue </template>
              </Tooltip>
            </td>
            <td class="m-4 md:w-1/5">
              <q-input
                v-model.number="statue.level"
                type="number"
                :min="0"
                filled
              />
            </td>
            <td class="md:w-1/5">
              <div class="mx-[20%]">
                <q-input
                  v-model.number="statue.progress"
                  type="number"
                  :min="0"
                  :max="costToNextLevel(name)"
                  :suffix="` / ${costToNextLevel(name)}`"
                  filled
                  input-class="text-right"
                />
              </div>
            </td>
            <td>
              <q-checkbox v-model="statue.golden" color="yellow-500" />
            </td>
            <td class="md:w/1-3 text-left">{{ bonusText(name) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { Assets } from "~/composables/Utilities";
import { StatueName, Statues } from "~/composables/Statues";
import { useState } from "~/State";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

const wikiLinks = new Map([
  ["Statues", "https://idleon.miraheze.org/wiki/Statues"],
]);

export default defineComponent({
  name: "Statues",
  components: {
    ICAsset,
  },
  setup() {
    const state = useState();

    const statues = computed({
      get: () => state.value.statues,
      set: (value) => (state.value.statues = value),
    });

    const bonusText = (statue: string) => {
      let statueInfo = statues.value[statue as StatueName];
      let data = Statues[statue as StatueName];
      let effect = data.effect as string;
      if (!effect.startsWith("%")) {
        effect = " " + effect;
      }
      return `+${Number((data.base * statueInfo.level).toFixed(2))}${effect}`;
    };

    const costToNextLevel = (statue: string): number => {
      const currentLevel = statues.value[statue as StatueName].level;
      return Math.round(Math.pow(currentLevel, 1.35) + 1);
    };

    return {
      allStatues: Statues,
      Assets,
      bonusText,
      costToNextLevel,
      statues,
      wikiLinks,
    };
  },
});
</script>

<style lang="sass" scoped>
@import '../../styles/base.sass'

.statue-wrapper
  display: flex
  flex-direction: column
.statue-level-badge
  text-align: center
  background: $primary
  border-radius: 5rem
  margin: 0 auto
  margin-top: 0.25rem
  width: 75%
.statue-info
  align-items: center
  background: $primary
  border-radius: 5px
  color: darken(white, 5%)
  display: flex
  flex-direction: column
  justify-content: center
  margin-top: 2rem
  padding: 1.5rem
  .statue-name
    font-size: 2rem
    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2)
  .statue-level-text
    font-size: 1.5rem
  .statue-level
    background: rgba(150,150,150,0.2)
    color: white
    border: none
    border-radius: 3px
    margin: 0 0.5rem
    outline: none
    padding: 0.15rem
    text-align: center
    width: 25%
.statue-buffs
  background: $primary
  padding: 1.5rem
.statue-list
  display: flex
  flex-wrap: wrap
  @media (max-width: 768px)
    justify-content: center

  .statue
    border-radius: 50%
    color: white
    cursor: pointer
    padding: 1rem
    width: 96px
    height: 96px
    transition: 0.3s
    img
      width: 72px
      height: 72px
      margin-top: -12px
      margin-left: -4px
      object-fit: contain
    &:hover
      transform: scale(1.20)
    &[data-active='true']
      background: rgba(white, 0.2)
</style>
