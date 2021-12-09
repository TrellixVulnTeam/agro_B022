import router from '@/router'
export default {
  state: {
    gardens: {},
    garden: {},
    garden_types: {
      data: [],
      paginator: []
    }
  },

  mutations: {
    setGardens (state, payload) {
      state.gardens = payload
    },
    setGarden (state, payload) {
      state.garden = payload
    },
    setGarden_types (state, payload) {
      state.garden_types = payload
    }
  },

  actions: {
    getGardens ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('gardens')
      .then(response => {
        commit('setGardens', response.data)
        commit('setGarden', {})
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
    getGarden ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('garden?id=' + payload)
      .then(response => {
        commit('setGarden', response.data)
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
    getGarden_types ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('garden_types?page=1')
      .then(response => {
        commit('setGarden_types', response.data)
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
    updateGarden ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('gardens', state.garden)
      .then(() => {
        commit('setMessage', 'Сад успешно обновлена')
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
    createGarden ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('gardens', state.garden)
      .then(response => {
        commit('setMessage', 'Сад успешно создан')
        router.push('/garden/' + response.data.id)
        router.push('/gardens')
        commit('setLoading', false)
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
    deleteGarden ({commit, dispatch}, payload) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('gardens?id=' + payload.id)
      .then(() => {
        router.push('/gardens')
        dispatch('getGardens')
        commit('setMessage', 'Сад успешно удален')
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
    gardens (state) {
      return state.gardens
    },
    garden (state) {
      return state.garden
    },
    garden_types (state) {
      return state.garden_types
    }
  }
}
