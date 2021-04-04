<template>
    <div class="message" @click="changeID">
        <div class="first-container">    
            <div class="first-one">
                <div class="name-date">
                    <div class="name">{{nickname}}</div>
                    <div class="date"><u>{{createTime}}</u></div>
                </div>
                <div class="content">
                    {{content}}
                </div>
            </div>
            <div class="second-one">
                <div class="name-date">
                    <div class="name">{{reNickname}}</div>
                    <div class="date"><u>{{updateTime}}</u></div>
                </div>
                <div class="content">
                    {{reContent}}
                </div>
            </div>
        </div> 
        <div class="second-container" :style="{'background-color':color}">
        </div>   
        <div class="number"><u>{{id}}</u></div>
    </div>
</template>

<script>
import bus from '@/Eventbus.js'
export default {
    props: {
        id: Number,
        status: Number,
        nickname: String,
        reNickname: String,
        content: String,
        reContent: String,
        createTime: String,
        updateTime: String,
    },
    computed: {
        color(){
            if(this.status == 1){
                return '#F4606C'
            }
            if(this.status == 2){
                return 'rgb(19, 184, 13)'
            }
            if(this.status == 3){
                return 'yellow';
            }
        }
    },
    methods: {
        changeID(){
            bus.$emit('changeInput', this.id);
        }
    }
}
</script>

<style scoped>
.message{
    position: relative;
    border: #00bfff 2px solid;
    display: flex;
    border-radius: 10px;
    margin-bottom: 5px;
    width: 400px;
    height:135px;
    background: url(../../assets/others/beach.jpg) no-repeat;
    background-size: 350px 135px;
    transition: 0.5s;
}
.message:hover{
    transform: scale(1.1);
    transition: 0.5s;
}
.first-container{
    width: 350px;
    height: 135px;
}
.first-one{
    width: 350px;
    height: 67.5px;
    border-bottom: rgba(0, 236, 79, 0.8) 5px groove;
}
.second-container{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 50px;
    height: 135px;
}
.name-date{
    display: flex;
    height: 25px;
}
.name{
    padding-left: 5px;
    width: 215px;
    font-size: 18px;
    line-height: 25px;
    font-family: '华文彩云';
    color: #ff5e00;
    font-weight: 900;
}
.date{
    padding-right: 5px;
    width: 125px;
    text-align: right;
    font-size: 12px;
    line-height: 25px;
    color: #3f3e3e;
}
.content{
    height: 42.5px;
    text-indent: 2em;
    padding-left: 10px;
    font-size: 14px;
    font-family: '楷体';
    overflow-y: scroll;
}
.content::-webkit-scrollbar {
  width: 4px;
}
.content::-webkit-scrollbar-thumb {
  background-color:#380079;
}
.number{
    text-align: center;
    width: 100px;
    transform: rotate(15deg);
    position: absolute;
    top: -10px;
    left: 335px;
    font-size: 26px;
    font-family: 'Times New Roman', Times, serif;
}
</style>
