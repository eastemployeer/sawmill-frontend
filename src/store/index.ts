import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import AuthModule, { AuthState } from './modules/AuthModule';
import CartModule, { CartState } from './modules/CartModule';

export interface RootState {
  auth: AuthState;
  cart: CartState;
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ['auth', 'cart'],
});

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: AuthModule,
    cart: CartModule,
  },
  plugins: [vuexLocal.plugin]
});
