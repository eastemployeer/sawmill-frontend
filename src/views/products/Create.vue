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
    name: '', price: 0, availibility: 0, id: 0, type: '',
  };

  mounted() {
    this.setViewTitle();
  }

  async createProduct() {
    try {
      const data = await new API('post', 'products', {
        body: this.newProduct,
      }).call(true);

      if (data.status === 400) {
        alert('Wprowadzono błędne dane');
      } else if (data.status === 201) {
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
