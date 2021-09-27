import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import authModule from "./auth";
import curveModule from "./curve";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { authModule, curveModule },
  plugins: [createPersistedState({ paths: ["authModule"] })],
});
