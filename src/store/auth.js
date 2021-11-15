import router from '@/router'
// import _ from 'lodash'
class User {
  constructor (id) {
    id = parseInt(id)
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserData (state, userData) {
      console.log(userData)
      localStorage.jwt = userData.jwt
      var base64Url = userData.jwt.split('.')[1]
      var base64 = base64Url.replace('-', '+').replace('_', '/')
      var encToken = JSON.parse(window.atob(base64))
      localStorage.exp = encToken.exp
      localStorage.user_name = encToken.Payload.user_name
      localStorage.user_id = encToken.Payload.user_id
      localStorage.role = encToken.Payload.role
      localStorage.company = encToken.Payload.company
      state.user = new User(encToken.Payload.user_id)
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
        commit('setLoading', false)
        commit('setMessage', response.data.human_data)
        router.push('/signin')
      })
      .catch(error => {
        commit('setLoading', false)
        if (error.response.status === 401) {
          commit('setError', error.data.human_data)
        }
      })
    },
    signIn ({commit}, user) {
      commit('setLoading', true)
      this._vm.$http
      .post('auth/get_token', user)
      .then(response => {
        commit('setLoading', false)
        commit('setMessage', 'Вы успешно вошли в систему')
        commit('setUserData', response.data)
        router.push('/')
        setTimeout(() => {
          location.reload()
        }, 100);
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.data.human_data)
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
