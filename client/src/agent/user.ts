import sha256 from 'crypto-js/sha256';
import { ApiRequestBundle } from './index';

const User = (requests: ApiRequestBundle) => ({
  save: (userCode: string, fName: string, lName: string, avatar?: File) => {
    const fd = new FormData();

    fd.append('userCode', userCode); // need to know which user to update
    fd.append('fName', fName);
    fd.append('lName', lName);
    if (avatar) {
      // avatar doesnt have to be changed
      fd.append('avatar', avatar);
    }

    return requests.put('/user', fd);
  },
  updatePassword: (newPassword: string) =>
    requests.put('/user/password', {
      newPassword: sha256(newPassword).toString(),
    }),
  single: (userCode: string) => requests.get(`/user/single/${userCode}`),
  deactivate: (userCode: string) => requests.delete(`/user/deactivate/${userCode}`),

});

export default User;
