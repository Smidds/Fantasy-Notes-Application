<template>
  <q-layout view="hHr lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <slot name="left-button" />
        <layout-toolbar-title />
        <q-space />
        <layout-logout-btn />
      </q-toolbar>
    </q-header>

    <slot name="drawers" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutToolbarTitle from "components/navigation/LayoutToolbarTitle.vue";
import LayoutLogoutBtn from "components/navigation/LayoutLogoutBtn.vue";

export default {
  name: "DashboardLayout",
  components: {
    LayoutToolbarTitle,
    LayoutLogoutBtn
  }
};
</script>

<style></style>
