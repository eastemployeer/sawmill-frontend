<template>
  <div class="sidebar">
    <router-link :to="{ name: 'ProductList' }" class="panelName">{{ panelName }}</router-link>
    <span class="userName">{{ userName }}</span>
    <span class="userEmail">{{ userEmail }}</span>
    <div class="divider" />

    <div v-for="el in buttons" :key="el.text">
      <router-link :to="{ name: el.action }" class="button">
        <div class="buttonIcon">
          <component :is="el.icon" />
        </div>
        <div class="buttonText">
          {{ el.text }}
        </div>
      </router-link>
    </div>
    <div id="logoutSegment">
      <div class="divider" />
      <b-button pill variant="outline-secondary" id="logoutButton" v-on:click="logout">
        <b-icon-door-open />
        Wyloguj
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import { AuthAction } from '@/store/modules/AuthModule';

@Options({})
export default class SideBar extends Vue {
  userName = 'Adam Kowalski';

  userEmail = '';

  panelName = 'Panel pracownika';

  buttons = [
    {
      icon: 'b-icon-shop',
      text: 'Katalog produktów',
      action: 'ProductList',
    },
    {
      icon: 'b-icon-people-fill',
      text: 'Lista pracowników',
      action: 'ProductList',
    },
    {
      icon: 'b-icon-clock-history',
      text: 'Lista zamówień',
      action: 'ProductList',
    },
    {
      icon: 'b-icon-cart',
      text: 'Aktualne zamówienie',
      action: 'Cart',
    },
    {
      icon: 'b-icon-gear-wide-connected',
      text: 'Lista typów operacji produkcyjnych',
      action: 'OperationList',
    },
    {
      icon: 'b-icon-card-checklist',
      text: 'Plan produkcyjny',
      action: 'ProductList',
    },
    {
      icon: 'b-icon-truck',
      text: 'Lista dostaw',
      action: 'ProductList',
    },
    {
      icon: 'b-icon-tools',
      text: 'Lista maszyn',
      action: 'ProductList',
    },
    {
      icon: 'b-icon-building',
      text: 'Lista magazynów',
      action: 'ProductList',
    },
  ];

  logout() {
    store.dispatch(AuthAction.Logout).then(() => {
      this.$router.replace({ name: 'Login' });
    });
  }

  mounted() {
    this.userName = `${store.state.auth.currentUser?.imie} ${store.state.auth.currentUser?.nazwisko}`;
    this.userEmail = `${store.state.auth.currentUser?.email}`;
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  padding: 22px;
  padding-bottom: 0;
  background: #FFF;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #EBEFF2;
}

.panelName {
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #109CF1;
  text-decoration: none;
}

.userName {
  margin-top: 22px;
  font-size: 14px;
  line-height: 21px;
  color: #192A3E;
}

.userEmail {
  margin-bottom: 33px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  color: #90A0B7;
}

.buttons {
  display: flex;
  flex-direction: column;
  margin-top: 14px;
}

.button {
  display: flex;
  flex-direction: row;
  margin: 10px;
  color: #2c3e50;
  cursor: pointer;
  text-decoration: none;

}

.button:hover {
  text-decoration: underline;
}

.buttonText {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  font-size: 13px;
  line-height: 19px;
  color: #334D6E;
  letter-spacing: 0.01em;
}

#logoutSegment {
  margin-top: auto;
}

#logoutButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
  margin: 18px auto;
}
</style>
