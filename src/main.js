import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let port = document.getElementsByTagName('meta')['port']
port = port ? port.getAttribute('content') : 12345;

Vue.prototype.$http = axios.create({
  baseURL: `//localhost:${port}/`,
  timeout: 10000,
});;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
