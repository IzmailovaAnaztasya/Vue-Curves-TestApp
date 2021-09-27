import loginRequest from "../lib/requests/login";

const authModule = {
  state: () => ({
    token: null,
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, payload) {
      const { access } = await loginRequest(payload);
      commit("setToken", access);
    },
  },
  getters: {
    getAuthState(state) {
      return state.token;
    },
  },
};

export default authModule;
