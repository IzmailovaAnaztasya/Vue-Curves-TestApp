import testApiRequest from "../functions/testApiRequest";

export default async function loginRequest({ username, password, ...rest }) {
  return testApiRequest({
    url: "user/token/",
    method: "POST",
    payload: { username, password },
    ...rest,
  });
}
