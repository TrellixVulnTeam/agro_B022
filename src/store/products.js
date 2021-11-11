import router from '@/router'
export default {
  state: {
    products: {
      data: [],
      folders: [],
      paginator: {}
    }
  },

  mutations: {
    setProducts (state, payload) {
      state.products = payload
    }
  },

  actions: {
    getProducts ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('products' + payload)
      .then(response => {
        commit('setProducts', response)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('signin')
          commit('setError', error.response.data.message)
        }
      })
    }
  },

  getters: {
    products (state) {
      return state.products
    }
  }
}
