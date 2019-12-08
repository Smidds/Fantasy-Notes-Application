/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import loadingMixin from "../../../../src/mixins/loading";
import QSpinnerDots from "quasar";

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

    const cancelInterval = activateLoader({ displayFn: mockDisplayFn });
    cancelInterval();

    expect(mockDisplayFn).toBeCalledTimes(1);
    expect(mockDisplayFn).toBeCalledWith(spinner);
  });

  it("properly displays with overrides", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    const mockDisplayFn = jest.fn();

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
      displayFn: mockDisplayFn
    };

    const cancelInterval = activateLoader(params);
    cancelInterval();

    expect(mockDisplayFn).toBeCalledTimes(1);
    expect(mockDisplayFn).toBeCalledWith(expectedSpinner);
  });

  it("loops exactly 3 times", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    let numTimesLooped = 0;
    let mockShow;

    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5",
      message: "Test message!"
    };

    const test = new Promise(resolve => {
      mockShow = jest.fn(() => {
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
        displayFn: mockShow
      };

      const cancelInterval = activateLoader(params);
    });

    return test.then(() => {
      expect(mockShow).toBeCalledTimes(3);
      expect(mockShow).toBeCalledWith(expectedSpinner);
    });
  });

  it("does dummy testing", () => {
    const testFn = jest.fn();
    testFn("Hello!");
    testFn("Goodbye!");

    expect(testFn).nthCalledWith(1, "Hello!");
    expect(testFn).nthCalledWith(2, "Goodbye!");
  });

  it("loops through messages in order", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    var numTimesLooped = 0;
    var mockShow;

    const messages = ["Test message 1", "Test message 2", "Test message 3"];
    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5"
    };

    const test = new Promise(resolve => {
      mockShow = jest.fn(() => {
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
        displayFn: mockShow
      };

      const cancelInterval = activateLoader(params);
    });

    return test.then(() => {
      expect(mockShow).toBeCalledTimes(3);
      expect(mockShow).nthCalledWith(1, {
        ...expectedSpinner,
        message: messages[0]
      });
      expect(mockShow).nthCalledWith(2, {
        ...expectedSpinner,
        message: messages[1]
      });
      expect(mockShow).nthCalledWith(3, {
        ...expectedSpinner,
        message: messages[2]
      });
    });
  });

  it("goes back to the beginning of the messages array", () => {
    const activateLoader = loadingMixin.methods.activateLoader;
    var numTimesLooped = 0;
    var mockShow;

    const messages = ["Test message 1", "Test message 2", "Test message 3"];
    const expectedSpinner = {
      spinner: QSpinnerDots,
      spinnerColor: "blue",
      messageColor: "warning",
      backgroundColor: "grey-5"
    };

    const test = new Promise(resolve => {
      mockShow = jest.fn(() => {
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
        displayFn: mockShow
      };

      const cancelInterval = activateLoader(params);
    });

    return test.then(() => {
      expect(mockShow).toBeCalledTimes(4);
      expect(mockShow).nthCalledWith(1, {
        ...expectedSpinner,
        message: messages[0]
      });
      expect(mockShow).nthCalledWith(2, {
        ...expectedSpinner,
        message: messages[1]
      });
      expect(mockShow).nthCalledWith(3, {
        ...expectedSpinner,
        message: messages[2]
      });
      expect(mockShow).nthCalledWith(4, {
        ...expectedSpinner,
        message: messages[0]
      });
    });
  });
});
