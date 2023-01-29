<template>
  <div class="viewPadding">
    <div class="infoSegment">
      <div class='column'>
        <div>
          <div class="textInfoLabel">Rodzaj drewna</div>
          <div class="textInfoValue">{{ product.woodTypeName }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Cena za m3</div>
          <div class="textInfoValue">{{ product.price + ' zł' }}</div>
        </div>
        <Input v-model="amount" inputType="number" label="Ilość" placeholder="500" />
      </div>
      <div class='column'>
        <div>
          <div class="textInfoLabel">Typ produktu</div>
          <div class="textInfoValue">{{ product.productTypeName }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Dostępność</div>
          <div class="textInfoValue">{{ product.availableAmount }}</div>
        </div>
        <div>
          <div class="textInfoLabel">Id produktu</div>
          <div class="textInfoValue">{{ product.productId }}</div>
        </div>
        <b-button class="addBtn" v-if="!isProductInCart" v-on:click='addToCart' variant="primary"
          :disabled="!product.availableAmount">Dodaj do
          zamówienia</b-button>
        <b-button class="addBtn" v-else disabled variant="outline-secondary">Produkt jest już w zamówieniu</b-button>
      </div>
      <div>
        <b-button v-on:click='editProduct' variant="primary">Edytuj produkt</b-button>
        <b-button v-on:click='removeProduct' variant="danger" :style="{ marginLeft: '25px' }">Usuń produkt</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Product } from '@/models/Product';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';
import { CartAction } from '@/store/modules/CartModule';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Input,
  },
})
export default class ProductDetails extends Vue {
  product: Product = {
    woodTypeName: '', price: 0, availableAmount: 0, productId: 0, productTypeName: '', woodTypeId: 1, productTypeId: 1,
  };

  fields = [
    { key: 'label', label: 'Nazwa cechy' },
    { key: 'value', label: 'Wartość' },
  ];

  amount = 0;

  isProductInCart = false;

  mounted() {
    store.dispatch(CartAction.IsProductInCart, this.$route.params.id).then((result) => {
      this.isProductInCart = result;
    });
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  addToCart() {
    if (!this.amount) return;

    store.commit('addToCart', { ...this.product, amount: this.amount });
    alert('Dodano produkt do koszyka');
  }

  editProduct() {
    this.$router.push({ name: 'ProductEdit', params: { id: String(this.product.productId) } });
  }

  async removeProduct() {
    try {
      const data = await new API('delete', `Product/${this.product.productId}`, {}).call(true);

      if (data.status === 200) {
        this.$router.back();
      } else {
        alert('Usuwanie nie powiodło się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async loadProduct(id: any) {
    try {
      const data = await new API('get', `Product/${id}`, {}).call();
      this.product = { ...data };
      console.log(this.product);
    } catch (error) {
      console.error('error', error);
    }
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Szczegóły produktu' });
  }
}
</script>

<style lang="scss" scoped>
.infoSegment {
  display: flex;
  width: 100%;
}

.inputComponent {
  margin-top: auto;
  max-width: 185px;
}

.addBtn {
  max-width: 185px;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5em;
}

.button {
  display: flex;
  justify-content: space-between;
  flex: 2;
}

#table {
  width: 500px;
}
</style>
