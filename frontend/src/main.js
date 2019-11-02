import Vue from 'vue';
import axios from 'axios';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import io from 'socket.io-client';

Vue.use(Antd);

Vue.config.productionTip = false;

const baseURL = process.env.NODE_ENV === 'production' ?
`//${location.host}/` : '//localhost:12345/';

Vue.prototype.$http = axios.create({
  baseURL: baseURL + 'api',
  timeout: 10000,
});

Vue.prototype.$io = io(baseURL);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
