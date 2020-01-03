import { mount, createLocalVue } from "@vue/test-utils";
import { Quasar, QInput, QCard, QSpinnerOval, QBtn, QIcon } from "quasar";
import Vuex from "vuex";
import Login, { AUTH_STATE } from "@/pages/Auth/Login.vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

jest.mock("@/mixins/loading");

const localVue = createLocalVue();
const components = { QInput, QCard, QSpinnerOval, QBtn, QIcon };

localVue.use(Quasar, { components });
localVue.use(Vuex);

describe("Login Page", () => {
  let $auth;
  let $router;
  let $route;
  let store;
  let actions;

  beforeEach(() => {
    $auth = {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword
    };
    $router = {
      push: jest.fn()
    };
    $route = {
      query: {
        redirect: "home"
      }
    };
    actions = {
      loginUser: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          actions
        }
      }
    });
  });

  it("correctly generates a title", () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      mocks: {
        $router,
        $route
      }
    });

    expect(wrapper.find(".auth-title").text()).toBe("Login");
  });

  it("correctly triggers the sign in method on login button press", () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      mocks: {
        $router,
        $route,
        $auth
      }
    });

    const loginButton = wrapper.find(".auth-action-button--login");
    // const registerButton = wrapper.find(".auth-action-button--register");

    loginButton.trigger("click");

    expect(require("@/mixins/loading").activateLoader).toBeCalled();
    expect(signInWithEmailAndPassword).toBeCalled();
  });

  it("correctly flips to and triggers register", () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      mocks: {
        $router,
        $route,
        $auth
      }
    });

    const registerButton = wrapper.find(".auth-action-button--register");

    registerButton.trigger("click");

    expect(wrapper.vm.$data.authState).toBe(AUTH_STATE.REGISTER);

    registerButton.trigger("click");

    expect(require("@/mixins/loading").activateLoader).toBeCalled();
    expect(createUserWithEmailAndPassword).toBeCalled();
  });
});
