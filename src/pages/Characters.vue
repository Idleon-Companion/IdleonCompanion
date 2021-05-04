<template>
  <div class="row ">
    <div>
    <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        In this tab you can create, modify and manage all your characters. Keep track of individual stats like statues, pouches and inventory slots. 
        <br/>Switch between all of your created characters using the "Switch character" menu in the top-right of the page.
    </p>
    </div>
  </div>
  <div  class="row justify-content-center" v-if="curCharacter === null">
    <h4 class="text-light d-flex justify-content-center">
      You have no characters. Add new ones below!
    </h4>
    <button class="btn-lg btn-dark mt-2 w-25" @click="newCharacter">
      <div class="iconify" data-icon="mdi-plus"></div>
      New Character
    </button>
  </div>
    <div v-else>
      <div class="char-editor bg-primary p-3 rounded">
        <div class="d-flex justify-content-between">
          <h2 class="text-light">Editing {{ curCharacter.name || "No Name" }}</h2>
          <div class="btn-group">
            <button class="btn btn-dark" @click="newCharacter">
              <div class="iconify" data-icon="mdi-plus"></div>
              New Character
            </button>
            <button class="btn char-delete-btn" @click="deleteCharacter">
              Delete
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <img
            class="char-class-img border border-secondary me-3"
            :src="Assets.CharImage(curCharacter)"
            data-bs-toggle="modal"
            data-bs-target="#char-class-selector"
          />
          <div
            id="char-class-selector"
            class="modal fade"
            tabindex="-1"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
              <div class="modal-content bg-primary">
                <div class="modal-header">
                  <h5 class="modal-title text-light">
                    Select Character Class/Subclass
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="d-flex flex-wrap modal-body">
                  <GameAsset
                    v-for="(class_, i) in Class"
                    :key="i"
                    :image="Assets.ClassImage(class_)"
                    :height="72"
                    :width="72"
                    :title="class_"
                    class="char-class-img m-1"
                    @click="setClass(class_)"
                  />
                  <GameAsset
                    v-for="(subclass, i) in Subclass"
                    :key="i"
                    :image="Assets.ClassImage(subclass)"
                    :height="72"
                    :width="72"
                    :title="subclass"
                    class="char-class-img m-1"
                    @click="setClass(subclass)"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <label for="char-name">Name</label>
            <input
              id="char-name"
              class="char-input"
              type="text"
              spellcheck="false"
              placeholder="Name"
              :maxlength="14"
              v-model="curCharacter.name"
              @change="saveCharacters"
            />
            <label for="char-level">Level</label>
            <input
              id="char-level"
              class="char-input"
              type="number"
              :min="1"
              v-model="curCharacter.level"
              @change="saveCharacters"
            />
          </div>
          <div class="d-flex flex-wrap flex-column ms-2">
            <label>Skills</label>
            <div
              v-for="(level, skill) in curCharacter.skills"
              :key="skill"
              class="char-skill mb-1"
            >
              <GameAsset
                class="char-skill-img me-2"
                :image="Assets.IconImage(skill)"
                :title="skill"
              />
              <input
                :id="'char-skill-' + skill"
                class="char-input skill-input"
                type="number"
                :min="0"
                v-model="curCharacter.skills[skill]"
                @change="saveCharacters"
              />
            </div>
          </div>
        </div>
      </div>
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <statues-section />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CharacterCard from "~/components/CharacterCard.vue";
import GameAsset from "~/components/GameAsset.vue";
import {
  Class,
  Character,
  Skills,
  Subclass,
  useCharacters,
} from "~/composables/Characters";
import { Statues } from "~/composables/Statues";
import { Assets } from "~/composables/Utilities";
import checklistData from "~/data/checklist.json";
import StatuesSection from "~/pages/Statues.vue";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
    GameAsset,
    StatuesSection,
  },
  setup() {
    const {
      characters,
      charIndex,
      curCharacter,
      numCharacters,
      saveCharacters,
      setClass,
    } = useCharacters();
    const newCharacter = () => {
      let char = {
        name: "",
        level: 1,
        items: {},
        skills: {},
        statues: {},
        class: Class.Beginner,
        subclass: null,
      } as Character;
      for (const skill of Skills) {
        char.skills[skill] = 0;
      }
      for (const name of Object.keys(Statues)) {
        char.statues[name] = 0;
      }
      characters.value.push(char);
      charIndex.value = characters.value.length - 1;
      saveCharacters();
    };
    const deleteCharacter = () => {
      characters.value.splice(charIndex.value, 1);
      charIndex.value = 0;
      saveCharacters();
    };

    const charChecklist = Object.entries(checklistData)
      .filter(([_, value]) => !value.global)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Record<string, any>);

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
        saveCharacters();
      }
    };
    return {
      Assets,
      characters,
      charIndex,
      Class,
      curCharacter,
      cycles,
      cycleIndex,
      deleteCharacter,
      charChecklist,
      handleProgressCheck,
      isEnabled,
      newCharacter,
      numCharacters,
      saveCharacters,
      setClass,
      Subclass,
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
 
</style>
