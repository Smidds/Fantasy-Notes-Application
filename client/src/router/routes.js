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
        path: "login",
        name: "login",
        component: () => import("pages/auth/Login"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "story-list",
        name: "story-list",
        component: () => import("pages/story/StoryList"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "story/:sid",
        component: () => import("pages/story/NoteListWrapper"),
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "personal",
            component: () => import("pages/story/PersonalList")
          },
          {
            path: "party",
            component: () => import("pages/story/PartyList")
          },
          {
            path: "shared-with-me",
            component: () => import("pages/story/SharedList")
          },
          {
            path: "player/:uid",
            component: () => import("pages/story/Character")
          }
        ]
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
