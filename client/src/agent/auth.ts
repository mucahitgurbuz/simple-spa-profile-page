import sha256 from 'crypto-js/sha256';
import { ApiRequestBundle } from './index';
const encode = encodeURIComponent;

const Auth = (requests: ApiRequestBundle) => ({
  current: () => requests.get('/user/self'),
  login: (userCode: string, password: string) =>
    requests.get(`/login?userCode=${encode(userCode)}&password=${encode(sha256(password).toString())}`),
  register: (fName: string, lName: string, email: string, userCode: string, password: string, avatar: File) => {
    const fd = new FormData();
    fd.append('fName', fName);
    fd.append('lName', lName);
    fd.append('email', email);
    fd.append('userCode', userCode);
    fd.append('password', sha256(password).toString());
    fd.append('avatar', avatar);

    return requests.post('/user', fd);
  },
});

export default Auth;
