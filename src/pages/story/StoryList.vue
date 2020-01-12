<template>
  <div class="story-list-container">
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
          <p v-if="storiesOwnerOf.length === 0">
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
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "StoryList",
  data: () => {
    return {
      tab: "owner"
    };
  },
  computed: {
    ...mapState({
      storiesMemberOf: state => state.user.stories.memberOf,
      storiesOwnerOf: state => state.user.stories.ownerOf
    })
  }
};
</script>
