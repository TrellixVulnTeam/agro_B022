import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '@/views/Product'
// import Folder from '@/views/Folder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products')
  },
  {
    path: '/products/:id',
    name: 'Product',
    props: true,
    component: Product
  },
  {
    path: '/products/new',
    name: 'NewProduct',
    props: true,
    component: Product
  },
  // {
  //   path: '/folders/:id',
  //   name: 'Folder',
  //   props: true,
  //   component: Folder
  // },
  // {
  //   path: '/folders/new',
  //   name: 'NewFolder',
  //   props: true,
  //   component: Folder
  // },
  {
    path: '/getpass',
    name: 'GetPass',
    component: () => import('@/views/GetPass.vue'),
    meta: {
      layout: 'auth-layout'
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: {
      layout: 'auth-layout'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
