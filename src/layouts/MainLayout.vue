<template>
  <q-layout view="lHr lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat no-caps>
          <q-toolbar-title shrink class="fantasy-text text-h4" @click="goHome()"
            >Fantasy Notes</q-toolbar-title
          >
        </q-btn>
        <q-space />
        <q-btn
          class="logout"
          flat
          @click="logout()"
          v-if="this.isUserAuthenticated"
          >Logout</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DashboardLayout",
  computed: {
    ...mapState("user", ["isUserAuthenticated"])
  },
  methods: {
    logout() {
      this.$fireapp
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("user/logoutUser");
          this.$router.push("login");
        });
    },
    goHome() {
      this.$router.push({ name: "story-list" });
    }
  }
};
</script>

<style></style>
