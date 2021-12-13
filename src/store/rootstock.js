import router from '@/router'
export default {
  state: {
    rootstock: {},
    rootstocks: {
      data: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    }
  },

  mutations: {
    setRootstock (state, payload) {
      state.rootstock = payload
    },
    setRootstocks (state, payload) {
      state.rootstocks = payload
    }
  },

  actions: {
    getRootstocks ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .get('rootstocks?page=' + state.rootstocks.paginator.current_pages)
      .then(response => {
        commit('setRootstocks', response.data)
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
    getRootstock ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('rootstock?id=' + id)
      .then(response => {
        commit('setRootstock', response.data)
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
    createRootstock ({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('rootstock', state.rootstock)
      .then(() => {
        dispatch('getRootstocks')
        commit('setLoading', false)
        commit('setRootstock', {})
        commit('setMessage', 'Подвой успешно создан!')
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
    updateRootstock({commit, dispatch, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('rootstock', state.rootstock)
      .then(() => {
        dispatch('getRootstocks')
        commit('setLoading', false)
        commit('setRootstock', {})
        commit('setMessage', 'Подвой успешно обновлен!')
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
    deleteRootstock ({commit, dispatch}, item) {
      commit('setLoading', true)
      this._vm.$http
      .delete('rootstock?id=' + item.id)
      .then(() => {
        dispatch('getRootstocks')
        commit('setLoading', false)
        commit('setRootstock', {})
        commit('setMessage', 'Подвой успешно удален!')
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
    rootstock (state) {
      return state.rootstock
    },
    rootstocks (state) {
      return state.rootstocks
    }
  }
}
