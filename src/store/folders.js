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
      commit('setLoading', true)
      this._vm.$http
      .get('folder?id=' + payload)
      .then(response => {
        commit('setFolder', response.data)
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
    updateFolder ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('folder?id=' + state.folder.id, state.folder)
      .then(() => {
        commit('setMessage', 'Папка успешно обновлена')
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
    createFolder ({commit, dispatch, state}) {
      commit('setLoading', true)
      // console.log(state.folder)
      this._vm.$http
      .post('folder?', state.folder)
      .then(() => {
        commit('setMessage', 'Папка успешно создана')
        dispatch('getProducts', '')
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
    deleteFolder ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .delete('folder?id=' + state.folder.id)
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