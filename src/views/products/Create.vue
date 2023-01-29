<template>
  <div>
    <ProductModify v-model="newProduct" buttonLabel="Dodaj nowy produkt" :buttonOnClick="createProduct" />
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
export default class ProductCreate extends Vue {
  newProduct: Product = {
    woodTypeName: '', price: 0, availableAmount: 0, productId: 0, productTypeName: '', woodTypeId: 1, productTypeId: 1,
  };

  mounted() {
    this.setViewTitle();
  }

  async createProduct() {
    try {
      const data = await new API('post', 'Product', {
        body: {
          price: Number(this.newProduct.price),
          productTypeId: this.newProduct.productTypeId,
          woodTypeId: this.newProduct.woodTypeId,
        },
      }).call(true);
      console.log(data.status);
      if (data.status === 400) {
        alert('Wprowadzono błędne dane');
      } else if (data.status === 200) {
        this.$router.back();
        alert('Stworzono produkt');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Keator produktu' });
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
