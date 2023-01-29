import API from './API';

export interface LoginResponse {
  userId: number;
  token: string;
  refreshToken: string;
  name: string;
  surname: string;
  roleId: number;
  status: number;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export class AuthService {
  public static async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await new API('post', 'SignIn/singIn', {
      query: {
        hashedPassword: data.password,
        loginName: data.login,
      },
    }).call(true);
    return res.data;
  }
}
