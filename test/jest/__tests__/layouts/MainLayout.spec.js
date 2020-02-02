import { mount, createLocalVue } from "@vue/test-utils";
import {
  Quasar,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer,
  QBtn,
  QSpace
} from "quasar";
import Vuex from "vuex";
import MainLayout from "@/layouts/MainLayout.vue";

const localVue = createLocalVue();
const components = {
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer,
  QBtn,
  QSpace
};

localVue.use(Vuex);
localVue.use(Quasar, { components });

describe("MainLayout", () => {
  let $fireapp;
  let $router;
  let store;
  let actions;

  beforeEach(() => {
    $fireapp = {
      auth: jest.fn(() => ({
        signOut: jest.fn(() => Promise.resolve())
      }))
    };
    $router = {
      push: jest.fn()
    };
    actions = {
      logoutUser: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          actions,
          state: {
            isUserAuthenticated: true
          }
        }
      }
    });
  });

  it("should trigger a logout", () => {
    const wrapper = mount(MainLayout, {
      localVue,
      store,
      mocks: {
        $router,
        $fireapp
      },
      stubs: ["router-view"]
    });

    const logoutButton = wrapper.find(".logout");
    logoutButton.trigger("click");

    return localVue.nextTick().then(() => {
      expect(actions.logoutUser).toHaveBeenCalled();
      expect($router.push).toHaveBeenCalledWith("login");
    });
  });
});
