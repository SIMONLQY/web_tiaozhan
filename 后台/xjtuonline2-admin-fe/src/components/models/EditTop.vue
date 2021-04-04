<template>
    <div class="edit-top">
        <div v-show="currentRole[1]" class="con1">
            <div class="banner" v-for="item in headNews" :key="item.article_id">
                <div class="row">id：{{item.article_id}}</div>
                <div class="row">文章标题：{{item.headline}}</div>
                <div class="row">文章副标题：{{item.subheading}}</div>
                <div class="row2">文章来源：{{item.source}}</div>
                <div class="row2">文章出版时间：{{item.publish}}</div>
                <div class="row2">文章浏览次数：{{item.views}}</div>
                <div class="img-con">
                    <img :src="item.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div v-show="currentRole[2]" class="con1">
            <div class="banner">
                <div class="row">id：{{tuanxue.article_id}}</div>
                <div class="row">文章标题：{{tuanxue.headline}}</div>
                <div class="row">文章副标题：{{tuanxue.subheading}}</div>
                <div class="row2">文章来源：{{tuanxue.source}}</div>
                <div class="row2">文章出版时间：{{tuanxue.publish}}</div>
                <div class="row2">文章浏览次数：{{tuanxue.views}}</div>
                <div class="img-con2">
                    <img :src="tuanxue.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div v-show="currentRole[3]" class="con1">
            <div class="banner">
                <div class="row">id：{{activity.article_id}}</div>
                <div class="row">文章标题：{{activity.headline}}</div>
                <div class="row">文章副标题：{{activity.subheading}}</div>
                <div class="row2">文章来源：{{activity.source}}</div>
                <div class="row2">文章出版时间：{{activity.publish}}</div>
                <div class="row2">文章浏览次数：{{activity.views}}</div>
                <div class="img-con2">
                    <img :src="activity.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div v-show="currentRole[4]" class="con1">
            <div class="banner">
                <div class="row">id：{{base.article_id}}</div>
                <div class="row">文章标题：{{base.headline}}</div>
                <div class="row">文章副标题：{{base.subheading}}</div>
                <div class="row2">文章来源：{{base.source}}</div>
                <div class="row2">文章出版时间：{{base.publish}}</div>
                <div class="row2">文章浏览次数：{{base.views}}</div>
                <div class="img-con2">
                    <img :src="base.img_path" class="banner-img" alt="图片未加载！"/>
                </div>
            </div>
        </div>
        <div class="right-area">
            <div class="heading">选择模块</div>
            <div class="but-con">
                <button class="but" @click="changePage(1)" :style="{'background':color1}">头条新闻</button>
                <button class="but" @click="changePage(2)" :style="{'background':color2}">团学快讯</button>
                <button class="but" @click="changePage(3)" :style="{'background':color3}">活动预告</button>
                <button class="but" @click="changePage(4)" :style="{'background':color4}">基层风采</button>
            </div>
            <div v-if="ifHead">
                <div class="heading">设置头条新闻</div>
                <div class="xiugai">
                    <span>文章id：</span>
                    <input class="xiugai-input" 
                    type="text" 
                    placeholder="请输入文章的id"
                    v-model="idModel1"/> 
                </div>
                <file-upload class="kuang" doUpload='/api/v1/admin/headArticleImg'
                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                upTip="'只接受图片格式！(建议大小：628px宽 540px高)注意！本页面两个上传不能同时进行！'"></file-upload>
                <div class="xiugai">
                    <small class="small">{{err_msg1}}</small>
                    <button class="submit1" @click="submitHead">确认上传</button>
                </div>
                <div class="heading">撤销头条新闻</div>
                <div class="xiugai">
                    <span>文章id：</span>
                    <input class="xiugai-input" 
                    type="text" 
                    placeholder="请输入文章的id"
                    v-model="idModel2"/> 
                </div>
                <div class="xiugai">
                    <small class="small">{{err_msg2}}</small>
                    <button class="submit1" @click="deleteHead">撤销</button>
                </div>
            </div>
            <div v-if="!ifHead">    
                <div class="heading">设置置顶新闻</div>
                <div class="xiugai">
                    <span>文章id：</span>
                    <input class="xiugai-input" 
                    type="text" 
                    placeholder="请输入文章的id"
                    v-model="idModel3"/> 
                </div>
                <file-upload class="kuang" doUpload='/api/v1/admin/topArticleImg'
                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                upTip="'只接受图片格式！(建议大小：204px宽 138px高)注意！本页面两个上传不能同时进行！'"></file-upload>
                <div class="xiugai">
                    <small class="small">{{err_msg3}}</small>
                    <button class="submit1" @click="submitTop">确认上传</button>
                </div>
                <div class="heading">撤销置顶新闻</div>
                <div class="xiugai">
                    <span>文章id：</span>
                    <input class="xiugai-input" 
                    type="text" 
                    placeholder="请输入文章的id"
                    v-model="idModel4"/> 
                </div>
                <div class="xiugai">
                    <small class="small">{{err_msg4}}</small>
                    <button class="submit1" @click="deleteTop">撤销</button>
                </div>
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
    //获得头条新闻
    axios.get('/api/v1/admin/headArticle')
    .then(res => {
        if(res.data.success == 1){
            this.headNews = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    //获得团学快讯
    axios.get('/api/v1/admin/topArticle/14')
    .then(res => {
        if(res.data.success == 1){
            this.tuanxue = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    //获得活动预告
    axios.get('/api/v1/admin/topArticle/15')
    .then(res => {
        if(res.data.success == 1){
            this.activity = res.data.data;
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    })
    //获得基层风采
    axios.get('/api/v1/admin/topArticle/16')
    .then(res => {
        if(res.data.success == 1){
            this.base = res.data.data;
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
    return {
        //1:头条新闻，2：团学快讯，3：活动预告，4：基层风采
        currentRole: [0, 1, 0, 0, 0],
        headNews: [],
        tuanxue: '',
        activity: '',
        base: '',
        idModel1: '',
        fileURL: '',
        err_msg1: '',
        idModel2: '',
        err_msg2: '',
        idModel3: '',
        err_msg3: '',
        idModel4: '',
        err_msg4: '',
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
            // this.suggestion = '宽1341px高400px'
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
            // this.suggestion = '宽204px高138px';
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
            // this.suggestion = '宽250px高100px'
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
            // this.suggestion = '宽204px高138px';
            return 'orange'
        }else{
            return ''
        }
    },
    ifHead(){
        let role;
        for(let i=1; i<=4; i++){
            if(this.currentRole[i] == 1){
                role = i;
            }
        };
        if(role == 1){
            // this.suggestion = '宽204px高138px';
            return true
        }else{
            return false
        }
    }
},
methods: {
    changePage(number){
        this.currentRole = [0, 0, 0, 0, 0];
        this.currentRole[number] = 1;
    },
    submitHead(){
        this.err_msg1 = '';
        if(this.idModel1 == ''){
            this.err_msg1 = 'id不能为空！';
            return
        }else if(this.fileURL == ''){
            this.err_msg1 = '图片不能为空！';
            return
        }else{
            let data = {
                articleId: this.idModel1,
                img_path: this.fileURL,
            };
            let url = '/api/v1/admin/headArticle';
            axios.post(url, data)
            .then(res => {
                if(res.data.success == 1){
                    alert('上传成功！');
                    this.reload();
                }else{
                    this.err_msg1 = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                alert('失败了？');
            })
        }
    },
    deleteHead(){
        this.err_msg2 = '';
        if(this.idModel2 == ''){
            this.err_msg2 = 'id不能为空！';
            return
        }else{
            let url = '/api/v1/admin/headArticle/' + this.idModel2;
            axios.delete(url)
            .then(res => {
                if(res.data.success == 1){
                    alert('撤销成功！');
                    this.reload();
                }else{
                    this.err_msg2 = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                alert('方法出错了？');
                console.log(res.data.err_msg);
            })
        }
    },
    submitTop(){
        this.err_msg3 = '';
        if(this.idModel3 == ''){
            this.err_msg3 = 'id不能为空！';
            return
        }else if(this.fileURL == ''){
            this.err_msg3 = '图片不能为空！';
            return
        }else{
            let role;
            for(let i=1; i<=4; i++){
                if(this.currentRole[i] == 1){
                    role = i;
                }
            };
            let cataid;
            if(role == 2){
                cataid = 14;
            }
            if(role == 3){
                cataid = 15;
            }
            if(role == 4){
                cataid = 16;
            }
            let data = {
                articleId: this.idModel3,
                img_path: this.fileURL,
                catalogId: cataid
            };
            let url = '/api/v1/admin/topArticle';
            axios.post(url, data)
            .then(res => {
                if(res.data.success == 1){
                    alert('上传成功！');
                    this.reload();
                }else{
                    this.err_msg3 = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                alert('失败了？');
            })
        }
    },
    deleteTop(){
        this.err_msg4 = '';
        if(this.idModel4 == ''){
            this.err_msg4 = 'id不能为空！';
            return
        }else{
            let url = '/api/v1/admin/topArticle/' + this.idModel4;
            axios.delete(url)
            .then(res => {
                if(res.data.success == 1){
                    alert('撤销成功！');
                    this.reload();
                }else{
                    this.err_msg4 = res.data.err_msg;
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                alert('方法出错了？');
                console.log(res.data.err_msg);
            })
        }
    }
},
components: {
    FileUpload,
}
}
</script>

<style scoped>
.edit-top{
    position: absolute;
    top: 30px;
    left:15px;
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
    background: linear-gradient(60deg, rgb(71, 186, 235), rgb(223, 23, 250));
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
    height:35px;
    line-height: 18px;
    font-size: 14px;
}
.row2{
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
    margin: 0 auto;
    width: 314px;
    height: 270px;
}
.img-con2{
    margin: 0 auto;
    width: 306px;
    height: 207px;
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
.kuang{
    margin-top: 10px;
    margin-left: 35px;
}
</style>
