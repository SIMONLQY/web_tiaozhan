<template>
    <div class="user-create">
        <div class="user-con">
            <user v-for="item in users"
            :key="item.id"
            :id="item.id"
            :name="item.username"
            :auth="item.auth"
            ></user>
        </div>
        <div class="right-area">
            <div class="heading">新增用户</div>
                <small class="noted">注意：只能新增自己的同层或下层用户！</small>
                <button class="submit1" @click="createIt">新增用户</button>
            
            <div class="heading">修改用户信息</div>
            <small class="noted">注意：只能修改自己的下层用户！</small>
            <div class="xiugai">
                <span>用户id：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入用户id"
                v-model="editID" @keydown="boxUp"/> 
                <small class="small">{{err_msg2}}</small>
                <button class="submit1" @click="editIt">确定</button>
            </div>
            <div class="heading">删除用户</div>
            <small class="noted">注意：只能删除自己的下层用户！</small>
            <br/>
            <small class="noted1">警告：用户删除之后该用户发布的文章也将丢失！</small>
            <div class="xiugai">
                <span>用户id：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入用户id"
                v-model="deleteID" @keydown="boxUp"/> 
                <small class="small">{{err_msg3}}</small>
                <button class="submit1" @click="deleteIt">确定</button>
            </div>
        </div>
        <div class="left-area" :style="{'top':top+'px'}">
            <div class="left-con">
                <div class="nicheng">输入姓名：</div>
                <input class="shurunicheng" type="text" placeholder="请输入姓名" v-model="name"/>
            </div>
            <div class="left-con">
                <div class="neirong">输入密码：</div>
                <input class="shurunicheng" type="text" placeholder="请输入新密码" v-model="password">
            </div>
            <div class="left-con">
                <div class="neirong">赋予权限：</div>
                <label for="auth1" @click="changeVisibility(1)" v-if="seen1">
                    <button class="anniu anniu1">普通</button>
                </label>
                <label for="auth2" @click="changeVisibility(2)" v-if="seen2">
                    <button class="anniu anniu2">管理员</button>
                </label>
                <label for="auth3" @click="changeVisibility(3)" v-if="seen3">
                    <button class="anniu anniu3">神</button>
                </label>
                <input type="radio" value=1 id="auth1" name="auth" hidden/>
                <input type="radio" value=2 id="auth2" name="auth" hidden/>
                <input type="radio" value=3 id="auth3" name="auth" hidden/>
            </div>
            <small class="small">{{err_msg4}}</small>
            <button class="tijiao" @click="subCreate(action)">提交</button>
        </div>
    </div>
</template>

<script>
import bus from '@/Eventbus.js'
import User from '@/components/items/User.vue'
import axios from 'axios'
export default {
inject: ["reload"],
created(){
let myAuth = sessionStorage.getItem('USERAUTH');
if(myAuth == 3){
    axios.get('/api/v1/admin/usersGod')
    .then(res => {
        if(res.data.success == 1){
            this.users = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
}else{
    axios.get('/api/v1/admin/users')
    .then(res => {
        if(res.data.success == 1){
            this.users = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
}
bus.$on('changeInput2', (id) => {
        this.editID = id;
        this.deleteID = id;
        this.boxUp();
    })
},
data(){
    return {
        users: [],
        err_msg2: '',
        err_msg3: '',
        err_msg4: '',
        editID: '',
        deleteID: '',
        top: -430,
        //create--新增 edit--修改
        action: '',
        seen1: 1,
        seen2: 1,
        seen3: 1,
        name: '',
        password: '',
    }
},
methods: {
    boxUp(){
        this.top = -430;
    },
    deleteIt(){
        this.boxUp();
        let iffMatch = 0;
        let ifBig = 0;
        this.err_msg3 = '';
        let myAuth = sessionStorage.getItem('USERAUTH');
        for(let i=0; i<this.users.length; i++){
            if(this.users[i].id == this.deleteID){
                iffMatch = 1;
                if(this.users[i].auth < myAuth){
                    ifBig = 1;
                }
            }
            
        }
        if(iffMatch == 1 && ifBig == 1){
            this.err_msg3 = '';
            event.returnValue = confirm("您确认要删除吗？");
            if(event.returnValue){
                if(myAuth == 3){
                    let data = '/api/v1/admin/userGod/' + this.deleteID;
                    axios.delete(data)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('删除成功!');
                            this.reload();
                        }else{
                            alert('删除失败！');
                            this.err_msg3 = res.data.err_msg;
                            console.log(res.data.err_msg);
                        }
                    })
                }else{
                    let data = '/api/v1/admin/user/' + this.deleteID;
                    axios.delete(data)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('删除成功!');
                            this.reload();
                        }else{
                            alert('删除失败！');
                            this.err_msg3 = res.data.err_msg;
                            console.log(res.data.err_msg);
                        }
                    })
                }     
            }else{
                return
            }
        }
        if(iffMatch == 0){
            this.err_msg3 = '未找到对应用户id！';
        }
        if(iffMatch ==1 && ifBig == 0){
            this.err_msg3 = '您的权限不够！';
        }
    },
    editIt(){
        this.boxUp();
        let iffMatch = 0;
        let ifBig = 0;
        this.err_msg2 = '';
        let myAuth = sessionStorage.getItem('USERAUTH');
        for(let i=0; i<this.users.length; i++){
            if(this.users[i].id == this.editID){
                iffMatch = 1;
                if(this.users[i].auth < myAuth){
                    ifBig = 1;
                }
            }
            
        }
        if(iffMatch == 0){
            this.err_msg2 = '未找到对应用户id！';
            return
        }
        if(iffMatch ==1 && ifBig == 0){
            this.err_msg2 = '您的权限不够！';
            return
        }
        if(iffMatch ==1 && ifBig == 1){
            this.top = 170;
            this.action = 'edit';
            
        }
    },
    createIt(){
        this.boxUp();
        this.top = 170;
        this.action = 'create';
    },
    changeVisibility(data){
        if(data == 1){
            this.seen2 = Math.abs(this.seen2 - 1);
            this.seen3 = Math.abs(this.seen3 - 1);
        }
        if(data == 2){
            this.seen1 = Math.abs(this.seen1 - 1);
            this.seen3 = Math.abs(this.seen3 - 1);
        }
        if(data == 3){
            this.seen1 = Math.abs(this.seen1 - 1);
            this.seen2 = Math.abs(this.seen2 - 1);
        }
    },
    subCreate(act){
        let myAuth = sessionStorage.getItem('USERAUTH');
        this.err_msg4 = '';
        if(this.name == ''){
            this.err_msg4 = '姓名不能为空！'
            return
        }
        if(this.password == ''){
            this.err_msg4 = '密码不能为空！'
            return
        }
        if(this.seen1 == 1 && this.seen2 == 1 && this.seen3 == 1){
            this.err_msg4 = '请选择权限!'
            return
        }
        if(act == 'create'){
            if(this.seen2 == 1 && myAuth < 2){
                this.err_msg4 = '您的权限不够!'
                return
            }else if(this.seen3 == 1 && myAuth < 3){
                this.err_msg4 = '您的权限不够!'
                return
            }else{
                let currentAuth;
                if(this.seen1 == 1){
                    currentAuth = 1;
                }
                if(this.seen2 == 1){
                    currentAuth = 2;
                }
                if(this.seen3 == 1){
                    currentAuth = 3;
                }
                let someData = {
                    username: this.name,
                    password: this.password,
                    auth: currentAuth,
                }
                if(myAuth == 3){
                    axios.post('/api/v1/admin/userGod', someData)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('新增成功！');
                            this.boxUp();
                            this.reload();
                        }else{
                            this.err_msg4 = res.data.err_msg;
                            alert('新增失败！');
                            console.log(res.data.err_msg);
                        }
                    })
                }else{
                    axios.post('/api/v1/admin/user', someData)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('新增成功！');
                            this.boxUp();
                            this.reload();
                        }else{
                            this.err_msg4 = res.data.err_msg;
                            alert('新增失败！');
                            console.log(res.data.err_msg);
                        }
                    })
                }
                
            }
        }
        if(act == 'edit'){
            let myAuth = sessionStorage.getItem('USERAUTH'); 
            if(this.seen3 == 1 && myAuth == 2){
                this.err_msg4 = '您的权限不够!'
                return
            }else{
                let currentAuth;
                if(this.seen1 == 1){
                    currentAuth = 1;
                }
                if(this.seen2 == 1){
                    currentAuth = 2;
                }
                if(this.seen3 == 1){
                    currentAuth = 3;
                }
                let someData = {
                    username: this.name,
                    auth: currentAuth,
                    password: this.password,            
                }
                if(myAuth == 3){
                    let curString = '/api/v1/admin/userGod/' + this.editID;
                    axios.put(curString, someData)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('修改成功！');
                            this.boxUp();
                            this.reload();
                        }else{
                            this.err_msg4 = res.data.err_msg;
                            alert('修改失败！');
                            console.log(res.data.err_msg);
                        }
                    })
                }else{
                    let curString = '/api/v1/admin/user/' + this.editID;
                    axios.put(curString, someData)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('修改成功！');
                            this.boxUp();
                            this.reload();
                        }else{
                            this.err_msg4 = res.data.err_msg;
                            alert('修改失败！');
                            console.log(res.data.err_msg);
                        }
                    })
                }
            }
        }
    }
},
components: {
    User,
}
}
</script>

<style scoped>
.user-create{
    position: absolute;
    top: 30px;
    left:15px;
}
.user-con{
    width:429px;
    height: 560px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.user-con::-webkit-scrollbar {
  width: 6px;
}
.user-con::-webkit-scrollbar-thumb {
  background-color:#380079;
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
.left-area{
    transition: 0.5s;
    border-radius: 30px;
    border: blue solid 2px;
    position: absolute;
    left: -350px;
    width: 310px;
    height: 270px;
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
.anniu{
    font-size: 16px;
    font-family: '幼圆';
    font-weight: 600;
    color: rgb(255, 255, 255);
    border: rgb(249, 250, 249) 1px solid;
    width: 70px;
    height: 40px;
    outline: none;
    transition: 0.1s;
    
}
.anniu1{
    background: linear-gradient( rgb(50, 139, 50), rgb(50, 139, 50), rgb(92, 190, 92), rgb(50, 139, 50));
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.anniu:hover{
    transition: 0.1s;
    transform: scale(1.1);
}
.anniu1:active{
    background: linear-gradient( rgb(50, 139, 50), rgb(92, 190, 92),rgb(50, 139, 50),  rgb(50, 139, 50));
}
.anniu2{
    background: linear-gradient( #f8bb38,#f8bb38,rgb(235, 208, 134),#f8bb38);
}
.anniu2:active{
    background: linear-gradient( #f8bb38, rgb(235, 208, 134),#f8bb38,#f8bb38);

}
.anniu3{
    background: linear-gradient(purple,purple,rgb(204, 84, 204),purple);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.anniu3:active{
    background: linear-gradient(purple,rgb(204, 84, 204),purple,purple);
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
.noted{
    display: block;
    margin-top: -20px;
    color: rgb(17, 4, 134);
}
.noted1{
    display: block;
    margin-top: -20px;
    color: red;
}
</style>
