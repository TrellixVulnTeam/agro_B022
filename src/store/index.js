import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import shared from './shared'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shared,
    products
  }
})
