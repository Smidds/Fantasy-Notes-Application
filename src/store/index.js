import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import story from "./story";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    modules: {
      user,
      story
    },

    strict: process.env.DEV
  });

  return Store;
}
