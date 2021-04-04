<template>
    <div class="edit-link">
        <div v-show="currentRole[1]" class="con1">
            <!-- <div>{{banner[0].id}}</div> -->
            <div class="banner" v-for="item in banner" :key="item.id" @click="changeID(item.id)">
                <div class="row">id：{{item.id}}</div>
                <div class="row">链接名称：{{item.link_name}}</div>
                <div class="row">创建时间：{{item.create_time}}</div>
                <div class="row">更改时间：{{item.update_time}}</div>
                <div class="row">链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                <div class="img-con">
                    <img :src="item.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div v-show="currentRole[2]" class="con1">
            <div class="banner" v-for="item in vnet" :key="item.id" @click="changeID(item.id)">
                <div class="row">id：{{item.id}}</div>
                <div class="row">链接名称：{{item.link_name}}</div>
                <div class="row">创建时间：{{item.create_time}}</div>
                <div class="row">更改时间：{{item.update_time}}</div>
                <div class="row">链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                <div class="img-con2">
                    <img :src="item.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div v-show="currentRole[3]" class="con1">
            <div class="banner" v-for="item in onlineService" :key="item.id" @click="changeID(item.id)">
                <div class="row">id：{{item.id}}</div>
                <div class="row">链接名称：{{item.link_name}}</div>
                <div class="row">创建时间：{{item.create_time}}</div>
                <div class="row">更改时间：{{item.update_time}}</div>
                <div class="row">链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                <div class="img-con3">
                    <img :src="item.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div v-show="currentRole[4]" class="con1">
            <div class="banner" v-for="item in special" :key="item.id" @click="changeID(item.id)">
                <div class="row">id：{{item.id}}</div>
                <div class="row">链接名称：{{item.link_name}}</div>
                <div class="row">创建时间：{{item.create_time}}</div>
                <div class="row">更改时间：{{item.update_time}}</div>
                <div class="row">链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                <div class="img-con2">
                    <img :src="item.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div class="right-area">
            <div class="heading">选择模块</div>
            <div class="but-con">
                <button class="but" @click="changePage(1)" :style="{'background':color1}">横幅</button>
                <button class="but" @click="changePage(2)" :style="{'background':color2}">挑战V网</button>
                <button class="but" @click="changePage(3)" :style="{'background':color3}">在线服务</button>
                <button class="but" @click="changePage(4)" :style="{'background':color4}">专题</button>
            </div>
            <div class="heading">新增链接</div>
            <div class="xiugai">
                <span>标题：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入链接标题"
                v-model="nameModel"/> 
            </div>
            <div class="xiugai">
                <span>链接地址：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入链接标题"
                v-model="linkModel"/> 
            </div>
            <div class="xiugai">
                <span>图片：</span>
            </div>
            <file-upload class="kuang" :imgType="curRole" doUpload='/api/v1/admin/uploadImg'
            acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
            :upTip="'只接受图片格式！(建议大小：' + suggestion + ')注意！新增与修改不能同时进行！'"></file-upload>
            <div class="xiugai">
                <small class="small">{{err_msg1}}</small>
                <button class="submit1" @click="submitBanner">确认上传</button>
            </div>
            <div class="heading">修改链接</div>
            <div class="xiugai">
                <span>链接id：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入链接的id"
                v-model="idModel"/> 
            </div>
            <div class="xiugai">
                <span>标题：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入链接标题"
                v-model="nameModel2"/> 
            </div>
            <div class="xiugai">
                <span>链接地址：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入链接标题"
                v-model="linkModel2"/> 
            </div>
            <div class="xiugai">
                <span>图片：</span>
            </div>
            <file-upload class="kuang" :imgType="curRole" doUpload='/api/v1/admin/uploadImg'
            acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
            :upTip="'只接受图片格式！(建议大小：' + suggestion + ')注意！新增与修改不能同时进行！'"></file-upload>
            <div class="xiugai">
                <small class="small">{{err_msg2}}</small>
                <button class="submit1" @click="submitBanner2">确认上传</button>
            </div>
            <div class="heading">删除链接</div>
            <div class="xiugai">
                <span>链接id：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入链接的id"
                v-model="idModel2"/> 
            </div>
            <div class="xiugai">
                <small class="small">{{err_msg3}}</small>
                <button class="submit1" @click="deleteBanner">删除</button>
            </div>
            <div class="heading">链接排序</div>
            <div class="xiugai">
                <span>id排序：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入新的链接id顺序,例如 1, 3, 5, 2"
                v-model="idModel3"/> 
            </div>
            <div class="xiugai">
                <small class="small">{{err_msg4}}</small>
                <button class="submit1" @click="reorder">排序</button>
            </div>
        </div>
    </div>
</template>

<script>
import FileUpload from '@/components/fileUpload/fileUpload2.vue'
import axios from 'axios'
import bus from '@/Eventbus.js'
export default {
inject: ["reload"],
created(){
    //获得横幅
    axios.get('/api/v1/photoLink/1')
    .then(res => {
        if(res.data.success == 1){
            this.banner = res.data.data;
            console.log(this.banner);
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    //获得挑战v网
    axios.get('/api/v1/photoLink/2')
    .then(res => {
        if(res.data.success == 1){
            this.vnet = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    //获得在线服务
    axios.get('/api/v1/photoLink/3')
    .then(res => {
        if(res.data.success == 1){
            this.onlineService = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    //获得专题
    axios.get('/api/v1/photoLink/4')
    .then(res => {
        if(res.data.success == 1){
            this.special = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    bus.$on('fileURL', (data) => {
        this.fileURL = data;
    })
},
data(){
    return{
        //1:横幅，2：挑战v网，3：在线服务，4：专题
        currentRole: [0, 1, 0, 0, 0],
        banner: '',
        vnet: '',
        onlineService: '',
        special: '',
        fileURL: '',
        nameModel: '',
        linkModel: '',
        err_msg1: '',
        idModel: '',
        nameModel2: '',
        linkModel2: '',
        err_msg2: '',
        idModel2: '',
        err_msg3: '',
        idModel3: '',
        err_msg4: '',
        suggestion: '',
    }
},
computed: {
    color1(){
        let role;
        for(let i=1; i<=4; i++){
            if(this.currentRole[i] == 1){
                role = i;
            }
        };
        if(role == 1){
            this.suggestion = '宽1341px高400px'
            return 'orange'
        }else{
            return ''
        }
    },
    color2(){
        let role;
        for(let i=1; i<=4; i++){
            if(this.currentRole[i] == 1){
                role = i;
            }
        };
        if(role == 2){
            this.suggestion = '宽204px高138px';
            return 'orange'
        }else{
            return ''
        }
    },
    color3(){
        let role;
        for(let i=1; i<=4; i++){
            if(this.currentRole[i] == 1){
                role = i;
            }
        };
        if(role == 3){
            this.suggestion = '宽250px高100px'
            return 'orange'
        }else{
            return ''
        }
    },
    color4(){
        let role;
        for(let i=1; i<=4; i++){
            if(this.currentRole[i] == 1){
                role = i;
            }
        };
        if(role == 4){
            this.suggestion = '宽204px高138px';
            return 'orange'
        }else{
            return ''
        }
    },
    curRole(){
        let role;
        let k;
        for(let i=1; i<=4; i++){
            if(this.currentRole[i] == 1){
                role = i;
            }
        }
        if(role == 1){
            k = 0;
        }
        if(role == 2){
            k = 4;
        }
        if(role == 4){
            k = 4;
        }
        if(role == 3){
            k = 3;
        }
        return k;
    }
},
methods: {
    changePage(number){
        this.currentRole = [0, 0, 0, 0, 0];
        this.currentRole[number] = 1;
    },
    // update(e){
    //     let file = e.target.files[0];
    //     let param = new FormData(); //创建form对象
    //     param.append('file',file);//通过append向form对象添加数据
    //     console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    //     let config = {
    //       headers:{'Content-Type':'multipart/form-data'}
    //     }; //添加请求头
    //     axios.post('/api/v1/admin/uploadImg',param,config)
    //       .then(response=>{
    //         console.log(response.data);
    //       })
    // },
    submitBanner(){
        this.err_msg = '';
        if(this.nameModel == ''){
            this.err_msg1 = '标题不能为空！';
            return
        }else if(this.linkModel == ''){
            this.err_msg1 = '连接不能为空！';
            return
        }else if(this.fileURL == ''){
            this.err_msg1 = '图片不能为空！';
            return
        }else{
            let data = {
                link_name: this.nameModel,
                img_path: this.fileURL,
                link: this.linkModel
            };
            let role;
            for(let i=1; i<=4; i++){
                if(this.currentRole[i] == 1){
                    role = i;
                }
            }
            let url = '/api/v1/admin/photoLink/' + role;
            axios.post(url, data)
            .then(res => {
                if(res.data.success == 1){
                    alert('上传成功！');
                    this.reload();
                }else{
                    this.err_msg1 = res.data.err_msg;
                    alert('上传失败啦！');
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                alert('失败了？');
            })
        }
    },
    submitBanner2(){
        this.err_msg2 = '';
        if(this.idModel == ''){
            this.err_msg2 = 'id不能为空！'
            return
        }else if(this.nameModel2 == ''){
            this.err_msg2 = '标题不能为空！';
            return
        }else if(this.linkModel2 == ''){
            this.err_msg2 = '连接不能为空！';
            return
        }else if(this.fileURL == ''){
            this.err_msg2 = '图片不能为空！';
            return
        }else{
            let data = {
                link_name: this.nameModel2,
                img_path: this.fileURL,
                link: this.linkModel2
            };
            let role;
            for(let i=1; i<=4; i++){
                if(this.currentRole[i] == 1){
                    role = i;
                }
            }
            let url = '/api/v1/admin/photoLink/' + role + '/' + this.idModel;
            axios.put(url, data)
            .then(res => {
                if(res.data.success == 1){
                    alert('修改成功！');
                    this.reload();
                }else{
                    this.err_msg2 = res.data.err_msg;
                    alert('修改失败啦！');
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                alert('失败了？');
            })
        }
    },
    deleteBanner(){
        this.err_msg3 = '';
        let firm = `确定删除此链接？`;
        if(confirm(firm) == true){
            if(this.idModel2 == ''){
                this.err_msg3 = 'id不能为空！';
                return
            }else{
                let role;
                for(let i=1; i<=4; i++){
                    if(this.currentRole[i] == 1){
                        role = i;
                    }
                }
                let url = '/api/v1/admin/photoLink/' + role + '/' + this.idModel2;
                axios.delete(url)
                .then(res => {
                    if(res.data.success == 1){
                        alert('删除成功！');
                        this.reload();
                    }else{
                        this.err_msg3 = res.data.err_msg;
                        console.log(res.data.err_msg);
                    }
                })
                .catch(e => {
                    console.log(e);
                    alert('请求失败了？');
                })
            }
        }
    },
    reorder(){
        this.err_msg4 = '';
        if(this.idModel3 == ''){
            this.err_msg4 = 'id不能为空！';
            return
        }else{
            let role;
            for(let i=1; i<=4; i++){
                if(this.currentRole[i] == 1){
                    role = i;
                }
            }
            let data = '/api/v1/admin/photoLinkOrder/' + role;
            let order = {
                role_order: this.idModel3.split(','),
            }
            axios.post(data, order)
            .then(res => {
                if(res.data.success == 1){
                    alert('排序成功！');
                    this.reload();
                }else{
                    this.err_msg4 = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                alert('请求出错了？');
                console.log(e);
            })
    }
    },
    changeID(id){
        this.idModel = id;
        this.idModel2 = id;
    },
},
components: {
    FileUpload,
}
}
</script>

<style scoped>
.edit-link{
    position: absolute;
    top: 30px;
    left:15px;
}
.right-area{
    overflow-y: scroll;
    position: absolute;
    top:-10px;
    left:445px;
    width: 430px;
    height: 570px;
}
.right-area::-webkit-scrollbar {
  width: 6px;
}
.right-area::-webkit-scrollbar-thumb {
  background-color:#380079;
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
.but-con{
    display: flex;
    margin-left: 10px;
}
.but{
    color:rgb(255, 255, 255);
    font-size: 16px;
    font-family: '黑体';
    border-radius: 4px;
    display: inline-block;
    outline: none;
    margin-left: 10px;
    background: rgb(16, 214, 148);
    width: 90px;
    height: 40px;
    transition: 0.2s;

}
.but:hover{
    transition: 0.2s;
    transform: scale(1.1);
}
.banner{
    border-radius: 10px;
    border: #ffa500 1px solid;
    margin-bottom: 10px;
    background: linear-gradient(60deg, rgb(150, 209, 235), rgb(255, 251, 0));
    width: 402px;
    transition: 0.3s;
    padding-bottom: 10px;
}
.banner:hover{
    transition: 0.3s;
    transform: scale(1.02);
}
.row{
    font-family: '楷体';
    border-bottom: rgb(225, 238, 168) dotted 1px;
    height:18px;
    line-height: 18px;
    font-size: 14px;
}
.banner-img{
    width: 100%;
    height: 100%;
}
.img-con{
    width: 402px;
    height: 120px;
}
.img-con2{
    margin: 0 auto;
    width: 204px;
    height: 138px;
}
.img-con3{
    margin: 0 auto;
    width: 250px;
    height: 100px;
}
.con1::-webkit-scrollbar {
  width: 6px;
}
.con1::-webkit-scrollbar-thumb {
  background-color:#380079;
}
.con1{
    margin-left: -50px;
    padding-left: 50px;
    width: 420px;
    overflow-y: scroll;
    height: 560px;
}
.kuang{
    margin-left: 35px;
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
    color: white;
    line-height: 40px;
    width: 120px;
    height: 40px;
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
</style>
