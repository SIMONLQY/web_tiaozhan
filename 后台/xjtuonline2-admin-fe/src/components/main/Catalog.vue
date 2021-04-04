<template>
    <div class="catalog">
        <!-- <div class="geren" @click="geren">信息修改</div>
        <div class="geren" @click="mypaper">个人投稿</div>
        <div class="geren geren2" v-if="outh" @click="editLink">编辑链接</div>
        <div class="geren geren2" v-if="outh" @click="editTop">编辑置顶</div>
        <div class="geren geren2" v-if="outh" @click="checkPaper">审查投稿</div>
        <div class="geren geren2" v-if="outh" @click="checkMessage">审查留言</div>      
        <div class="geren geren3" v-if="outh" @click="userCreate">用户创建</div>
        <div class="geren geren3" v-if="god" @click="addCata">栏目增加</div> -->
        <el-row class="tac">
        <el-col :span="12">
            <el-menu
            :default-active="whichMenu"
            class="el-menu-vertical-demo menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" @click="geren">
                <i class="el-icon-edit"></i>
                <span slot="title">信息修改</span>
            </el-menu-item>

            <el-submenu index="0">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理中文</span>
                </template>
            <el-menu-item index="2" @click="mypaper">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">个人投稿</span>
            </el-menu-item>
            <el-menu-item index="3" v-if="outh" @click="editLink">
                <i class="el-icon-menu"></i>
                <span slot="title">编辑链接</span>
            </el-menu-item>
            <el-menu-item index="4" v-if="outh" @click="editTop">
                <i class="el-icon-menu"></i>
                <span slot="title">编辑置顶</span>
            </el-menu-item>
            <el-menu-item index="5" v-if="outh" @click="checkPaper">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">审查投稿</span>
            </el-menu-item>
            <el-menu-item index="6" v-if="outh" @click="checkMessage">
                <i class="el-icon-menu"></i>
                <span slot="title">审查留言</span>
            </el-menu-item>
            </el-submenu>
            <el-menu-item index="7" v-if="outh" @click="userCreate">
                <i class="el-icon-menu"></i>
                <span slot="title">用户创建</span>
            </el-menu-item>

            <el-submenu index="8">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>英文页面</span>
                </template>

                <el-menu-item index="8-1" v-if="outh" @click="enmypaper">
                    <i class="el-icon-menu"></i>
                    <span slot="title">英文投稿</span>
                </el-menu-item>
                <el-menu-item index="8-2" v-if="outh" @click="encheckPaper">
                    <i class="el-icon-menu"></i>
                    <span slot="title">英文审核</span>
                </el-menu-item>

            </el-submenu>    
            


            <el-menu-item index="10" v-if="god" @click="addCata">
                <i class="el-icon-setting"></i>
                <span slot="title">栏目增加</span>
            </el-menu-item>
            
            </el-menu>
        </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    inject: ["reload"],
    data(){
        return {
            outh: '',
            god: 0,
        }
    },
    created(){
        if(sessionStorage.getItem('USERAUTH') == 1){
            this.outh = 0;
        }
        else{
            this.outh = 1;
        }
        if(sessionStorage.getItem('USERAUTH') == 3){
            this.god = 1;
        }
    },
    computed: {
        whichMenu(){
            return sessionStorage.getItem('Num');
        }
    },
    methods:{
        geren(){
            sessionStorage.setItem('SCENE','Personal2');
            sessionStorage.setItem('Num',1);
            this.reload();
        },
        mypaper(){
            sessionStorage.setItem('SCENE','Mypaper2');
            sessionStorage.setItem('Num',2);
            this.reload();
        },
        checkPaper(){
            sessionStorage.setItem('SCENE','CheckPaper2');
            sessionStorage.setItem('Num',5);
            this.reload();
        },
        checkMessage(){
            sessionStorage.setItem('SCENE', 'CheckMessage2');
            sessionStorage.setItem('Num',6);
            this.reload();
        },
        userCreate(){
            sessionStorage.setItem('SCENE', 'UserCreate2');
            sessionStorage.setItem('Num',7);
            this.reload();
        },
        editLink(){
            sessionStorage.setItem('SCENE', 'EditLink2');
            sessionStorage.setItem('Num',3);
            this.reload();
        },
        editTop(){
            sessionStorage.setItem('SCENE', 'EditTop2');
            sessionStorage.setItem('Num',4);
            this.reload();
        },
        addCata(){
            sessionStorage.setItem('SCENE', 'AddCata');
            this.reload();
        },
        enmypaper(){
            sessionStorage.setItem('SCENE', 'EnMypaper');
            this.reload();
        },
        encheckPaper(){
            sessionStorage.setItem('SCENE', 'EnCheckPaper');
            this.reload();
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    
    }
}
</script>

<style scoped>
/* .geren{
    cursor: pointer;
    background: linear-gradient(90deg,  rgba(255, 255, 0, 0.4) 0%, rgba(255, 255, 0, 0) 80%);
    border-bottom: 1px rgb(255, 230, 0) solid;
    height: 40px;
    line-height: 40px;
    color: white;
    font-size: 20px;
    width:190px;
    margin-left: 0px;
    padding-left: 40px;
    margin-top: 20px;
    transition: 0.3s;
}
.geren2{
    background: linear-gradient(90deg,  rgba(255, 30, 0, 0.4) 0%, rgba(255, 30, 0, 0) 80%);
}
.geren3{ 
    background: linear-gradient(90deg, rgba(183, 0, 255, 0.4) 0%,rgba(183, 0, 255, 0) 80%);
}
.geren:hover{
    padding-left:60px;
    width:170px;
    font-size: 23px;
    transition: 0.5s;
} */

.tac{
    width: 402px;
}
.menu{
    height: 800px;
}
</style>
