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
      <v-btn icon to="/login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs centered slider-color="#222831" show-arrows>
          <v-tab v-for="(tab, i) in tabs" :to="tab.src" :key="i">
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
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
};
</script>
