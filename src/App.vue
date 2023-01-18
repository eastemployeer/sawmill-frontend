<template>
  <component :is="layout">
    <router-view />
  </component>
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
// // Normalize default styles across browsers,
// // https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// // Style loading bar between pages.
// // https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

@import 'node_modules/bootstrap/scss/bootstrap.scss';
// @import 'node_modules/bootstrap-vue/src/index.scss';
@import './style/theme';
</style>
