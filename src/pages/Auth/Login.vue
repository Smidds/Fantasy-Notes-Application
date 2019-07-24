<template>
  <q-card class="auth-wrapper">
    <q-spinner-oval color="primary" size="64px" class="ui-spinner" />
    <div class="auth-wrapper-inner column items-center">
      <div class="fantasy-text text-h3 login-title">Login</div>
      <q-input class="email-input" outlined v-model="email" label="Email" />
      <q-input
        class="email-input"
        outlined
        v-model="password"
        label="Password"
      />
      <div class="email-action-button-group row">
        <q-btn
          class="email-button email-button__login"
          @click="loginEmailClick"
          :outline="registerSelected"
          label="Login"
        />
        <q-btn
          class="email-button email-button__register"
          @click="registerEmailClick"
          :outline="loginSelected"
          label="Register"
        />
      </div>
      <div class="firebase-auth-container"></div>
    </div>
  </q-card>
</template>

<script>
import { AUTH } from "../../boot/firebase";
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import "../../../node_modules/firebaseui/dist/firebaseui.css";

const ACTIVE_EMAIL_BUTTON = {
  LOGIN: 0,
  REGISTER: 1
};

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      activeEmailButton: ACTIVE_EMAIL_BUTTON.LOGIN
    };
  },

  computed: {
    loginSelected() {
      return this.activeEmailButton === ACTIVE_EMAIL_BUTTON.LOGIN;
    },

    registerSelected() {
      return this.activeEmailButton === ACTIVE_EMAIL_BUTTON.REGISTER;
    }
  },

  methods: {
    loginEmailClick() {
      if (this.activeEmailButton === ACTIVE_EMAIL_BUTTON.LOGIN) {
        this.loginEmail();
      } else {
        this.activeEmailButton = ACTIVE_EMAIL_BUTTON.LOGIN;
      }
    },

    registerEmailClick() {
      if (this.activeEmailButton === ACTIVE_EMAIL_BUTTON.REGISTER) {
        this.registerEmail();
      } else {
        this.activeEmailButton = ACTIVE_EMAIL_BUTTON.REGISTER;
      }
    },

    loginEmail() {
      AUTH.signInWithEmailAndPassword(this.email, this.password).catch(
        error => {
          console.error("Login failed:");
          console.error(error.message);
        }
      );
    },

    registerEmail() {
      AUTH.createUserWithEmailAndPassword(this.email, this.password).catch(
        error => {
          console.error("Login failed:");
          console.error(error.message);
        }
      );
    }
  },

  mounted() {
    var current = this.$route;
    var store = this.$store;

    let uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult() {
          store.commit("auth/setUserAuth", true);
          return true;
        },
        uiShown: function() {
          document.getElementsByClassName("ui-spinner")[0].style.display =
            "none";
        }
      },
      signInFlow: "popup",
      signInSuccessUrl: current.query.redirect
        ? current.query.redirect
        : "/story-list"
    };
    var ui = new firebaseui.auth.AuthUI(AUTH);
    ui.start(".firebase-auth-container", uiConfig);
  }
};
</script>

<style lang="stylus" scoped>
.auth-wrapper {
  position: relative;
  margin: 0 auto;
  width: 350px;
  padding: 15px 50px;
}

.ui-spinner {
  margin: 0 auto;
}

.email-button {
  width: 100%;
}

.email-input {
  width: 100%;
  margin-top: 15px;
}
</style>
