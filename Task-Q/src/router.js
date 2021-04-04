import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from './routes/FirstPage.vue'
import Passage from './routes/Passage.vue'
import englishFirstpage from './routes/englishFirstpage.vue'
import enPassage from './routes/enPassage.vue'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:'/',
      name:'FirstPage',
      component:FirstPage,
    },
    {
      path:'/Passage/:id',
      name:'Passage',
      component:Passage
    },
    {
      path:'/Catalogs/:id/:page',
      name:'Catalogs',
      component:Passage,
    },
    {
      path:'/search/:key/:page',
      name:'search',
      component:Passage,
    },
    {
      path:'/en',
      name:'English',
      component:englishFirstpage,
    },
    {
      path:'/en/Passage/:id',
      name:'enPassage',
      component:enPassage
    },
    {
      path:'/en/Catalogs/:id/:page',
      name:'enCatalogs',
      component:enPassage,
    },
    {
      path:'/en/search/:key/:page',
      name:'ensearch',
      component:enPassage,
    },
  ]
})
