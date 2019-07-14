import { fireApp } from "../boot/firebase";

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    fireApp.auth().onAuthStateChanged(user => {
      if (requiresAuth && !user) {
        next({
          name: "login",
          query: { redirect: to.fullPath }
        });
      } else if (user && to.name === "login") {
        next({
          name: "story-list"
        });
      } else {
        next();
      }
    });
  });
};
