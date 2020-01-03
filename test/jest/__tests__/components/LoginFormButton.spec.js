import { mount, createLocalVue } from "@vue/test-utils";
import { Quasar, QBtn } from "quasar";
import LoginFormButton from "@/components/LoginFormButton.vue";

const localVue = createLocalVue();
localVue.use(Quasar, { components: { QBtn } });

describe("Login Form Button", () => {
  it("should have black text when isActive is false", () => {
    const label = "Test Label";
    const wrapper = mount(LoginFormButton, {
      localVue,
      propsData: {
        isActive: false,
        label
      }
    });

    const button = wrapper.find(".email-button");
    expect(button).toBeDefined();
    expect(button.classes()).toContain("text-black");
    expect(wrapper.find(".q-btn__content").text()).toBe(label);
  });

  it("should have white text and active border when isActive is true", () => {
    const label = "Test Label";
    const wrapper = mount(LoginFormButton, {
      localVue,
      propsData: {
        isActive: true,
        label
      }
    });

    const button = wrapper.find(".email-button");
    expect(button).toBeDefined();
    expect(button.classes()).toEqual(
      expect.arrayContaining(["text-white", "active-border"])
    );
    expect(wrapper.find(".q-btn__content").text()).toBe(label);
  });

  it("should emit click event on click", () => {
    const wrapper = mount(LoginFormButton, {
      localVue,
      propsData: {
        isActive: true,
        label: "Test"
      }
    });

    const button = wrapper.find(".email-button");
    button.trigger("click");

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
