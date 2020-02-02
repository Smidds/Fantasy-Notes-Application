<template>
  <q-btn class="logout" flat @click="logout()" v-if="this.isUserAuthenticated"
    >Logout</q-btn
  >
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    onLogout: {
      type: Function,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState("user", ["isUserAuthenticated"])
  },
  methods: {
    logout() {
      this.onLogout
        ? this.onLogout()
        : this.$fireapp
            .auth()
            .signOut()
            .then(() => {
              this.$store.dispatch("user/logoutUser");
              this.$router.push("login");
            });
    }
  }
};
</script>

<style></style>
