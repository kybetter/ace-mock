import Vue from 'vue'
import axios from 'axios'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

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
