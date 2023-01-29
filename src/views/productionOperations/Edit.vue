<template>
  <div>
    <ProductModify v-model="product" buttonLabel="Zapisz zmiany" :buttonOnClick="updateProduct" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Product } from '@/models/Product';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Axios from 'axios';
import ProductModify from './_Modifi.vue';

@Options({
  components: {
    ProductModify,
  },
})
export default class ProductEdit extends Vue {
  product: Product = {
    woodTypeName: '', price: 0, availableAmount: 0, productId: 0, productTypeName: '', woodTypeId: 1, productTypeId: 1,
  };

  productTypes = []

  woodTypes = []

  mounted() {
    this.loadProduct();
    this.setViewTitle();
  }

  async loadProduct() {
    try {
      const data = await new API('get', `Product/${this.$route.params.id}`, {}).call();
      this.product = { ...data };
      console.log(this.product);
    } catch (error) {
      console.error('error', error);
    }
  }

  async updateProduct() {
    try {
      console.log(this.product);
      const data = await new API('put', 'Product', {
        body: {
          productId: this.product.productId,
          price: Number(this.product.price),
          productTypeId: this.product.productTypeId,
          woodTypeId: this.product.woodTypeId,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wystąpił błąd, sprawdz wprowadzone dane');
      } else if (data.status === 201) {
        this.$router.back();
        alert('Zaktualizowano produkt');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Edycja produktu' });
  }
}
</script>

<style lang="scss" scoped>
.infoSegment {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
  width: 350px;
}

.button {
  display: flex;
  justify-content: center;
  width: 500px;
  margin: 51px 0;
}

#table {
  width: 500px;
}
</style>
