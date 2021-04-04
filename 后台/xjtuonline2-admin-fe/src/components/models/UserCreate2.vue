<template>
    <div class="user-create">
        <el-popover
            placement="right"
            width="300"
            trigger="click"
            >
                <el-form label-position="left" label-width="80px" :model="addModel">
                        <el-form-item label="用户名">
                            <el-input v-model="addModel.username"></el-input>
                        </el-form-item>
                         <el-form-item label="密码">
                            <el-input v-model="addModel.password"></el-input>
                        </el-form-item>
                        <el-form-item label="身份">
                            <el-radio-group v-model="addModel.auth">
                            <el-radio label="用户"></el-radio>
                            <el-radio label="管理员" v-if="power >= 2"></el-radio>
                            <el-radio label="无身份" v-if="power >= 3"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <el-button class="sub-edit" size="small" type="primary" plain @click="addUser()">添加用户</el-button>
            <el-button slot="reference" type="primary" plain  size="small" class="fir-but">新增用户</el-button>
        </el-popover>
        <div class="fir"></div>
        <el-container  style="height: 500px; border: 1px solid #eee" class="toright">
        <el-container class="elcon">
        <template>
        <el-table
            :data="users"
            stripe
            style="width: 100%"
            height="500">
            <el-table-column
            align="center"
            type="index"
            width="250">
            </el-table-column>
            <el-table-column
            align="center"
            prop="username"
            label="名字"
            width="250">
            </el-table-column>
            <el-table-column
            align="center"
            prop="auth2"
            label="身份"
            width="250">
            </el-table-column>
            <el-table-column
            align="center"
            label="操作"
            width="250">
            <template slot-scope="scope"> 

                <el-popover
                    placement="right"
                    width="300"
                    trigger="click"
                    >
                    <el-form label-position="left" label-width="80px" :model="editModel">
                        <el-form-item label="新用户名">
                            <el-input v-model="editModel.username"></el-input>
                        </el-form-item>
                         <el-form-item label="新密码">
                            <el-input v-model="editModel.password"></el-input>
                        </el-form-item>
                        <el-form-item label="新身份">
                            <el-radio-group v-model="editModel.auth">
                            <el-radio label="用户"></el-radio>
                            <el-radio label="管理员" v-if="power >= 2"></el-radio>
                            <el-radio label="无身份" v-if="power >= 3"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <el-button class="sub-edit" size="small" type="primary" plain @click="editUser(scope.row.id)">提交</el-button>
                    <el-button slot="reference" v-if="power > scope.row.auth" type="primary" plain size="small">修改</el-button>
                </el-popover>
                
                

                <el-button v-if="power > scope.row.auth" type="danger" plain size="small" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        </template>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import bus from '@/Eventbus.js'
import axios from 'axios'
export default {
inject: ["reload"],
created(){
let myAuth = sessionStorage.getItem('USERAUTH');
this.power = myAuth;
if(myAuth == 3){
    axios.get('/api/v1/admin/usersGod')
    .then(res => {
        if(res.data.success == 1){
            this.users = res.data.data;
            for(let i=0; i<this.users.length; i++){
                if(this.users[i].auth == 1){
                    this.users[i].auth2 = '用户'
                }
                if(this.users[i].auth == 2){
                    this.users[i].auth2 = '管理员'
                }
                if(this.users[i].auth == 3){
                    this.users[i].auth2 = '无身份'
                }
            }
            console.log(this.users);
        }else{
            console.log(res.data.err_msg);
        }
    })
}else{
    axios.get('/api/v1/admin/users')
    .then(res => {
        if(res.data.success == 1){
            this.users = res.data.data;
            for(let i=0; i<this.users.length; i++){
                if(this.users[i].auth == 1){
                    this.users[i].auth2 = '用户'
                }
                if(this.users[i].auth == 2){
                    this.users[i].auth2 = '管理员'
                }
                if(this.users[i].auth == 3){
                    this.users[i].auth2 = '无身份'
                }
            }
        }else{
            console.log(res.data.err_msg);
        }
    })
}
},
data(){
    return {
        power: '',
        users: [],
        editModel: {
            username: '',
            password: '',
            auth: '',
        },
        addModel: {
            username: '',
            password: '',
            auth: '',
        }
    }
},
methods: {
    editUser(id){
        if(this.editModel.auth == '用户'){
            this.editModel.auth = 1;
        }
        if(this.editModel.auth == '管理员'){
            this.editModel.auth = 2;
        }
        if(this.editModel.auth == '无身份'){
            this.editModel.auth = 3;
        }
        if(this.power == 3){
            let curString = '/api/v1/admin/userGod/' + id;
            axios.put(curString, this.editModel)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '修改成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '修改失败',
                        message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '修改失败',
                        message: e,
                    });
            })
        }
        if(this.power == 2){
            let curString = '/api/v1/admin/user/' + id;
            axios.put(curString, this.editModel)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '修改成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '修改失败',
                        message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '修改失败',
                        message: e,
                    });
            })
        }
    },
    deleteUser(id){
        this.$confirm('此操作将永久删除该用户及其提交文章,请谨慎操作！ 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           if(this.power == 3){
               let data = '/api/v1/admin/userGod/' + id;
               axios.delete(data)
                .then(res => {
                    if(res.data.success == 1){
                        this.$notify({
                        title: '删除成功',
                        type: 'success'
                        }); 
                        this.reload();
                    }else{
                        this.$notify.error({
                        title: '删除失败',
                        message: res.data.err_msg,
                    });
                    }
                })
                .catch(e => {
                    this.$notify.error({
                        title: '删除失败',
                        message: e,
                    });
                })
           }
           if(this.power == 2){
               let data = '/api/v1/admin/user/' + id;
               axios.delete(data)
                .then(res => {
                    if(res.data.success == 1){
                        this.$notify({
                        title: '删除成功',
                        type: 'success'
                        }); 
                        this.reload();
                    }else{
                        this.$notify.error({
                        title: '删除失败',
                        message: res.data.err_msg,
                    });
                    }
                })
                .catch(e => {
                    this.$notify.error({
                        title: '删除失败',
                        message: e,
                    });
                })
           }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addUser(){
        if(this.addModel.auth == '用户'){
            this.addModel.auth = 1;
        }
        if(this.addModel.auth == '管理员'){
            this.addModel.auth = 2;
        }
        if(this.addModel.auth == '无身份'){
            this.addModel.auth = 3;
        }
        if(this.power == 3){
            axios.post('/api/v1/admin/userGod', this.addModel)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '新增成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '新增失败',
                        message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '新增失败',
                        message: e,
                    });
            })
        }
        if(this.power == 2){
            axios.post('/api/v1/admin/user', this.addModel)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '新增成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '新增失败',
                        message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '新增失败',
                        message: e,
                    });
            })
        }
    },
},
components: {
    
}
}
</script>

<style scoped>
.fir{
    height: 10px;
}
.fir-but{
    margin-left: 900px;
}
.sub-edit{
    margin-left: 120px;
}
.user-create{
    position: absolute;
    top: 10px;
    left:10px;
}
.toright{
    margin-left: 20px;
}
</style>
