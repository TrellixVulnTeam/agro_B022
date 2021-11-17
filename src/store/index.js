import Vue from 'vue'
import Vuex from 'vuex'
import warehouses from './warehouses'
import quarters from './quarters'
import products from './products'
import folders from './folders'
import gardens from './gardens'
import blocks from './blocks'
import shared from './shared'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    warehouses,
    quarters,
    products,
    folders,
    gardens,
    blocks,
    shared,
    auth
  }
})
