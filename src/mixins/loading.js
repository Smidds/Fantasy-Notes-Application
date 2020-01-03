import { QSpinnerDots, Loading } from "quasar";

export const defaultLoaderMessages = [
  "Sharpening swords...",
  "Readying phasers...",
  "Storming the castle...",
  "Crawling the dungeons...",
  "Combing the archives...",
  "Checking the corners...",
  "Vanquishing evil..."
];

/**
 *
 * @param {Object} param.spinnerOverrides The overrides to apply to the QSpinner
 * @param {Array} param.messages The array of messages to iterate through
 * @param {Boolean} param.randomize Whether to randomize which message is shown, or show in order given
 * @param {Number} param.loopTime The time to wait between changing the message
 * @param {Function} param.displayFn The function to call with the spinner configuration
 */
export const activateLoader = (overrides = {}) => {
  const {
    spinnerOverrides = {},
    messages = defaultLoaderMessages,
    randomize = true,
    loopTime = 1500,
    displayFn = Loading.show.bind(this),
    hideFn = Loading.hide.bind(this)
  } = overrides;
  var firstMessage = randomize
    ? messages[Math.floor(Math.random() * messages.length)]
    : messages[0];

  const spinnerDefaults = {
    spinner: QSpinnerDots,
    spinnerColor: "info",
    messageColor: "primary",
    backgroundColor: "grey-5"
  };

  var spinnerConfig = Object.assign(spinnerDefaults, spinnerOverrides, {
    message: firstMessage
  });

  displayFn(spinnerConfig);

  let index = 1;
  const interval = setInterval(() => {
    if (index === messages.length) {
      index = 0;
    }

    let newMessage = randomize
      ? messages[Math.floor(Math.random() * messages.length)]
      : messages[index];

    displayFn({ ...spinnerConfig, message: newMessage });
    index++;
  }, loopTime);

  // Return a cancellation function that will terminate the interval
  return () => {
    clearInterval(interval);
    hideFn();
  };
};

export default {
  methods: {
    activateLoader
  }
};
