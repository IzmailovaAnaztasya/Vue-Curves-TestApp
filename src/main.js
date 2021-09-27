import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Notifications
import Notifications from "vue-notification";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(Notifications);

new Vue({
  router,
  store,
  render: (h) => h(App),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Тестовое задание";
      },
    },
  },
}).$mount("#app");
