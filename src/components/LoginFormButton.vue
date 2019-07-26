<template>
  <q-btn
    class="email-button"
    @click="clickTrigger"
    :label="label"
    :class="stateTriggeredClasses"
    :color="isActive ? 'secondary' : 'white'"
  />
</template>

<script>
export default {
  name: "LoginFormButton",

  props: ["isActive", "label"],

  computed: {
    stateTriggeredClasses() {
      if (this.isActive) {
        return ["text-white", "active-border"];
      } else {
        return ["text-black"];
      }
    }
  },

  methods: {
    clickTrigger() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="stylus" scoped>
.email-button {
  width: 100%;

  .active-border {
      border: 1px solid $secondary
  }
}
</style>
