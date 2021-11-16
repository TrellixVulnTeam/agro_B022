import router from '@/router'
export default {
  state: {
    folder: {},
    folderModels: [],
  },

  mutations: {
    setFolder (state, payload) {
      state.folder = payload
    },
    setFolderModels (state, payload) {
      state.folderModels = payload
    }
  },

  actions: {
    getFolderModels ({commit}) {
      commit('setLoading', true)
      this._vm.$http
      .get('folders_models')
      .then(response => {
        commit('setFolderModels', response.data)
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
    getFolder ({commit}, payload) {
      commit('setFolder', payload)
    },
    updateFolder ({dispatch, commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('folder', state.folder)
      .then(() => {
        commit('setMessage', 'Папка успешно обновлена')
        dispatch('getProducts', state.folder.parent_id)
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
    createFolder ({commit, dispatch, state}, parent_id) {
      state.folder.parent_id = parseInt(parent_id)
      commit('setLoading', true)
      this._vm.$http
      .post('folder?', state.folder)
      .then(() => {
        commit('setMessage', 'Папка успешно создана')
        dispatch('getProducts', parent_id)
        dispatch('getWarehouses', parent_id)
        dispatch('getContractors', parent_id)
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
    deleteFolder ({commit}, folder) {
      commit('setLoading', true)
      this._vm.$http
      .delete('folder?id=' + folder.id, '&model=' + folder.model)
      .then(() => {
        router.go(-1)
        commit('setMessage', 'Папка успешно удалена')
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
    folder (state) {
      return state.folder
    },
    folderModels (state) {
      return state.folderModels
    }
  }
}