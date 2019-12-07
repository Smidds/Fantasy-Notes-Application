<template>
  <div class="note-list-container">
    <q-tabs v-model="tab">
      <q-tab name="private" label="Private" />
      <q-tab name="party" label="Party" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable class="full">
      <q-tab-panel name="private" class="full">
        Private stuff
      </q-tab-panel>
      <q-tab-panel name="party" class="full">
        Party Stuff
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "NoteListWrapper",
  data() {
    return {
      tab: "private"
    };
  }
};
</script>

<style scoped>
.full {
  height: 100%;
  width: 100%;
}
</style>
