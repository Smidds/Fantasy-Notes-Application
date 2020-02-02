const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout"),
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
      }
    ]
  },
  {
    path: "/story/:id",
    name: "story-id",
    component: () => import("layouts/StoryLayout"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/note/:id",
        name: "note-id",
        component: () => import("pages/story/Note")
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
