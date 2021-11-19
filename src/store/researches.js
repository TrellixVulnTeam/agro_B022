import router from '@/router'
export default {
  state: {
    researches: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    research: {},
    researchData: [],
    rDataItem: {}
  },

  mutations: {
    setResearches (state, payload) {
      state.researches = payload
    },
    setResearch (state, payload) {
      state.research = payload
    },
    setResearchData (state, payload) {
      state.researchData = payload
    }
  },

  actions: {
    getResearches ({state, commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('researches?page=' + state.researches.paginator.current_pages)
      .then(response => {
        commit('setResearches', response.data)
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
    getResearch ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('research?id=' + id)
      .then(response => {
        commit('setResearch', response.data)
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
    getResearchData ({commit}, research_id) {
      commit('setLoading', true)
      this._vm.$http
      .get('research_data?research=' + research_id)
      .then(response => {
        commit('setResearchData', response.data)
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
    createRDataItem ({commit, dispatch}, rDataItem) {
      commit('setLoading', true)
      this._vm.$http
      .post('research_data', rDataItem)
      .then(() => {
        dispatch('getResearchData', rDataItem.research_id)
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
  },

  getters: {
    researches (state) {
      return state.researches
    },
    research (state) {
      return state.research
    },
    researchData (state) {
      return state.researchData
    },
    rDataItem (state) {
      return state.rDataItem
    }
  }
}
