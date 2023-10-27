import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/short.vue')
      }
      /*{
        path: '/riwayat', component: () => import('pages/riwayat.vue')
      },
      {
        path: '/kepu', component: () => import('pages/kepu-backup.vue')
      },
      {
        path: '/tes', component: () => import('pages/untuktesting.vue')
      },
      {
        path: '/expenses', component: () => import('pages/IndexPage.vue')
      }*/
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    // component: () => import('pages/ErrorNotFound.vue')
    component: () => import('pages/ErrorNotFound.vue')

  }
]

export default routes
