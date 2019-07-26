<template>
  <q-card class="auth-wrapper">
    <q-spinner-oval color="primary" size="64px" class="ui-spinner" />
    <div class="auth-wrapper-inner column items-center">
      <div class="fantasy-text text-h3 login-title">Login</div>
      <q-input
        class="email-input"
        outlined
        type="email"
        v-model="email"
        label="Email"
      />
      <q-input
        class="email-input"
        outlined
        :type="showPwd ? 'text' : 'password'"
        v-model="password"
        label="Password"
      >
        <template v-slot:append>
          <q-icon
            :name="showPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPwd = !showPwd"
          />
        </template>
      </q-input>
      <q-input
        class="email-input"
        outlined
        :type="showConfirmPwd ? 'text' : 'password'"
        :class="loginSelected ? 'hidden' : ''"
        v-model="passwordConfirm"
        label="Confirm Password"
      >
        <template v-slot:append>
          <q-icon
            :name="showConfirmPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showConfirmPwd = !showConfirmPwd"
          />
        </template>
      </q-input>
      <div class="email-action-button-group row">
        <LoginFormButton
          @click="loginEmailClick"
          :is-active="loginSelected"
          :secret-field="false"
          label="Login"
        />
        <LoginFormButton
          @click="registerEmailClick"
          :is-active="registerSelected"
          :secret-field="true"
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

import LoginFormButton from "../../components/LoginFormButton.vue";

const ACTIVE_EMAIL_BUTTON = {
  LOGIN: 0,
  REGISTER: 1
};

export default {
  name: "Login",

  components: {
    LoginFormButton
  },

  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      activeEmailButton: ACTIVE_EMAIL_BUTTON.LOGIN,
      activeButtonClasses: "",
      showPwd: false,
      showConfirmPwd: false
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
