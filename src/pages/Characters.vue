<template>
  <div class="rounded">
    <h4 v-if="numCharacters === 0" class="text-light">
      You have no characters. Add new ones below!
    </h4>
    <div v-else>
      <h4 class="text-light">Edit Characters (TODO)</h4>
      <div
        v-for="(char, i) in characters"
        :key="i"
        class="col-12 col-md-6 d-flex align-items-center justify-content-between bg-primary p-2 rounded mb-1"
      >
        <CharacterCard :char="char" />
        <div class="char-delete-icon" @click="deleteCharacter(i)">
          <div class="iconify" data-icon="mdi:close"></div>
        </div>
      </div>
    </div>
    <h4 class="text-light mt-4">Add New Character</h4>
    <div class="row w-50 flex-column bg-primary m-0 p-2 rounded">
      <label for="newchar-name" class="my-2 text-light">Name</label>
      <input
        id="newchar-name"
        v-model="newChar.name"
        type="text"
        placeholder="Name"
        maxlength="14"
        class="col-6 form-control"
      />
      <label for="newchar-level" class="my-2 text-light">Level</label>
      <input
        id="newchar-level"
        v-model="newChar.level"
        type="number"
        min="1"
        placeholder="Level"
        class="col-3 form-control"
      />
      <button class="btn btn-dark col-6 mt-4" @click="addCharacter">Add</button>
    </div>
    <h4 class="text-light mt-4">
      Character Progress {{ curCharacter ? " - " + curCharacter.name : "" }}
    </h4>
    <div class="char-progress">
      <div class="col progress-tracker">
        <div
          v-for="(data, category) in charChecklist"
          :key="category"
          class="progress-group"
          id="checklist"
        >
          <div class="progress-category text-light col-12 col-md-6 my-3">
            {{ category }}
          </div>
          <div class="progress-items">
            <div v-for="(item, i) in data.items" :key="i">
              <div class="progress-item">
                <GameAsset
                  class="m-1"
                  :width="72"
                  :title="item.name"
                  :image="getItemImagePath(item.name)"
                  :enabled="
                    curCharacter !== null &&
                    curCharacter.items[item.name] === true
                  "
                  @click="handleProgressCheck(item.name)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import {
  Class,
  Character,
  Statues,
  useCharacters,
} from "../composables/Characters";
import checklistData from "../data/checklist.json";

import CharacterCard from "../components/CharacterCard.vue";
import GameAsset from "../components/GameAsset.vue";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
    GameAsset,
  },
  setup() {
    const {
      characters,
      curCharacter,
      numCharacters,
      saveCharacters,
    } = useCharacters();
    const newChar = reactive({
      name: "",
      level: 1,
    });

    const addCharacter = () => {
      if (newChar.name === "") {
        return;
      }
      let char = {
        name: newChar.name,
        level: newChar.level,
        items: {},
        statues: {},
        class: Class.Beginner,
        subclass: null,
      } as Character;
      for (const name of Statues) {
        char.statues[name] = 0;
      }
      newChar.name = "";
      newChar.level = 1;
      characters.value.push(char);
      saveCharacters();
    };

    const deleteCharacter = (i: number) => {
      characters.value.splice(i, 1);
      saveCharacters();
    };

    const charChecklist = computed(() => {
      // Global items are managed on the progress tracker/checklist page
      return Object.entries(checklistData)
        .filter(([_, value]) => !value.global)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {} as Record<string, any>);
    });

    const handleProgressCheck = (item: string) => {
      if (curCharacter.value !== null) {
        if (curCharacter.value.items[item] !== undefined) {
          curCharacter.value.items[item] = !curCharacter.value.items[item];
        } else {
          curCharacter.value.items[item] = true;
        }
        saveCharacters();
      }
    };

    return {
      addCharacter,
      characters,
      curCharacter,
      deleteCharacter,
      charChecklist,
      handleProgressCheck,
      newChar,
      numCharacters,
    };
  },
  methods: {
    getItemImagePath(item: string): string {
      let cleaned = item.replace(/ /g, "_");
      return `assets/checklist/${cleaned}.png`;
    },
  },
});
</script>

<style scoped lang="sass">
.char-delete-icon
  cursor: pointer
  font-size: 1.5rem
  transition: 0.3s
  &:hover
    color: lighten(red, 15%)
</style>
