import firebase from "firebase/app";
import setup, {
  config,
  fireApp,
  AUTH,
  FIRESTORE
} from "../../../../src/boot/firebase";

describe("firebase boot setuo", () => {
  it("properly sets all variables", () => {
    const Vue = { prototype: {} };
    setup({ Vue });

    expect(firebase.initializeApp).toHaveBeenCalled();
    expect(config).toBeInstanceOf(Object);
    expect(fireApp).toBeInstanceOf(Object);
    expect(typeof AUTH).toBe("function");
    expect(typeof FIRESTORE).toBe("function");
    expect(typeof AUTH).toBe("function");
    expect(Vue.prototype.$auth).toBeDefined();
    expect(Vue.prototype.$auth).toEqual(AUTH);
    expect(Vue.prototype.$firestore).toBeDefined();
    expect(Vue.prototype.$firestore).toEqual(FIRESTORE);
  });
});
