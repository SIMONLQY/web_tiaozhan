import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data () {
    return{
      passage:{},
      catname:"",
      allCatalogs:[],
      catalogs:[],
      services:"",
      childId:"",
      total:10,
      allAatalogs:[]
    }
  },
  methods:{
    chekservices(r){
      this.$root.services=r.data.data
    },
    getheads(r){
      this.headers=r.data
    },
    checkcatalogs(r){

      this.catalogs=r.data.data
      this.total=r.data.total
    },
    checkpassage(r){
      this.passage=r.data
    },
    getinfo(n,r){
      for(let i=0;i<r.length;i++){
        for(let j=0;j<r[i].children.length;j++){
          if(n==r[i].children[j].catalog_name){
            axios.get('/api/v1/secondCatalog',{params:{catalogId:r[i].children[j].id,page:1,limit:5}})
            .then(r=>{return r.data})
          }
        }
      }
    },
    getinf(r){
				this.$root.total=r.data.total
				this.$root.allAatalogs=r.data.data
				if(r.data.data.length<=20){
					this.$root.catalogs=r.data.data
				} else{
					for(let j=0;j<20;j++){
						this.$root.catalogs.splice(j,1,this.$root.allAatalogs[j])
					}
				}
			},
    refresh(r){
      for(let i=0;i<r.length;i++){
        for(let j=0;j<r[i].children.length;j++){
          if(this.$route.path=='/Catalogs/'+r[i].children[j].id){
            this.catname=r[i].children[j].catalog_name
            axios.get('/api/v1/secondCatalog',{params:{catalogId:r[i].children[j].id,page:1,limit:10}})
            .then(r=>this.checkcatalogs(r.data))
            window.scrollTo(0,500)
            this.childId=r[i].children[j].id
            if(r[i].children[j].catalog_role==4){
              axios.get('/api/v1/onlineService',{params:{page:1,limit:10}})
              .then(r=>this.chekservices(r.data))
              this.$root.catname=r[i].children[j].catalog_name
            }
          }
          if(this.$route.path=='/Passage/'+r[i].children[j].id){
            window.scrollTo(0,500)
            this.$router.push({path:'/Passage',query:{id:r[i].children[j].id}})
            axios.get('/api/v1/firstCatalog',{params:{catalogId: r[i].children[j].id}})
            .then(r=>this.checkpassage(r.data))
          }
        }
      }
    }
  },
  mounted(){
    if(this.$route.path!='/Passage'){
      this.$root.passage.headline=null
    }
  }
}).$mount('#app')
