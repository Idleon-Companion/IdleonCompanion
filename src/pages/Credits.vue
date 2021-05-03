<template>
  <div class="text-light">
    <div class="row">
      <iframe
        src="https://discord.com/widget?id=829063242227777566&theme=dark"
        height="320"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        :allowtransparency="true"
        :frameborder="0"
      ></iframe>
      <div class="col">
        <h2 class="display-4 text-left">Credits</h2>
        <hr />
        <p>
          Idleon Companion is open-source and you can find the code
          <a href="https://github.com/Musimaniac/IdleonCompanion">here</a>.
        </p>
        <p>Thanks to the website contributors:</p>
        <ul>
          <li><a href="https://github.com/Musimaniac">Musimaniac#7620</a></li>
          <li><a href="https://github.com/adapap">adapap#1045</a></li>
          <li><a href="https://github.com/pabhd3">pabhd3#0802</a></li>
          <li><a href="https://github.com/njubainville">Nymiir#5439</a></li>
        </ul>
        <p>
          Thanks to everyone else involved on the Idleon Companion Development
          team:
        </p>
        <ul>
          <li>100mar#2993, for feedback and complex game calculations</li>
          <li>Itsui#0043, for work on Idleon Interactive + feedback</li>
          <li>Mark#4874, for working on a comprehensive Idleon guide</li>
          <li>
            Urist#2904, for checking in with us during brutal exam periods
          </li>
          <li>Hateling#7191, for the original Idleon Toolbox</li>
          <li>abgreyd#0283, for his original 101 builds</li>
          <li>Sillebuc#0036 + Keloku#0956, for their work on the builds</li>
        </ul>

        <p>
          To the <a href="https://idleon.info">Idleon Wiki</a> team, for their
          never-ending contribution to the community.
        </p>
        <p class="text-danger">
          As always, thanks to <strong>LavaFlame2</strong> for another great
          game, and for all the assets and informations used in this website.
          <a href="https://www.legendsofidleon.com/"
            >Go play Legends of Idleon</a
          >
        </p>
        <hr />
        <p class="text-info">
          For info or suggestions, write at
          <a href="mailto: webmaster@idleoncompanion.com"
            >webmaster@idleoncompanion.com</a
          >, or shoot me a pm on Discord
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <h2 class="display-5">Changelog</h2>
        <div id="changelog">
          <div v-for="(entry, i) in entries" :key="i">
            <hr />
            <h4 class="text-light">{{ entry.version }} | {{ entry.date }}</h4>
            <div v-if="entry.changes.features">
              <div class="changelog-header text-success">Features</div>
              <li
                v-for="(text, j) in entry.changes.features"
                :key="j"
                class="changelog-entry"
              >
                {{ text }}
              </li>
            </div>
            <div v-if="entry.changes.changes">
              <div class="changelog-header text-info">Changes</div>
              <li
                v-for="(text, j) in entry.changes.changes"
                :key="j"
                class="changelog-entry"
              >
                {{ text }}
              </li>
            </div>
            <div v-if="entry.changes.fixes">
              <div class="changelog-header text-danger">Fixes</div>
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
              They always say time changes things, but you actually have to
              change them yourself.
            </p>
          </blockquote>
          <figcaption class="blockquote-footer">Andy Warhol</figcaption>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { Changelog } from "~/Changelog";

export default defineComponent({
  name: "Credits",
  setup() {
    const entries = computed(() => {
      return Changelog.reverse();
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
  font-size: 1.5rem
  font-weight: bold
  letter-spacing: 0.1rem
  margin-top: 0.5rem
  text-transform: uppercase
.changelog-entry
  margin: 0.1rem 0
  text-decoration: bull
</style>
