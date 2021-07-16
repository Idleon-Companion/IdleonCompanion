<template>
  <q-banner inline-actions>
    Create/edit your characters! Track your character skill progress, inventory
    upgrades, star signs, and more.
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
  <q-card v-if="curCharacter === null">
    <div>
      You have no characters. Create your first character or load your data from
      the cloud!
    </div>
    <q-btn @click="newCharacter">New Character</q-btn>
  </q-card>
  <CharacterEditor v-else />
  <div class="flex items-start justify-around">
    <q-expansion-item
      label="Inventory Bags"
      class="bg-blue-400 mx-4 rounded w-1/3 font-medium"
    >
      <div class="flex flex-wrap">
        <q-card>
          <ICAsset
            v-for="item in charChecklist['Inventory Bags'].items"
            class="m-1"
            :enabled="isEnabled(item.name)"
            :image="Assets.FromDir(item.name, 'checklist')"
            @click.stop="handleProgressCheck(item.name, +1)"
          />
        </q-card>
      </div>
    </q-expansion-item>
    <q-expansion-item
      label="Capacity Pouches"
      class="bg-blue-400 mx-4 rounded w-1/3 font-medium"
    >
      <q-card>Hi</q-card>
    </q-expansion-item>
  </div>
</template>
<!-- <div class="row">
    <div class="char-progress">
      <h4 class="text-light mt-4">Character Progress</h4>
      <div class="row progress-tracker">
        <div
          v-for="(data, category) in charChecklist"
          :key="category"
          class="progress-group col-lg mb-4"
          id="checklist"
        >
          <div class="progress-category text-light my-3">
            {{ category }}
          </div>
          <div class="progress-items">
            <div v-for="(item, i) in data.items" :key="i">
              <div class="progress-item">
                <GameAsset
                  v-if="
                    !item.cycle ||
                    cycleIndex(item.cycle) ===
                      cycles[item.cycle].indexOf(item.name)
                  "
                  class="m-1"
                  :width="72"
                  :title="item.name"
                  :image="Assets.FromDir(item.name, data.assetDir)"
                  :enabled="isEnabled(item.name)"
                  @click="handleProgressCheck(item.name, +1)"
                  @contextmenu.prevent="handleProgressCheck(item.name, -1)"
                >
                  <template #tooltip>
                    <div class="text-center" v-html="Text.Item(item)"></div>
                  </template>
                </GameAsset>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StatuesSection />
      <Constellations />
    </div>
  </div> -->

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useToast } from "vue-toastification";

import CharacterCard from "~/components/CharacterCard.vue";
import CharacterEditor from "~/components/characters/CharacterEditor.vue";
import CloudData from "~/components/CloudData.vue";
import Constellations from "~/components/Constellations.vue";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";
import {
  Character,
  Class,
  Skills,
  Subclass,
  useCharacters,
} from "~/composables/Characters";
import { Statues } from "~/composables/Statues";
import { Assets, Text, ItemGroup } from "~/composables/Utilities";
import { checklistData } from "~/composables/Checklist";
import StatuesSection from "~/pages/Statues.vue";
import { useAuth } from "~/State";

const WikiLinks = new Map([
  ["Classes", "https://idleon.miraheze.org/wiki/Classes"],
  ["Skills", "https://idleon.miraheze.org/wiki/Skills"],
  ["Items", "https://idleon.miraheze.org/wiki/Items"],
  ["Star Signs", "https://idleon.miraheze.org/wiki/Star_Signs"],
]);

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
    CharacterEditor,
    CloudData,
    Constellations,
    ICAsset,
    StatuesSection,
  },
  setup() {
    const { user } = useAuth();
    const { characters, charIndex, curCharacter, numCharacters } =
      useCharacters();
    const toast = useToast();
    // Filter out class "All"
    const classes = [];
    for (const class_ in Class) {
      if (class_ !== Class.All) {
        classes.push(class_);
      }
    }

    const newCharacter = () => {
      let char = new Character();
      for (const skill of Skills) {
        char.skills[skill] = 0;
      }
      for (const name of Object.keys(Statues)) {
        char.statues[name] = 0;
      }
      characters.value.push(char);
      charIndex.value = characters.value.length - 1;
      toast.info("New character created.");
    };
    const deleteCharacter = () => {
      characters.value.splice(charIndex.value, 1);
      charIndex.value = 0;
    };

    const totalCharLevel = computed<number>(() => {
      let total = 0;
      for (const c of characters.value) {
        if (typeof c.level === "string") {
          total += parseInt(c.level);
        } else {
          total += c.level;
        }
      }
      return total;
    });

    const charChecklist = Object.entries(checklistData)
      .filter(([_, value]) => !value.global)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Record<string, ItemGroup>);

    type CycleData = Record<string, string[]>;
    var cycles: CycleData = {};
    var itemCycle: Record<string, string> = {};
    for (const data of Object.values(charChecklist)) {
      for (const item of data.items) {
        if (item.cycle !== undefined) {
          itemCycle[item.name] = item.cycle;
          if (item.cycle in cycles) {
            cycles[item.cycle].push(item.name);
          } else {
            cycles[item.cycle] = [item.name];
          }
        }
      }
    }

    const isEnabled = (name: string): boolean => {
      // Item is selected
      return (
        curCharacter.value !== null && curCharacter.value.items[name] === true
      );
    };

    const cycleIndex = (cycle: string): number => {
      if (curCharacter.value === null) {
        return 0;
      }
      for (const item of cycles[cycle]) {
        if (curCharacter.value.items[item] === true) {
          return cycles[cycle].indexOf(item);
        }
      }
      return 0;
    };

    const handleProgressCheck = (item: string, cycle: number) => {
      if (curCharacter.value !== null) {
        // Cyclical items
        if (itemCycle[item] !== undefined) {
          let hasBag = curCharacter.value.items[item];
          delete curCharacter.value.items[item];
          let c = cycles[itemCycle[item]];
          if (cycle === 1 && !hasBag) {
            cycle = 0;
          }
          let i = c.indexOf(item) + cycle;
          let state = true;
          if (i >= c.length) {
            i = 0;
            state = false;
          } else if (i < 0) {
            if (hasBag) {
              i = 0;
              state = false;
            } else {
              i = c.length - 1;
            }
          }
          if (state) {
            curCharacter.value.items[c[i]] = true;
          }
        } else {
          // Normal items
          if (curCharacter.value.items[item] !== undefined) {
            curCharacter.value.items[item] = !curCharacter.value.items[item];
          } else {
            curCharacter.value.items[item] = true;
          }
        }
      }
    };

    return {
      Assets,
      characters,
      charIndex,
      charChecklist,
      classes,
      curCharacter,
      cycles,
      cycleIndex,
      deleteCharacter,
      handleProgressCheck,
      isEnabled,
      newCharacter,
      numCharacters,
      Subclass,
      Text,
      totalCharLevel,
      user,
      wikiLinks: WikiLinks,
    };
  },
});
</script>

<style scoped lang="sass">
@import '../styles/base.sass'
.char-delete-btn
  background: darken($red, 25%)
  color: white
  &:hover
    background: darken($red, 20%)
    color: white
.char-delete-icon
  cursor: pointer
  font-size: 1.5rem
  transition: 0.3s
  &:hover
    color: lighten(red, 15%)
.char-editor
  label
    color: darken(white, 15%)
    font-size: 1.15rem
    font-weight: bold
    margin: 0.1rem 0
  .char-class-img
    border-radius: 50%
    cursor: pointer
    height: 5rem
    width: 5rem
    padding: 0.25rem
    object-fit: contain
    transition: 0.3s
    &:hover
      transform: scale(1.1)
      background: rgba(white, 0.05)
  .char-input
    &.skill-input
      width: 5rem
  .char-skill-img
    width: 2rem
    object-fit: contain
.char-class-close
  color: white
.total-level
  color: darken(white, 10%)
  font-weight: 600
  font-size: 0.9rem
  margin-top: 0.25rem
</style>
