<template>
  <div class="m-4 p-2">
    <div class="flex justify-center">
      <q-table
        class="ic-table"
        :columns="constellationTableColumns"
        :rows="constellations"
        :rows-per-page-options="[0]"
        virtual-scroll
        dense
        hide-bottom
      >
        <template #top>
          <div class="flex flex-col w-full">
            <div class="text-xl">Constellations</div>
            <q-linear-progress
              size="1rem"
              color="positive"
              :value="constellationProgress"
            >
              <div
                class="absolute flex justify-center w-full text-black text-xs"
              >
                {{ `${(constellationProgress * 100).toFixed(0)}%` }}
              </div>
            </q-linear-progress>
          </div>
        </template>
        <template #body-cell-complete="props">
          <q-td>
            <q-checkbox
              :model-value="
                currentCharacter?.constellations[props.row.name] ?? false
              "
              @click="toggleConstellation(props.row)"
            />
          </q-td>
        </template>
        <template #body-cell-progress="props">
          <q-td
            :class="constellationUnlocked(props.row) ? 'text-positive' : ''"
          >
            <Tooltip>
              <div class="underline">
                {{ props.value }}
              </div>
              <template #content>
                <strong>Completed</strong>
                <div
                  v-if="constellationCompletions(props.row.name).length === 0"
                >
                  None
                </div>
                <div
                  v-for="char in constellationCompletions(props.row.name)"
                  :key="char.name"
                >
                  - {{ char.name }}
                </div>
              </template>
            </Tooltip>
          </q-td>
        </template>
        <template v-slot:body-cell="props">
          <q-td
            :props="props"
            :class="constellationUnlocked(props.row) ? 'text-positive' : ''"
            >{{ props.value }}</q-td
          >
        </template>
      </q-table>
      <q-table
        class="ic-table ml-8"
        :columns="starSignTableColumns"
        :rows="allStarSigns"
        :rows-per-page-options="[0]"
        :visible-columns="['unlocked', 'equipped', 'name', 'cost']"
        virtual-scroll
        dense
        hide-bottom
      >
        <template #top>
          <div class="flex flex-col w-full">
            <div class="flex justify-between items-center">
              <div class="text-xl">Star Signs</div>
              <div>
                {{ starSignsEquipped }}/{{ starSignsEquippable }} Equipped
              </div>
            </div>
            <q-linear-progress
              size="1rem"
              color="positive"
              :value="starSignProgress"
            >
              <div
                class="absolute flex justify-center w-full text-black text-xs"
              >
                {{ `${(starSignProgress * 100).toFixed(0)}%` }}
              </div>
            </q-linear-progress>
          </div>
        </template>
        <template #body-cell-unlocked="props">
          <q-td>
            <q-checkbox
              :model-value="starSignUnlocked(props.row.id)"
              @click="toggleStarSign(props.row)"
            />
          </q-td>
        </template>
        <template #body-cell-equipped="props">
          <q-td>
            <q-checkbox
              :disable="!starSignUnlocked(props.row.id)"
              :model-value="currentCharacter?.starSigns[props.row.id] ?? false"
              @click="toggleEquipStarSign(props.row)"
            />
          </q-td>
        </template>
        <template #body-cell="props">
          <q-td
            :class="starSignUnlocked(props.row.id) ? 'text-positive' : ''"
            >{{ props.value }}</q-td
          >
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCharacters } from "~/composables/Characters";
import {
  Constellation,
  Constellations,
  StarSign,
  StarSigns,
} from "~/composables/StarSigns";
import { useState } from "~/State";

export default defineComponent({
  name: "Constellations",
  setup() {
    const { characters, currentCharacter } = useCharacters();
    const state = useState();

    // Computed
    const starSigns = computed({
      get: () => state.value.starSigns,
      set: (value) => (state.value.starSigns = value),
    });

    const starSignsEquipped = computed(() => {
      return Object.keys(currentCharacter.value?.starSigns ?? {}).length;
    });

    const starSignsEquippable = computed(() => {
      return starSigns.value["CR"] ? 2 : 1;
    });

    const constellationProgress = computed(() => {
      return (
        Constellations.filter((x) => constellationUnlocked(x)).length /
        Constellations.length
      );
    });

    const starSignProgress = computed(() => {
      return (
        StarSigns.filter((x) => starSignUnlocked(x.id)).length /
        StarSigns.length
      );
    });

    const constellationTableColumns = [
      {
        name: "complete",
      },
      {
        name: "name",
        label: "Name",
        field: (c: Constellation) => c.name,
      },
      {
        name: "progress",
        label: "Progress",
        field: (c: Constellation) =>
          `${constellationCompletions(c.name).length} / ${c.count}`,
      },
      {
        name: "area",
        label: "Area",
        field: (c: Constellation) => c.area,
      },
      {
        name: "requirement",
        label: "Requirement",
        field: (c: Constellation) => c.requirement,
      },
      {
        name: "points",
        label: "Points",
        field: (c: Constellation) => c.points,
      },
    ];

    const starSignTableColumns = [
      {
        name: "id",
        field: (s: StarSign) => s.id,
      },
      {
        name: "unlocked",
        label: "Unlocked",
      },
      {
        name: "equipped",
        label: "Equipped",
      },
      {
        name: "name",
        label: "Name",
        field: (s: StarSign) => `${s.id} - ${s.name}`,
      },
      {
        name: "cost",
        label: "Cost",
        field: (s: StarSign) => s.cost,
      },
    ];

    const constellationCompletions = (name: string) => {
      return characters.value.filter((x) => x.constellations[name] === true);
    };

    const constellationUnlocked = (c: Constellation) => {
      return constellationCompletions(c.name).length === c.count;
    };

    const toggleConstellation = (c: Constellation) => {
      if (!currentCharacter.value) {
        return;
      }
      if (currentCharacter.value.constellations[c.name]) {
        currentCharacter.value.constellations[c.name] = false;
      } else if (!constellationUnlocked(c)) {
        currentCharacter.value.constellations[c.name] = true;
      }
    };

    const starSignUnlocked = (id: string) => {
      return starSigns.value[id] ?? false;
    };

    const toggleStarSign = (s: StarSign) => {
      starSigns.value[s.id] = !starSigns.value[s.id];
    };

    const toggleEquipStarSign = (s: StarSign) => {
      if (!currentCharacter.value) {
        return;
      }
      if (currentCharacter.value.starSigns[s.id] === true) {
        delete currentCharacter.value.starSigns[s.id];
      } else if (
        starSigns.value[s.id] &&
        starSignsEquipped.value < starSignsEquippable.value
      ) {
        currentCharacter.value.starSigns[s.id] = true;
      }
    };

    return {
      allStarSigns: StarSigns,

      constellationCompletions,
      constellations: Constellations,
      constellationProgress,
      constellationTableColumns,
      constellationUnlocked,

      currentCharacter,

      starSigns,
      starSignsEquipped,
      starSignsEquippable,
      starSignTableColumns,
      starSignProgress,
      starSignUnlocked,

      toggleConstellation,
      toggleStarSign,
      toggleEquipStarSign,
    };
  },
});
</script>

<style scoped lang="sass">
@import '../../styles/base.sass'
.constellation
  background: $primary
  cursor: pointer
  transition: 0.2s
  &[data-complete='true']
    background: $success !important
  &[data-all-complete='true']
    background: darken($success, 15%) !important
    opacity: 0.8
    cursor: default
.star-sign
  border: 1px solid $primary
  cursor: pointer
  width: 9rem
  transition: 0.2s
  &:hover
    background: lighten($primary, 5%)
  &[data-unlocked='false']
    background: none
  &[data-unlocked='true']
    border-color: transparent
    background: $primary
  [data-equipped='true']
    background: $indigo
</style>
