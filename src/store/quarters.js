import router from '@/router'
export default {
  state: {
    quarters: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    quarter: {}
  },

  mutations: {
    setQuarters (state, payload) {
      state.quarters = payload
    },
    setQuarter (state, payload) {
      state.quarter = payload
    }
  },

  actions: {
    getQuarters ({state, commit}, garden) {
      commit('setLoading', true)
      this._vm.$http
      .get('quarters_units?garden=' + garden + '&page=' + state.quarters.paginator.current_pages)
      .then(response => {
        commit('setQuarters', response.data)
        commit('setQuarter', {})
        commit('setFolder', {})
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
    getQuarter ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('quarter_units?id=' + id)
      .then(response => {
        commit('setQuarter', response.data)
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
    updateQuarter ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('quarters_unit', state.quarter)
      .then(() => {
        commit('setMessage', 'Квартал успешно обновлена')
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
    createQuarter ({commit}, quarter) {
      commit('setLoading', true)
      this._vm.$http
      .post('quarters_unit', quarter)
      .then(() => {
        commit('setMessage', 'Квартал успешно создан')
        commit('setLoading', false)
        // dispatch('getQuarters', quarter.garden_id)
        router.push('/gardens')
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.human_data)
      })
    },
    deleteQuarter ({commit, dispatch}, payload) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('quarters_unit?id=' + payload.id)
      .then(() => {
        if (router.currentRoute.path !== ('/quarters/' + payload.garden_id)) {
          router.push('/quarters/' + payload.garden_id)
        }
        dispatch('getQuarters', payload.garden_id)
        commit('setMessage', 'Квартал успешно удален')
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
    quarters (state) {
      return state.quarters
    },
    quarter (state) {
      return state.quarter
    }
  }
}
