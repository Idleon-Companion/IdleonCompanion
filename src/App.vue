<template>
  <Home />
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/auth";
import { defineComponent, onBeforeMount, onMounted, watchEffect } from "vue";
import Home from "~/pages/Home.vue";

import { useCharacters } from "~/composables/Characters";
import { firebaseApp, versionControl, useState } from "./State";

import "~/styles/base.sass";
import "~/styles/progress.sass";

export default defineComponent({
  name: "App",
  components: {
    Home,
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
  },
});
</script>
