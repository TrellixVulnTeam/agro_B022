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
    acceptance: {
      product_id: null,
      warehouse_id: null,
      quantity: null,
      contractor_id: null,
      blocks_id: null,
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
    batche: {}
  },

  mutations: {
    setAcceptances (state, payload) {
      state.acceptances = payload
    },
    setAcceptance (state, payload) {
      state.acceptance = payload
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
      commit('setLoading', true)
      this._vm.$http
      .get('acceptances?page=' + state.acceptances.paginator.current_pages)
      .then(response => {
        commit('setAcceptances', response.data)
        commit('setAcceptance', {})
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    createAcceptance ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('acceptance?', state.acceptance)
      .then(() => {
        commit('setMessage', 'Приемка успешно создана')
        // router.push('/acceptances')
        commit('setLoading', false)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.human_data)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
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
    batches (state) {
      return state.batches
    },
    batch (state) {
      return state.batch
    }
  }
}
