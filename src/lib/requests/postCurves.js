import testApiRequest from "../functions/testApiRequest";

export default async function loginRequest({ payload, ...rest }) {
  return testApiRequest({
    url: "curve/",
    method: "POST",
    payload: payload,
    ...rest,
  });
}
