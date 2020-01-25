import { shallowMount, createLocalVue } from "@vue/test-utils";
import {
  Quasar,
  QBtn,
  QDialog,
  QCard,
  QCardSection,
  QSpace,
  QForm,
  QInput,
  ClosePopup
} from "quasar";
import Vuex from "vuex";
import CreateStoryDialog from "@/components/CreateStoryDialog.vue";

const components = {
  QBtn,
  QDialog,
  QCard,
  QCardSection,
  QSpace,
  QForm,
  QInput
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Quasar, {
  components,
  directives: {
    ClosePopup
  }
});

describe("Create Story Dialog", () => {
  let storyActions;
  let store;
  let mockQuasar;

  beforeEach(() => {
    storyActions = {
      createNewStory: jest.fn(() => Promise.resolve())
    };

    store = new Vuex.Store({
      modules: {
        story: {
          namespaced: true,
          state: {},
          actions: storyActions
        }
      }
    });

    mockQuasar = {
      notify: jest.fn()
    };
  });

  it("should call createStory on submit", () => {
    const wrapper = shallowMount(CreateStoryDialog, {
      localVue,
      store,
      propsData: {
        value: true
      },
      mocks: {
        $q: mockQuasar
      }
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should correctly create story", () => {
    const inputListener = jest.fn();

    const wrapper = shallowMount(CreateStoryDialog, {
      localVue,
      store,
      propsData: {
        value: true
      },
      mocks: {
        $q: mockQuasar
      },
      listeners: {
        input: inputListener
      }
    });

    const test = () => {
      expect(storyActions.createNewStory).toHaveBeenCalled();
      expect(wrapper.vm.submitting).toBeFalsy();
      expect(inputListener).toHaveBeenCalled();
      expect(mockQuasar.notify).toHaveBeenCalled();
    };

    return wrapper.vm.createStory().then(test);
  });

  it("should correctly handle create story failure", () => {
    const inputListener = jest.fn();

    const testError = new Error("NETWORK FAILURE");
    const createNewStory = jest.fn(() => Promise.reject(testError));

    store = new Vuex.Store({
      modules: {
        story: {
          namespaced: true,
          state: {},
          actions: {
            createNewStory
          }
        }
      }
    });

    const wrapper = shallowMount(CreateStoryDialog, {
      localVue,
      store,
      propsData: {
        value: true
      },
      mocks: {
        $q: mockQuasar
      },
      listeners: {
        input: inputListener
      }
    });

    const test = () => {
      expect(createNewStory).toHaveBeenCalled();
      expect(wrapper.vm.createStory).toThrow(testError);
      expect(wrapper.vm.submitting).toBeFalsy();
      expect(inputListener).not.toHaveBeenCalled();
      expect(mockQuasar.notify).toHaveBeenCalled();
    };

    return wrapper.vm.createStory().catch(() => test);
  });

  it("should correctly reset the form", () => {
    const wrapper = shallowMount(CreateStoryDialog, {
      localVue,
      store,
      propsData: {
        value: true
      },
      mocks: {
        $q: mockQuasar
      }
    });

    wrapper.vm.resetForm();
    expect(wrapper.vm.submitting).toBeFalsy();
    expect(wrapper.vm.name).toEqual("");
    expect(wrapper.vm.description).toEqual("");
  });
});
