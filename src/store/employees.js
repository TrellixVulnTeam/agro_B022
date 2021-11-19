import router from '@/router'
export default {
  state: {
    employee: {
    }
  },

  mutations: {
    setEmployee (state, payload) {
      state.employee = payload
    }
  },

  actions: {
    getEmployee ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('employee?id=' + id)
      .then(response => {
        commit('setEmployee', response.data)
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
    employee (state) {
      return state.employee
    }
  }
}
