<template>
  <q-page class="story-list-container">
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab name="owner" label="Owner Of" />
      <q-tab name="member" label="Member Of" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="owner">
        <center>
          <h3>Stories You Own</h3>
          <p v-if="hasStories">You do not own any stories! Try creating one!</p>
          <div v-else class="story-list__list row justify-center q-gutter-md">
            <q-btn
              v-for="story in storiesOwnerOf"
              v-bind:key="story.id"
              class="q-ma-md"
              @click="goToStory(story.name)"
            >
              <q-card class="story-card" :flat="true" :bordered="false">
                <q-card-section>
                  <div class="text-h5">{{ story.name }}</div>
                </q-card-section>
                <q-card-section>{{ story.description }}</q-card-section>
              </q-card>
            </q-btn>
          </div>
        </center>
      </q-tab-panel>

      <q-tab-panel name="member">
        <h3>Stories You've Been Invited To</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        class="create-story-btn"
        fab
        icon="post_add"
        color="accent"
        @click="createStory"
      ></q-btn>
    </q-page-sticky>
    <CreateStoryDialog v-model="shouldShow"></CreateStoryDialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import CreateStoryDialog from "../../components/CreateStoryDialog.vue";

export default {
  name: "storylist",
  components: {
    CreateStoryDialog
  },
  data: () => {
    return {
      tab: "owner",
      shouldShow: false
    };
  },
  computed: {
    ...mapState({
      storiesMemberOf: state => state.user.stories.memberOf,
      storiesOwnerOf: state => state.story.loadedOwnerStories
    }),
    hasStories() {
      return this.storiesOwnerOf && this.storiesOwnerOf.length === 0;
    }
  },
  methods: {
    createStory() {
      this.shouldShow = true;
    },
    goToStory(id) {
      this.$router.push({ name: "story-id", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.story-list__list {
  max-width: 1020px;

  .story-card {
    text-transform: none;
    background: none;
    width: 400px;
    height: 250px;
  }
}
</style>
