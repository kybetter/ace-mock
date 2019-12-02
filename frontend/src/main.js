import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import io from 'socket.io-client';
import {http} from './utils/utils';
import './plugins/antd-components';

Vue.config.productionTip = false

const baseURL = process.env.NODE_ENV === 'production' ?
`//${location.host}/` : '//localhost:12345/';
window.aceMockUrl = baseURL + 'ace-mock-api';

Vue.prototype.$http = http(window.aceMockUrl);

Vue.prototype.$io = io(baseURL);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
