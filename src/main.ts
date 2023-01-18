import { createApp } from 'vue';

import { BootstrapVueNext } from 'bootstrap-vue-next';

import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import App from './App.vue';

import router from './router';

import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

createApp(App)
  .use(store)
  .use(router)
  .use(BootstrapVueNext)
  .use(BootstrapIconsPlugin)
  .component('auth-layout', AuthLayout)
  .component('default-layout', DefaultLayout)
  .mount('#app');
