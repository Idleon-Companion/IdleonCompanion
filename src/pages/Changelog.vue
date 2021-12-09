<template>
  <q-card class="m-4 font-light">
    <div class="flex m-4">
      <iframe
        src="https://discord.com/widget?id=829063242227777566&theme=dark"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        class="my-4"
        :allowtransparency="true"
        :frameborder="0"
      ></iframe>
      <div class="flex flex-col ml-4 mt-4">
        <h2 class="text-2xl text-left mb-2">Credits</h2>
        <q-separator />
        <p class="mt-2">
          Idleon Companion is open-source and you can find the code
          <a href="https://github.com/Musimaniac/IdleonCompanion">here</a>.
        </p>
        <div>Thanks to the website contributors:</div>
        <ul class="ml-2 mb-2">
          <li><a href="https://github.com/Musimaniac">Musimaniac#7620</a></li>
          <li><a href="https://github.com/adapap">adapap#1045</a></li>
          <li><a href="https://github.com/pabhd3">pabhd3#0802</a></li>
          <li><a href="https://github.com/njubainville">Nymiir#5439</a></li>
          <li><a href="https://github.com/100mars">100mar#2993</a></li>
        </ul>
        <div>
          Thanks to everyone involved on the Idleon Companion Development team:
        </div>
        <ul class="text-sm ml-2 mb-2">
          <li>Itsui#0043, for work on Idleon Interactive + feedback</li>
          <li>Mark#4874, for working on a comprehensive Idleon guide</li>
          <li>
            Urist#2904, for checking in with us during brutal exam periods
          </li>
          <li>Hateling#7191, for the original Idleon Toolbox</li>
          <li>abgreyd#0283, for his original 101 builds</li>
          <li>Sillebuc#0036 + Keloku#0956, for their work on the builds</li>
          <li>
            harold#7682 + wekhter#6624 + ItsPandatory#7070, for helping create
            cardsets/builds for W3
          </li>
        </ul>

        <p>
          To the <a href="https://idleon.info">Idleon Wiki</a> team, for their
          never-ending contribution to the community.
        </p>
        <p>
          As always, thanks to
          <strong class="text-negative">LavaFlame2</strong> for another great
          game, and for all the assets and informations used in this website.
        </p>
        <a href="https://www.legendsofidleon.com/"
          >Go play Legends of Idleon!</a
        >
        <q-separator />
        <p class="text-sm">
          For info or suggestions, write at
          <a href="mailto: webmaster@idleoncompanion.com"
            >webmaster@idleoncompanion.com</a
          >, or shoot me a pm on Discord
        </p>
      </div>
    </div>
  </q-card>
  <q-card class="m-4">
    <div class="flex flex-col p-4">
      <h2 class="text-4xl">Changelog</h2>
      <div v-for="(entry, i) in entries" :key="i" class="mt-4">
        <q-separator />
        <h5 class="text-light mt-2">{{ entry.version }} | {{ entry.date }}</h5>
        <div v-if="entry.changes.features">
          <div class="changelog-header bg-positive">Features</div>
          <li
            v-for="(text, j) in entry.changes.features"
            :key="j"
            class="changelog-entry"
          >
            {{ text }}
          </li>
        </div>
        <div v-if="entry.changes.changes">
          <div class="changelog-header bg-info">Changes</div>
          <li
            v-for="(text, j) in entry.changes.changes"
            :key="j"
            class="changelog-entry"
          >
            {{ text }}
          </li>
        </div>
        <div v-if="entry.changes.fixes">
          <div class="changelog-header bg-negative">Fixes</div>
          <li
            v-for="(text, j) in entry.changes.fixes"
            :key="j"
            class="changelog-entry"
          >
            {{ text }}
          </li>
        </div>
      </div>
      <blockquote class="blockquote mt-3">
        <p class="lead mb-0">
          They always say time changes things, but you actually have to change
          them yourself.
        </p>
      </blockquote>
      <figcaption class="blockquote-footer">Andy Warhol</figcaption>
    </div>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { Changelog } from "~/Changelog";

export default defineComponent({
  name: "Changelog",
  setup() {
    const entries = computed(() => {
      return [...Changelog].reverse();
    });
    return { entries };
  },
});
</script>

<style lang="sass" scoped>
@import '../styles/base.sass'
a
  color: lighten($info, 10%)
  font-weight: bold
  transition: 0.3s
  &:hover
    color: darken($info, 10%)
.changelog-header
  letter-spacing: 0.1rem
  @apply my-1 p-2 font-medium uppercase rounded inline-block
.changelog-entry
  @apply my-1
</style>
