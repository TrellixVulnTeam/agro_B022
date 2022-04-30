import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/assets/styles.scss'
import '@/assets/print.scss'

Vue.use(require('vue-moment'))

Vue.component('default-layout', DefaultLayout)
Vue.component('auth-layout', AuthLayout)

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.jwt
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
