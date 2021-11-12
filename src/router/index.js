import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '@/views/Product'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/products/:folder_id',
    name: 'Products',
    props: true,
    component: () => import('@/views/Products')
  },
  {
    path: '/products',
    redirect: '/products/0'
  },
  {
    path: '/product/:id',
    name: 'Product',
    props: true,
    component: Product
  },
  {
    path: '/product/new',
    name: 'NewProduct',
    props: true,
    component: Product
  },
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
