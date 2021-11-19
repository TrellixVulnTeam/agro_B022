import router from '@/router'
export default {
  state: {
    contractor: {
    }
  },

  mutations: {
    setContractor (state, payload) {
      state.contractor = payload
    }
  },

  actions: {
    getContractor ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('contractor?id=' + id)
      .then(response => {
        commit('setContractor', response.data)
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
    contractor (state) {
      return state.contractor
    }
  }
}
