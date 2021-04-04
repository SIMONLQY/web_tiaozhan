<template>
  <div class="Messages">
    <div class="messageHead">
      <div class="messageHeadFirst">回声嘹亮</div>
      <div class="messageHeadSecond">(留言板)</div>
    </div>
    <div class="nicks">
      <div v-for="(nick,i) in nicks" class="nick">
        <div class="nickname">{{nick.nickname}} :</div>
        <div class="messages">
          <div class="content">{{nick.content}}</div>
          <div class="createtime">{{nick.create_time}}</div>
          <div class="nickR" v-show="nick.re_content!=''">
            <div class="nickname">{{nick.re_nickname}} 回复： </div>
            <div class="messages">
              <div class="contentR">{{nick.re_content}}</div>
              <div class="createtime">{{nick.update_time}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="leaveMes">
      <div class="inputTitle">您的姓名:</div>
      <input type="text" v-model="input" class="input">
      <div class="inputTitle">留言内容:</div>
      <textarea  type="text"  class="inp" v-model="text"></textarea>
    </div>
    <div class="commitBox">
      <el-button type="text" @click="open">提交留言</el-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default{
  data(){
    return{
      text:"",
      input:"",
      nicks:"",
      re:[],
    }
  },
  methods:{
    open() {
      if(this.input==""){
        this.$alert('请输入昵称', '提交结果', {
          confirmButtonText: '确定',
          lockScroll:false
        })
      } else if(this.text==""){
        this.$alert('请输入留言', '提交结果', {
          confirmButtonText: '确定',
          lockScroll:false
        })
      } else{
        axios.post('/api/v1/createnote',{nickname:this.input,content:this.text})
        .then(r=>{if(r.data.success==1){
                  this.$alert('提交成功', '提交结果', {
                  confirmButtonText: '确定',
                  lockScroll:false
                })} else{
                  this.$alert('提交失败，网络繁忙','提交结果',{
                  confirmButtonText:'确定',
                  lookScroll:false  
                })
                }})
      }
    },
  },
  mounted(){
    axios.get('/api/v1/getNotesAll')
    .then(r=>{this.nicks=r.data.data})
  },
  created(){
    axios.get('/api/v1/getNotesAll')
    .then(r=>{this.nicks=r.data.data})
  },
}
;</script>

<style type="text/css" scoped>
.inputTitle{
  margin-left: 10px;
  font-size: 20px;
  font-family: "DengXian";
  color: #94520c;
  margin-top: 8px;
  letter-spacing: 1px;
  font-weight: 550;
}
.leaveMes{
  background-color: #e4e2d7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom:5px;
  border-radius: 8px;
  padding-left:5px;
  padding-right:10px;
}
.messageHead{
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  margin-bottom: 10px;
}
.messageHeadSecond{
  font-family: "FZCQJW";
  color: #cec1c1;
  font-size: 24px;
  margin-bottom: 5px;
  margin-left: 8px;
  letter-spacing: 0.6px;
  font-weight: normal;
}
.messageHeadFirst{
  font-size: 36px;
  font-family: "FZCQJW";
  color: rgb(205, 51, 51);
}
.input{
  height: 30px;
  outline: none;
  padding-left: 16px;
  padding-top: 5px;
  font-size: 17px;
  font-family: "hwxh";
  border:none;
  outline: none;
  background-color: #e4e2d7;
  color: #656565;
}
.messages{
  display: flex;
  flex-direction: column;
}
.Messages{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 15px;
}
.lem,
.onMessages{
  display: flex;
  flex-direction: column;
}
.inp{
  height: 100px;
  outline: none;
  margin-left: 11px;
  margin-top: 5px;
  resize:none;
  font-size: 17px;
  font-family: "hwxh";
  border:none;
  background-color: #e4e2d7;
  font-size: 18px;
  color: #656565;
}

.commitBox{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.commit{
  border-radius: 8px;
  margin-top: 5px;
  background-color: #f1bd0b;
  color: rgb(255, 255, 255);
  cursor: pointer;
  outline: none;
  height: 30px;
  float:right;
  font-size: 15px;
  font-family: "DengXian";
  color: rgb(255, 255, 255);
  width: 127px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nicks{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffee;
  border-radius:8px;
  resize:none;
  font-family: "hwxh";
  padding: 20px;
  padding-top: 20px;
  margin-bottom: 28px;
  overflow-y: visible;
  max-height: 250px;
}
.nickR,
.nick{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.nickR{
  margin-top: 8px;
}
.nickname{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-weight: bold;
  align-items: flex-start;
  color:#3f2e2e;
  font-size: 18px;
  margin:  0px;
  margin-bottom: 5px;
  margin-right: 10px;
  font-family: "hwxh";
}
.contentR,
.content{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  margin:  0px;
  font-family: "Song";
  padding-top: 3px;
}
.contentR{
  font-size: 16px;
}
.createtime{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 10px;
  margin:  0px;
  color:#99a2aa;
}
@font-face{
  font-family: hwxh;
  src: url(../assets/hwxh.ttf);
}
@font-face{
  font-family: FZCQJW;
  src: url(../assets/FZCQJW.ttf);
}
@font-face{
  font-family: Song;
  src: url(../assets/Song.ttf);
}
@font-face{
  font-family: DengXian;
  src: url(../assets/dengxian.ttf);
}

</style>
<style type="text/css">
.el-button {
  border-radius: 15px!important;
  margin-top: 5px!important;
  background-color: #f1bd0b!important;
  cursor: pointer !important;
  outline: none !important;
  height: 30px!important;
  font-size: 15px !important;
  font-family: "DengXian" !important;
  color: rgb(255, 255, 255) !important;
  width: 127px !important;
  padding:0!important;
}
</style>