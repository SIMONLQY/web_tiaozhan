<template>
    <div class="top-bar" :style="{'width':width + 'px'}">
        <div class="qnzs">交大青年之声后台管理界面</div>
        <div class="others">
            <div class="button">
                     <el-button class="button2" type="info"  @click="goOut" size="small">登出</el-button>
            </div>
            <div class="name">欢迎您，<u>{{name}}</u></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
computed: {
    width(){
        let length = window.innerWidth;
        return length
    },
    name(){
        let username = sessionStorage.getItem('USERNAME');
        return username
    }
},
methods: {
    goOut(){
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('USERAUTH');
        sessionStorage.removeItem('PASSWORD');
        sessionStorage.setItem('ifLogin', 0);
        sessionStorage.removeItem('SCENE');
        sessionStorage.removeItem('background');
        sessionStorage.removeItem('Num');
        axios.delete('/api/v1/admin/sign')
        .then(res => {

        });
        this.$router.push('/login');
    }
}
}
</script>

<style scoped>
.top-bar{
    display: flex;
    justify-content: space-between;
    z-index: 2;
    position: fixed;
    top: 0;
    height: 50px;
    background: #545c64;
    border-bottom: yellow groove 1px;
}
.qnzs{
    padding-left: 120px;
    line-height: 50px;
    color: white;
    font-size: 17px;
    font-family: '黑体';
}
.others{
    display: flex;
    justify-content: space-between;
    width: 350px;
}
.button2{
    padding-bottom: 20px;
    font-size: 14px;
    margin-top: 12px;
    width: 90px;
    height: 30px;
}
/* .button{
    width: 90px;
    height: 30px;
    line-height: 30px;
} */
/* button{
    width: 70px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    font-family: '微软雅黑';
    color: rgb(255, 255, 255);
} */
.name{
    width: 230px;
    line-height: 50px;
    font-family: '微软雅黑';
    color: white;
    font-size:16px;
}
</style>
