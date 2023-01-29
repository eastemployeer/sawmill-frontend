<template>
  <Table linkEdit="EmployeeEdit" :items="employees" :totalRows="totalRows" :fields="fields"
    :loadItems="loadEmployees" />
</template>
<script lang="ts">

import API from '@/services/API';
import EventBus from '@/services/EventBus';
import Table from '@/components/Table.vue';
import { Options, Vue } from 'vue-class-component';
import { Employee } from '@/models/Employee';

@Options({
  components: {
    Table,
  },
})
export default class EmployeeList extends Vue {
  isServicemanLogged = 0;

  totalRows = 0;

  employees: Employee[] = [];

  fields = [
    { key: 'firstName', label: 'Imię' },
    { key: 'lastName', label: 'Nazwisko' },
    { key: 'employeeType', label: 'Stanowisko' },
    { key: 'isBlocked', label: 'Blokada konta', formatter: (value: boolean) => (value ? 'Tak' : 'Nie') },
    { key: 'id', label: '' },
  ];

  mounted() {
    this.setViewTitle();
  }

  addNewEmployee() {
    this.$router.push({ name: 'EmployeeCreate' });
  }

  async setViewTitle() {
    await EventBus.$emit('layout-view', {
      title: 'Lista pracowników',
      buttonText: 'Dodaj nowego pracownika',
      buttonOnPress: () => this.$router.push({ name: 'EmployeeCreate' }),
    });
  }

  async loadEmployees(page: number, limit: number) {
    try {
      const data = await new API('get', 'employees').call();

      if (this.employees.length === 0) this.totalRows = data.length;

      // page + limit
      this.employees = data.slice((page - 1) * limit, page * limit);
    } catch (error) {
      console.error('error', error);
    }
  }
}

</script>
<style lang="scss" scoped>
.btnStyle {
  font-size: 16px;
  line-height: 24px;
}
</style>
