<template>
  <q-page class="story-page">
    <div class="text-h3">{{ name }}</div>
    <div class>{{ description }}</div>
  </q-page>
</template>

<script>
export default {
  props: {
    name: String,
    description: String
  }
};
</script>
