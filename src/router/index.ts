import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ProductList from '../views/products/List.vue';
import ProductDetails from '../views/products/Details.vue';
import ProductCreate from '../views/products/Create.vue';
import ProductEdit from '../views/products/Edit.vue';
import OperationList from '../views/productionOperations/List.vue';
import OperationCreate from '../views/productionOperations/Create.vue';
import OperationEdit from '../views/productionOperations/Edit.vue';
import MyCart from '../views/MyCart.vue';
import EmployeeEdit from '../views/employees/Edit.vue';
import EmployeeList from '../views/employees/List.vue';
import EmployeeCreate from '../views/employees/Create.vue';

import OrderList from '../views/orders/List.vue';
import OrderDetails from '../views/orders/Details.vue';

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
  },
  {
    path: '/product/create',
    name: 'ProductCreate',
    component: ProductCreate,
  },
  {
    path: '/product/edit/:id',
    name: 'ProductEdit',
    component: ProductEdit,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  {
    path: '/operation',
    name: 'OperationList',
    component: OperationList,
  },
  {
    path: '/operation/create',
    name: 'OperationCreate',
    component: OperationCreate,
  },
  {
    path: '/operation/edit/:id',
    name: 'OperationEdit',
    component: OperationEdit,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: MyCart,
  },
  {
    path: '/employee',
    name: 'EmployeeList',
    component: EmployeeList,
  },
  {
    path: '/employee/create',
    name: 'EmployeeCreate',
    component: EmployeeCreate,
  },
  {
    path: '/employee/:id',
    name: 'EmployeeEdit',
    component: EmployeeEdit,
  },
  {
    path: '/order',
    name: 'OrderList',
    component: OrderList,
  },
  {
    path: '/order/:id',
    name: 'OrderDetails',
    component: OrderDetails,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (!store.state.auth.token && (to.name !== 'Login' && to.name !== 'Register')) {
    next({ name: 'Login' });
  } else if (store.state.auth.token && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'ProductList' });
  } else {
    next();
  }
});

export default router;
