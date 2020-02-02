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
  Quasar,
  QPage,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
};

localVue.use(Quasar, { components });

describe("Story Note Page", () => {
  it("Is a vue instance", () => {
    const wrapper = mount(FakeLayout, {
      localVue
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
