import router from '@/router'
export default {
  state: {
    products: null
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
        commit('setLoading', false)
        console.log(response)
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
