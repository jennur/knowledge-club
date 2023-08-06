import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/",
      name: "home",
      component: () => import("../pages/HomeView.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../pages/About/index.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../pages/SignUp/index.vue")
    },
    {
      path: "/account",
      name: "account",
      meta: { layout: "AccountLayout" },
      component: () => import("../pages/Account/index.vue")
    },
    {
      path: "/account/settings",
      name: "account-settings",
      meta: { layout: "AccountLayout" },
      component: () => import("../pages/Account/Settings/index.vue")
    },
    {
      path: "/account/saved-books",
      name: "account-saved-books",
      meta: { layout: "AccountLayout" },
      component: () => import("../pages/Account/SavedBooks/index.vue")
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../pages/Chat/index.vue")
    },
    {
      path: "/books",
      alias: "/books",
      name: "books",
      component: () => import("../pages/Books/index.vue")
    },
    {
      path: "/books/:category",
      name: "category",
      component: () => import("../pages/Books/Category/_category.vue")
    },
    {
      path: "/books/:category/:id/chapters",
      name: "category-chapters",
      component: () => import("../pages/Books/Chapters/index.vue")
    },
    {
      path: "/books/:category/:id",
      name: "category-book",
      component: () => import("../pages/Books/_id.vue")
    },
    {
      path: "/books/:id",
      name: "book",
      component: () => import("../pages/Books/_id.vue")
    },
    {
      path: "/books/:id/chat",
      name: "book-chat",
      component: () => import("../pages/Chat/index.vue")
    },
    {
      path: "/books/:id/chapters",
      name: "chapters",
      component: () => import("../pages/Books/Chapters/index.vue")
    },
    {
      path: "/books/:category/:id/chapters/:chapterNum",
      name: "category-chapter",
      meta: { layout: "CustomLayout" },
      component: () => import("../pages/Books/Chapter/index.vue"),
      props: route => ({ key: route.fullPath }),
    },
    {
      path: "/books/:id/chapters/:chapterNum",
      name: "chapter",
      meta: { layout: "CustomLayout" },
      component: () => import("../pages/Books/Chapter/index.vue"),
      props: route => ({ key: route.fullPath }),
    },
    {
      path: "/admin/books",
      name: "book-manager",
      component: () => import("../pages/Books/bookManager.vue")
    }

  ]
})

router.beforeEach(async (to, from, next) => {
  const safeList = ["home", "signup", "about"];
  const adminList = ["book-manager"];

  if(!safeList.includes(to.name) && !adminList.includes(to.name)) {
    store.dispatch("auth/checkAccessToken")
      .then(() => true)
      .catch(() => router.push({ name: "home" }))
  }

  if(adminList.includes(to.name)) {
    store.dispatch("auth/checkAdminAccess")
      .then(() => true)
      .catch(() => router.push({ name: from.name || "home" }))
  }

  next();
});

export default router
