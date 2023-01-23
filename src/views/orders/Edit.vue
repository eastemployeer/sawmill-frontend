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
import ProductModify from './_Modifi.vue';

@Options({
  components: {
    ProductModify,
  },
})
export default class ProductEdit extends Vue {
  product: Product = {
    name: '', price: 0, availibility: 0, id: 0, type: '',
  };

  mounted() {
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  async loadProduct(id: any) {
    try {
      const data = await new API('get', `products/${id}`, {}).call();

      this.product = { ...data };
    } catch (error) {
      console.error('error', error);
    }
  }

  async updateProduct() {
    try {
      const data = await new API('patch', `products/${this.product.id}`, {
        body: this.product,
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
