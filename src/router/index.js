import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'frontview',
    component: () => import('../views/front/FrontView.vue'),
    children:[
      {
        path:'',
        component: () => import('../views/front/HomeView.vue'),
       },
       {
        path:'Book/:id',
        component: () => import('../views/front/Book.vue'),
       },
       {
        path:'BookView',
        component: () => import('../views/front/BookAll.vue'),
       },
       {
        path:'Login',
        component: () => import('../views/back/Login.vue'),
       },
       {
        path:'FavoriteView',
        component: () => import('../views/front/FavoriteView.vue'),
       },
       {
        path:'OrderView',
        component: () => import('../views/front/OrderView.vue'),
       },
       {
        path:'OrderCheck',
        component: () => import('../views/front/OrderCheck.vue'),
       },
       {
        path:'OrderOut/:orderId',
        component: () => import('../views/front/OrderOut.vue'),
       },

    ]
  },


  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../views/back/Dashboard.vue'),
    children:[
      {
       path:'products',
       component: () => import( '../views/back/Products.vue'),
      },
      {
        path:'DachOrder',
        component: () => import( '../views/back/DachOrder.vue'),
       },
       {
        path:'DashVoucher',
        component: () => import( '../views/back/DashVoucher.vue'),
       }
   ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
