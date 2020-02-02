<template>
  <q-btn flat no-caps>
    <q-toolbar-title shrink class="fantasy-text text-h4" @click="goHome()"
      >Fantasy Notes</q-toolbar-title
    >
  </q-btn>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: "story-list" });
    }
  }
};
</script>
