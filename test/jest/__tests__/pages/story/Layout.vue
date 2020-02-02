<template>
  <q-layout view="lHr lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Fake Layout</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <note />
    </q-page-container>
  </q-layout>
</template>

<script>
import Note from "@/pages/story/Note.vue";

export default {
  components: {
    Note
  }
};
</script>