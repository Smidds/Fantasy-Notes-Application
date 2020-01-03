import { setUserAuth, setUserStories } from "@/store/user/mutations";

describe("User Module Mutations", () => {
  it("should correctly set the userId and auth when user is valid", () => {
    const state = {};
    const user = {
      uid: 1
    };

    setUserAuth(state, user);

    expect(state.isUserAuthenticated).toBeTruthy();
    expect(state.userId).toBe(1);
  });

  it("should correctly set the userId and auth when user is invalid", () => {
    const state = {};
    const user = null;

    setUserAuth(state, user);

    expect(state.isUserAuthenticated).toBeFalsy();
    expect(state.userId).toBeNull();
  });

  it("should correctly set the user stories", () => {
    const state = {
      stories: {}
    };
    const stories = {
      memberOf: ["test1"],
      ownerOf: ["test2"]
    };

    setUserStories(state, stories);

    expect(state.stories.memberOf).toEqual(expect.arrayContaining(["test1"]));
    expect(state.stories.ownerOf).toEqual(expect.arrayContaining(["test2"]));
  });
});
