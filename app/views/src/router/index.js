import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index";
import authService from "../services/auth.service";

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
      path: "/books",
      alias: "/books",
      name: "books",
      component: () => import("../pages/Books/index.vue")
    },
    {
      path: "/books/:id/:bookTitle",
      name: "book",
      component: () => import("../pages/Books/_id.vue")
    },
    {
      path: "/books/:id/chat",
      name: "book-chat",
      component: () => import("../pages/Chat/index.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../pages/Account/index.vue")
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../pages/Chat/index.vue")
    },
    {
      path: "/books/:id/chapters",
      name: "chapters",
      component: () => import("../pages/Books/Chapters/index.vue")
    },
    {
      path: "/books/:id/chapters/:chapterNum",
      name: "chapter",
      meta: { layout: "CustomLayout" },
      component: () => import("../pages/Books/Chapter/index.vue"),
      props: route => ({ key: route.fullPath }),
    },
    {
      path: "/admin/books/add",
      name: "book-adder",
      component: () => import("../pages/Books/addBooks.vue")
    }

  ]
})

router.beforeEach(async (to, from, next) => {
  const safeList = ["home", "signup", "about"];
  const adminList = ["book-adder"];

  if(!safeList.includes(to.name) && !adminList.includes(to.name)) {
    store.dispatch("auth/checkAccessToken")
      .then(() => {
        return true;
      })
      .catch(error => {
        console.log("Cannot access:", error?.response?.data?.message || error.message);
        return router.push({ name: "home" });
      })
  }

  if(adminList.includes(to.name)) {
    store.dispatch("auth/checkAdminAccess")
      .then((response) => {
        return true;
      })
      .catch(error => {
        console.log("Cannot access admin page:", error?.response?.data?.message || error.message);
        return router.push({ name: from.name || "home" });
      })
  }

  next();
});

export default router
