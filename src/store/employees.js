import router from '@/router'
export default {
  state: {
    employee: {},
    employees: []
  },

  mutations: {
    setEmployee (state, payload) {
      state.employee = payload
    },
    setEmployees (state, payload) {
      state.employees = payload
    }
  },

  actions: {
    getEmployees ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('employees')
      .then(response => {
        commit('setEmployees', response.data)
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
    },
    employees (state) {
      return state.employees
    }
  }
}
