import _ from 'lodash'
import router from '@/router'
export default {
  state: {
    products: {
      data: [],
      folders: [],
      meta: {
        current_folder: "",
        parent_name: "",
        parent_id: 0
      },
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    },
    searchedProducts: [],
    product: {},
    folderMeta: {}
  },

  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setSearchedProducts (state, payload) {
      state.searchedProducts = payload
    },
    setProduct (state, payload) {
      state.product = payload
    },
    setFolderMeta (state, payload) {
      state.folderMeta = payload
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
          router.push('/getpass')
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
          router.push('/getpass')
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
          router.push('/getpass')
          commit('setError', error.response.data.message)
        }
        commit('setError', error.response.data.message)
      })
    },
    createProduct ({commit, state}) {
      commit('setLoading', true)
      this._vm.$http
      .post('product?', state.product)
      .then(response => {
        commit('setLoading', false)
        commit('setMessage', 'Продукция успешно создана')
        router.push('/product/' + response.data.id)
        location.reload()
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          router.push('/getpass')
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.response.data.human_data)
        }
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
          router.push('/signgetpassin')
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
        commit('setSearchedProducts', response.data)
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
    }, 200),
    getFolderMeta ({commit}, parent_id) {
      commit('setLoading', true)
      this._vm.$http
      .get('/folder_meta?model=product&folder=' + parent_id)
      .then(response => {
        commit('setFolderMeta', response.data)
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
    }
  },

  getters: {
    products (state) {
      return state.products
    },
    searchedProducts (state) {
      return state.searchedProducts
    },
    product (state) {
      return state.product
    },
    folderMeta (state) {
      return state.folderMeta
    }
  }
}
