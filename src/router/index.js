import Vue from 'vue'
import VueRouter from 'vue-router'
import Warehouse from '@/views/Warehouse'
import Product from '@/views/Product'
import Garden from '@/views/Garden'

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
    path: '/warehouses/:folder_id',
    name: 'Warehouses',
    props: true,
    component: () => import('@/views/Warehouses')
  },
  {
    path: '/Warehouses',
    redirect: '/warehouses/0'
  },
  {
    path: '/warehouse/:id',
    name: 'Warehouse',
    props: true,
    component: Warehouse
  },
  {
    path: '/warehouse/new',
    name: 'NewWarehouse',
    props: true,
    component: Warehouse
  },
  {
    path: '/gardens/:folder_id',
    name: 'Gardens',
    props: true,
    component: () => import('@/views/Gardens')
  },
  {
    path: '/gardens',
    redirect: '/gardens/0'
  },
  {
    path: '/garden/:id',
    name: 'Garden',
    props: true,
    component: Garden
  },
  {
    path: '/garden/new',
    name: 'NewGarden',
    props: true,
    component: Garden
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
    path: '/quarters/:garden_id',
    name: 'Gardens',
    props: true,
    component: () => import('@/views/Quarters')
  },
  {
    path: '/quarters',
    redirect: '/quarters/1'
  },
  {
    path: '/block/:id',
    name: 'Block',
    props: true,
    component: () => import('../views/Block.vue'),
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
