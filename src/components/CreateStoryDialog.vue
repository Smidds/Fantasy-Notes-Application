<template>
  <q-dialog v-model="show" @hide="resetForm">
    <q-card class="create-story-dialog">
      <q-card-section class="row items-center q-pb-md">
        <div class="text-h6">Create New Story</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>

      <q-card-section>
        <q-form
          class="create-story-dialog__form q-gutter-md"
          @submit="createStory"
          submit="createStory"
        >
          <q-input
            filled
            v-model="name"
            label="Story name *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
            filled autogrow v-model="description" label="Story description"
            ogrow v-model="description" label="Story description" >
          </q-input>
          <q-btn
            label="Create"
            type="submit"
            color="primary"
            class="create-story-dialog__submit-btn q-mt-lg"
            :loading="submitting"
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: "",
      description: "",
      submitting: false
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(showStatus) {
        this.$emit("input", showStatus);
      }
    }
  },
  methods: {
    ...mapActions("story", ["createNewStory"]),
    resetForm() {
      this.name = "";
      this.description = "";
      this.submitting = false;
    },
    createStory() {
      this.submitting = true;
      return this.createNewStory({
        name: this.name,
        description: this.description
      })
        .then(() => {
          this.$q.notify({
            message: `Story "${this.name}" created!`,
            color: "positive",
            actions: [{ icon: "close" }]
          });
          this.submitting = false;
          this.show = false;
        })
        .catch(err => {
          this.$q.notify({
            message: `Unable to create story ${this.name}. Error occured: ${err}`,
            color: "negative",
            actions: [{ icon: "close", color: "white" }]
          });
          this.submitting = false;
          throw err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.create-story-dialog {
  min-width: 300px;
}
</style>
