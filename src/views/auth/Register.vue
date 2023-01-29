<template>
  <div class="container">
    <div class="box mx-auto">
      <h2 style="margin-top: 50px; margin-bottom: 0;">Tartak</h2>
      <h4 style="margin-top: 10px;">Tworzenie konta administratora</h4>
      <div class="smallContainer">
        <div class="col-md-6 inputContainer">
          <div class="form-group" v-for="(labelVal, index) in labelVals" :key="labelVal">
            <Input v-model="values[index]" :label="labelVal" type="text" :id="labelVal" :placeholder="labelVal" />
          </div>
        </div>
        <div class="col-md-6 inputContainer">
          <div class="form-group" v-for="(labelVal, index) in labelVals1" :key="labelVal">
            <Input v-model="values[index + 2]" :label="labelVal"
              :inputType="labelVal === 'Hasło' || labelVal === 'Powtórz hasło' ? 'password' : 'text'" :id="labelVal"
              :placeholder="labelVal" />
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" v-on:click="register">Zarejestruj się</button>
    </div>
  </div>
</template>

<script lang="ts">
import API from '@/services/API';
import Input from '@/components/Input.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    Input,
  },
})
export default class Login extends Vue {
  labelVals = ['Imię', 'Nazwisko'];

  labelVals1 = ['Login', 'Hasło', 'Powtórz hasło'];

  values = [];

  async register() {
    if (this.values[3] === this.values[4]) {
      try {
        const data = await new API('post', 'employees', {
          body: {
            firstName: this.values[0],
            lastName: this.values[1],
            login: this.values[2],
            password: this.values[3],
            employeeTypeId: 1,
          },
        }).call(true);
        if (data.status === 200) {
          alert('Rejestracja się powiodła!');
          this.$router.back();
        } else {
          alert('Rejestracja się nie powiodła!');
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Podany użytkownik już istnieje!');
        console.error('error', error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Podane hasła się nie zgadzają!');
    }
  }
}
</script>
<style scoped lang="scss">
button {
  margin-top: 60px;
}

.container {
  display: flex;
  width: 100%;
}

h2 {
  font-size: 40px;
  font-weight: bold;
  line-height: 46px;
  color: #25282B;
  letter-spacing: 0.2px;
}

h4 {
  font-size: 26px;
  font-style: normal;
  font-weight: bold;
  line-height: 34px;
  margin-bottom: 40px;

  /* Neutral / Black */
  color: #25282B;

  /* identical to box height, or 131% */
  letter-spacing: 0.2px;
}

.smallContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 910px;
  height: 627px;
  background: #D7E0FF;
  border-radius: 30px;
}
</style>
