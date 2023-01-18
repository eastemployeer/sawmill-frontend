<template>
  <div class="view list text-center" ref="table">
    <div class="list-table">
      <b-table sticky-header hover head-variant="light" :style="{ maxHeight: parentHeight - 16 - 38 + 'px' }"
        :fields="fields" :items="products" :busy="isLoading">
        <template #table-busy>
          <div class="text-center text-danger">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Ładowanie...</strong>
          </div>
        </template>
        <template #cell(name)="data">
          {{ data.item.name }}
        </template>

        <template #cell(price)="data">
          <div class="text-center">
            {{ data.value + " zł" }}
          </div>
        </template>
        <template #cell(type)="data">
          {{ data.item.type }}
        </template>

        <template #cell(id)="data">
          <router-link :to="{ name: 'ProductDetails', params: { id: data.item.id } }">
            <b-icon-arrow-right scale="1.5" />
          </router-link>
        </template>
      </b-table>
      <div class="buttons">
        <div :style="{ flex: 1 }">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="30" align="center" last-number />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';

import API from '@/services/API';
// import EventBus from '@/services/EventBus';
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class ProductList extends Vue {
  parentHeight = 0;

  currentPage = 1;

  totalRows = 0;

  isLoading = true;

  products: any[] = [];

  fields: any[] = [];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadProducts();
  }

  mounted() {
    // this.setViewTitle();
    this.parentHeight = (this.$refs.table as any).offsetHeight;
    this.fields = [
      { key: 'name', label: 'Rodzaj drewna' },
      { key: 'price', label: 'Cena za m3' },
      { key: 'type', label: 'Typ produktu' },
      { key: 'id', label: '' },
    ];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await new API('get', 'products', {
        query: {
          _limit: 30,
          _page: (this.currentPage - 1) * 30,
        },
      }).call();
      console.log(data);
      this.products = data;
      this.totalRows = 4; // data.totalRows;
      this.isLoading = false;
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
</style>
