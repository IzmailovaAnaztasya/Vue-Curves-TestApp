import axios from "axios";
import Vue from "vue";

import store from "../../store";

const testApi = axios.create({
  baseURL: "https://omd-test-backend.herokuapp.com/",
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
  headers: {},
});

export default async function testApiRequest({
  url,
  method = "GET",
  payload = {},
  native = false,

  onRequest = () => {},
  onSuccess = () => {},
  onError = () => {},
}) {
  try {
    onRequest();
    const token = store.getters.getAuthState;
    console.log(token);
    const result = await testApi({
      url,
      method,
      data: payload,
      headers: { Authorization: `JWT ${token}` },
    });
    onSuccess();
    return native ? result : result.data;
  } catch (error) {
    onError(error.response);
    console.log(error);
    Vue.notify({
      type: "error",
      title: "Что то пошло не так",
      text: error.message,
    });
  }
}
