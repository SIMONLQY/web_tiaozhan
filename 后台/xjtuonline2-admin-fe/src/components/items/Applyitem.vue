<template>
    <div class="apply-item" :style="{'background-color':color}" @click="preview(headline,subheading,content,username,source,author)">
        <div class="left">
            <div class="title">{{headline}}</div>
            <div class="subtitle">{{subheading}}</div>
        </div>
        <div class="right">
            <div class="row"><span>Part：</span><br/>{{catalog_name}}</div>
            <div class="row"><span>Time：</span><br/>{{publish}}</div>
            <div class="row2"><span>Reason：</span><br/>{{reason}}</div>
            <div class="number"><u>{{article_id}}</u></div>
        </div>
    </div>
</template>

<script>
import bus from '@/Eventbus.js'
export default {
    props: {
        id: Number,
        article_id: Number,
        headline: String,
        subheading: String,
        source: String,
        author: String,
        publish: String,
        content: String,
        status: Number,
        reason: String,
        number: Number,
        username: String,
        father: String,
        username: String,
    },
    computed: {
        color() {
            if(this.status == 1){
                return 'rgb(190, 237, 199)'
            }else if(this.status == 2){
                return '#F4606C'
            }else{
                return 'rgb(254, 255, 201)'
            }
        },
        catalog_name(){
            if(this.father == 1){
                return '团委介绍'
            }
            if(this.father == 2){
                return '团学资讯'
            }
            if(this.father == 3){
                return '党建团建'
            }
            if(this.father == 4){
                return '全部服务'
            }
            if(this.father == 5){
                return '学生组织'
            }
            if(this.father == 6){
                return '交大青年团简介'
            }
            if(this.father == 7){
                return '团委部门及分工'
            }
            if(this.father == 8){
                return '荣誉长廊'
            }
            if(this.father == 9){
                return '通知公告'
            }
            if(this.father == 10){
                return '媒体聚焦'
            }
            if(this.father == 13){
                return '专题'
            }
            if(this.father == 14){
                return '团学快讯'
            }
            if(this.father == 15){
                return '活动预告'
            }
            if(this.father == 16){
                return '基层风采'
            }
            if(this.father == 17){
                return '规章制度'
            }
            if(this.father == 18){
                return '党建'
            }
            if(this.father == 19){
                return '团建'
            }
            if(this.father == 20){
                return '在线服务'
            }
            if(this.father == 21){
                return '资料下载'
            }
            if(this.father == 22){
                return '学生会'
            }
            if(this.father == 23){
                return '挑战V网'
            }
            if(this.father == 24){
                return '科技创新'
            }
            if(this.father == 25){
                return 'e瞳创意工坊'
            }
            if(this.father == 26){
                return '社会实践'
            }
        }
    },
    methods: {
        preview(a, b, c, d, e, f){
            this.$emit('preview',[a,b,c,d,e,f]);
            bus.$emit('anotherID', [this.article_id, this.id]);
        }
    }
}
</script>

<style scoped>
.apply-item:hover{
    transform: scale(1.1);
    transition: 0.3s;
}
.apply-item{
    transition: 0.3s;
    border-radius: 10px; 
    margin-top: 7px;
    margin-bottom: 7px;
    width: 410px;
    height: 100px;
    border: yellow 2px solid;
    background-color: white;
    display:flex;
    flex-direction: row;
}
span{
    font-weight: bold;
    font-size: 12px;
    /* font-family: 'Times New Roman', Times, serif; */
    font-family: 'Freestyle Script';
}
.left{
    /* background-color:blueviolet; */
    width: 250px;
    height: 100px;
    border-right: blanchedalmond 1px solid;
}
.right{
    position: relative;
    height: 100px;
    width: 159px;
    /* background-color: black; */
}
.title{
    text-align: center;
    padding:5px;
    /* background-color:red; */
    height:55px;
    margin-bottom: 5px;
    font-size: 17px;
    font-family: '黑体';
    overflow: hidden;
    border-bottom: blanchedalmond 1px dotted;
}
.subtitle{
    padding-right: 5px;
    margin-top: -3px;
    text-align: right;
    font-size: 14px;
    font-family: '楷体';
    overflow: hidden;
}
.row{
    height: 26px;
    line-height: 13px;
    font-size: 13px;
    font-family: '黑体';
    overflow: hidden;
    border-bottom: 0.5px blanchedalmond dotted;
}
.row2{
    font-size: 13px;
    font-family: '黑体';
    overflow-y: scroll;
    height:45px;
}
.row2::-webkit-scrollbar {
  width: 4px;
}
.row2::-webkit-scrollbar-thumb {
  background-color:#380079;
}
.number{
    text-align: center;
    width: 100px;
    transform: rotate(15deg);
    position: absolute;
    top: -10px;
    left: 100px;
    font-size: 26px;
    font-family: 'Times New Roman', Times, serif;

}
</style>
