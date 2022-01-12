import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/user/:id",
    name: "User",
    component: () => import("../views/User.vue"),
    props: (route) => ({ userId: route.params.id }),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      }
      next();
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      }
      next();
    },
  },
  {
    path: "/donate-blood",
    name: "DonateBlood",
    component: () => import("../views/DonateBlood.vue"),
  },
  {
    path: "/track-blood",
    name: "TrackBlood",
    component: () => import("../views/TrackBlood.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      }
      next();
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/Blog.vue"),
  },
  {
    path: "/donate",
    name: "Donate",
    component: () => import("../views/Donate.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../views/FAQ.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("../views/NotFound/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
