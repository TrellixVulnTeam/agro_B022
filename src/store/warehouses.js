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
    warehouse: {}
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
      .then(response => {
        commit('setMessage', 'Склад успешно создан')
        router.push('/warehouse/' + response.data.id)
        router.go(0)
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
    deleteWarehouseFolder ({commit, dispatch}, folder) {
      commit('setLoading', true)
      this._vm.$http
      .delete('folder?id=' + folder.id + '&model=' + folder.model)
      .then(() => {
        dispatch('getWarehouses', folder.parent_id)
        commit('setMessage', 'Папка успешно удалена')
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
    }
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
    }
  }
}
