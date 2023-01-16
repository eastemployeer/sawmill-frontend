import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import HomeView from '../views/HomeView.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ProductList from '../views/products/List.vue';
import ProductDetails from '../views/products/Details.vue';
import ProductCreate from '../views/products/Create.vue';
import ProductEdit from '../views/products/Edit.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/product',
    alias: '/',
    name: 'ProductList',
    component: ProductList,
    children: [
      {
        path: 'create',
        name: 'ProductCreate',
        component: ProductCreate,
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        component: ProductEdit,
      },
      {
        path: ':id',
        name: 'ProductDetails',
        component: ProductDetails,
      },
    ],
  },

  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, _from, next) => {
//   if (!store.state.auth.token && (to.name !== 'Login' && to.name !== 'Register')) {
//     next({ name: 'Login' });
//   } else if (store.state.auth.token && (to.name === 'Login' || to.name === 'Register')) {
//     next({ name: 'ProductList' });
//   } else {
//     next();
//   }
// });

export default router;
