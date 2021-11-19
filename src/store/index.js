import Vue from 'vue'
import Vuex from 'vuex'
import acceptances from './acceptances'
import contractors from './contractors'
import warehouses from './warehouses'
import researches from './researches'
import indicators from './indicators'
import employees from './employees'
import quarters from './quarters'
import products from './products'
import folders from './folders'
import gardens from './gardens'
import blocks from './blocks'
import shared from './shared'
import rows from './rows'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    acceptances,
    contractors,
    warehouses,
    researches,
    indicators,
    employees,
    quarters,
    products,
    folders,
    gardens,
    blocks,
    shared,
    rows,
    auth
  }
})
