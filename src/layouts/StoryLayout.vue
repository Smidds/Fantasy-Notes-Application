<template>
  <main-layout>
    <template v-slot:left-button>
      <q-btn dense flat round icon="menu" @click="left = !left" />
    </template>
    <template v-slot:drawers>
      <q-drawer show-if-above v-model="left" side="left" bordered>
        <q-list class="story-content__notes-list q-pa-md">
          <q-item
            clickable
            v-ripple
            v-for="note in notes"
            v-bind:key="note.id"
            @click="selectNote(note)"
          >
            <q-item-section>{{ note.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </template>
  </main-layout>
</template>

<script>
import { mapState } from "vuex";
import MainLayout from "./MainLayout.vue";

export default {
  components: {
    MainLayout
  },
  data() {
    return {
      name: "",
      storyId: "",
      notes: [],
      split: 25,
      left: true
    };
  },
  computed: {
    ...mapState("story", ["loadedOwnerStories"])
  },
  beforeMount: function() {
    const story = this.loadedOwnerStories.find(
      story => story.name === this.$route.params.id
    );
    this.name = story.name;
    this.storyId = story.id;

    for (let i = 0; i < 25; i++) {
      this.notes.push({ id: i, name: `This is note #${i}` });
    }
  },
  methods: {
    selectNote(note) {
      this.$router.push({ name: "note-id", params: { id: note.name } });
    }
  }
};
</script>

<style></style>
