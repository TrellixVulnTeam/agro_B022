import router from '@/router'
export default {
  state: {
    files: null
  },

  mutations: {
    setFiles (state, payload) {
      state.files = payload
    }
  },

  actions: {
    getFiles ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('/files?model=' + payload.model + '&id=' + payload.id)
      .then(response => {
        commit('setFiles', response.data)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else if (error.response.status === 400) {
          commit('setFolderMeta', {})
        }
        commit('setError', error.response.data.message)
      })
    },
    deleteFile ({commit, dispatch}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .delete('/file?key=' + payload.model + '/' + payload.product_id + '/' + payload.file_name)
      .then(() => {
        dispatch('getFiles', { model: payload.model, id: payload.product_id })
        commit('setMessage', 'Файл успешно удален')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else if (error.response.status === 400) {
          commit('setFolderMeta', {})
        }
        commit('setError', error.response.data.message)
      })
    },
  },

  getters: {
    files (state) {
      return state.files
    }
  }
}
