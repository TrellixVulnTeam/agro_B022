import Vue from 'vue'
import Vuex from 'vuex'
import measurementunits from './measurementunits'
import landing_schemas from './landing_schemas'
import garden_types from './garden_types'
import acceptances from './acceptances'
import contractors from './contractors'
import warehouses from './warehouses'
import researches from './researches'
import indicators from './indicators'
import rootstock from './rootstock'
import employees from './employees'
import documents from './documents'
import quarters from './quarters'
import products from './products'
import folders from './folders'
import gardens from './gardens'
import batches from './batches'
import blocks from './blocks'
import shared from './shared'
import files from './files'
import rows from './rows'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    measurementunits,
    landing_schemas,
    garden_types,
    acceptances,
    contractors,
    warehouses,
    researches,
    indicators,
    rootstock,
    employees,
    documents,
    quarters,
    products,
    folders,
    gardens,
    batches,
    blocks,
    shared,
    files,
    rows,
    auth
  }
})
