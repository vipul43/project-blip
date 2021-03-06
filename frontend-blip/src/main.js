import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";
import VueApexCharts from "vue-apexcharts";

Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

store.dispatch("auth/attempt", {
  token: JSON.parse(localStorage["blip-token"] || null),
  user: JSON.parse(localStorage["blip-user"] || null),
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
