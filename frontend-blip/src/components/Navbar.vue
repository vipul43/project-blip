<template>
  <div id="navbar">
    <v-app-bar elevate-on-scroll color="#fd7014" dark dense>
      <v-app-bar-nav-icon class="pa-1">
        <v-img
          src="https://vipul43.sirv.com/projectblip/logos/logo-v2-color-300dpi.png"
          height="40px"
          width="10px"
        ></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pr-16">BLiP</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="authenticated" key="logged" left bottom close-on-click>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="red" size="36" v-bind="attrs" v-on="on">
            <span class="white--text text-h5">{{
              user.firstName[0] + user.lastName[0]
            }}</span>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item to="/user/settings">
            <v-list-item-title>Account Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu v-else key="default" left bottom close-on-click>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/user/signin">
            <v-list-item-title>User Sign In</v-list-item-title>
          </v-list-item>
          <v-list-item to="/user/signup">
            <v-list-item-title>User Sign Up</v-list-item-title>
          </v-list-item>
          <v-list-item to="/partner/signin">
            <v-list-item-title>Partner Sign In</v-list-item-title>
          </v-list-item>
          <v-list-item to="/partner/signup">
            <v-list-item-title>Partner Sign Up</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs centered slider-color="#222831" show-arrows>
          <v-tab v-for="(tab, i) in tabs" :key="i" :to="tab.src">
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  components: {},
  data: () => ({
    tabs: [
      {
        title: "Home",
        src: "/",
      },
      {
        title: "Blog",
        src: "/blog",
      },
      {
        title: "Donate",
        src: "/donate",
      },
      {
        title: "FAQ",
        src: "/faq",
      },
      {
        title: "About",
        src: "/about",
      },
      {
        title: "Contact Us",
        src: "/contact",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      token: "auth/token",
    }),
  },
  watch: {
    authenticated: {
      handler(authenticated) {
        if (authenticated && this.tabs.length == 6) {
          this.tabs = this.tabs.concat({
            title: "Dashboard",
            src: "/user/dashboard",
          });
        } else if (!authenticated && this.tabs.length == 7) {
          this.tabs.splice(this.tabs.length - 1, 1);
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      invalidate: "auth/invalidate",
    }),
    signOut() {
      this.invalidate({ credentials: this.user, userType: "User" })
        .then(() => {
          this.$router.replace({
            name: "UserSignIn",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
