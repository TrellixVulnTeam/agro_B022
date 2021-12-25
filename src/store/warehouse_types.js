import router from '@/router'
export default {
  state: {
    warehouse_type: {},
    warehouses_types: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    }
  },

  mutations: {
    setWarehouses_types (state, payload) {
      state.warehouses_types = payload
    },
    setWarehouse_type (state, payload) {
      state.warehouse_type = payload
    }
  },

  actions: {
    getWarehouses_types ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .get('warehouses_types?page=' + state.warehouses_types.paginator.current_pages)
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
    getWarehouse_type ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('warehouse_type?id=' + id)
      .then(response => {
        commit('setWarehouse_type', response.data)
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
    createWarehouse_type ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('warehouse_type', state.warehouse_type)
      .then(() => {
        dispatch('getWarehouses_types')
        commit('setLoading', false)
        commit('setWarehouse_type', {})
        commit('setMessage', 'Тип склада успешно создан!')
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
    updateWarehouse_type ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('warehouse_type', state.warehouse_type)
      .then(() => {
        dispatch('getWarehouses_types')
        commit('setLoading', false)
        commit('setWarehouse_type', {})
        commit('setMessage', 'Тип склада успешно обновлен!')
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
    deleteWarehouse_type ({commit, dispatch}, item) {
      commit('setLoading', true)
      this._vm.$http
      .delete('warehouse_type?id=' + item.id)
      .then(() => {
        dispatch('getWarehouses_types')
        commit('setLoading', false)
        commit('setWarehouse_type', {})
        commit('setMessage', 'Тип склада успешно удален!')
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
    warehouse_type (state) {
      return state.warehouse_type
    },
    warehouses_types (state) {
      return state.warehouses_types
    }
  }
}
