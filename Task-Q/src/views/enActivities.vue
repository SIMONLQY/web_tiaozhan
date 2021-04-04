<template>
  <div class="acticitiesSubjects">
    <div class="subjects">
      <div class="box">
        <h3 class="headers">
          <img src="../assets/down.png" class="logo">
          <h3 class="headersWord">News</h3>
        </h3>
        <div v-for="(download,j) in Downloads" class="topChild">
          <div @click="getpassage(download.article_id)" class="topChildHeadline">{{download.articleName}}</div>
          <p class="topChildHeadline">{{download.publish}}</p>
        </div>
        <div class="forMore" @click="forMore(Downloads.columnId,Downloads.columnName)">For More</div>
      </div>

      <div  class="box">
        <h3 class="headers">
          <img :src="require('../assets/a1.png')" class="logo">
          <h3 class="headersWord">Associations</h3>
        </h3>
        <div class="top" @click="getpassage(heads.top.article_id)">
          <div class="topIW">
            <img :src="heads.top.img_path" class="topImg">
            <div class="topWords">
              <p class="topWordsH">{{heads.top.headline}}</p>
              <p class="topWordsW" >{{heads.top.content_no_label}}</p> 
            </div>
          </div>
          <div v-for="(child,j) in heads.data" class="topChild">
            <div class="focuseIp">
              <div class="guideShapeBox">
                <img src="../assets/guideShape.png" class="guideShape">
              </div>
              <div @click="getpassage(child.article_id)" :title=child.headline class="topChildHeadline">{{child.headline}}</div>
            </div> 
            <div></div>
            <!-- <p class="topChildPublish">{{child.publish}}</p> -->
          </div>
        </div>
        <div class="forMore" @click="forMore(heads.columnId,heads.columnName)">For More</div>
      </div>

      
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import axios from 'axios'
  export default{
    data(){
      return{
        misActive:true,
        fisActive:false,
        heads:"",
        Downloads:"",
        subjects:"",
        tenzors:"",
      }
    },
    methods:{
      getLink(l){
        window.open("https://"+l)
      },
      checkcatalogs(r){
        this.$root.catalogs=r.data.data
        this.$root.total=r.data.total
      },
      forMore(i,n){
        this.$router.push({path:'/en/Catalogs',query:{id:i,page:1}})
        axios.get('/api/v1/secondCatalog',{params:{catalogId:i,page:1,limit:20}})
        .then(r=>this.checkcatalogs(r.data))
        this.$root.childId=i
        this.$root.catname=n
      },
      changePassage(r){
        this.$router.push({path:'/en/Passage',query:{id:r.data.article_id}})
        this.$root.passage=r.data
      },
      getpassage(l){
        axios.get('/api/v1/eArticle',{params:{articleId:l}})
        .then(r=>this.changePassage(r.data))
      },
      showm(){
        this.misActive=true,
        this.fisActive=false
      },
      showf(){
        this.misActive=false,
        this.fisActive=true
      }
    },
    created(){
      for(let i=14;i<17;i++){
        axios.get('/api/v1/eAssociation')
        .then(r=>{this.heads=r.data.data})
      }
      //资料下载
      axios.get('/api/v1/eNews')
      .then(r=>{console.log(r.data);this.Downloads=r.data.data})
    }
  }
;</script>


<style type="text/css" scoped>
.guideShapeBox{
  height: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  margin-right: 6px;
}
.guideShape{
  width: 10px;
  height: 10px;
}
.focuseIp{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.headersWord{
  margin: 2px;
  font-size: 28px;
  letter-spacing: 3px;
  font-family: "Microsoft YaHei";
  color: rgb(204, 51, 51);
  font-weight: normal;
}

.topWordsH{
  display: flex;
  cursor: pointer;
  padding-bottom: 0;
  margin-bottom: 0;
  justify-content: flex-start;
  font-family: "SimHei";
  color: rgb(204, 51, 51);
  font-size: 20px;
  margin-top: 4px;
  height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  overflow: hidden;
  font-weight: normal;
}
.topWordsH:hover{
  text-decoration: underline;
}
.topWordsW{
  display: flex;
  margin-bottom: 0;
  margin-top: 2.3px;
  font-size: 10px;
  font-family: "SimSun";
  line-height: 1.5;
  color: rgb(0, 0, 0);
  overflow:hidden;
  text-overflow:ellipsis; 
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
} 
.topWordsT{
  font-size: 16px;
  font-family: "DengXian";
  color: rgb(91, 91, 86);
}
.top{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.topIW{
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  width:100%;
  overflow: hidden;
}
.topImgtz{
  min-width: 320px;
  width: 320px;
  height: 180px;
  float: left;
  cursor: pointer;
  object-fit: cover;
  object-position: 50% 50%;
}
.topImg{
  min-width: 165px;
  width: 165px;
  height: 150px;
  float: left;
  cursor: pointer;
  object-fit: cover;
  object-position: 50% 50%;
}
.topWords{
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  cursor: pointer;
  max-width: 180px;
}
.forMore{
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  position: absolute;
  width: 100%;
  bottom: 0px;
  font-size: 16px;
  font-family: "DengXian";
  color: rgb(105, 105, 105);
}
.forMore:hover{
  color: rgb(204, 51, 51);
}
.topChild{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
}
.topChildHeadline{
  margin: 3px;
  width: 320px;
  margin-left: 0;
  margin-bottom: 5px;
  overflow: hidden;
  word-break: break-all;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-family: "SimHei";
  font-size: 16px;
  max-width: 80%;
}
.topChildHeadline:hover{
  text-decoration: underline;
}
.topChildPublish{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  margin-left: 5px;
}
.logo{
  width: 55px;
  height: 55px;
  margin-right: 8px;
  margin-bottom: 2px;
}
.acticitiesSubjects{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
}
.headers{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 20px;
  padding-left: 0;
  align-items: center;
  margin-bottom: 7px;
  border-bottom: 1px solid #e60012;
  margin-top: 0px;
}
.subjects{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.tr{
  display:  flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
}
.box{
  width: 47%;
  position: relative;
  padding-bottom: 30px;
  /* min-width: 362px; */
}
.vNet{
  width:40%;
  position: relative;
}
.tables{
  margin-top: 0;
  padding-left: 0;
  margin: 0;
  margin-top: 15px;
}
.table{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 15px;
  height: 42px;
  border-bottom: 1px solid #bfbfbf;
}
.notice{
  cursor:pointer;
  font-size: 30px;
  font-family: "Microsoft YaHei";
  color: rgb(204, 51, 51);
  display: flex;
  flex-grow: 1;
  height: 41px;
}
.isActive{
  cursor:pointer;
  font-size: 30px;
  font-family: "Microsoft YaHei";
  color: rgb(204, 51, 51);
  display: flex;
  flex-grow: 1;
  height: 41px;
  border-bottom: 2px solid #e60012;
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
@font-face{
  font-family: Song;
  src: url(../assets/Song.ttf);
}
@font-face{
  font-family: SimSun;
  src: url(../assets/SimSun.ttf);
}
</style>