<template>
  <div
    id="firebase-auth"
    :style="user === null ? '' : { display: 'none' }"
  ></div>
  <div v-if="user !== null" id="auth-info" class="px-1 py-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <button @click="loadCloud">
          <div class="iconify" data-icon="mdi:cloud-download"></div>
          Load
        </button>
        <button @click="saveCloud">
          <div class="iconify" data-icon="mdi:cloud-upload"></div>
          Save
        </button>
      </div>
      <button @click="signOut">Sign out</button>
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
    // FirebaseUI config.
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: ({ user: userdata }: any) => {
          user.value = userdata;
          return false;
        },
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
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
