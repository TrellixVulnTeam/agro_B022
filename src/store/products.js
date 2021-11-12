import router from '@/router'
export default {
  state: {
    products: {
      data: [],
      folders: [],
      paginator: {}
    },
    product: {}
  },

  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
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
          router.push('/signin')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    getProduct ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('product?id=' + payload)
      .then(response => {
        commit('setProduct', response.data)
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
    updateProduct ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .put('product?id=' + state.product.id, state.product)
      .then(() => {
        commit('setMessage', 'Продукция успешно обновлена')
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
    createProduct ({commit, state}) {
      commit('setLoading', true)
      // console.log(state.product)
      this._vm.$http
      .post('product?', state.product)
      .then(response => {
        commit('setMessage', 'Продукция успешно создана')
        router.push('/products/' + response.data.id)
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
    deleteProduct ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .delete('product?id=' + state.product.id)
      .then(() => {
        router.go(-1)
        commit('setMessage', 'Продукция успешно удалена')
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
    products (state) {
      return state.products
    },
    product (state) {
      return state.product
    }
  }
}
