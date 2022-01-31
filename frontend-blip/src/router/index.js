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
    path: "/user/signin",
    name: "UserSignIn",
    component: () => import("../views/User/Signin.vue"),
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
    path: "/user/signup",
    name: "UserSignUp",
    component: () => import("../views/User/Signup.vue"),
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
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        if (
          store.getters["auth/user"].role === "Partner" ||
          store.getters["auth/user"].role === "Admin"
        ) {
          return next({
            name: "Home",
          });
        }
        next();
      }
    },
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: () => import("../views/User/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        if (
          store.getters["auth/user"].role === "Partner" ||
          store.getters["auth/user"].role === "Admin"
        ) {
          return next({
            name: "Home",
          });
        }
        next();
      }
    },
  },
  {
    path: "/partner/signin",
    name: "PartnerSignIn",
    component: () => import("../views/Partner/Signin.vue"),
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
    path: "/partner/signup",
    name: "PartnerSignUp",
    component: () => import("../views/Partner/Signup.vue"),
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
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        if (
          store.getters["auth/user"].role === "User" ||
          store.getters["auth/user"].role === "Admin"
        ) {
          return next({
            name: "Home",
          });
        }
        next();
      }
    },
  },
  {
    path: "/partner/profile",
    name: "PartnerProfile",
    component: () => import("../views/Partner/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "Home",
        });
      } else {
        if (
          store.getters["auth/user"].role === "User" ||
          store.getters["auth/user"].role === "Admin"
        ) {
          return next({
            name: "Home",
          });
        }
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
