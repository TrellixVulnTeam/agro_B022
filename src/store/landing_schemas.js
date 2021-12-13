import router from '@/router'
export default {
  state: {
    landing_schema: {},
    landing_schemas: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    searchedContractors: []
  },

  mutations: {
    setLanding_schema (state, payload) {
      state.landing_schema = payload
    },
    setLanding_schemas (state, payload) {
      state.landing_schemas = payload
    }
  },

  actions: {
    getLanding_schemas ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .get('landing_schemas?page=' + state.landing_schemas.paginator.current_pages)
      .then(response => {
        commit('setLanding_schemas', response.data)
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
    getLanding_schema ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('landing_schema?id=' + id)
      .then(response => {
        commit('setLanding_schema', response.data)
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
    createLanding_schema ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('landing_schema', state.landing_schema)
      .then(() => {
        dispatch('getLanding_schemas')
        commit('setLoading', false)
        commit('setLanding_schema', {})
        commit('setMessage', 'Схема посадки успешно создана!')
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
    updateLanding_schema({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('landing_schema', state.landing_schema)
      .then(() => {
        dispatch('getLanding_schemas')
        commit('setLoading', false)
        commit('setLanding_schema', {})
        commit('setMessage', 'Схема посадки успешно обновлена!')
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
    deleteLanding_schema ({commit, dispatch}, item) {
      commit('setLoading', true)
      this._vm.$http
      .delete('landing_schema?id=' + item.id)
      .then(() => {
        dispatch('getLanding_schemas')
        commit('setLoading', false)
        commit('setLanding_schema', {})
        commit('setMessage', 'Схема посадки успешно удалена!')
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
    landing_schema (state) {
      return state.landing_schema
    },
    landing_schemas (state) {
      return state.landing_schemas
    }
  }
}
