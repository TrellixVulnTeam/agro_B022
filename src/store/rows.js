import router from '@/router'
export default {
  state: {
    rows: {
      data: [],
      folders: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    row: {
      name: '',
      block_id: null
    }
  },

  mutations: {
    setRows (state, payload) {
      state.rows = payload
    },
    setRow (state, payload) {
      state.row = payload
    },
    setRowBlock (state, id) {
      state.row.block_id = parseInt(id)
    }
  },

  actions: {
    getRows ({state, commit}, block_id) {
      commit('setLoading', true)
      this._vm.$http
      .get('blocks_rows?block=' + block_id + '&page=' + state.rows.paginator.current_pages)
      .then(response => {
        commit('setRows', response.data)
        commit('setRow', {})
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
    getRow ({commit}, row_id) {
      commit('setLoading', true)
      this._vm.$http
      .get('blocks_row?id=' + row_id)
      .then(response => {
        commit('setRow', response.data)
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
    updateRow ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('blocks_row?id=' + state.row.id, state.row)
      .then(() => {
        commit('setMessage', 'Ряд успешно обновлена')
        commit('setLoading', false)
        commit('setRow', {})
        router.go(0)
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
    createRow ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('blocks_row', state.row)
      .then(() => {
        commit('setMessage', 'Ряд успешно создан')
        commit('setLoading', false)
        commit('setRow', {})
        router.go(0)
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
    deleteRow ({commit, dispatch}, row) {
      commit('setLoading', true)    
      this._vm.$http
      .delete('blocks_row?id=' + row.id)
      .then(() => {
        // if (router.currentRoute.path !== ('/rows/' + row.block_id)) {
        //   router.push('/rows/' + row.block_id)
        // }
        dispatch('getRows', row.block_id)
        commit('setMessage', 'Ряд успешно удален')
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
    rows (state) {
      return state.rows
    },
    row (state) {
      return state.row
    }
  }
}
