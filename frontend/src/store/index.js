import Vue from 'vue'
import Vuex from 'vuex'
import {http} from '../utils/utils'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    normalApiList: [],
    currentApi: {},
  },
  mutations: {
    setNormalApiList(state, payload) {
      state.normalApiList = payload;
    },
    setCurrentApi(state, payload) {
      state.currentApi = payload;
    }
  },
  actions: {
    requestNormalApiList(context) {
      http(aceMockUrl).post('get-normal-api-list').then(res => {
        context.commit('setNormalApiList', res.data.data);
      })
    }
  },
  modules: {
  }
})
