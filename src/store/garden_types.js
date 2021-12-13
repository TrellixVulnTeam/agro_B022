import router from '@/router'
export default {
  state: {
    garden_type: {},
    garden_types: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    }
  },

  mutations: {
    setGarden_type (state, payload) {
      state.garden_type = payload
    },
    setGarden_types (state, payload) {
      state.garden_types = payload
    }
  },

  actions: {
    getGarden_types ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .get('garden_types?page=' + state.garden_types.paginator.current_pages)
      .then(response => {
        commit('setGarden_types', response.data)
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
    getGarden_type ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('garden_type?id=' + id)
      .then(response => {
        commit('setGarden_type', response.data)
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
    createGarden_type ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('garden_type', state.garden_type)
      .then(() => {
        dispatch('getGarden_types')
        commit('setLoading', false)
        commit('setGarden_type', {})
        commit('setMessage', 'Тип сада успешно создан!')
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
    updateGarden_type ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('garden_type', state.garden_type)
      .then(() => {
        dispatch('getGarden_types')
        commit('setLoading', false)
        commit('setGarden_type', {})
        commit('setMessage', 'Тип сада успешно обновлен!')
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
    deleteGarden_type ({commit, dispatch}, item) {
      commit('setLoading', true)
      this._vm.$http
      .delete('garden_type?id=' + item.id)
      .then(() => {
        dispatch('getGarden_types')
        commit('setLoading', false)
        commit('setGarden_type', {})
        commit('setMessage', 'Тип сада успешно удален!')
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
    garden_type (state) {
      return state.garden_type
    },
    garden_types (state) {
      return state.garden_types
    }
  }
}
