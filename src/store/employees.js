import router from '@/router'
export default {
  state: {
    employee: {},
    employees: [],
    employeesByDepts: []
  },

  mutations: {
    setEmployee (state, payload) {
      state.employee = payload
    },
    setEmployees (state, payload) {
      state.employees = payload
    },
    setEmployeesByDepts (state, payload) {
      state.employeesByDepts = payload
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    getEmployeesByDepts ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('employees_by_depts')
      .then(response => {
        commit('setEmployeesByDepts', response.data)
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    createEmployees ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('employees', state.employee)
      .then(() => {
        dispatch('getEmployeesByDepts')
        commit('setEmployee', {})
        commit('setLoading', false)
        commit('setMessage', 'Пользователь успешно создан!')
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
    updateEmployee ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('employees', state.employee)
      .then(() => {
        dispatch('getEmployeesByDepts')
        commit('setEmployee', {})
        commit('setLoading', false)
        commit('setMessage', 'Пользователь успешно обновлен!')
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
    deleteEmployee ({commit, dispatch}, employee) {
      commit('setLoading', true)
      this._vm.$http
      .delete('employees?id=' + employee.id)
      .then(() => {
        dispatch('getEmployeesByDepts')
        commit('setEmployee', {})
        commit('setLoading', false)
        commit('setMessage', 'Пользователь успешно удален!')
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
    employee (state) {
      return state.employee
    },
    employees (state) {
      return state.employees
    },
    employeesByDepts (state) {
      return state.employeesByDepts
    }
  }
}
