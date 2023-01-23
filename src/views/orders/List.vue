<template>
  <Table :items="orders" :fields="fields" :loadItems="loadOrders" linkTo="OrderDetails" />
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Table from '@/components/Table.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    Table,
  },
})
export default class OrderList extends Vue {
  parentHeight = 0;

  currentPage = 1;

  totalRows = 0;

  isLoading = true;

  orders: any[] = [];

  fields = [
    { key: 'number', label: 'Numer zamówienia' },
    { key: 'creationDate', label: 'Data utworzenia' },
    { key: 'acceptanceDate', label: 'Data potwierdzenia' },
    { key: 'price', label: 'Cena za m3', formatter: (value: string) => `${value} zł` },
    { key: 'state', label: 'Status' },
    { key: 'id', label: '' },
  ];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadOrders(this.currentPage);
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', {
      title: 'Lista zamówień',
      buttonText: 'Dodaj nowe zamówienie',
      buttonOnPress: () => this.$router.push({ name: 'OrderCreate' }),
    });
  }

  mounted() {
    this.setViewTitle();
  }

  async loadOrders(page?: number) {
    try {
      const data = await new API('get', 'orders', {
        query: {
          _limit: 30,
          _page: page || 0,
        },
      }).call();
      this.orders = data;
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
