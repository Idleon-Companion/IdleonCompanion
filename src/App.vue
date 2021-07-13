<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.svg" />
          </q-avatar>
          Idleon Companion
        </q-toolbar-title>
        <q-btn
          dense
          flat
          round
          :icon="isDarkMode ? 'mdi-brightness-7' : 'mdi-brightness-3'"
          @click="toggleDarkMode"
        />
        <q-btn
          dense
          flat
          round
          icon="mdi-account-details"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <LeftDrawerNavigation />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- TODO: Create side drawer -->
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

import LeftDrawerNavigation from "~/components/nav/LeftDrawerNavigation.vue";
import { useCharacters } from "~/composables/Characters";
import Home from "~/pages/Home.vue";
import { firebaseApp, versionControl, useState } from "~/State";

import "~/styles/base.sass";

export default defineComponent({
  name: "App",
  components: {
    Home,
    LeftDrawerNavigation,
  },
  setup() {
    const $q = useQuasar();
    onBeforeMount(() => {
      versionControl();
      $q.dark.set(true);
    });
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

    // Side drawer interactions
    const leftDrawerOpen = ref(true);
    const rightDrawerOpen = ref(true);
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    // Dark mode toggle
    const isDarkMode = computed(() => $q.dark.isActive);
    const toggleDarkMode = () => {
      $q.dark.set(!isDarkMode.value);
    };

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer,
      toggleRightDrawer,
      isDarkMode,
      toggleDarkMode,
    };
  },
});
</script>
