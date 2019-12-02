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
import * as firebaseui from "firebaseui";
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
    _authSuccessRedirect() {
      const currentRoute = this.$route;
      this.$router.push(
        currentRoute.query.redirect
          ? currentRoute.query.redirect
          : "/story-list"
      );
    },

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
      AUTH.signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$store.dispatch("user/loginUser", response.user);
          this._authSuccessRedirect();
        })
        .catch(error => {
          console.error("Login failed:", error.message);
        });
    },

    registerEmail() {
      console.log(`email: ${this.email}, password: ${this.password}`);
      AUTH.createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$store.dispatch("user/loginUser", response.user);
          this._authSuccessRedirect();
        })
        .catch(error => {
          console.error("Login failed:");
          console.error(error.message);
        });
    }
  },

  mounted() {
    const redirectPath = this.$route.query.redirect;
    const router = this.$router;
    const store = this.$store;

    let uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          store.dispatch("user/loginUser", authResult.user).then(() => {
            router.push(redirectPath ? redirectPath : "/story-list");
          });
          return false;
        },
        uiShown: function() {
          document.getElementsByClassName("ui-spinner")[0].style.display =
            "none";
        }
      },
      signInFlow: "popup"
    };

    let ui = firebaseui.auth.AuthUI.getInstance();

    if (!ui) {
      ui = new firebaseui.auth.AuthUI(AUTH);
    }

    ui.start(".firebase-auth-container", uiConfig);
  }
};
</script>

<style lang="stylus" scoped>
.auth-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
