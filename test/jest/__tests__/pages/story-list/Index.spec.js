import { mount, createLocalVue } from "@vue/test-utils";
import {
  Quasar,
  QPage,
  QTabs,
  QTab,
  QSeparator,
  QTabPanels,
  QTabPanel,
  QBtn,
  QCard,
  QCardSection,
  QPageSticky,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
} from "quasar";
import Vuex from "vuex";
import FakeLayout from "../stubs/Layout.vue";
import CreateStoryDialogStub from "../stubs/CreateStoryDialog.vue";

const localVue = createLocalVue();
const components = {
  Quasar,
  QPage,
  QTabs,
  QTab,
  QSeparator,
  QTabPanels,
  QTabPanel,
  QBtn,
  QCard,
  QCardSection,
  QPageSticky,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
};

localVue.use(Quasar, { components });
localVue.use(Vuex);

describe("Story list index page", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: {
            stories: { memberOf: [] }
          }
        },
        story: {
          namespaced: true,
          state: {
            loadedOwnerStories: []
          }
        }
      }
    });
  });

  it("Is a vue instance", () => {
    const wrapper = mount(FakeLayout, {
      stubs: {
        CreateStoryDialog: CreateStoryDialogStub
      },
      localVue,
      store
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
