<template>
    <div class="user" @click="changeID">
        <div class="id">
            {{id}}
        </div>
        <div class="name">
            {{name}}
        </div>
        <div class="auth">
            {{quanxian}}
        </div>
    </div>
</template>

<script>
import bus from '@/Eventbus.js'
export default {
props: {
    id: Number,
    name: String,
    auth: Number,
},
computed: {
    quanxian(){
        if(this.auth == 3){
            return '神'
        }
        if(this.auth == 2){
            return '管理员'
        }
        if(this.auth == 1){
            return '普通'
        }
    }
},
methods: {
    changeID(){
            bus.$emit('changeInput2', this.id);
    }
}
}
</script>

<style scoped>
.user{
    margin-left: 10px;
    display: flex;
    height: 50px;
    width: 410px;
    background: linear-gradient(60deg,rgb(39, 42, 228),rgb(131, 6, 189));
    margin-top: 2px; 
    border-radius: 5px;
    border-top: 1px orange solid;
    border-bottom: 2px yellow solid;
    transition: 0.3s;
}
.user:hover{
    transform: scale(1.02);
    transition: 0.3s;
}
.id{
    font-family: '华文彩云';
    color: white;
    width: 80px;
    text-align: center;
    line-height: 50px;
    font-size: 22px;
}
.name{
    font-family: '黑体';
    color: white;
    width: 250px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
}
.auth{
    font-family: '楷体';
    font-size: 15px;
    color: white;
    width: 80px;
    text-align: center;
    line-height: 50px;
}
</style>
