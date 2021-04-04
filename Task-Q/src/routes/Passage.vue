<template>
  <div class="Passage">
    <div class="alls">
      <div class="head">
        <img src="../assets/Location.png" class="loca">
        <p class="headWords">青年之声</p>
        <p class="headWords" v-show="$route.path!='/Passage'">>{{cat}}</p>
        <p class="headWords" v-show="$route.path=='/Passage'">>{{pas}}</p>
      </div>
      <div class="passage" v-if="$route.path=='/Passage'">
        <div class="hcontents">
          <h2 class="articleTitle">{{firsthead}}</h2>
          <h3 class="articleSub">{{secondehead}}</h3>
          <p class="otherInformation">文章来源：{{source}}   发布时间：{{publish}}   浏览次数：{{views}}</p>
          <HR align=center width=80% color=black size=1></HR>
          <div class="content" v-html="content"></div>
          <p class="author" >{{author}}</p>
        </div>
        <ul class="attachments">
          <div class="attachmentDownload" v-show="attachments.length>0">附件下载</div>
          <li v-for="(attachment,i) in attachments" class="attachment">
            <div @click="getAttachmentLink(attachment.attachment_path)" class="atN">附件{{i+1}} </div>
            <p class="downloadNumber">:已经下载{{attachment.download_number}}次</p>
          </li>
        </ul>
      </div>
      <div class="catalogs" v-show="$route.path=='/Catalogs'||$route.path=='/search'">
        <div v-show="$route.query.id!=20||$route.path=='search'" >
          <div class="catalogGuide">{{cat}}目录</div>
          <div v-for="(catalog,i) in $root.catalogs" class="cats" >
            <div class="focuseIp">
              <div class="guideShapeBox">
                <img src="../assets/guideShape.png" class="guideShape">
              </div>
              <div @click="getpassage(catalog.article_id)" class="headline">{{catalog.headline}}</div>
            </div> 
            <div class="headline">{{catalog.publish}}</div>
          </div>
        </div>
        <div v-show="$route.query.id==20&&$route.path!='search'" class="services">
          <div v-for="(service,i) in $root.services" class="service" @click="getservice(service.link)">
            <img :src='service.img_path' class="serviceImg">
            <h3 class="serviceH">{{service.link_name}}</h3>
          </div>
        </div>
        <el-pagination v-show="$route.query.id!=20||$route.path=='search'" background layout="prev, pager, next" :total="$root.total" :page-size="20"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Banner from '../views/Banner.vue'
import About from '../views/About.vue'
import Content from '../views/Content.vue'
import axios from 'axios'
import pasContent from '../views/pasContent.vue'
export default{
  props:{
    cat:"",
    pas:"",
    author:"",
    source:"",
    firsthead:"",
    secondehead:"",
    publish:"",
    views:"",
    content:"",
    attachments:Array
  },
  data(){
    return{
    }
  },
  methods:{
    handleCurrentChange(val){
      if(this.$route.path=='/Catalogs'){
        this.$root.catalogs=[]
        this.$router.push({path:'/Catalogs',query:{id:this.$route.query.id,page:val}})
        axios.get('/api/v1/secondCatalog',{params:{catalogId:this.$route.query.id,page:val,limit:20}})
        .then(r=>{this.$root.catalogs=r.data.data.data})
      } else if(this.$route.path=='/search'){
        this.$root.catalogs=[]
        this.$router.push({path:'/search',query:{key:this.$route.query.key,page:val}})
        for(let j=(val-1)*20;j<Math.min(this.$root.allAatalogs.length,val*20);j++){
          this.$root.catalogs.push(this.$root.allAatalogs[j])
        }
      }
    },
    getservice(l){
      window.open("https://"+l,"_blank")
    },
    getAttachmentLink(l){
      axios.get('api/v1/attachment',{params:{id:l}})
      .then(console.log(r.data))
    },
    changePassage(r){
      this.$router.push({path:'/Passage',query:{id:r.data.article_id}})
      this.$root.passage=r.data
    },
    getpassage(l){
      axios.get('/api/v1/article',{params:{articleId:l}})
      .then(r=>this.changePassage(r.data))
    },
  },
  components:{
    Banner,
    About,
    Content,
    pasContent
  }
}
;</script>

<style type="text/css" scoped>
.guideShapeBox{
  height: 21px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  margin-right: 6px;
}
.catalogGuide{
  font-size: 35px;
  font-family: "SimHei";
  color: rgb(0, 0, 0);
  margin-bottom: 12px;
  margin-top: 12px;
  font-weight: lighter;
}
.guideShape{
  width: 10px;
  height: 10px;
}
.focuseIp{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 60%;
}

.serviceImg{
  cursor: pointer;
  height: 185px;
  width: 250px;
  object-fit: cover;
  object-position: 50% 50%;
}
.serviceH{
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  font-size: 17.5px;
  font-family: "SimHei";
  bottom: 2px;
  color: rgb(255, 255, 255);
  letter-spacing: 1.9px;
  font-weight: normal;
}

.downloadNumber{
  font-size: 17px;
  font-family: "DengXian";
  color: rgb(0, 0, 0);
  letter-spacing: 2px;
}
.attachmentDownload{
  font-size: 22px;
  font-family: "DengXian";
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.atN{
  font-size: 17px;
  font-family: "DengXian";
  color: rgb(230, 51, 51);
  font-weight: 200;
  cursor: pointer;
}
.atN:hover{
  text-decoration: underline;
}
.attachments{
  padding-left: 0;
}
.serviceWord{
  cursor: pointer;
}
.serviceWord:hover{
  text-decoration: underline;
}

.articleTitle {
  width: 800px;
  font-weight: bolder;
  font-size: 32px;
  margin: 0 auto;
  font-family: "SimHei";
}
.articleSub {
  width: 900px;
  font-weight: bold;
  font-size: 24px;
  margin: 0 auto;
  font-family: "SimHei";
}
.otherInformation {
  width: 800px;
  margin: 0 auto;
  color: gray;
  font-family: "FangSong";
}
.content{
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
}
.content p {
  font-size:15px;
  line-height: 1.5;
  text-indent: 2em;
  padding-top: 3px;
  padding-bottom: 3px;
  font-family: "SimSun";
}
.content img {
  width: auto;
  margin: 0 auto;
  padding-bottom: 3px;
}
.author {
  margin-right: none;
  width: 100%;
  color: dimgray;
  font-size: 14px;
  display:flex;
  justify-content: flex-end;
}
.services{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top:55px;
  margin-left:110px;
  margin-right:110px;
  justify-content: space-between;
  align-items: space-between;
}
.service{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width:31%;
  margin-bottom: 80px;
}
.guides{
  display: flex;
  flex-direction: row;
  padding: 0;
  justify-content: center;
}
.guides li{
  cursor: pointer;
  list-style: none;
  border:1px solid black;
  margin: 5px;
  width: 23px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.shenglue{
  list-style: none;
  margin: 5px;
  width: 23px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.banner{
  width: 100%;
  z-index: 0;
}
.Passage{
  width: 84%;
  margin-top: 15px;
}
.alls{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.head{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.headline{
  text-decoration: none;
  cursor: pointer;
  font-size: 18px;
  font-family: "SimHei";
  color: rgb(0, 0, 0);
  line-height: 1.2;
  font-weight: normal;
}
.headline:hover{
  text-decoration: underline;
}
.headWords{
  color: red;
}
.passage{
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border:1px solid #626262;
  padding-bottom:10px;
  padding-top: 16px;
  padding-left: 120px;
  padding-right: 120px;
}
.catalogs{
  min-height:  100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border:1px solid #626262;
  position: relative;
  padding:30px;
  padding-top: 0;
}
.cats{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
}
.hcontents{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loca{
  height: 27px;
  margin-right: 10px;
}
.attachment{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
p,
h2,
h3{
  display: flex;
  justify-content: center;
}
@font-face{
  font-family: SimHei;
  src: url(../assets/simhei.ttf);
}
@font-face{
  font-family: DengXian;
  src: url(../assets/dengxian.ttf);
}
</style>
<style type="text/css">
/* 一个style标签之后的style标签在vscode里不会代码补全 */
.el-pagination{
  text-align: center;
}
</style>