import { ADD_STORY, SET_LOADED_STORIES, ADD_STORIES } from "../mutation-types";

export default {
  [ADD_STORY](state, newStory) {
    state.loadedOwnerStories.push(newStory);
  },

  [SET_LOADED_STORIES](state, stories) {
    state.loadedOwnerStories = stories;
  },

  [ADD_STORIES](state, stories) {
    state.loadedOwnerStories.concat(stories);
    state.currentPaginationIndex = state.loadedOwnerStories.length - 1;
  }
};
