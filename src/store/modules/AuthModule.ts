import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

import { AccountType, User } from '@/models/User';
import {
  AuthService, LoginKlientRequest, LoginPracownikRequest, LoginResponse,
} from '@/services/AuthService';

// eslint-disable-next-line no-shadow
export enum AuthAction {
  AttemptLogin = 'attemptLogin',
  Logout = 'logout',
}

export interface AuthState {
  token: string | null;
  currentUser: User | null;
  accountType: AccountType | null;
}

@Module
export default class AuthModule extends VuexModule<AuthState> {
    public token: string | null = null;

    public currentUser: User | null = null;

    public accountType: AccountType | null = null;

    get isAuthenticated(): boolean {
      return !!this.token;
    }

    @Mutation
    handleLogin(data: LoginResponse) {
      this.token = data.token;
      this.currentUser = data.user;
      this.accountType = data.accountType;
    }

    @Mutation
    handleLogout() {
      this.token = null;
      this.currentUser = null;
      this.accountType = null;
    }

    @Action({ rawError: true })
    async [AuthAction.AttemptLogin](data: LoginKlientRequest) {
      try {
        const response = await AuthService.loginKlient(data);
        if (response.status === 202) {
          this.context.commit('handleLogin', response);
        }
      } catch (error) {
        console.error('error', error);
      }
    }

    @Action({ rawError: true })
    private [AuthAction.Logout]() {
      this.context.commit('handleLogout');
    }
}
