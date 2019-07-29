<template>
  <q-layout view="lHr lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="fantasy-text text-h4">
          <!-- <q-avatar>
            <img
              src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
            /> </q-avatar> -->
          Fantasy Notes
        </q-toolbar-title>
        <q-btn @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fireApp } from "../boot/firebase";

export default {
  name: "DashboardLayout",
  methods: {
    logout() {
      console.log("Logout!");
      fireApp
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
