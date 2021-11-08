export default {
  state: {
    loading: false,
    error: null,
    message: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearErrors (state) {
      state.error = null
    },
    clearMessages (state) {
      state.message = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    setMessage ({commit}, payload) {
      commit('setMessage', payload)
    },
    clearErrors ({commit}) {
      commit('clearErrors')
    },
    clearMessages ({commit}) {
      commit('clearMessages')
    },
    // validateError ({commit, dispatch}, error) {
    //   if (error.response && error.response.status === 401) {
    //     dispatch('checkToken', error)
    //   } else if (error.response) {
    //     commit('setError', error.response.data.message)
    //   } else {
    //     console.log(error)
    //   }
    //   commit('setLoading', false)
    // }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    message (state) {
      return state.message
    }
  }
}
