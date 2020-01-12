<template>
  <q-card class="auth-wrapper">
    <q-spinner-oval color="primary" size="64px" class="ui-spinner" />
    <div class="auth-wrapper-inner column items-center">
      <div class="fantasy-text text-h3 auth-title">{{ authTitle }}</div>
      <q-input
        class="auth-input"
        outlined
        type="email"
        v-model="email"
        label="Email"
      />
      <q-input
        class="auth-input"
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
        class="auth-input"
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
      <div class="auth-action-button-group row">
        <LoginFormButton
          class="auth-action-button auth-action-button--login"
          @click="loginEmailClick"
          :is-active="loginSelected"
          :secret-field="false"
          label="Login"
        />
        <LoginFormButton
          class="auth-action-button auth-action-button--register"
          @click="registerEmailClick"
          :is-active="registerSelected"
          :secret-field="true"
          label="Register"
        />
      </div>
      <div class="auth-or-section">
        &mdash; OR &mdash;
      </div>
      <div class="firebase-auth-container"></div>
    </div>
  </q-card>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "../../../node_modules/firebaseui/dist/firebaseui.css";

import LoginFormButton from "../../components/LoginFormButton.vue";
import loadingMixin from "../../mixins/loading";

export const AUTH_STATE = {
  LOGIN: 0,
  REGISTER: 1
};

export default {
  name: "Login",
  mixins: [loadingMixin],

  components: {
    LoginFormButton
  },

  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      authState: AUTH_STATE.LOGIN,
      activeButtonClasses: "",
      showPwd: false,
      showConfirmPwd: false,
      cancelLoader: () => {}
    };
  },

  computed: {
    loginSelected() {
      return this.authState === AUTH_STATE.LOGIN;
    },

    registerSelected() {
      return this.authState === AUTH_STATE.REGISTER;
    },

    authTitle() {
      return this.loginSelected ? "Login" : "Sign Up";
    }
  },

  methods: {
    _authSuccessRedirect() {
      setTimeout(() => {
        this.cancelLoader();
        const currentRoute = this.$route;
        this.$router.push(
          currentRoute.query.redirect
            ? currentRoute.query.redirect
            : "/story-list"
        );
      }, 2000);
    },

    _preAuthActions() {
      // const show = this.$q.loading.show;
      this.cancelLoader = this.activateLoader();
    },

    loginEmailClick() {
      this.loginSelected
        ? this.loginEmail()
        : (this.authState = AUTH_STATE.LOGIN);
    },

    registerEmailClick() {
      this.registerSelected
        ? this.registerEmail()
        : (this.authState = AUTH_STATE.REGISTER);
    },

    loginEmail() {
      this._preAuthActions();
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$store.dispatch("user/loginUser", response.user);
          this._authSuccessRedirect();
        })
        .catch(error => {
          console.error("Login failed:", error.message);
        });
    },

    registerEmail() {
      this._preAuthActions();
      this.$auth
        .createUserWithEmailAndPassword(this.email, this.password)
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
      ui = new firebaseui.auth.AuthUI(this.$auth);
    }

    ui.start(".firebase-auth-container", uiConfig);
  }
};
</script>

<style lang="stylus">
.auth-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 350px;
    padding: 15px 50px;

    .auth-or-section {
        margin: 25px 0;
    }

    .auth-action-button-group {
        width: 100%;

        .auth-action-button {
            margin-top: 10px;
        }
    }

    .firebase-auth-container {
        width: 100%;

        .firebaseui-card-content {
            padding: 0;

            .firebaseui-idp-list {
                margin: 0;
            }

            .firebaseui-idp-button {
                max-width: 100%;
            }
        }
    }
}

.ui-spinner {
    margin: 0 auto;
}

.email-button {
    width: 100%;
}

.auth-input {
    width: 100%;
    margin-top: 15px;
}
</style>
