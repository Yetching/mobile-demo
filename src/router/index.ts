import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import Layout from '@/views/Layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '',
        // 此处的name不可重名
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: Layout,

    children: [
      {
        path: '',
        component: () => import('@/views/About/index.vue'),
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    component: () =>
      import(/* webpackChunkName: "setting" */ '@/views/About/setting.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
