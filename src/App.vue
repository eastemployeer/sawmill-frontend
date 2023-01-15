<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

const defaultLayout = 'default';

@Options({})
export default class App extends Vue {
  get layout() {
    return `${(this.$route.meta as any).layout || defaultLayout}-layout`;
  }
}
</script>


<style lang="scss">
// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
// @import '~normalize.css/normalize.css';
// // Style loading bar between pages.
// // https://github.com/rstacruz/nprogress
// @import '~nprogress/nprogress.css';

// @import './style/theme';

// @import 'node_modules/bootstrap/scss/bootstrap.scss';
// @import 'node_modules/bootstrap-vue/src/index.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
