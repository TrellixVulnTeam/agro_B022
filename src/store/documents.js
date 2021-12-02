import router from '@/router'
export default {
  state: {
    documents: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    }
  },

  mutations: {
    setDocuments (state, payload) {
      state.documents = payload
    }
  },

  actions: {
    getDocuments ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('/acceptances?page=' + 1)
      .then(response => {
        commit('setDocuments', response.data)
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
    documents (state) {
      return state.documents
    }
  }
}
