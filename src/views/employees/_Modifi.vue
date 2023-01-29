<template>
  <div class="container">
    <div class="row">
      <Input v-model="modelValue.firstName" label="Imię" placeholder="Jan" />
      <Input v-model="modelValue.lastName" label="Nazwisko" placeholder="Kowalski" />
    </div>
    <div class="row" v-if="creating">
      <Input v-model="modelValue.login" label="Login" placeholder="Login" />
      <Input v-model="modelValue.password" inputType="password" label="Hasło" placeholder="****" />
    </div>
    <div class="row">
      <div class="form-group">
        <label for="stanowisko" class="textLabel">Stanowisko</label>
        <b-form-select variant="outline-primary" :options="employeeTypes" v-model="modelValue.employeeTypeId" />
      </div>
      <div class="form-group">
        <label for="blokada" class="textLabel">Blokada konta</label>
        <!-- <b-form-select variant="outline-primary" :options="lockTypes" v-model="modelValue.isBlocked" /> -->
      </div>
    </div>
    <div class="row">
      <button type="button" style="margin-top: 20px;" class="btn btn-primary" v-on:click="buttonOnClick">Zapisz
        zmiany</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop } from 'vue-property-decorator';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import { Options, Vue } from 'vue-class-component';
import { Employee } from '@/models/Employee';
import Input from '@/components/Input.vue';

@Options({
  components: {
    Input,
  },
})
export default class ModifyEmployee extends Vue {
  employeeTypes = [
    { value: 1, text: 'Administrator' },
    { value: 2, text: 'Sprzedawca' },
    { value: 3, text: 'Kurier' },
    { value: 4, text: 'Operator maszyn' },
  ]

  lockTypes = [
    { value: false, text: 'Odblokowane' },
    { value: true, text: 'Zablokowane' },
  ]

  @Prop({ default: false })
  creating!: boolean;

  @Prop()
  modelValue!: Employee;

  @Prop()
  buttonOnClick!: () => void;
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.inputComponent {
  max-width: 200px;
}
</style>
