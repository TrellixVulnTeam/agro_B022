import router from '@/router'
export default {
  state: {
    indicators: {},
    indicatorsGroups: []
  },

  mutations: {
    setIndicators (state, payload) {
      state.indicators = payload
    },
    setIndicatorsGroups (state, payload) {
      state.indicatorsGroups = payload
    }
  },

  actions: {
    getIndicators ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('indicators')
      .then(response => {
        commit('setIndicators', response.data)
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
    createIndicator ({commit, dispatch}, indicator) {
      commit('setLoading', true)
      this._vm.$http
      .post('indicator', indicator)
      .then(() => {
        dispatch('getIndicators')
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
    getIndicatorsGroups ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('indicators_groups')
      .then(response => {
        commit('setIndicatorsGroups', response.data)
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
    indicators (state) {
      return state.indicators
    },
    indicatorsGroups (state) {
      return state.indicatorsGroups
    }
  }
}
