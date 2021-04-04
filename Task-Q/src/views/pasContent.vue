<template>
  <div class="menu">
		<div v-for="(parent,i) in firstLiNames" class="lis"  @mouseover="show(i)" @mouseleave="hide(i)" >
			<a class="as" >{{firstLiNames[i].parentName}}</a>
      <div class="secondMenu" v-show="isActive[i]" @mouseover="show(i)" @mouseout="hide(i)">
        <div class="direction"></div>
        <ul class="ul" >
          <li v-for="(child,j) in secondLinames[i]"  @click="routechange(child)" class="secondLinames">
            {{secondLinames[i][j].catalog_name}}
          </li>
        </ul>
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
       secondLinames:[[],
                      [],
                      [],
                      [],
                      [],
                      [],],
        isActive:[false,false,false,false,false,false],
      }
    },
    methods:{
      checkEnglish(){
        this.$router.push('/en/')
      },
      showfirstpage(){
        this.$router.push('/')
      },
      show(i){
        Vue.set(this.isActive,i,true)
      },
      hide(i){
        Vue.set(this.isActive,i,false)
      },
      getcatalogs(r){
        this.$root.allCatalogs=r.data
        for(let i=0;i<5;i++){
          this.firstLiNames.push(r.data[i])
          for(let j=0;j<r.data[i].children.length;j++){
            this.secondLinames[i].push(r.data[i].children[j])
          }
        }
      },
      checkpassage(r){
        this.$root.passage=r.data
      },
      checkcatalogs(r){
        this.$root.catalogs=r.data.data
        this.$root.total=r.data.total
      },
      chekservices(r){
        this.$root.services=r.data.data
      },
      checksubjects(r){
        window.open(r.link)
      },
      routechange(child){
        this.$root.catname=child.catalog_name

        if(child.catalog_role==2){
          this.$root.passage=null
          this.$router.push({path:'/Passage',query:{id:child.id}})
          axios.get('/api/v1/firstCatalog',{params:{catalogId: child.id}})
          .then(r=>this.checkpassage(r.data))
        } else if(child.catalog_role==3){
          this.$root.catalogs=[]
          this.$router.push(`/Catalogs/${child.id}`)
          axios.get('/api/v1/secondCatalog',{params:{catalogId:child.id,page:1,limit:20}})
          .then(r=>this.checkcatalogs(r.data))
          this.$root.childId=child.id
          this.$root.catname=child.catalog_name
        } else if(child.catalog_role==4){
          this.$router.push(`/Catalogs/${child.id}`)
          axios.get('/api/v1/onlineService',{params:{page:1,limit:20}})
          .then(r=>this.chekservices(r.data))
          this.$root.catname=child.catalog_name
          this.$root.passage.headline=null
        } else if(child.catalog_role==5){
          axios.get('/api/v1/specialLink',{params:{catalogId:child.id}})
          .then(r=>this.checksubjects(r.data))
        }
      }
    },
    created(){
      axios.get('/api/v1/catalogs')
      .then(r=>this.getcatalogs(r.data))
      .catch(err =>console.log('发生错误'+err))
    }
  }
;</script>

<style type="text/css" scoped>
.secondMenu{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  z-index: 1;
  top:34px;
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
  width: 100%;
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
  font-family: "SimHei";
  color: rgb(0, 0, 0);
  font-weight: bold;
  letter-spacing:4px;
  font-weight: normal;
  margin-top: 4px;
  margin-bottom: 4px;
}
.lis{
  position: relative;
  line-height: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
  background-color: #eeeeee;
}
.lis:hover{
  background-color: #d7d7d5;
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