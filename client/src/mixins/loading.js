import QSpinnerDots from "quasar";

export default {
  methods: {
    activateLoader({
      spinnerOverrides = {},
      messages = ["Loading content..."],
      randomize = false,
      loopTime = 2000,
      displayFn = this.$q.loading.show
    }) {
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
      };
    }
  }
};
