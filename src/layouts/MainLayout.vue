<template>
  <q-layout view="lHr lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="fantasy-text text-h4">
          Fantasy Notes
        </q-toolbar-title>
        <q-btn class="logout" @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "DashboardLayout",
  methods: {
    logout() {
      this.$fireapp
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
