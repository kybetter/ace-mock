import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import NormalAPI from '../views/NormalAPI.vue'
import GraphQL from '../views/GraphQL.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'normalapi',
        alias: '',
        name: 'normalapi',
        component: NormalAPI,
      },
      {
        path: 'graphql',
        name: 'graphql',
        component: GraphQL,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
