<template>
  <div id="auth-container"></div>
</template>

<script>
import { AUTH } from "boot/firebase";
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import "../../../node_modules/firebaseui/dist/firebaseui.css";

export default {
  name: "Login",
  mounted() {
    var current = this.$route;

    let uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult() {
          return true;
        }
      },
      signInFlow: "popup",
      signInSuccessUrl: current.query.redirect
        ? current.query.redirect
        : "/story-list"
    };
    var ui = new firebaseui.auth.AuthUI(AUTH);
    ui.start("#auth-container", uiConfig);
  }
};
</script>
