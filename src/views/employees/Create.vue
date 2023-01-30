<template>
  <div>
    <EmployeeModify v-model="employee" :creating="true" :buttonOnClick="addNewEmployee" />
  </div>
</template>
<script lang="ts">
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
export default class EmployeeCreate extends Vue {
  employee: Employee = {
    employeeId: 0, firstName: '', lastName: '', isBlocked: false, employeeTypeId: 0, login: '',
  };

  async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Dodawanie pracownika' });
  }

  mounted() {
    this.setViewTitle();
  }

  async addNewEmployee() {
    console.log(this.employee);
    if (this.employee.employeeTypeId && this.employee.firstName !== '' && this.employee.lastName !== '' && this.employee.password && this.employee.login) {
      try {
        const data = await new API('post', 'employees', {
          body: {
            employeeTypeId: this.employee.employeeTypeId,
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            isBlocked: this.employee.isBlocked,
            login: this.employee.login,
            password: this.employee.password,
          },
        }).call(true);
        if (data.status === 400) {
          alert('Wystąpił błąd, sprawdz wprowadzone dane');
        } else if (data.status === 200) {
          this.$router.back();
          alert('Dodano nowego pracownika');
        } else {
          alert(`Nieznany błąd ${data.status}`);
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Nie dodano nowego pracownika');
        console.error('error', error);
      }
    } else { alert('Nie podano wszystkich danych!'); }
  }
}
</script>
<style lang="scss" scoped>
.contentContainer {
  align-self: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.smallContainer {
  display: flex;
  flex-direction: row;
  align-self: center;
}
</style>
