import router from '../router'
// import _ from 'lodash'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserData (state, userData) {
      localStorage.token = userData.token
      // var base64Url = userData.token.split('.')[1]
      // var base64 = base64Url.replace('-', '+').replace('_', '/')
      // var encToken = JSON.parse(window.atob(base64))
      // localStorage.urole = encToken.role
    }
  },
  actions: {
    getPass ({commit}, email) {
      commit('setLoading', true)
      let payload = {
        company_slug: 'dev',
        email
      }
      this._vm.$http
      .post('auth/new_session', payload)
      .then(response => {
        console.log(response)
        // commit('setLoading', false)
        // commit('setUserData', {payload: response.data})
        // commit('setMessage', 'Вы успешно вошли в систему')
        // router.push('/')
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          commit('setError', error.response.data.message)
        }
      })
    },
    loginUser ({commit}, user) {
      commit('setLoading', true)
      this._vm.$http
      .post('/login', user)
      .then(response => {
        commit('setLoading', false)
        commit('setUserData', {payload: response.data})
        commit('setMessage', 'Вы успешно вошли в систему')
        router.push('/')
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          commit('setError', error.response.data.message)
        }
      })
    },
    // checkToken: _.debounce(function ({ commit, dispatch }, retryRequest) {
    //   if (!this._vm.$http.defaults.headers.common.Authorization) this._vm.$http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token
    //   this._vm.$http
    //     .post('auth/refresh', {'refresh': localStorage.refresh_token}).then(response => {
    //       commit('setUserData', {payload: response.data, retryRequest})
    //     })
    //     .catch(() => {
    //       dispatch('logOut')
    //     })
    // }, 500),

    async autoLoginUser ({commit}, payload) {
      this._vm.$http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.token
      await commit('setUser', payload)
    },

    logOut ({commit}) {
      router.push('/login')
      localStorage.clear()
      commit('setUser', null)
    }
  },

  getters: {
    user (state) {
      return state.user
    }
  }
}
