import loginRequest from "../lib/requests/login";
import Vue from "vue";

import getCurves from "../lib/requests/getCurves";
import postCurves from "../lib/requests/postCurves";

const curveModule = {
  state: () => ({
    triggerCounter: 0,
    errors: new Map(),
    isFetching: false,
    dataSet: [],
  }),
  mutations: {
    setDataSet(state, payload) {
      state.dataSet = payload;
    },
    addRow(state) {
      const lastElement =
        state.dataSet.length !== 0
          ? state.dataSet[state.dataSet.length - 1]
          : {};
      const { unit = 0, reach = new Array(10).fill(0) } = lastElement;
      state.dataSet.push({ unit: unit + 10000, reach: [...reach] });
      ++state.triggerCounter;
    },
    deleteRow(state, unit) {
      state.dataSet.pop();
      ++state.triggerCounter;
    },
    changeReachValue(state, { unitIndex, reachIndex, value }) {
      state.dataSet[unitIndex].reach[reachIndex] = !value ? "" : Number(value);
      state.dataSet[unitIndex].reach = [...state.dataSet[unitIndex].reach];
      ++state.triggerCounter;
    },
    addError(state, { path }) {
      state.errors.set(path, false);
    },
    deleteError(state, { path }) {
      state.errors.delete(path);
    },
    setIsFetching(state, newState) {
      state.isFetching = newState;
    },
  },
  actions: {
    async initData({ commit }) {
      const result = await getCurves({
        onRequest: () => commit("setIsFetching", true),
        onSuccess: () => commit("setIsFetching", false),
        onError: () => commit("setIsFetching", false),
      });
      commit("setDataSet", result);
    },
    async saveData({ state, commit }) {
      console.log(state.errors);
      if (state.errors.size !== 0) {
        return Vue.notify({
          title: "Что то пошло не так !",
          type: "error",
          text: "Перед сохранением данных исправьте все ошибки",
          ignoreDuplicates: true,
        });
      }
      await postCurves({
        payload: state.dataSet,
        onRequest: () => commit("setIsFetching", true),
        onSuccess: () => {
          Vue.notify({
            title: "Успех!",
            type: "success",
            text: "Данные успешно записаны",
            ignoreDuplicates: true,
          });
          commit("setIsFetching", false);
        },
        onError: () => commit("setIsFetching", false),
      });
    },
    async login({ commit }, payload) {
      const { access } = await loginRequest(payload);
      commit("setToken", access);
    },

    changeReachValue({ commit, dispatch }, { unitIndex, reachIndex, value }) {
      commit("changeReachValue", { unitIndex, reachIndex, value });
      dispatch("validateField", { unitIndex });
    },

    validateField({ commit, state }, { unitIndex }) {
      const reachArr = state.dataSet[unitIndex].reach;
      reachArr.forEach((reach, index, arr) => {
        if (!index) return;
        const previusReach = arr[index - 1];
        if (reach >= previusReach) {
          Vue.notify({
            title: "Что то пошло не так !",
            type: "error",
            text: "Значения должны убывать",
            ignoreDuplicates: true,
          });
          return commit("addError", { path: `${unitIndex}.${index}` });
        }
        if (typeof reach === "string") {
          Vue.notify({
            title: "Что то пошло не так !",
            type: "error",
            text: "Значения не должны быть пустыми",
            ignoreDuplicates: true,
          });
          return commit("addError", { path: `${unitIndex}.${index}` });
        }
        // В любом случае удаляем пробуем удалить ошибку если новая ошибка не сформирована
        return commit("deleteError", { path: `${unitIndex}.${index}` });
      });
    },
  },
  getters: {
    getDataSet(state) {
      return state.dataSet;
    },
    getTrigger(state) {
      return state.triggerCounter;
    },
    getFieldError: (state) => {
      return ({ unitIndex, reachIndex }) => {
        return state.errors.get(`${unitIndex}.${reachIndex}`);
      };
    },
    getCurvesFetchState(state) {
      return state.isFetching;
    },
  },
};

export default curveModule;
