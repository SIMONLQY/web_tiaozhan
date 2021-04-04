<template>
    <div class="side-bar" id="sidebar">
        <div class="containera">
            <div class="from-where">From: {{applicant}}</div>
            <div @click="maxSize" class="but">RESIZE</div>
            <div class="somewords">文章预览</div>
        </div>
        <div class="container">
            <div class="title">{{headline}}</div>
            <div class="subtitle">{{subheading}}</div>
            <div class="source">文章来源：{{source}} 作者：{{author}}</div>
            <div class="content" id="con" v-html="content">{{content}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        headline: String,
        subheading: String,
        content: String,
        applicant: String,
        source: String,
        author: String,
    },
    data() {
        return {
            status: 0,
        }
    },
    methods: {
        maxSize(){
            if(this.status == 0){
                let width = window.innerWidth * 0.9;
                document.getElementById('sidebar').style.width = width + 'px';
                this.status = 1;
            }else{
                document.getElementById('sidebar').style.width = '330px';
                this.status = 0;
            }
            
        }
    }
    // computed: {
    //     some(){

    //     }
    // },
    // methods: {
    //     jiade(){
    //         alert(this.content);
    //         document.getElementById('con').innerHTML = this.content;
    //     }
    // }
    // computed: {
    //     jiade(){
    //         document.getElementById('con').innerHTML = this.content;
    //         return ''
    //     }
    // },
    // mounted(){
    //     alert(this.content);
    //     document.getElementById('con').innerHTML = this.content;
    // }
}
</script>

<style scoped>
.but{
    cursor: pointer;
    text-align: center;
    color:rgb(255, 255, 255);
    font-size: 16px;
    font-family: '黑体';
    border-radius: 4px;
    display: inline-block;
    outline: none;
    background: rgb(16, 214, 148);
    width: 80px;
    margin-left: -80px;
    height: 15px;
    transition: 0.2s;

}
.but:hover{
    transition: 0.2s;
    transform: scale(1.4);
}
.but:active{
    background: orange;
}
.containera{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.from-where{
    line-height: 30px;
    width: 195px;
    padding-left: 5px;
    font-size: 14px;
    font-family: '黑体';
}
.side-bar{
    z-index: 2;
    /* resize: both;
    transition-delay: none;
    transition: 0s; */
    overflow: hidden;
    border-radius: 20px;
    border:burlywood 2px solid;
    height: 500px;
    width: 330px;
    padding-left: 5px;
    padding-right: 5px;
    background: rgba(182, 206, 238, 0.9);
}
.somewords{
    width: 125px;
    padding-right: 5px;
    font-weight: 800;
    font-size: 24px;
    font-family: '楷体';
    text-align: right;
}
.container{
    border-radius: 5px;
    height:460px;
    background-color: rgb(249, 254, 255);
    overflow: hidden;
}
.title{
    text-align: center;
    font-size: 24px;
    font-family: '黑体';
    margin-bottom: 5px;
}
.subtitle{
    text-align: right;
    font-size: 12px;
    font-family: '楷体';
    margin-bottom: 5px;
}
.source{
    text-align: center;
    font-size: 12px;
    font-family: '楷体';
    margin-bottom: 5px;
}
.content{
    margin-left: 3px;
    margin-right: 3px;
    font-size: 14px;
    max-height: 410px;
    overflow-y: scroll;
}
.content::-webkit-scrollbar {
  width: 4px;
}
.content::-webkit-scrollbar-thumb {
  background-color:#380079;
}
</style>
