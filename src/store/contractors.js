import _ from 'lodash'
import router from '@/router'
export default {
  state: {
    contractor: {
      account_name: "",
      requisites: {
        short_name: "",
        bank_account: "",
        bank_name: "",
        bik: "",
        billing_account: "",
        full_name: "",
        inn: "",
        kpp: "",
        legal_address: "",
        ogrn: "",
        real_address: ""
      }
    },
    contractors: {
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
    setContractor (state, payload) {
      state.contractor = payload
    },
    setContractors (state, payload) {
      state.contractors = payload
    },
    setSearchedContractors (state, payload) {
      state.searchedContractors = payload
    }
  },

  actions: {
    getContractors ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .get('contractors?page=' + state.contractors.paginator.current_pages)
      .then(response => {
        commit('setContractors', response.data)
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    createContractor ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('contractor', state.contractor)
      .then(response => {
        commit('setLoading', false)
        router.push('/contractor/' + response.data.id)
        commit('setContractor', {})
        commit('setMessage', 'Контрагент успешно создан!')
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
    updateContractor ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('contractor', state.contractor)
      .then(() => {
        commit('setLoading', false)
        commit('setContractor', {})
        commit('setMessage', 'Контрагент успешно обновлен!')
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
    deleteContractor ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .delete('contractor?id=' + state.contractor.id)
      .then(() => {
        commit('setLoading', false)
        commit('setContractor', {})
        router.push('/contractors')
        commit('setMessage', 'Контрагент успешно удален!')
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
    searchСontractor: _.debounce(function ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('contractors/find?q=' + payload)
      .then(response => {
        commit('setLoading', false)
        commit('setSearchedContractors', response.data)
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
    }, 200)
  },

  getters: {
    contractor (state) {
      return state.contractor
    },
    contractors (state) {
      return state.contractors
    },
    searchedContractors (state) {
      return state.searchedContractors
    }
  }
}
