import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import shared from './shared'
import products from './products'
import folders from './folders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shared,
    products,
    folders
  }
})
