import {
  loadMoreStories,
  loadStories,
  createNewStory
} from "@/store/story/actions";
import {
  ADD_STORY,
  ADD_STORIES,
  SET_LOADED_STORIES
} from "@/store/mutation-types";

jest.mock("@/boot/firebase");

describe("Store Story Actions", () => {
  describe("loadMoreStories", () => {
    let commit, rootState, state;

    beforeEach(() => {
      commit = jest.fn();
      rootState = {
        user: {
          userId: 1
        }
      };
      state = {
        limitAmount: 2,
        currentPaginationIndex: 5
      };
    });

    it("should commit to add stories", () => {
      const test = () => {
        expect(commit).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith(ADD_STORIES, [
          { test: "Hello World!" }
        ]);
      };
      return loadMoreStories({ commit, rootState, state }).then(test);
    });
  });

  describe("loadStories", () => {
    let commit, rootState, state;

    beforeEach(() => {
      commit = jest.fn();
      rootState = {
        user: {
          userId: 1
        }
      };
      state = {
        limitAmount: 2,
        currentPaginationIndex: 5
      };
    });

    it("should commit to set loaded stories", () => {
      const test = () => {
        expect(commit).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith(SET_LOADED_STORIES, [
          { test: "Hello World!" }
        ]);
      };
      return loadStories({ commit, rootState, state }).then(test);
    });
  });

  describe("createNewStory", () => {
    let commit, rootState, state;

    beforeEach(() => {
      commit = jest.fn();
      rootState = {
        user: {
          userId: 1
        }
      };
      state = {
        limitAmount: 2,
        currentPaginationIndex: 5
      };
    });

    it("should commit to set loaded stories", () => {
      const test = () => {
        expect(commit).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith(ADD_STORY, {
          test: "Hello World!"
        });
      };
      return createNewStory({ commit, rootState, state }).then(test);
    });
  });
});
