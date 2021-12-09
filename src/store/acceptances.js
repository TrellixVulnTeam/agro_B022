import router from '@/router'
export default {
  state: {
    acceptances: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    acceptanceWithResearch: [],
    acceptance: {
      product_id: null,
      warehouse_id: null,
      quantity: null,
      contractor_id: null,
      blockrow_id: null,
      employee_id: null
    },
    batches: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    batche: {},
    acceptanceFilter: {
      uuid: null,
      product_id: null,
      contractor_id: null,
      from_date: null,
      to_date: null
    }
  },

  mutations: {
    setAcceptances (state, payload) {
      state.acceptances = payload
    },
    setAcceptance (state, payload) {
      state.acceptance = payload
    },
    setAcceptanceWithResearch (state, payload) {
      state.acceptanceWithResearch = payload
    },
    setBatches (state, payload) {
      state.batches = payload
    },
    setBatch (state, payload) {
      state.batch = payload
    }
  },

  actions: {
    getAcceptances ({state, commit}) {
      let filterParams = ''

      for (let key in state.acceptanceFilter) {
        if (state.acceptanceFilter[key] != null && state.acceptanceFilter[key] != '') {
          filterParams += '&' + key + '=' + state.acceptanceFilter[key]
        }
      }

      commit('setLoading', true)
      this._vm.$http
      .get('acceptance_filter?page=' + state.acceptances.paginator.current_pages + filterParams)
      .then(response => {
        commit('setAcceptances', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    getAcceptance ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('acceptance?id=' + payload)
      .then(response => {
        commit('setAcceptance', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    getAcceptanceWithResearch ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('acceptance_with_research?id=' + id)
      .then(response => {
        commit('setAcceptanceWithResearch', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    updateAcceptance ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('acceptance?id=' + state.acceptance.id, state.acceptance)
      .then(() => {
        commit('setMessage', 'Приемка успешно обновлена')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    createAcceptance ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('acceptance', state.acceptance)
      .then(response => {
        router.push('/acceptance/' + response.data.id)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    deleteAcceptance ({commit, dispatch}, payload) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('acceptance?id=' + payload.id)
      .then(() => {
        if (router.currentRoute.path !== ('/acceptances/' + payload.parent_id)) {
          router.push('/acceptances/' + payload.parent_id)
        }
        dispatch('getAcceptance', payload.parent_id)
        commit('setMessage', 'Приемка успешно удалена')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    getBatches ({state, commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('acceptance_batches?page=' + state.batches.paginator.current_pages)
      .then(response => {
        commit('setBatches', response.data)
        commit('setBatche', {})
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    getBatch ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('acceptance_batch?id=' + payload)
      .then(response => {
        commit('setBatch', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    updateBatch ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('acceptance_batch?id=' + state.batch.id, state.batch)
      .then(() => {
        commit('setMessage', 'Партия успешно обновлена')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    createBatch ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('acceptance_batch?', state.batch)
      .then(() => {
        commit('setMessage', 'Партия успешно создана')
        // router.push('/batches')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    deleteBatch ({commit, dispatch}, payload) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('acceptance_batch?id=' + payload.id)
      .then(() => {
        if (router.currentRoute.path !== ('/batches/' + payload.parent_id)) {
          router.push('/batches/' + payload.parent_id)
        }
        dispatch('getBatches', payload.parent_id)
        commit('setMessage', 'Партия успешно удалена')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    }
  },

  getters: {
    acceptances (state) {
      return state.acceptances
    },
    acceptance (state) {
      return state.acceptance
    },
    acceptanceWithResearch (state) {
      return state.acceptanceWithResearch
    },
    batches (state) {
      return state.batches
    },
    batch (state) {
      return state.batch
    },
    acceptanceFilter (state) {
      return state.acceptanceFilter
    }
  }
}
