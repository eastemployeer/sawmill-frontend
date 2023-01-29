import {
  Action,
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

import { Product } from '@/models/Product';

// eslint-disable-next-line no-shadow
export enum CartAction {
  IsProductInCart = 'isProductInCart'
}

export interface CartElement extends Product {
  amount: number;
}

export interface CartState {
  products: CartElement[];
}

@Module
export default class CartModule extends VuexModule<CartState> {
    public products: CartElement[] = [];

    @Mutation
    private addToCart(data: CartElement) {
      this.products.push(data);
    }

    @Action
    private async [CartAction.IsProductInCart](productId: number) {
      return this.products.some((product) => product.productId === productId);
    }

    @Mutation
    private removeFromCart(data: CartElement) {
      const index = this.products.findIndex((object) => object.productId === data.productId);
      this.products.splice(index, 1);
    }

    @Mutation
    private clearCart() {
      this.products = [];
    }
}
