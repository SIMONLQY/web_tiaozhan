<template>
    <div class="check-message">
        <message v-for="item in newMessages[page]"
        :key="item.id"
        :id="item.id"
        :nickname="item.nickname"
        :createTime="item.create_time"
        :content="item.content"
        :reNickname="item.re_nickname"
        :updateTime="item.update_time"
        :reContent="item.re_content"
        :status="item.status"></message>
        <page :count="count" ref="page" @changenow="changePage" class="page"></page>
        <div class="right-area">
            <div class="heading">管理留言</div>
            <div class="xiugai">
                <span>留言id：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入左侧每一条留言右上角的id"
                v-model="inputId"
                @keydown="checkMore"/> 
                <small class="small">{{err_msg}}</small>
                <button class="submit1" @click="checkId">确认</button>
            </div>
            <div v-if="showBalls" class="some-balls">
                <div class="big-ball">管理</div>
                <small-ball
                name="设为精选" class="ball1 ball" id="ball1"></small-ball>
                <small-ball
                name="设为置顶" class="ball2 ball" id="ball2"></small-ball>
                <small-ball
                name="取消精选" class="ball3 ball" id="ball3"></small-ball>
                <small-ball
                name="删除留言" class="ball4 ball" id="ball4"></small-ball>
                <small-ball
                name="回复留言" class="ball5 ball" id="ball5"></small-ball>
            </div>
        </div>
        <div class="left-area" :style="{'top':top+'px'}">
            <div class="left-con">
                <div class="nicheng">回复昵称：</div>
                <input class="shurunicheng" type="text" placeholder="请输入您回复的昵称" v-model="reName"/>
            </div>
            <div class="left-con">
                <div class="neirong">回复内容：</div>
                <textarea class="shuruneirong" type="text" placeholder="请输入您回复的内容" v-model="reMessage"></textarea>
            </div>
            <small class="small">{{err_msg2}}</small>
            <button class="tijiao" @click="submit">提交</button>
        </div>
    </div>
</template>

<script>
import Page from '@/components/items/Page.vue'
import Message from '@/components/items/Message.vue'
import axios from 'axios'
import bus from '@/Eventbus.js'
import SmallBall from '@/components/ball/SmallBall.vue'
export default {
inject: ["reload"],
created(){
   axios.get('/api/v1/admin/getNotesAllAdmin') 
   .then(res => {
       
       if(res.data.success == 1){
            this.messages = res.data.data;
            console.log(this.messages);
            let length = this.messages.length;
            for(var i=0;i<length;i+=4){
                this.newMessages.push(this.messages.slice(i,i+4));
                this.count = this.count + 1;
                
            };
            if(this.count == 0){
                this.count = 1
            }
            
       }else{
           console.log(res.data.err_msg);
       }
    })
    bus.$on('tellYou', (id) => {
        if(id == 'ball1'){
            this.top = -650;
            let data = '/api/v1/admin/upnote/' + this.inputId;
            axios.put(data)
            .then(res => {
                if(res.data.success == 1){
                    alert('成功设置为精选!');
                    this.reload();
                }else{
                    this.err_msg = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
        };
        if(id == 'ball2'){
            this.top = -650;
            let data = '/api/v1/admin/topnote/' + this.inputId;
            axios.put(data)
            .then(res => {
                if(res.data.success == 1){
                    alert('置顶成功!');
                    this.reload();
                }else{
                    this.err_msg = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
        };
        if(id == 'ball3'){
            this.top = -650;
            let data = '/api/v1/admin/downnote/' + this.inputId;
            axios.put(data)
            .then(res => {
                if(res.data.success == 1){
                    alert('已取消精选!');
                    this.reload();
                }else{
                    this.err_msg = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
        };
        if(id == 'ball4'){
            this.top = -650;
            event.returnValue = confirm("您确认要删除吗？");
            if(event.returnValue){
                let data = '/api/v1/admin/deletenote/' + this.inputId;
                axios.delete(data)
                .then(res => {
                    if(res.data.success == 1){
                        alert('删除成功!');
                        this.reload();
                    }else{
                        this.err_msg = res.data.err_msg;
                        console.log(res.data.err_msg);
                    }
                })
            }
        }
        if(id == 'ball5'){
            this.top = 120;
        }
    });
    bus.$on('changeInput', (id) => {
        this.inputId = id;
        this.showBalls = 1;
    })
},
data(){
    return {
        messages: [],
        newMessages: [],
        count: 0,
        page: 0,
        err_msg: '',
        inputId: '',
        // showBalls： 1--显示 0--不显示
        showBalls: 0,
        currentId: '',
        err_msg2: '',
        reName: '',
        reMessage: '',
        top: -550,
    }
},
computed: {

},
methods: {
    changePage(){
        this.page = this.$refs.page.pagenumber;
    },
    // 检查输入id是否正确
    checkId(){
        let iffMatch = 0;
        this.err_msg = '';
        for(let i=0; i<this.messages.length; i++){
            if(this.messages[i].id == this.inputId){
                iffMatch = 1;
            }
        }
        if(iffMatch == 1){
            this.err_msg = '';
            this.showBalls = 1;
            this.currentId = inputId;
            
        }else{
            this.err_msg = '未找到对应id！';
            this.showBalls = 0;
        }
    },
    checkMore(){
        if(this.currentId != this.inputId){
            this.showBalls = 0;
            this.top = -650;
        }
    },
    submit(){
        this.err_msg2 = '';
        if(this.reName == ''){
            this.err_msg2 = '昵称不能为空！';
            return
        }else if(this.reMessage == ''){
            this.err_msg2 = '内容不能为空！';
            return
        }else{
            let data = '/api/v1/admin/replynote/' + this.inputId;
            let prop = {
                re_nickname: this.reName,
                re_content: this.reMessage,
            };
            axios.post(data, prop)
            .then(res => {
                if(res.data.success == 1){
                    alert('回复成功！');
                    this.top = -550;
                    this.reload();
                }else{
                    this.err_msg2 = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
        }
        
    }
},
components: {
    Message,
    Page,
    SmallBall,
}
}
</script>

<style scoped>
.check-message{
    position: absolute;
    top: 20px;
    left:15px;
}
.page{
    position: absolute;
    top:560px;
    left:0px;
}
.right-area{
    position: absolute;
    top:-10px;
    left:445px;
    width: 430px;
    height: 570px;
}
.heading{
    margin-top:30px;
    margin-bottom: 20px;
    font-size: 25px;
    padding-left: 10px;
    font-family: '黑体';
    font-style: italic;
    border-bottom: solid 3px #ffa500;
    width: 170px;
}
.xiugai{
    margin-top:10px;
    margin-left: 5px;
    font-family: '等线';
}
.xiugai-input{
    font-size: 16px;
    width: 280px;
    height: 35px;
    outline: none;
    background-color: #e7fff7;
    padding-left:10px;
    padding-right: 10px;
    border-radius: 10px;
}
.small{
    margin-top:5px;
    text-align: center;
    display: block;
    color: red;
}
.submit1{
    width: 100px;
    height: 30px;
    font-size: 16px;
    border-radius: 10px;
    outline: none;
    background: linear-gradient(#3fb9ff, #099be7, #229de3);
    display: block;
    background-color: rgb(117, 117, 214);
    margin: 5px auto;
}
.submit1:hover {
    background: linear-gradient(#229de3, #099be7,#3fb9ff);
}
.some-balls{
    width: 430px;
    height: 400px;
    position: relative;
}
.big-ball{
    user-select: none;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    background: linear-gradient(45deg,rgb(156, 2, 245), rgb(38, 0, 255),rgb(0, 195, 255));
    top:150px;
    left: 150px;
    text-align: center;
    line-height: 130px;
    border: yellow 4px solid;
    font-size: 24px;
    font-family: '黑体';
    color:white;
}
.ball{
    user-select: none;
    cursor: pointer;
}
.ball:hover{
    animation-play-state: paused;
}
.ball:active{
    background: rgb(219, 247, 153);
    transition: 0.1s;
}
.ball1{
    animation: ball1 infinite 5s linear;
    position: absolute;
}
@keyframes ball1 {
      0%{top: 70px;left: 30px;}
      50%{top: 20px; left:10px;}
      100%{top: 70px;left: 30px;}
}
.ball2{
    animation: ball2 infinite 5s linear;
    position: absolute;
}
@keyframes ball2 {
      0%{top: 30px;left: 200px;}
      50%{top: 20px; left:250px;}
      100%{top: 30px;left: 200px;}
  }
.ball3{
    animation: ball3 infinite 5s linear;
    position: absolute;
}
@keyframes ball3 {
      0%{top: 170px;left: 300px;}
      50%{top: 210px; left:320px;}
      100%{top: 170px;left: 300px;}
}
.ball4{
    animation: ball4 infinite 5s linear;
    position: absolute;
}
@keyframes ball4 {
      0%{top: 280px;left: 200px;}
      50%{top: 310px; left:170px;}
      100%{top: 280px;left: 200px;}
}
.ball5{
    animation: ball5 infinite 5s linear;
    position: absolute;
}
@keyframes ball5 {
      0%{top: 220px;left: 50px;}
      50%{top: 200px; left:25px;}
      100%{top: 220px;left: 50px;}
}
.left-area{
    transition: 0.5s;
    border-radius: 30px;
    border: blue solid 2px;
    position: absolute;
    left: -350px;
    width: 310px;
    height: 300px;
    background: linear-gradient(rgba(159, 247, 232, 0.651), rgb(70, 89, 255));
}
.left-con{
    padding-left: 5px;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
}
.nicheng{
    width: 90px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-family: '黑体';
    color:rgb(250, 252, 150);
}
.neirong{
    width: 90px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-family: '黑体';
    color:rgb(250, 252, 150);
}
.shurunicheng{
    outline: none;
    border:none;
    border-radius: 10px;
    display: block;
    width: 195px;
    height: 40px;
    background: transparent;
    border: rgb(155, 197, 252) 1px solid;
    font-size: 15px;
    padding-left: 5px;
    padding-right: 5px;
}
.shuruneirong{
    resize: none;
    outline: none;
    border:none;
    border-radius: 10px;
    display: block;
    width: 195px;
    height: 130px;
    background: transparent;
    border: rgb(155, 197, 252) 1px solid;
    font-size: 15px;
    padding-left: 5px;
    padding-right: 5px;
}
.shuruneirong::-webkit-scrollbar {
  width: 4px;
}
.shuruneironge::-webkit-scrollbar-thumb {
  background-color:#380079;
}
.tijiao{
    font-size: 17px;
    color: rgb(223, 214, 255);
    font-family: '黑体';
    margin-top: 20px;
    margin-left: 110px;
    display: block;
    width: 100px;
    height: 35px;
    border: none;
    outline: none;
    border-radius: 10px;
    border: rgb(48, 48, 192) solid 1px;
    background: linear-gradient(rgb(88, 91, 241),rgb(69, 0, 230));
    transition: 0.2s;

}
.tijiao:hover{
    transform: scale(1.1);
    transition: 0.2s;
}
.tijiao:active{
    background: linear-gradient(rgb(69, 0, 230), rgb(69, 0, 230) ,rgb(88, 91, 241),rgb(50, 47, 241));

}
</style>
