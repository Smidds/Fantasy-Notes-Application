import firebase from "firebase/app";
import "firebase/auth";

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    var currentUser = firebase.auth().currentUser;

    console.log(currentUser);

    if (requiresAuth && !currentUser) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else if (currentUser && to.name === "login") {
      next({
        name: "story-list"
      });
    } else {
      next();
    }
  });
};
