import sha256 from "crypto-js/sha256";
import { ApiRequestBundle } from "./index";
const encode = encodeURIComponent;

const Auth = (requests: ApiRequestBundle) => ({
  current: () => requests.get("/user/self"),
  login: (userCode: string, password: string) =>
    requests.get(
      `/login?userCode=${encode(userCode)}&password=${encode(
        sha256(password).toString()
      )}`
    )
});

export default Auth;
