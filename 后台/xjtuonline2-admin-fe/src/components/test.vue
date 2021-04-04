<template>
	<div class="Passage">
    <div class="alls">
      <div class="passage">
        <div class="hcontents">
          <h2 class="articleTitle">{{passage.headline}}</h2>
          <h3 class="articleSub">{{passage.subheading}}</h3>
          <p class="otherInformation">文章来源：{{passage.source}}   发布时间：{{passage.publish}}   浏览次数：{{passage.views}} </p>
          <hr align=center width=80% color=black size=1/>
          <div class="content" v-html="passage.content"></div>
          <p class="author">By: {{passage.author}}</p>
        </div>
        <ul class="attachments">
          <li v-for="(attachment,i) in passage.attachments" :key="i" class="attachment">
            <a :href="attachment.attachment_path">附件{{i+1}} {{attachment.attachment_name}}</a>
            <p>:已经下载{{attachment.download_number}}次</p>
          </li>
        </ul>
        <el-button type="warning" plain class="but" @click="edit">重新编辑该文章</el-button>
      </div>
      
    </div>
  </div>

</template>


<script>
import axios from 'axios'
export default {
  data(){
    return{
      id: this.$route.query.id,
      passage: '',
      k: '',
    }
  },
  created(){
    axios.get('/api/v1/article',{params:{articleId:this.id}})
      .then(res => {
        if(res.data.success == 1){
          this.passage = res.data.data;

          this.passage.content = this.passage.content.replace(/#ffffff/g, "#fffbf0");
          console.log(this.passage.content);
        }    
      })
  },
  methods:{
    edit(){
      let url = this.$router.resolve({name: 'tinymceEditor', query: {name: this.id, use: 'edit'}});
      window.open(url.href, '_blank');
    }
  },

}


</script>

<style scoped>
.serviceWord{
  cursor: pointer;
}
.serviceWord:hover{
  text-decoration: underline;
}
.serviceImg{
  width: 250px;
  height: 100px;
  cursor: pointer;
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
  margin-left: 15px;
  font-size: 18px;
  /* display: flex; */
}
.content p {
  text-indent: 2em;
  padding-top: 3px;
  padding-bottom: 3px;
  font-family: "SimSun";
}
.content img {
  width: auto;
  margin: 0 auto;
}
.author {
  margin-right: none;
  width: 10%;
  color: dimgray;
  font-size: 14px;
}
.services{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin:20px;
}
.service{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  width: 97%;
  z-index: 0;
}
.Passage{
  width: 90%;
  margin: 20px auto;
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
  margin-left: 15px;
  cursor: pointer;
}
.headline:hover{
  text-decoration: underline;
}
.publish{
  margin-right: 20px;
}
.headWords{
  color: red;
}
.passage{
  margin: 0 auto;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border:1px solid;
  padding:10px;
}
.catalogs{
  min-height:  100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border:1px solid;
  position: relative;
  max-height: 600px;
}
.cats{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
.attachments{
  margin-top: 50px;
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
.but{
  display: block;
  margin: 0 auto;
}

</style>
