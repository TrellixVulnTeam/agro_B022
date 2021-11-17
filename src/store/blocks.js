import router from '@/router'
export default {
  state: {
    block: {
      name: '',
      description: '',
      quarter_id: null,
      landing_schemas_id: null
    },
    landingSchemas: {}
  },

  mutations: {
    setBlock (state, payload) {
      state.block = payload
    },
    setBlockParent (state, payload) {
      state.block.quarter_id = payload
    },
    setLandingSchemas (state, payload) {
      state.landingSchemas = payload
    }
  },

  actions: {
    getBlock ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('blocks_units?id=' + id)
      .then(response => {
        commit('setBlock', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    getLandingSchemas ({commit}) {
      this._vm.$http
      .get('landing_schemas?page=' + 1)
      .then(response => {
        commit('setLandingSchemas', response.data)
      })
      .catch(error => {
        if (error.response.status === 401) {
          // REFRESH
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    updateBlock ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('blocks_unit', state.block)
      .then(() => {
        commit('setMessage', 'Блок успешно обновлен')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    createBlock ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('blocks_unit', state.block)
      .then(() => {
        commit('setMessage', 'Блок успешно создан')
        commit('setLoading', false)
        commit('setBlock', {})
        // location.reload()
        router.go(0)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.human_data)
      })
    },
    deleteBlock ({commit}, block) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('blocks_unit?id=' + block.id)
      .then(() => {
        commit('setMessage', 'Блок успешно удален')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    }
  },

  getters: {
    block (state) {
      return state.block
    },
    landingSchemas (state) {
      return state.landingSchemas
    }
  }
}
