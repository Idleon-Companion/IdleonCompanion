<template>
  <q-card flat square>
    <div class="p-2 flex items-center bg-primary">
      <ICAsset :image="Assets.CharImage(character)" />
      <div class="flex flex-col ml-2">
        <div class="flex items-center">
          <div class="text-lg overflow-ellipsis w-50 overflow-hidden">
            {{ character.name || "No Name" }}
          </div>
        </div>
        <div class="flex items-center my-1">
          <div class="bg-purple-400 px-1 font-bold rounded-sm">
            Lv. {{ character.level }}
          </div>
          <div class="flex items-center text-xl mx-1">
            <q-icon :name="'img:' + Assets.IconImage(character.class)" />
          </div>
          <div class="text-xs font-medium uppercase opacity-90">
            {{ character.class }}
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center">
            <q-icon name="mdi-sack" />
            <div class="ml-1">
              {{ character.bagSlots }}
            </div>
          </div>
          <div class="flex">
            <ICAsset
              v-for="(skill, i) in topSkills"
              :key="i"
              :title="skill"
              :image="Assets.IconImage(skill)"
              size="xs"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Assets } from "~/composables/Utilities";
import { Character, Skills, useCharacters } from "~/composables/Characters";
import { PropType, computed, defineComponent } from "vue";
import ICAsset from "~/components/idleon-companion/IC-Asset.vue";

export default defineComponent({
  name: "CharacterCard",
  components: {
    ICAsset,
  },
  props: {
    character: {
      required: true,
      type: Object as PropType<Character>,
    },
    detailed: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    const { characters } = useCharacters();

    const topSkills = computed(() => {
      let top = [];
      for (const skill of Skills) {
        let best = props.character.skills[skill] > 0;
        for (const c of characters.value) {
          if (c.skills[skill] > props.character.skills[skill]) {
            best = false;
            break;
          }
        }
        if (best) {
          top.push(skill);
        }
      }
      return top.slice(0, 3);
    });

    return {
      Assets,
      topSkills,
    };
  },
});
</script>

<style scoped lang="sass"></style>
