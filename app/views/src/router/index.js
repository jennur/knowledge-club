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
      path: "/signup",
      name: "signup",
      component: () => import("../pages/Signup/index.vue")
    },
    {
      path: "/books",
      alias: "/books",
      name: "books",
      component: () => import("../pages/Books/index.vue")
    },
    {
      path: "/books/:id",
      name: "book-details",
      component: () => import("../pages/Books/_id.vue")
    },
    {
      path: "/books/:id/chat",
      name: "book-chat",
      component: () => import("../pages/Chat/index.vue")
    },
    {
      path: "/books/add",
      name: "add",
      component: () => import("../pages/AddBook/index.vue")
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

  ]
})

router.beforeEach(async (to, from, next) => {
  const safeList = ["home", "signup", "about"];

  if(!safeList.includes(to.name)) {
    store.dispatch("auth/checkAccessToken")
    .then(() => {
      return true;
    })
    .catch(error => {
      console.log("Cannot access:", error?.response?.data?.message || error.message);
      return { name: "home" };
    })
  }
  next();
});

export default router
