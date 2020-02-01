import { loginUser, logoutUser } from "@/store/user/actions";
import { SET_USER_AUTH } from "@/store/mutation-types";

describe("Store User Actions", () => {
  describe("loginUser", () => {
    let commit, dispatch;

    beforeEach(() => {
      commit = jest.fn();
      dispatch = jest.fn(() => Promise.resolve());
    });

    it("should set the user auth and dispatch", () => {
      const user = {
        name: "Test Testerton"
      };

      const test = () => {
        expect(commit).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith(SET_USER_AUTH, user);
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith("story/loadStories", null, {
          root: true
        });
      };

      return loginUser({ commit, dispatch }, user).then(test);
    });
  });

  describe("loginUser", () => {
    let commit, dispatch;

    beforeEach(() => {
      commit = jest.fn();
    });

    it("should set the user auth and dispatch", () => {
      logoutUser({ commit });
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith(SET_USER_AUTH, null);
    });
  });
});
