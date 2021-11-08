import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shared
  }
})
