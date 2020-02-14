import { ApiRequestBundle } from "./index";

const User = (requests: ApiRequestBundle) => ({
  single: (userCode: string) => requests.get(`/user/single/${userCode}`),
  deactivate: (userCode: string) =>
    requests.delete(`/user/deactivate/${userCode}`)
});

export default User;
