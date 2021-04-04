<template>
	<div class="bigMenu">
    <div class="menu">
  		<div class="as" @click="showfirstpage">
  			Home
  		</div>
  		<div v-for="(parent,i) in firstLiNames" class="lis">
  			<a class="as" @click="routechange(parent)">{{firstLiNames[i].catalog_name}}</a>
  		</div>
  		<div class="as" @click="checkChinese">
  		中文版
  		</div>
  </div>
	</div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import axios from 'axios'
  export default{
    props:{
      firstPage:true
    },
    data(){
      return{
       firstLiNames:[],
      }
    },
    methods:{
      checkChinese(){
        this.$router.push('/')
      },
      showfirstpage(){
        this.$router.push('/en')
      },
      chekservices(r){
        this.$root.services=r.data.data
      },
      getcatalogs(r){
        this.$root.allCatalogs=r.data
        for(let i=0;i<r.data.length;i++){
          this.firstLiNames.push(r.data[i])
        }
      },
      checkpassage(r){
        this.$root.passage=r.data
      },
      checkcatalogs(r){
        this.$root.catalogs=r.data.data
        this.$root.total=r.data.total
      },
      routechange(child){
        this.$root.catname=child.catalog_name
        window.scrollTo(0,500)
        if(child.catalog_role==1){
          console.log(1)
          this.$root.passage=null
          this.$router.push({path:'/en/Passage',query:{id:child.id}})
          axios.get('/api/v1/eFirstCatalog',{params:{catalogId: child.id}})
          .then(r=>this.checkpassage(r.data))
        } else if(child.catalog_role==2){
          console.log(2)
          this.$root.catalogs=[]
          this.$router.push({path:'/en/Catalogs',query:{id:child.id,page:1}})
          axios.get('/api/v1/secondCatalog',{params:{catalogId:child.id,page:1,limit:20}})
          .then(r=>this.checkcatalogs(r.data))
          this.$root.childId=child.id
          this.$root.catname=child.catalog_name
        } else if(child.catalog_role==3){
          this.$root.catalogs=[]
          this.$router.push({path:'/en/Catalogs',query:{id:child.id,page:1}})
          axios.get('/api/v1/eDepartment')
          .then(r=>this.checkcatalogs(r.data))
          this.$root.childId=child.id
          this.$root.catname=child.catalog_name
        } else if(child.catalog_role==4){
          this.$router.push({path:'/en/Catalogs',query:{id:child.id,page:1}})
          axios.get('/api/v1/onlineService',{params:{page:1,limit:20}})
          .then(r=>this.chekservices(r.data))
          this.$root.catname=child.catalog_name
          this.$root.passage.headline=null
        }
      }
    },
    created(){
      axios.get('/api/v1/eCatalogs')
      .then(r=>this.getcatalogs(r.data))
      .catch(err =>console.log('发生错误'+err))
    }
  }
;</script>

<style type="text/css" scoped>
.bigMenu{
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #be2537;
}
.secondMenu{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  z-index: 1;
  top:50px;
}
.direction{
  width:0;
  height: 0;
  border-left:12px solid transparent;
  border-right:12px solid transparent;
  border-bottom:12px solid #be2537;
}
.ul{ 
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius:  10px;
  background-color: #be2537;
  margin: 0;
  padding:22px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.secondLinames{
  word-break:keep-all;     
  white-space:nowrap; 
  padding: 1px;
  display: flex;
  justify-content: center;
  margin: 5px;
  letter-spacing: 4px;
  font-size: 18px;
  font-family: "SimHei";
  color: rgb(255, 255, 255);
}
.menu{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 0px;
  margin: 0;
  width: 84%;
}
.sname{
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.as{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22px;
  font-family: "DengXian";
  color: rgb(255, 255, 255);
  font-weight: bold;
  letter-spacing:4px;
}
.lis{
  position: relative;
  line-height: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  margin-right: 3px;
  cursor: pointer;
  height: 50px;
}
@font-face{
  font-family: hwxh;
  src: url(../assets/hwxh.ttf);
}
@font-face{
  font-family: SimHei;
  src: url(../assets/simhei.ttf);
}
@font-face{
  font-family: Microsoft YaHei;
  src: url(../assets/Microsoft YaHei.ttf);
}
@font-face{
  font-family: DengXian;
  src: url(../assets/dengxian.ttf);
}
</style>