import router from '@/router'
export default {
  state: {
    block: {
      block_name: '',
      block_description: '',
      block_size: null
    },
    blocks: {},
    landingSchemas: {}
  },

  mutations: {
    setBlock (state, payload) {
      state.block = payload
    },
    setBlocks (state, payload) {
      state.blocks = payload
    },
    setBlockParent (state, payload) {
      state.block.quarter_id = payload
    },
    setLandingSchemas (state, payload) {
      state.landingSchemas = payload
    }
  },

  actions: {
    getBlocks ({commit}, quarter_id) {
      commit('setLoading', true)
      this._vm.$http
      .get('blocks_units?quarter=' + quarter_id + '&page=' + 1)
      .then(response => {
        commit('setBlocks', response.data)
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
    getBlock ({commit}, id) {
      commit('setLoading', true)
      this._vm.$http
      .get('blocks_unit?id=' + id)
      .then(response => {
        commit('setBlock', response.data)
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
    getLandingSchemas ({commit}) {
      this._vm.$http
      .get('landing_schemas?page=' + 1)
      .then(response => {
        commit('setLandingSchemas', response.data)
      })
      .catch(error => {
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    updateBlock ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('blocks_unit', state.block)
      .then(() => {
        commit('setMessage', 'Блок успешно обновлен')
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
    createBlock ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('blocks_unit', state.block)
      .then(() => {
        commit('setMessage', 'Блок успешно создан')
        commit('setLoading', false)
        commit('setBlock', {})
        // location.reload()
        router.go(0)
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
    deleteBlock ({commit}, block) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('blocks_unit?id=' + block.block_id)
      .then(() => {
        commit('setMessage', 'Блок успешно удален')
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
    block (state) {
      return state.block
    },
    blocks (state) {
      return state.blocks
    },
    landingSchemas (state) {
      return state.landingSchemas
    }
  }
}
