import Vue from 'vue'
import Vuex from 'vuex'
import warehouses from './warehouses'
import products from './products'
import folders from './folders'
import gardens from './gardens'
import shared from './shared'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    warehouses,
    products,
    folders,
    gardens,
    shared,
    auth
  }
})
