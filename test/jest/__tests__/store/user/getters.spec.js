import { isUserAuthenticated, userId } from "@/store/user/getters";

describe("Store User Getters", () => {
  let state;
  beforeEach(() => {
    state = {
      isUserAuthenticated: true,
      userId: 1
    };
  });

  it("isUserAuthenticated returns state property", () => {
    expect(isUserAuthenticated(state)).toEqual(state.isUserAuthenticated);
  });

  it("userId returns state property", () => {
    expect(userId(state)).toEqual(state.userId);
  });
});
