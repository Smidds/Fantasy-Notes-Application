<template>
  <div class="story-list-container">
    <h1>Your stories!</h1>
  </div>
</template>

<script>
export default {
  name: "StoryList",

  data() {
    return {
      stories: []
    };
  },

  mounted() {}
};
</script>

<style scoped>
.full {
  height: 100%;
  width: 100%;
}
</style>
