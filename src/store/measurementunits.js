import router from '@/router'
export default {
  state: {
    measurementUnits: {}
  },

  mutations: {
    setMeasurementUnits (state, payload) {
      state.measurementUnits = payload
    }
  },

  actions: {
    getMeasurementUnits ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('measurement_units')
      .then(response => {
        commit('setMeasurementUnits', response.data)
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
    measurementUnits (state) {
      return state.measurementUnits
    }
  }
}
