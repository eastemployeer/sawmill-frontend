<template>
  <div>
    <EmployeeModify v-model="employee" v-bind:buttonOnClick="updateEmployee" />
  </div>
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import { Options, Vue } from 'vue-class-component';
import { Employee } from '@/models/Employee';
import EmployeeModify from './_Modifi.vue';

@Options({
  components: {
    EmployeeModify,
  },
})
export default class EmployeeEdit extends Vue {
  employee: Employee = {
    employeeId: 0, firstName: '', lastName: '', isBlocked: false, employeeTypeId: 0, login: '',
  };

  mounted() {
    this.loadEmployeeAndsetViewTitle();
  }

  async updateEmployee() {
    try {
      const data = await new API('put', `employees/${this.$route.params.id}`, {
        body: {
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          employeeTypeId: this.employee.employeeTypeId,
          isBlocked: this.employee.isBlocked,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wystąpił błąd, sprawdz wprowadzone dane');
      } else if (data.status === 200) {
        this.$router.back();
        alert('Zaktualizowano dane pracownika');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async loadEmployeeAndsetViewTitle() {
    // load employee
    try {
      const data = await new API('get', `employees/${this.$route.params.id}`, {}).call();
      this.employee = data;
    } catch (error) {
      console.error('error', error);
    }
    // set viewtitle
    await EventBus.$emit('layout-view', { title: `Edycja pracownika: ${this.employee.firstName} ${this.employee.lastName} ` });
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
