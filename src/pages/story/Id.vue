<template>
  <q-page class="story-page">
    <div class="text-h3">{{ name }}</div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      storyId: ""
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
  }
};
</script>
