export default async ({ Vue, store }) => {
  const AUTH = Vue.prototype.$auth;

  return new Promise(resolve => {
    const unsubscribe = AUTH.onAuthStateChanged(async user => {
      if (user) {
        await store.dispatch("user/loginUser", user);
      }
      if (unsubscribe) {
        unsubscribe();
      }
      resolve();
    });
  });
};
