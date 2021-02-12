import HttpApi from './HttpApi';

import { SignInDto, SignUpDto } from 'api/types/auth';

class AuthApi extends HttpApi {
  signIn = (data: SignInDto) => {
    return this.post<string>('/sign-in', data);
  };

  signUp = (data: SignUpDto) => {
    return this.post<string>('/sign-up', data);
  };
}

export default new AuthApi('/api/auth');
