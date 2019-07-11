<template>
  <q-layout view="lHr lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>Title
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/page1" label="Personal" />
        <q-route-tab to="/page2" label="Shared With Me" />
        <q-route-tab to="/page3" label="Public" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "DashboardLayout"
};
</script>

<style></style>
