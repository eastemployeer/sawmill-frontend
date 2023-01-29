<template>
  <div class="container">
    <div class="view list text-center">
      <b-table sticky-header hover head-variant="light" id="my-table" :fields="fields" :items="products"
        :busy="isLoading">
        <template #table-busy>
          <div class="text-center text-danger">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Ładowanie...</strong>
          </div>
        </template>

        <template #cell(price)="data">
          <div class="text-center">
            {{ data.value + " zł" }}
          </div>
        </template>

        <template #cell(full_price)="data">
          <div class="text-center">
            {{ data.item.price * data.item.amount + " zł" }}
          </div>
        </template>

        <template #cell(id)="data">
          <b-icon-trash v-on:click="deleteItem(data.item)" variant="danger" scale="1.5" />
        </template>
      </b-table>
    </div>
    <div class="contentContainer">
      <div>
        <div class="textInfoLabel">Klient</div>
        <div class="textInfoValue">
          <b-form-select labelField="Klient" variant="outline-primary" :options="clientsOptions"
            v-model="selectedClient" />
        </div>
      </div>
      <div>
        <div class="textInfoLabel">Suma zamówienia</div>
        <div class="textInfoValue">{{ totalPrice }} zł</div>
      </div>
    </div>
    <div class="btnStyle">
      <button type="button" class="btn btn-primary " v-on:click="create">Stwórz zamówienie</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';

import { Product } from '@/models/Product';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';
import { CartElement } from '@/store/modules/CartModule';
import { BIconTrash } from 'bootstrap-icons-vue';
import {
  BTable, BSpinner, BDropdown, BDropdownItem,
} from 'bootstrap-vue-next';
import Input from '@/components/Input.vue';
import { Client } from '@/models/Client';

@Options({
  components: {
    Input,
  },
})
export default class MyCart extends Vue {
  takeDate: Date = new Date('2021-01-11T00:01:01Z');

  giveBackDate: Date = new Date('2021-01-12T00:01:01Z');

  currentPage = 1;

  totalRows = 0;

  value = 0;

  isLoading = false;

  products: CartElement[] = [];

  clients: Client[] = [];

  selectedClient?: Client;

  get clientsOptions() {
    return this.clients.map((client) => ({ value: client, text: `${client.firstName} ${client.lastName}` }));
  }

  fields = [
    { key: 'woodTypeName', label: 'Rodzaj drewna' },
    { key: 'price', label: 'Cena za m3' },
    { key: 'productTypeName', label: 'Typ produktu' },
    { key: 'amount', label: 'Ilość' },
    { key: 'full_price', label: 'Łączna cena' },
    { key: 'id', label: '' },
  ];;

  mounted() {
    this.setViewTitle();
    this.loadProducts();
    this.loadClients();
  }

  get totalPrice() {
    this.products.forEach((product) => {
      this.value += product.price * product.amount;
    });
    return this.value;
  }

  async create() {
    const orderDetails = this.products.map((product) => ({ productId: product.productId, amount: product.amount }));
    try {
      const data = await new API('post', 'order', {
        body: {
          clientId: 1,
          orderDetails,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wprowadzono błędne dane');
      } else if (data.status === 201) {
        store.commit('clearCart');
        this.$router.replace({ name: 'RentalsList' });
        alert('Stworzono rezerwacje');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  deleteItem(product: Product) {
    store.commit('removeFromCart', product);
    this.loadProducts();
    this.value = 0;
  }

  async loadClients() {
    try {
      const data = await new API('get', 'client').call();
      this.clients = data;
    } catch (error) {
      console.error('error', error);
    }
  }

  loadProducts() {
    this.products = store.state.cart.products;
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Aktualne zamówienie' });
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 24px;
}

.contentContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 30px;
  gap: 90px;
}

.messageBox {
  box-sizing: border-box;
  width: 378px;
  height: 126px;
  padding: 16px;

  /* Daybreak Blue / blue-1 */
  background: #E6F7FF;

  /* Daybreak Blue / blue-3 */
  border: 1px solid #91D5FF;
  border-radius: 4px;
}

.btnStyle {
  display: block;
  margin-top: auto;
  margin-left: auto;
  margin-bottom: 35px;
}

table {
  margin-bottom: 0;
}

.view {
  height: unset;
}

.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}
</style>
