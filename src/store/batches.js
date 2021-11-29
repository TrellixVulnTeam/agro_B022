import router from '@/router'
export default {
  state: {
    acceptanceBatches: []
  },

  mutations: {
    setAcceptanceBatches (state, payload) {
      state.acceptanceBatches = payload
    }
  },

  actions: {
    getAcceptanceBatches ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('/acceptance_batches?page=' + 1)
      .then(response => {
        commit('setAcceptanceBatches', response.data)
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
    acceptanceBatches (state) {
      return state.acceptanceBatches
    }
  }
}
