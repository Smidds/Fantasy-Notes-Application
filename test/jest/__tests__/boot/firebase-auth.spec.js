import firebaseInit from "../../../../src/boot/firebase-auth";
import { dummyUser, onAuthStateChanged, unsubscribe } from "firebase/auth";

describe("firebase boot", () => {
  let testAuth;
  let Vue;
  let store;

  beforeEach(() => {
    testAuth = { onAuthStateChanged, unsubscribe };
    Vue = {
      prototype: {
        $auth: testAuth
      }
    };
    store = {
      dispatch: jest.fn((...args) => args)
    };
  });

  it("sets the user after login", () => {
    return firebaseInit({ Vue, store }).then(() => {
      expect(testAuth.onAuthStateChanged).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith("user/loginUser", dummyUser);
    });
  });

  it("does not dispatch if there is no user", () => {
    let authCallback;
    const unsub = jest.fn();
    const onAuthStateChanged = jest.fn(callback => {
      authCallback = callback;
      return unsub;
    });

    const testSetup = () => {
      Vue.prototype.$auth.onAuthStateChanged = onAuthStateChanged;
      const initPromise = firebaseInit({ Vue, store });
      authCallback(null);
      return initPromise;
    };

    return testSetup().then(() => {
      expect(onAuthStateChanged).toBeCalledTimes(1);
      expect(store.dispatch).not.toBeCalled();
    });
  });
});
