import userMutations from "@/store/user/mutations";
import { SET_USER_AUTH } from "@/store/mutation-types";

describe("User Module Mutations", () => {
  it("should correctly set the userId and auth when user is valid", () => {
    const state = {
      stories: {}
    };
    const user = {
      uid: 1
    };

    userMutations[SET_USER_AUTH](state, user);

    expect(state.isUserAuthenticated).toBeTruthy();
    expect(state.userId).toBe(1);
  });

  it("should correctly set the userId and auth when user is invalid", () => {
    const state = {};
    const user = null;

    userMutations[SET_USER_AUTH](state, user);

    expect(state.isUserAuthenticated).toBeFalsy();
    expect(state.userId).toBeNull();
  });
});
