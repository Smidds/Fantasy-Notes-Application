import routeAuth from "../../../../src/boot/route-auth";

describe("route auth setup", () => {
  let router = {};
  let store = {};
  let beforeEachCallback = jest.fn();

  beforeEach(() => {
    store = {
      getters: {
        "user/isUserAuthenticated": true
      }
    };
    router = {
      beforeEach: jest.fn(callback => {
        beforeEachCallback = callback;
      })
    };
  });

  it("should redirect to login if auth is needed and user is not logged in", () => {
    store.getters = {
      "user/isUserAuthenticated": false
    };
    routeAuth({ router, store });
    const to = {
      matched: {
        some: jest.fn(() => true)
      },
      fullPath: "login",
      name: "login"
    };
    const from = {};
    const next = jest.fn();

    beforeEachCallback(to, from, next);
    expect(next).toBeCalledWith({
      name: "login",
      query: { redirect: "login" }
    });
  });

  it("should redirect to story-list if user is authenticated and trying to go to login page", () => {
    routeAuth({ router, store });

    const to = {
      matched: {
        some: jest.fn(() => true)
      },
      fullPath: "login",
      name: "login"
    };
    const from = {};
    const next = jest.fn();

    beforeEachCallback(to, from, next);
    expect(next).toBeCalledWith({
      name: "story-list"
    });
  });

  it("should continue on if auth is not a concern", () => {
    routeAuth({ router, store });

    const to = {
      matched: {
        some: jest.fn(() => false)
      },
      fullPath: "test",
      name: "test"
    };
    const from = {};
    const next = jest.fn();

    beforeEachCallback(to, from, next);
    expect(next).toBeCalled();
  });

  it("should correctly filter records to determine if auth is required", () => {
    routeAuth({ router, store });

    const record = {
      meta: {
        requiresAuth: false
      }
    };
    const to = {
      matched: {
        some: jest.fn(filter => filter(record))
      },
      fullPath: "test",
      name: "test"
    };
    const from = {};
    const next = jest.fn();

    beforeEachCallback(to, from, next);
    expect(next).toBeCalled();
  });
});
