import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import NormalAPI from '../views/NormalAPI.vue'
import GraphQL from '../views/GraphQL.vue'
import NewAPI from '../views/NewAPI.vue'
import NewQL from '../views/NewQL.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'mockdata/normalapi',
        alias: '',
        name: 'normalapi',
        component: NormalAPI,
      },
      {
        path: 'mockdata/graphql',
        name: 'graphql',
        component: GraphQL,
      },
      {
        path: 'newmock/normalapi',
        name: 'NewAPI',
        component: NewAPI,
      },
      {
        path: 'newmock/graphql',
        name: 'NewQL',
        component: NewQL,
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
