<template>
    <div class="personal">
        <div class="first">个人档案</div>
        <div v-if="page">
            <div class="line">
                <div class="name">用户名：</div>
                <div class="username">{{user_name}}</div>
            </div> 
            <div class="line">
                <div class="name">密码：</div>
                <div class="username">{{password}}</div>
            </div>   
            <div class="line">
                <div class="name">权限：</div>
                <div class="username">{{auth}}</div>
            </div>  
            <button @click="edit">修改</button>
        </div>
        <div v-if="!page">
            <div class="line2">
                <div class="name2">新用户名：</div>
                <input class="newname"
                 placeholder="请输入新用户名" v-model="form.username">
            </div> 
            <div class="line2">
                <div class="name2">原密码：</div>
                <input class="pwd" placeholder="请输入原密码" v-model="form.password">
            </div>   
            <div class="line2">
                <div class="name2">新密码：</div>
                <input class="pwd" placeholder="请输入新密码" v-model="form.new_password">
            </div> 
            <div class="line2">
                <div class="name2">确认新密码：</div>
                <input class="pwd" placeholder="请确认新密码" v-model="form.renew_password">
            </div> 
            <small :style="{'color':color}">{{message}}</small>
            <button @click="submit">提交</button>
            <div class="return" @click="goback">返回</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    inject: ["reload"],
    data(){
        return {
            user_name: sessionStorage.getItem('USERNAME'),
            page: true,
            form: {
                username: '',
                password: '',
                new_password: '',
                renew_password: '',
            },
            color: 'red',
            message: '',
        }
    },
    created() {
        this.form.username = this.user_name;
    },
    computed: {
        password: function(){
            let result;
            let password = sessionStorage.getItem('PASSWORD');
            let length = password.length;
            if(length>=2){
                let k1 = password.charAt(0);
                let k2 = password.charAt(password.length - 1);
                result = ""+k1;
                for(let i = 1; i <= password.length-2; i++){
                    result = result + '*';
                }
                result = result + k2;
            }  
            else{
                result = password;
            }    
            return result;
        },
        auth() {
            let result;
            let auth = sessionStorage.getItem('USERAUTH');
            if(auth == '1'){
                return '普通'
            }
            else if(auth == '2'){
                return '管理员'
            }
            else if(auth == '3'){
                return '神'
            }
        },
    },
    methods: {
        edit() {
            this.page = false;
        },
        submit() {
            if(this.form.new_password != this.form.renew_password){
                this.message = '两次密码不一致！'
                return
            }
            else{
                this.message = '';
                axios.put("/api/v1/admin/personal",this.form)
                .then(response => {
                    if(response.data.success == 1){ 
                    sessionStorage.setItem('USERNAME',this.form.username); // 存入一个值
                    sessionStorage.setItem('PASSWORD',this.form.new_password);
                    alert('修改成功');
                    this.page = true;
                    this.reload();
                    }
                    else{
                    this.message = response.data.err_msg;
                    }
                })
            }
        },
        goback(){
            this.page = true;
        },
    }
}
</script>

<style scoped>
.first{
    width: 314px;
    margin-top: 80px;
    margin-left: 30px;
    font-size: 28px;
    text-align: center;
}
.personal{
    position: absolute;
    top:0px;
    left:50px;
}
.line{
    margin-top: 80px;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    font-size: 24px;
}
.line2{
    margin-top: 40px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    font-size: 24px;
}
.name{  
    width: 100px;
    height:30px;
}
.name2{
    width: 150px;
    height:30px;
}
.username{
    font-size: 26px;
    text-align: center;
    height:30px;
    width:200px;
    border-bottom: 2px solid black;
}
.secondline{
    margin-top: 130px;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    font-size: 24px;
}
button{
    margin-top: 30px;
    margin-left: 15px;
    background: #3fb9ff;
    font-size: 18px;
    width: 329px;
    height: 44px;
    outline: none;
    color: white;
    background: linear-gradient(#3fb9ff, #099be7, #229de3);
    border-radius: 20px;
    /* border-radius: 10%; */
}
button:hover {
    background: linear-gradient(#229de3, #099be7,#3fb9ff);
}
.newname,
.pwd {
    width: 180px;
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    border-radius: 20px;
    /* background-color: #0A3C78; */
    border: 1px solid #329BE0;
}
.newname:hover,
.pwd:hover,
.newname:focus,
.pwd:focus {
    background-color: #acd7ff;
}
small{
    display: block;
    margin-top: 10px;
    height: 20px;
    width: 350px;
    text-align: center;
}
.return{
    font-size: 16px;
    background: linear-gradient(#3fb9ff, #099be7, #229de3);
    position: absolute;
    top:50px;
    left:310px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 40%;
    cursor: pointer;
    border:coral 2px groove;
}
.return:hover{
    background: linear-gradient(#229de3, #099be7,#3fb9ff);
}
</style>
