import mutations from "@/store/story/mutations";
import {
  ADD_STORY,
  SET_LOADED_STORIES,
  ADD_STORIES
} from "@/store/mutation-types";

describe("Store Story Mutations", () => {
  let state;
  beforeEach(() => {
    state = {
      loadedOwnerStories: [],
      currentPaginationIndex: 0
    };
  });

  it(`${ADD_STORY} properly sets the loadedOwnerStories`, () => {
    const newStory = { name: "Test!" };
    mutations[ADD_STORY](state, newStory);

    expect(state.loadedOwnerStories).toEqual([newStory]);
  });

  it(`${SET_LOADED_STORIES} properly sets the loadedOwnerStories`, () => {
    const newStories = [{ name: "Test!" }];
    mutations[SET_LOADED_STORIES](state, newStories);

    expect(state.loadedOwnerStories).toEqual(newStories);
  });

  it(`${ADD_STORIES} properly sets the loadedOwnerStories`, () => {
    const currentStories = [{ name: "Test 1!" }];
    const newStories = [{ name: "Test 2!" }];
    state.loadedOwnerStories = currentStories;

    mutations[ADD_STORIES](state, newStories);

    expect(state.loadedOwnerStories).toEqual([
      ...currentStories,
      ...newStories
    ]);
    expect(state.currentPaginationIndex).toBe(1);
  });
});
