<template>
  <Table :items="products" :fields="fields" :totalRows="totalRows" :loadItems="loadProducts" linkTo="ProductDetails" />
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Table from '@/components/Table.vue';
import { Options, Vue } from 'vue-class-component';
import { Product } from '@/models/Product';

@Options({
  components: {
    Table,
  },
})
export default class ProductList extends Vue {
  parentHeight = 0;

  currentPage = 1;

  totalRows = 0;

  isLoading = true;

  products: Product[] = [];

  fields = [
    { key: 'woodTypeName', label: 'Rodzaj drewna' },
    { key: 'price', label: 'Cena za m3', formatter: (value: string) => `${value} zł` },
    { key: 'productTypeName', label: 'Typ produktu' },
    { key: 'id', label: '' },
  ];;

  // @Watch('currentPage')
  // public onCurrentPageChange() {
  //   this.loadProducts(this.currentPage);
  // }

  async setViewTitle() {
    await EventBus.$emit('layout-view', {
      title: 'Katalog produktów',
      buttonText: 'Dodaj nowy produkt',
      buttonOnPress: () => this.$router.push({ name: 'ProductCreate' }),
    });
  }

  mounted() {
    this.setViewTitle();
  }

  async loadProducts(page: number, limit: number) {
    try {
      const data = await new API('get', 'Product').call();
      console.log(data);

      if (this.products.length === 0) this.totalRows = data.length;

      // page + limit
      this.products = data.slice((page - 1) * limit, page * limit);
    } catch (error) {
      console.error('error', error);
    }
  }
}
</script>

<style lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}

.paginationWrapper {
  margin-top: auto;
  padding: 20px;
}

.chevronIcon {
  font-size: 1.5em;
  color: black;
}
</style>
