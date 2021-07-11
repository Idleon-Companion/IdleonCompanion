<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar :class="toolbarClasses">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.svg" />
          </q-avatar>
          Idleon Companion
        </q-toolbar-title>

        <q-btn dense flat round icon="mdi-menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <LeftDrawerNavigation />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- TODO: Move to component -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/auth";
import { useQuasar } from "quasar";
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  watchEffect,
} from "vue";

import LeftDrawerContent from "~/components/nav/LeftDrawerContent.vue";
import RightDrawerContent from "~/components/nav/RightDrawerContent.vue";
import { useCharacters } from "~/composables/Characters";
import { useLayout } from "~/composables/Utilities";
import { firebaseApp, versionControl, useState } from "~/State";

import "~/styles/base.sass";

export default defineComponent({
  name: "App",
  components: {
    Home,
    LeftDrawerNavigation,
  },
  setup() {
    onBeforeMount(versionControl);
    // Ensure Firebase is persistent (prevents repeated sign in)
    firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    // State for storage/persistence
    const state = useState();
    const { characters, createCharactersFromData } = useCharacters();
    createCharactersFromData(state.value.chars);
    // Watch for changes, and update local state
    watchEffect(() => {
      state.value.chars = characters.value;
    });

    const leftDrawerOpen = ref(true);
    const rightDrawerOpen = ref(true);
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    // Dark mode toggle
    const { isDarkMode, toggleDarkMode } = useLayout();
    const toolbarClasses = computed(() =>
      isDarkMode.value ? "bg-primary text-light" : "bg-white text-dark"
    );

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer,
      toggleRightDrawer,
      isDarkMode,
      toggleDarkMode,
      toolbarClasses,
    };
  },
});
</script>

<style lang="sass">
body
  background: url('../assets/bg/Desert_Day.png')
  background-size: cover
  -moz-background-size: cover
  -o-background-size: cover
  -webkit-background-size: cover
body.body--dark
  background: url('../assets/bg/Desert_Night.png') !important
</style>
