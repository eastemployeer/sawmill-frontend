import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

import { User } from '@/models/User';
import {
  AuthService, LoginRequest, LoginResponse,
} from '@/services/AuthService';

// eslint-disable-next-line no-shadow
export enum AuthAction {
  AttemptLogin = 'attemptLogin',
  Logout = 'logout',
}

export interface AuthState {
  token: string | null;
  currentUser: User | null;
}

@Module
export default class AuthModule extends VuexModule<AuthState> {
    public token: string | null = null;

    public refreshToken: string | null = null;

    public currentUser: User | null = null;

    get isAuthenticated(): boolean {
      return !!this.token;
    }

    @Mutation
    handleLogin(data: LoginResponse) {
      this.token = data.token;
      this.refreshToken = data.refreshToken;
      this.currentUser = {
        userId: data.userId,
        name: data.name,
        surname: data.surname,
        roleId: data.roleId,
      };
    }

    @Mutation
    handleLogout() {
      this.token = null;
      this.currentUser = null;
    }

    @Action({ rawError: true })
    async [AuthAction.AttemptLogin](data: LoginRequest) {
      try {
        const response = await AuthService.login(data);
        this.context.commit('handleLogin', response);
      } catch (error) {
        console.error('error', error);
      }
    }

    @Action({ rawError: true })
    private [AuthAction.Logout]() {
      this.context.commit('handleLogout');
    }
}
