export default async ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    var isUserAuthenticated = store.getters["auth/isUserAuthenticated"];

    if (requiresAuth && !isUserAuthenticated) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else if (isUserAuthenticated && to.name === "login") {
      next({
        name: "story-list"
      });
    } else {
      next();
    }
  });
};
