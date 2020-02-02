import { mount, createLocalVue } from "@vue/test-utils";
import {
  Quasar,
  QPage,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
} from "quasar";
import Vuex from "vuex";
import FakeLayout from "./Layout.vue";

const localVue = createLocalVue();
const components = {
  QPage,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
};

localVue.use(Quasar, { components });
localVue.use(Vuex);

describe("Story list index page", () => {
  let store, $route;

  beforeEach(() => {
    $route = {
      params: {
        id: "New Story"
      }
    };
    store = new Vuex.Store({
      modules: {
        story: {
          namespaced: true,
          state: {
            loadedOwnerStories: [{ name: "New Story" }]
          }
        }
      }
    });
  });

  it("Is a vue instance", () => {
    const wrapper = mount(FakeLayout, {
      localVue,
      store,
      mocks: {
        $route
      }
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
