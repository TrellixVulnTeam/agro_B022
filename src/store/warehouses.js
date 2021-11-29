import _ from 'lodash'
import router from '@/router'
export default {
  state: {
    warehouses: {
      data: [],
      folders: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    searchedWarehouses: [],
    warehouse: {},
    warehouses_types: {
      data: [],
      paginator: []
    }
  },

  mutations: {
    setWarehouses (state, payload) {
      state.warehouses = payload
    },
    setSearchedWarehouses (state, payload) {
      state.searchedWarehouses = payload
    },
    setWarehouse (state, payload) {
      state.warehouse = payload
    },
    setWarehouses_types (state, payload) {
      state.warehouses_types = payload
    }
  },

  actions: {
    getWarehouses ({state, commit}, folder) {
      commit('setLoading', true)
      this._vm.$http
      .get('warehouses?folder=' + folder + '&page=' + state.warehouses.paginator.current_pages)
      .then(response => {
        commit('setWarehouses', response.data)
        commit('setWarehouse', {})
        commit('setFolder', {})
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    getWarehouse ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('warehouse?id=' + payload)
      .then(response => {
        commit('setWarehouse', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    getWarehouses_types ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('warehouses_types?page=1')
      .then(response => {
        commit('setWarehouses_types', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    updateWarehouse ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('warehouse?id=' + state.warehouse.id, state.warehouse)
      .then(() => {
        commit('setMessage', 'Склад успешно обновлен')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    createWarehouse ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('warehouse?', state.warehouse)
      .then(() => {
        commit('setMessage', 'Склад успешно создан')
        router.push('/warehouses')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.human_data)
      })
    },
    deleteWarehouse ({commit, dispatch}, payload) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('warehouse?id=' + payload.id)
      .then(() => {
        if (router.currentRoute.path !== ('/warehouses/' + payload.parent_id)) {
          router.push('/warehouses/' + payload.parent_id)
        }
        dispatch('getWarehouses', payload.parent_id)
        commit('setMessage', 'Склад успешно удален')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    searchWarehouse: _.debounce(function ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('warehouse/find?q=' + payload)
      .then(response => {
        commit('setLoading', false)
        commit('setSearchedWarehouses', response.data)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    }, 200),
  },

  getters: {
    warehouses (state) {
      return state.warehouses
    },
    searchedWarehouses (state) {
      return state.searchedWarehouses
    },
    warehouse (state) {
      return state.warehouse
    },
    warehouses_types (state) {
      return state.warehouses_types
    }
  }
}
