import { User } from '@/models/User';

import API from './API';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  status: number;
}

export interface LoginPracownikRequest {
  login: string;
  password: string;
}

export class AuthService {
  public static async loginPracownik(data: LoginPracownikRequest): Promise<LoginResponse> {
    const res = await new API('post', 'login/pracownik', {
      body: {
        password: data.password,
        login: data.login,
      },
    }).call(true);

    return res.data;
  }
}
