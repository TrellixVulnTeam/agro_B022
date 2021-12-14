import router from '@/router'
export default {
  state: {
    indicators: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    indicator: {},
    indicatorsGroups: [],
    indicatorsGrouped: []
  },

  mutations: {
    setIndicators (state, payload) {
      state.indicators = payload
    },
    setIndicator (state, payload) {
      state.indicator = payload
    },
    setIndicatorsGroups (state, payload) {
      state.indicatorsGroups = payload
    },
    setIndicatorsGrouped (state, payload) {
      state.indicatorsGrouped = payload
    }
  },

  actions: {
    getIndicators ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .get('indicators?page=' + state.indicators.paginator.current_pages)
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
    getIndicatorsGrouped ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('indicators_grouped')
      .then(response => {
        commit('setIndicatorsGrouped', response.data.indicator_by_groups)
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
    getIndicator ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('indicators?id=' + id)
      .then(response => {
        commit('setIndicator', response.data)
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
    createIndicator ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('indicator', state.indicator)
      .then(() => {
        dispatch('getIndicators')
        dispatch('getIndicatorsGrouped')
        commit('setLoading', false)
        commit('setMessage', 'Индикатор успешно создан!')
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
    updateIndicator ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('indicator', state.indicator)
      .then(() => {
        dispatch('getIndicators')
        dispatch('getIndicatorsGrouped')
        commit('setLoading', false)
        commit('setMessage', 'Индикатор успешно обновлен!')
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
    deleteIndicator ({commit, dispatch}, indicator) {
      commit('setLoading', true)
      this._vm.$http
      .delete('indicator?id=' + indicator.id)
      .then(() => {
        dispatch('getIndicators')
        dispatch('getIndicatorsGrouped')
        commit('setLoading', false)
        commit('setMessage', 'Индикатор успешно удален!')
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
    indicator (state) {
      return state.indicator
    },
    indicatorsGroups (state) {
      return state.indicatorsGroups
    },
    indicatorsGrouped (state) {
      return state.indicatorsGrouped
    }
  }
}
