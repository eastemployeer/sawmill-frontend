<template>
  <Table :items="operations" :fields="fields" :totalRows="totalRows" :loadItems="loadOperations"
    linkTo="OperationDetails" />
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Table from '@/components/Table.vue';
import { Options, Vue } from 'vue-class-component';
import { Operation } from '@/models/Operation';

@Options({
  components: {
    Table,
  },
})
export default class OperationList extends Vue {
  parentHeight = 0;

  currentPage = 1;

  totalRows = 0;

  isLoading = true;

  operations: Operation[] = [];

  fields = [
    { key: 'name', label: 'Nazwa operacji' },
    { key: 'duration', label: 'Czas trwania' },
    { key: 'sourceProductTypeId', label: 'Rodzaj drewna' },
    { key: 'sourceOutputRatio', label: 'Stosunek', formatter: (value: string) => `${value}:1` },
    { key: 'id', label: '' },
  ];

  // @Watch('currentPage')
  // public onCurrentPageChange() {
  //   this.loadProducts(this.currentPage);
  // }

  async setViewTitle() {
    await EventBus.$emit('layout-view', {
      title: 'Lista typów operacji produkcyjnych',
      buttonText: 'Dodaj nowy typ operacji',
      buttonOnPress: () => this.$router.push({ name: 'OperationCreate' }),
    });
  }

  mounted() {
    this.setViewTitle();
  }

  async loadOperations(page: number, limit: number) {
    try {
      const data = await new API('get', 'Operation').call();

      if (this.operations.length === 0) this.totalRows = data.length;

      // page + limit
      this.operations = data.slice((page - 1) * limit, page * limit);
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
