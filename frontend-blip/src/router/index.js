import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: ["/home"],
    name: "Home",
    component: Home,
  },
  {
    path: "/admin/signin",
    alias: ["/admin"],
    name: "AdminSignIn",
    component: () => import("../views/Admin/Signin.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/Admin/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["auth/authenticated"] &&
        store.getters["auth/user"].role === "Admin"
      ) {
        next();
      } else {
        return next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/admin/profile",
    name: "AdminProfile",
    component: () => import("../views/Admin/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["auth/authenticated"] &&
        store.getters["auth/user"].role === "Admin"
      ) {
        next();
      } else {
        return next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/user/login",
    name: "UserLogIn",
    component: () => import("../views/User/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/user/dashboard",
    name: "UserDashboard",
    component: () => import("../views/User/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["auth/authenticated"] &&
        store.getters["auth/user"].role === "User"
      ) {
        next();
      } else {
        return next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: () => import("../views/User/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["auth/authenticated"] &&
        store.getters["auth/user"].role === "User"
      ) {
        next();
      } else {
        return next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/user/reset-password",
    name: "UserResetPassword",
    component: () => import("../views/User/ResetPassword.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        console.log(to.query);
        next();
      }
    },
  },
  {
    path: "/partner/login",
    name: "PartnerLogIn",
    component: () => import("../views/Partner/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/partner/dashboard",
    name: "PartnerDashboard",
    component: () => import("../views/Partner/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["auth/authenticated"] &&
        store.getters["auth/user"].role === "Partner"
      ) {
        next();
      } else {
        return next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/partner/profile",
    name: "PartnerProfile",
    component: () => import("../views/Partner/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["auth/authenticated"] &&
        store.getters["auth/user"].role === "Partner"
      ) {
        next();
      } else {
        return next({
          name: "Home",
        });
      }
    },
  },
  {
    path: "/partner/reset-password",
    name: "PartnerResetPassword",
    component: () => import("../views/Partner/ResetPassword.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/donate-blood",
    name: "DonateBlood",
    component: () => import("../views/DonateBlood.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "UserSignUp",
        });
      } else {
        next();
      }
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
