const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/story-list"
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/auth/Login"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/story-list",
        name: "story-list",
        component: () => import("pages/story-list/Index"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/story/:id",
        name: "story-id",
        component: () => import("pages/story/Id"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
