import testApiRequest from "../functions/testApiRequest";

export default async function loginRequest({ ...rest }) {
  return testApiRequest({
    url: "curve/",
    method: "GET",
    ...rest,
  });
}
