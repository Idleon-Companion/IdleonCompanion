<template>
  <div v-if="user === null" id="firebase-auth"></div>
  <div v-else id="auth-info" class="flex flex-col px-1 py-2">
    <div class="flex items-center justify-center">
      <q-btn
        color="dark"
        icon="cloud_download"
        label="Load"
        @click="loadCloud"
      />
      <q-btn color="dark" icon="cloud_upload" label="Save" @click="saveCloud" />
    </div>
    <div class="mt-2 mx-auto">
      <q-btn flat color="negative" label="Sign Out" @click="signOut" />
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { defineComponent, onMounted } from "vue";
import { useToast } from "vue-toastification";

import { useAuth } from "~/State";

export default defineComponent({
  name: "CloudData",
  setup() {
    const toast = useToast();
    // User authentication
    const { user, loadCloud, saveCloud } = useAuth();
    // Setup automatic login persistence
    firebase.auth().onAuthStateChanged((data) => {
      user.value = data ?? null;
    });

    // FirebaseUI config.
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: ({ user: userdata }: any) => {
          user.value = userdata;
          return false;
        },
      },
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    const loadSignInUI = () => {
      // The start method will wait until the DOM is loaded.
      ui.start("#firebase-auth", uiConfig);
    };
    onMounted(loadSignInUI);

    const signOut = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          user.value = null;
          ui.reset();
          loadSignInUI();
        });
      toast.info("You have been signed out.");
    };

    return {
      loadCloud,
      saveCloud,
      signOut,
      user,
    };
  },
});
</script>

<style scoped lang="sass">
@import '../styles/base.sass'
#auth-info
  background: $primary
  color: white
  cursor: pointer
  transition: 0.3s
  button
    border-radius: 3px
    margin: 0 0.25rem
</style>
