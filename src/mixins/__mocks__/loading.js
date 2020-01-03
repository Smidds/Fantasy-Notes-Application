export const cancelFunction = jest.fn();

export const activateLoader = jest.fn(() => cancelFunction);

export default {
  methods: {
    activateLoader
  }
};
