<template>
  <div class="all">
    <div class="topline">
      <el-carousel :interval="5000"  >
        <el-carousel-item  v-for="(img, i) in imgs" >
          <img  @click="toptopassage(img.article_id)" :src="img.img_path" class="img"/>
          <div class="headline" @click="toptopassage(img.article_id)">{{img.headline}}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="concentrete">
      <div class="tr">
        <div class="notice" @mouseover="showm" v-bind:class="{isActive: underline}">Notices</div>
      </div>
      <div class="focuses">
        <div v-for="(catalog,i) in catalogs" v-show="misActive" class="focuse">
          <div class="focuseIp">
            <img src="../assets/guideShape.png" class="guideShape">
            <div class="noticeCatalogHead" @click="getNoticeCatalog(catalog.article_id)">{{catalog.headline}}</div>
          </div>
          <div class="noticeCatalog" @click="getNoticeCatalog(catalog.article_id)">{{catalog.publish}}</div>
        </div>
      </div>
      <a  class="ForMore" @click="forMore">For More</a>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import axios from 'axios'
  export default{
    data(){
      return{
        isActive:[true,false,false,false],
        informs:[1],
        focuses:[1],
        misActive:true,
        fisActive:false,
        imgs:[],
        catalogs:"",
        focuses:"",
        underline:true
      }
    },
    methods:{
      checkcatalogs(r){
        this.$root.catalogs=r.data.data
        this.$root.pages=Math.ceil(Number(r.data.total)/10)
        this.$root.total=r.data.total
      },
      forMore(){
        window.scrollTo(0,500)
        if(this.misActive==true){
          this.$router.push({path:'/en/Catalogs',query:{id:9,page:1}})
          axios.get('/api/v1/secondCatalog',{params:{catalogId:9,page:1,limit:20}})
          .then(r=>this.checkcatalogs(r.data))
          this.$root.childId=9
          this.$root.catname="通知公告"
        }
      },
      getNoticeCatalog(i){
        axios.get('/api/v1/eArticle',{params:{articleId:i}})
        .then(r=>{this.$router.push({path:'/Passage',query:{id:r.data.data.article_id}})
                  this.$root.passage=r.data.data})
      },
      toptopassage(d){
        axios.get('/api/v1/eArticle',{params:{articleId:d}})
        .then(r=>{this.$router.push({path:'/Passage',query:{id:r.data.data.article_id}})
                  this.$root.passage=r.data.data})
      },
      checktopline(r){
        this.imgs=r.data.children
      },
      show(i){
        for(let j=0;j<this.isActive.length;j++){
          if(j==i){
            Vue.set(this.isActive,j,true)
          } else{
            Vue.set(this.isActive,j,false)
          }
        }
      },
      showm(){
        this.misActive=true,
        this.fisActive=false,
        this.underline=true
      },
      showf(){
        this.misActive=false,
        this.fisActive=true,
        this.underline=false
      },
      getCatts(r){
        this.catalogs=r.data.children
        if(r.data.children.length>4){
          for(let j=4;j<this.catalogs.length;j++){
            this.catalogs.splice(j,1)
          }
        }
      },
      getFocuses(r){
        this.focuses=r.data.children
        if(r.data.children.length>4){
          for(let j=4;j<this.focuses.length;j++){
            this.focuses.splice(j,1)
          }
        }
      }
    },
    created(){
      axios.get('/api/v1/eHeadlineNewsColumn')
      .then(r=>this.checktopline(r.data))
      axios.get('/api/v1/eNotice')
      .then(r=>{console.log(r.data);this.getCatts(r.data)})
    }
  }
;</script>

<style type="text/css" scoped>
.img{
  cursor: pointer;
  object-fit: cover;
  object-position: 50% 50%;
}
.noticeCatalog{
  word-break: keep-all;
  overflow: hidden;
}
.noticeCatalogHead{
  overflow: hidden;
  word-break: keep-all;
  height: 20px;
  text-overflow: ellipsis;
  max-width: 100%;
}
.noticeCatalogHead:hover{
  color: rgb(204, 51, 51);
}
.focuseIp{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 60%;
}
.topline{
  display: flex;
  justify-content: flex-start;
  width: 45%;
}
.guideShape{
  width: 10px;
  height: 10px;
  margin-top: 3px;
  margin-left: 0;
  margin-right: 6px;
}
.tr{
  display: flex;
  flex-wrap: nowrap;
  height: 33px;
}
.headline{
  position: absolute;
  bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
  margin:0;
  text-decoration: none;
  cursor: pointer;
  font-family: "SimHei";
  font-size: 26px;
  color: rgb(255, 255, 255);
  background-color: #8a8785;
}

.all{
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 20px;
  margin-left: 4px;
}
.focuses{
  border-top: 1px solid #b5b5b5;
  padding-top: 8px;
}
.focuse{
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 8px;
  font-family: "SimHei";
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 7px;
  letter-spacing: 1px;
  cursor: pointer;
}
.notice{
  cursor:pointer;
  text-decoration: none;
  font-size: 24px;
  font-family: "Microsoft YaHei";
  color: rgb(204, 51, 51);
  margin-right: 18px;
  height: 32px;
}
.isActive{
  cursor:pointer;
  text-decoration: none;
  font-size: 24px;
  font-family: "Microsoft YaHei";
  color: rgb(204, 51, 51);
  margin-right: 18px;
  height: 32px;
  border-bottom: 3px solid #cc3333;
}
.concentrete{
  width:50%;
  height: 400px;
  margin-left: 23px;
}
.lis{
  text-decoration: none;
  cursor: pointer;
  border-radius: 20px;
  list-style: none;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b9baac;
}
.lis:hover{
  background-color:#f0b71d ;
}
.ForMore{
  position: absolute;
  bottom: 10px;
  right: 1px;
  cursor: pointer;
  font-size: 18px;
  color: rgb(105, 105, 105);
  font-family: "SimHei";
}

.ForMore:hover{
  color: red;
}
@font-face{
  font-family: "Arial";
  src: url(../assets/Noxchi-Arial.ttf);
}
.ForMore:hover{
  color: red;
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




