export default async ({ Vue, store }) => {
  const AUTH = Vue.prototype.$auth;

  return new Promise(resolve => {
    const unsubscribe = AUTH.onAuthStateChanged(user => {
      if (user) {
        store.dispatch("user/loginUser", user);
      }
      if (unsubscribe) {
        unsubscribe();
      }
      resolve();
    });
  });
};
