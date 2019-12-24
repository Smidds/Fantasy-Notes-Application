/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import loadingMixin from "../../../../src/mixins/loading";
import { QSpinnerDots } from "quasar";

describe("Test Loading Mixin", () => {
  it("properly displays defaults", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    const spinner = {
      spinner: QSpinnerDots,
      spinnerColor: "info",
      messageColor: "primary",
      backgroundColor: "grey-5",
      message: "Loading content..."
    };
    const mockDisplayFn = jest.fn();
    const mockHideFn = jest.fn();

    const cancelInterval = activateLoader({ displayFn: mockDisplayFn, hideFn: mockHideFn, messages: ["Loading content..."] });
    cancelInterval();

    expect(mockDisplayFn).toBeCalledTimes(1);
    expect(mockDisplayFn).toBeCalledWith(spinner);
    expect(mockHideFn).toBeCalledTimes(1);
  });

  it("properly displays with overrides", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    const mockDisplayFn = jest.fn();
    const mockHideFn = jest.fn();

    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5",
      message: "Test message!"
    };

    const params = {
      spinnerOverrides: {
        spinnerColor: "blue",
        messageColor: "warning"
      },
      messages: ["Test message!"],
      displayFn: mockDisplayFn,
      hideFn: mockHideFn
    };

    const cancelInterval = activateLoader(params);
    cancelInterval();

    expect(mockDisplayFn).toBeCalledTimes(1);
    expect(mockDisplayFn).toBeCalledWith(expectedSpinner);
    expect(mockHideFn).toBeCalledTimes(1);
  });

  it("loops exactly 3 times", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    const mockHideFn = jest.fn();
    let numTimesLooped = 0;
    let mockDisplayFn;

    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5",
      message: "Test message!"
    };

    const test = new Promise(resolve => {
      mockDisplayFn = jest.fn(() => {
        if (numTimesLooped === 2) {
          cancelInterval();
          resolve();
        }

        numTimesLooped++;
      });

      const params = {
        spinnerOverrides: {
          spinnerColor: "blue",
          messageColor: "warning"
        },
        messages: ["Test message!"],
        loopTime: 20,
        displayFn: mockDisplayFn,
        hideFn: mockHideFn
      };

      const cancelInterval = activateLoader(params);
    });

    return test.then(() => {
      expect(mockDisplayFn).toBeCalledTimes(3);
      expect(mockDisplayFn).toBeCalledWith(expectedSpinner);
      expect(mockHideFn).toBeCalledTimes(1);
    });
  });

  it("loops through messages in order", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    const mockHideFn = jest.fn();
    var numTimesLooped = 0;
    var mockDisplayFn;

    const messages = ["Test message 1", "Test message 2", "Test message 3"];
    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5"
    };

    const test = new Promise(resolve => {
      mockDisplayFn = jest.fn(() => {
        if (numTimesLooped === 2) {
          cancelInterval();
          resolve();
        }

        numTimesLooped++;
      });

      const params = {
        spinnerOverrides: {
          spinnerColor: "blue",
          messageColor: "warning"
        },
        messages,
        loopTime: 20,
        displayFn: mockDisplayFn,
        hideFn: mockHideFn
      };

      const cancelInterval = activateLoader(params);
    });

    return test.then(() => {
      expect(mockDisplayFn).toBeCalledTimes(3);
      expect(mockDisplayFn).nthCalledWith(1, {
        ...expectedSpinner,
        message: messages[0]
      });
      expect(mockDisplayFn).nthCalledWith(2, {
        ...expectedSpinner,
        message: messages[1]
      });
      expect(mockDisplayFn).nthCalledWith(3, {
        ...expectedSpinner,
        message: messages[2]
      });
      expect(mockHideFn).toBeCalledTimes(1);
    });
  });

  it("goes back to the beginning of the messages array", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    const mockHideFn = jest.fn();
    var numTimesLooped = 0;
    var mockDisplayFn;

    const messages = ["Test message 1", "Test message 2", "Test message 3"];
    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5"
    };

    const test = new Promise(resolve => {
      mockDisplayFn = jest.fn(() => {
        if (numTimesLooped === 3) {
          cancelInterval();
          resolve();
        }

        numTimesLooped++;
      });

      const params = {
        spinnerOverrides: {
          spinnerColor: "blue",
          messageColor: "warning"
        },
        messages,
        loopTime: 20,
        displayFn: mockDisplayFn,
        hideFn: mockHideFn
      };

      const cancelInterval = activateLoader(params);
    });

    return test.then(() => {
      expect(mockDisplayFn).toBeCalledTimes(4);
      expect(mockDisplayFn).nthCalledWith(1, {
        ...expectedSpinner,
        message: messages[0]
      });
      expect(mockDisplayFn).nthCalledWith(2, {
        ...expectedSpinner,
        message: messages[1]
      });
      expect(mockDisplayFn).nthCalledWith(3, {
        ...expectedSpinner,
        message: messages[2]
      });
      expect(mockDisplayFn).nthCalledWith(4, {
        ...expectedSpinner,
        message: messages[0]
      });
      expect(mockHideFn).toBeCalledTimes(1);
    });
  });
});
