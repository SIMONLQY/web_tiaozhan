<template>
    <div class="personal">
        <!-- <div class="welcome">
            Welcome
        </div> -->
        <el-card class="box-card card2">
        <div slot="header" class="clearfix">
            <span class="sec-card">修改信息</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <el-form label-position="left" label-width="80px" :model="form">
            <el-form-item label="新用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="原密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="新密码">
                <el-input v-model="form.new_password"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="确认密码">
                <el-input v-model="form.renew_password"></el-input>
            </el-form-item>
            <br/>
            <el-button type="primary" size="big" class="fir-but" @click="submit">确认修改</el-button>
            
        </el-form>
        </el-card>

        <el-card class="box-card card1">
        <div slot="header" class="clearfix">
            <span>个人档案</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div class="text item">
            <span style="width:120px;display:inline-block;">用户名：</span>
            {{user_name }}
        </div>
        <br/>
        <div class="text item">
            <span style="width:120px;display:inline-block;">密码：</span>
            {{password }}
        </div>
        <br/>
        <div class="text item">
            <span style="width:120px;display:inline-block;">身份：</span>
            {{auth }}
        </div>
        <br/>
        <div class="text item">
            <span style="width:120px;display:inline-block;">上传文章数量：</span>
            {{num }}
        </div>
        </el-card>

        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    inject: ["reload"],
    data(){
        return {
            user_name: sessionStorage.getItem('USERNAME'),
            num: '',
            form: {
                username: '',
                password: '',
                new_password: '',
                renew_password: '',
            },
        }
    },
    created() {
        this.form.username = this.user_name;
        axios.get('api/v1/admin/selfApplyNum')
        .then(res => {
            if(res.data.success == 1){
                this.num = res.data.data;
            }else{

            }
        })
        .catch(e => {
            console.log(e);
        })
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
                return '用户'
            }
            else if(auth == '2'){
                return '管理员'
            }
            else if(auth == '3'){
                return '无身份'
            }
        },
    },
    methods: {
        submit() {
            if(this.form.new_password != this.form.renew_password){
                this.$notify.error({
                        title: '两次密码不一致'
                    });
                return
            }
            else{
                this.message = '';
                axios.put("/api/v1/admin/personal",this.form)
                .then(response => {
                    if(response.data.success == 1){ 
                    sessionStorage.setItem('USERNAME',this.form.username); // 存入一个值
                    sessionStorage.setItem('PASSWORD',this.form.new_password);
                    this.$notify({
                        title: '修改成功',
                        type: 'success'
                        }); 
                    this.reload();
                    }
                    else{
                    this.$notify.error({
                        title: '修改失败',
                        message: response.data.err_msg,
                    });
                    }
                })
            }
        },
    }
}
</script>

<style scoped>
.personal{
    margin-top: 20px;
    margin-left: 20px;
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
.card2{
    position: absolute;
    height: 550px;
    top: 10px;
    left: 470px;
    z-index: 0;
}
.card1{
    width: 400px;
    top: 100px;
    height: 400px;
    left: 80px;
    position: absolute;
    z-index: 1;
}
.sec-card{
    float: right;
}
.fir-but{
    margin-left: 180px;
}
/* .welcome{
    font-family: 'Helvetica Neue';
    font-size: 60px;
    color: rgb(124, 185, 255);
    font-style: italic;
} */
</style>
