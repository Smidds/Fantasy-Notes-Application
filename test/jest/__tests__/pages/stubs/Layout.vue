<template>
  <q-layout view="lHr lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Fake Layout</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <index></index>
    </q-page-container>
  </q-layout>
</template>

<script>
import Index from "@/pages/story-list/Index.vue";

export default {
  components: {
    Index
  }
};
</script>