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
          <p v-if="hasStories">
            You do not own any stories! Try creating one!
          </p>
          <q-card v-else v-for="story in storiesOwnerOf" v-bind:key="story.id">
            <q-card-section horizontal> </q-card-section>
          </q-card>
        </center>
      </q-tab-panel>

      <q-tab-panel name="member">
        <h3>Stories You've Been Invited To</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="post_add" color="accent" @click="createStory"></q-btn>
    </q-page-sticky>
    <CreateStoryDialog v-model="shouldShow"></CreateStoryDialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import CreateStoryDialog from "components/CreateStoryDialog.vue";

export default {
  name: "StoryList",
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
      storiesOwnerOf: state => state.user.stories.ownerOf
    }),
    hasStories() {
      return this.storiesOwnerOf && this.storiesOwnerOf.length === 0;
    }
  },
  methods: {
    createStory() {
      this.shouldShow = true;
    }
  }
};
</script>
