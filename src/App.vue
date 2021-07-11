<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="">
      <q-toolbar color="red">
        <q-icon icon="mdi-email" />
        <!-- <q-btn
          dense
          flat
          round
          icon="mdi-email"
          text-color="white"
          @click="toggleLeftDrawer"
        /> -->
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
import { defineComponent, onBeforeMount, ref, watchEffect } from "vue";

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

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer,
      toggleRightDrawer,
    };
  },
});
</script>
