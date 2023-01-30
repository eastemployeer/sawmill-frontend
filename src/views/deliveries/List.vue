<template>
  <Table :items="deliveries" :fields="fields" :loadItems="loadDeliveries" linkTo="DeliveryDetails" />
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Table from '@/components/Table.vue';
import { Employee } from '@/models/Employee';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    Table,
  },
})
export default class DeliveryList extends Vue {
  parentHeight = 0;

  currentPage = 1;

  totalRows = 0;

  isLoading = true;

  deliveries: any[] = [];

  fields = [
    { key: 'deliveryId', label: 'Numer dostawy' },
    { key: 'orderId', label: 'Numer zamówienia' },
    { key: 'orderCreationDate', label: 'Data utworzenia', formatter: (date: Date) => (date ? `${new Date(date).toISOString().split('T')[0]}` : '-') },
    { key: 'sendDate', label: 'Data wysłania', formatter: (date: Date) => (date ? `${new Date(date).toISOString().split('T')[0]}` : '-') },
    { key: 'deliverer', label: 'Dostawca', formatter: (employee: Employee) => (employee ? `${employee.firstName} ${employee.lastName}` : '-') },
    { key: 'state', label: 'Status' },
    { key: 'id', label: '' },
  ];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadDeliveries(this.currentPage);
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', {
      title: 'Lista dostaw',
    });
  }

  mounted() {
    this.setViewTitle();
  }

  async loadDeliveries(page?: number) {
    try {
      const data = await new API('get', 'delivery', {
        query: {
          _limit: 30,
          _page: page || 0,
        },
      }).call();
      this.deliveries = data;
      console.log(this.deliveries);
    } catch (error) {
      console.error('error', error);
    }
  }
}
</script>

<style scoped lang="scss">
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
