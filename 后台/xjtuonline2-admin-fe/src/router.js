import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Passage from './views/passage.vue'
import Signout from '@/Signout.vue'
import tinymceEditor from '@/views/tinyMCE.vue'
import test from '@/components/test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/out',
      name: 'signout',
      component: Signout
    },
    {
      path: '/editor',
      name: 'tinymceEditor',
      component: tinymceEditor
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/passage',
      name: 'passage',
      component: Passage
    }
  ]
})
