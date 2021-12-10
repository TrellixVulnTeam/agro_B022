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
    rDataItem: {},
    researchStatuses: [
      {
        value: 'draft',
        name: 'черновик'
      },
      {
        value: 'in_progress',
        name: 'идет исследование'
      },
      {
        value: 'complete',
        name: 'исследование завершено'
      }
    ]
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
    },
    setRDataItem (state, payload) {
      state.rDataItem = payload
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    getFilteredResearches ({state, commit}, params) {
      commit('setLoading', true)
      this._vm.$http
      .get('researches_filter?page=' + state.researches.paginator.current_pages + '&acceptance_id=' + params.acceptance_id)
      .then(response => {
        commit('setResearches', response.data)
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
      })
    },
    createResearch ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('research', state.research)
      .then(response => {
        commit('setLoading', false)
        commit('setMessage', 'Исследование успешно добавлено')
        router.push('/research/' + response.data.id)
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
    createRDataItem ({commit, dispatch}, rDataItem) {
      commit('setLoading', true)
      this._vm.$http
      .post('research_data', rDataItem)
      .then(() => {
        commit('setRDataItem', {})
        commit('setLoading', false)
        commit('setMessage', 'Данные исследования успешно добавлены')
        dispatch('getResearchData', rDataItem.research_id)
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
    deleteRDataItem ({commit, dispatch}, rDataItem) {
      commit('setLoading', true)
      this._vm.$http
      .delete('research_data?id=' + rDataItem.research_item_id)
      .then(() => {
        commit('setRDataItem', {})
        commit('setLoading', false)
        commit('setMessage', 'Данные исследования успешно удалены')
        dispatch('getResearchData', rDataItem.research_id)
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
    },
    researchStatuses (state) {
      return state.researchStatuses
    }
  }
}
