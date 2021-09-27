import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true, title: "Главная страница" },
  },
  {
    path: "/login",
    name: "Authorization",
    component: Login,
    meta: { title: "Логин" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.getAuthState) {
      next({
        path: "/login",
      });
    }
    next();
  } else {
    next();
  }
});

export default router;
