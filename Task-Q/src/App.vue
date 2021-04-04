<template>
  <div id="app">
    <englishFirstpage v-show="$route.path=='/en'||$route.path=='/en/Passage'||$route.path=='/en/Catalogs'||$route.path=='/en/search'" class="app"></englishFirstpage>
    <div class="app" v-show="$route.path!='/en'&&$route.path!='/en/Passage'&&$route.path!='/en/Catalogs'&&$route.path!='/en/search'">
      <div class="header">
        <Header :name="this.name" :head="this.head" ></Header>
        <Content :firstPage="true" @namepass="namepass" class="cont"></Content>
      </div>
      <FirstPage v-if="$route.path=='/'" ></FirstPage>
      <Passage v-if="$route.path!='/'&&$route.path!='/en'"
      :cat="this.$root.catname"
      :pas="this.$root.passage.headline"
      :publish="this.$root.passage.publish"
      :source="this.$root.passage.source"
      :firsthead="this.$root.passage.headline"
      :views="this.$root.passage.views"
      :attachments="this.$root.passage.attachments"
      :secondehead="this.$root.passage.subheading"
      :content="this.$root.passage.content"
      :author="this.$root.passage.author"></Passage>
      <About></About>
    </div>
  </div>
</template>

<script>
import Header from './views/Header'
import Content from './views/Content'
import FirstPage from './routes/FirstPage'
import Passage from './routes/Passage'
import englishFirstpage from './routes/englishFirstpage'
import About from './views/About.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Header,
    Content,
    FirstPage,
    Passage,
    englishFirstpage,
    About
  },
  data(){
    return{
      catname:"",
      name:"搜索",
      head:"交大青年之声"
    }
  },
  methods:{
    namepass(n){
      this.catname=n
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
  },
  mounted(){
    if(this.$route.path!='/'){
      window.scrollTo(0,500)
    } else{
      window.scrollTo(0,0)
    }
  },
  created(){
    if(this.$route.path!='/'){
      window.scrollTo(0,500)
      if(this.$route.path=="/Passage"){
        axios.get('/api/v1/article',{params:{articleId: this.$route.query.id}})
        .then(r=>{this.$root.passage=r.data.data})
      }  else if(this.$route.path=="/Catalogs"&&this.$route.query.id!=20&&this.$route.path!='/search'){
        this.$router.push({path:'/Catalogs',query:{id:this.$route.query.id,page:1}})
        axios.get('/api/v1/secondCatalog',{params:{catalogId:this.$route.query.id,page:1,limit:20}})
        .then(r=>{this.$root.catalogs=r.data.data.data;this.$root.total=r.data.data.total})
        this.$root.childId=this.$route.query.id
      } else if(this.$route.path=="/Catalogs"&&this.$route.query.id==20){
        axios.get('/api/v1/onlineService',{params:{page:1,limit:20}})
        .then(r=>{this.$root.services=r.data.data.data})
        this.$root.passage.headline=null
      } else if(this.$route.path=='/search'){
        this.$router.push({path:'/search',query:{key:this.$route.query.key,page:1}})
        this.$root.catname=this.$route.query.key+"\t搜索结果"
				axios.get('/api/v1/board',{params:{"key":this.$route.query.key}})
				.then(r=>this.getinf(r.data))
      }
      if(this.$route.path=="/en/Passage"){
        axios.get('/api/v1/eArticle',{params:{articleId: this.$route.query.id}})
        .then(r=>{this.$root.passage=r.data.data})
      }  else if(this.$route.path=="/en/Catalogs"&&this.$route.path!='/en/search'){
        this.$router.push({path:'/en/Catalogs',query:{id:this.$route.query.id,page:1}})
        axios.get('/api/v1/secondCatalog',{params:{catalogId:this.$route.query.id,page:1,limit:20}})
        .then(r=>{this.$root.catalogs=r.data.data.data;this.$root.total=r.data.data.total})
        this.$root.childId=this.$route.query.id
      } else if(this.$route.path=='/en/search'){
        this.$router.push({path:'/en/search',query:{key:this.$route.query.key,page:1}})
        this.$root.catname=this.$route.query.key+"\t搜索结果"
				axios.get('/api/v1/eBoard',{params:{"key":this.$route.query.key}})
				.then(r=>this.getinf(r.data))
      }
    } else{
      window.scrollTo(0,0)
    }
  }
}
;</script>

<style type="text/css" scoped>
#app {
  width:100%;
}
.app{
  width:100%;
  min-height: 1000px;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0px;
}
.header{
  width: 100%;
  background-size: 100% ;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

</style>
