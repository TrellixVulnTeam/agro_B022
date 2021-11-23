import _ from 'lodash'
import router from '@/router'
export default {
  state: {
    products: {
      data: [],
      folders: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
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
    getProducts ({state, commit}, folder) {
      commit('setLoading', true)
      this._vm.$http
      .get('products?folder=' + folder + '&page=' + state.products.paginator.current_pages)
      .then(response => {
        commit('setProducts', response.data)
        commit('setProduct', {})
        commit('setFolder', {})
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
      this._vm.$http
      .post('product?', state.product)
      .then(() => {
        commit('setMessage', 'Продукция успешно создана')
        // router.push('/products/' + response.data.id)
        router.push('/products')
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
    deleteProduct ({commit, dispatch}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .delete('product?id=' + payload.id)
      .then(() => {
        if (router.currentRoute.path !== ('/products/' + payload.parent_id)) {
          router.push('/products/' + payload.parent_id)
        }
        dispatch('getProducts', payload.parent_id)
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
    },
    searchProduct: _.debounce(function ({commit}, payload) {
      commit('setLoading', true)
      this._vm.$http
      .get('products/find?q=' + payload)
      .then(response => {
        commit('setLoading', false)
        commit('setProducts', response)
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
    }, 200),
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
