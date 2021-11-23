import _ from 'lodash'
import router from '@/router'
export default {
  state: {
    contractor: {},
    contractors: []
  },

  mutations: {
    setContractor (state, payload) {
      state.contractor = payload
    },
    setContractors (state, payload) {
      state.contractors = payload
    }
  },

  actions: {
    getСontractors ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('contractors')
      .then(response => {
        commit('setContractors', response.data)
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
    },
    searchСontractor: _.debounce(function ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('contractors/find?q=' + payload)
      .then(response => {
        commit('setLoading', false)
        commit('setContractors', response)
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
    }, 200)
  },

  getters: {
    contractor (state) {
      return state.contractor
    },
    contractors (state) {
      return state.contractors
    }
  }
}
