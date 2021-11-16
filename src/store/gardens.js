import router from '@/router'
export default {
  state: {
    gardens: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
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
    getGardens ({state, commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('gardens?page=' + state.gardens.paginator.current_pages)
      .then(response => {
        commit('setGardens', response.data)
        commit('setGarden', {})
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
    getGarden ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('gardens?id=' + payload)
      .then(response => {
        commit('setGarden', response.data)
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    updateGarden ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('garden?id=' + state.garden.id, state.garden)
      .then(() => {
        commit('setMessage', 'Склад успешно обновлена')
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
    createGarden ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('garden?', state.garden)
      .then(() => {
        commit('setMessage', 'Склад успешно создан')
        router.push('/gardens')
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
    deleteGarden ({commit, dispatch}, payload) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('garden?id=' + payload.id)
      .then(() => {
        if (router.currentRoute.path !== ('/gardens/' + payload.parent_id)) {
          router.push('/gardens/' + payload.parent_id)
        }
        dispatch('getGardens', payload.parent_id)
        commit('setMessage', 'Склад успешно удален')
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
