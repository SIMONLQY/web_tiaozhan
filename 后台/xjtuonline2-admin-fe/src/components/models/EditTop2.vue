<template>
    <div class="edit-top">
        <el-tabs v-model="activeName" class="card" type="border-card" tab-position="right">
            <el-tab-pane label="头条新闻" name="first">
                <div class="topfont">    
                    <div>头条新闻</div>
                </div>    
                <el-row>
                <el-col :span="8" class="col2" v-for="(item, index) in headNews" :key="item.id" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con">
                        <img :src="item.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{item.headline}}</span>
                        <div class="bottom clearfix">
                            <div class="time"> 文章副标题：{{item.subheading}}</div>
                            <div class="time"> 文章来源：{{item.source}}</div>
                            <!-- <div class="time"> 所属模块：{{item.source}}</div> -->
                            <div class="time"> 文章发布时间：{{item.publish}}</div>
                            <div class="time"> 文章浏览次数：{{item.views}}</div>
                        </div>
                    </div>
                    <el-button type="danger" class="top-but" plain size="small" @click="deleteHead(item.article_id)">撤销该头条</el-button>
                    </el-card>
                </el-col>
                </el-row>   
            </el-tab-pane>
            <el-tab-pane label="团学快讯" name="second">
                <div class="topfont">    
                    <div>团学快讯</div>
                </div>    
                <el-row>
                <el-col :span="8.9"  v-if="tuanxue" class="col3">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con2">
                        <img :src="tuanxue.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{tuanxue.headline}}</span>
                        <div class="bottom clearfix">
                            <div class="time"> 文章副标题：{{tuanxue.subheading}}</div>
                            <div class="time"> 文章来源：{{tuanxue.source}}</div>
                            <!-- <div class="time"> 所属模块：{{item.source}}</div> -->
                            <div class="time"> 文章发布时间：{{tuanxue.publish}}</div>
                            <div class="time"> 文章浏览次数：{{tuanxue.views}}</div>
                        </div>
                    </div>
                    <el-button type="danger" class="top-but2" plain size="small" @click="deleteTop(tuanxue.article_id)">取消置顶</el-button>
                    </el-card>
                </el-col>
                </el-row>   
            </el-tab-pane>
            <el-tab-pane label="活动预告" name="third">
                <div class="topfont">    
                    <div>活动预告</div>
                </div>    
                <el-row>
                <el-col :span="8.9" class="col3" v-if="activity">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con2">
                        <img :src="activity.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{activity.headline}}</span>
                        <div class="bottom clearfix">
                            <div class="time"> 文章副标题：{{activity.subheading}}</div>
                            <div class="time"> 文章来源：{{activity.source}}</div>
                            <!-- <div class="time"> 所属模块：{{item.source}}</div> -->
                            <div class="time"> 文章发布时间：{{activity.publish}}</div>
                            <div class="time"> 文章浏览次数：{{activity.views}}</div>
                        </div>
                    </div>
                    <el-button type="danger" class="top-but2" plain size="small" @click="deleteTop(activity.article_id)">取消置顶</el-button>
                    </el-card>
                </el-col>
                </el-row>   
            </el-tab-pane>
            <el-tab-pane label="基层风采" name="fourth">
                <div class="topfont">    
                    <div>基层风采</div>
                </div>    
                <el-row>
                <el-col :span="8.9" class="col3" v-if="base">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con2">
                        <img :src="base.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{base.headline}}</span>
                        <div class="bottom clearfix">
                            <div class="time"> 文章副标题：{{base.subheading}}</div>
                            <div class="time"> 文章来源：{{base.source}}</div>
                            <!-- <div class="time"> 所属模块：{{item.source}}</div> -->
                            <div class="time"> 文章发布时间：{{base.publish}}</div>
                            <div class="time"> 文章浏览次数：{{base.views}}</div>
                        </div>
                    </div>
                    <el-button type="danger" class="top-but2" plain size="small" @click="deleteTop(base.article_id)">取消置顶</el-button>
                    </el-card>
                </el-col>
                </el-row>   
            </el-tab-pane>
        </el-tabs>

        


        
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
            console.log(this.headNews);
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
        this.fileURL = data.path[0];
    })
},
data(){
    return {
        //1:头条新闻，2：团学快讯，3：活动预告，4：基层风采
        // currentRole: [0, 1, 0, 0, 0],
        headNews: [],
        tuanxue: '',
        activity: '',
        base: '',
        activeName: 'first',
        // idModel1: '',
        // fileURL: '',
        // err_msg1: '',
        // idModel2: '',
        // err_msg2: '',
        // idModel3: '',
        // err_msg3: '',
        // idModel4: '',
        // err_msg4: '',
    }
},
computed: {
},
methods: {
    // deleteHead(){
    //     this.err_msg2 = '';
    //     if(this.idModel2 == ''){
    //         this.err_msg2 = 'id不能为空！';
    //         return
    //     }else{
    //         let url = '/api/v1/admin/headArticle/' + this.idModel2;
    //         axios.delete(url)
    //         .then(res => {
    //             if(res.data.success == 1){
    //                 alert('撤销成功！');
    //                 this.reload();
    //             }else{
    //                 this.err_msg2 = res.data.err_msg;
    //                 console.log(res.data.err_msg);
    //             }
    //         })
    //         .catch(e => {
    //             alert('方法出错了？');
    //             console.log(res.data.err_msg);
    //         })
    //     }
    // },
    deleteHead(id){
        let url = '/api/v1/admin/headArticle/' + id;
        axios.delete(url)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '撤销成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '撤销失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '撤销失败',
                        message: res.data.err_msg,
                        });
                console.log(res.data.err_msg);
            })
    },
    deleteTop(id){
        let url = '/api/v1/admin/topArticle/' + id;
        axios.delete(url)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '取消成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '取消失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '取消失败',
                        message: res.data.err_msg,
                        });
                console.log(res.data.err_msg);
            })
    },
    deleteTop2(id){
        let url = '/api/v1/admin/topArticle/' + id;
        axios.delete(url)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '取消成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '取消失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '取消失败',
                        message: res.data.err_msg,
                        });
                console.log(res.data.err_msg);
            })
    },
    deleteTop3(id){
        let url = '/api/v1/admin/topArticle/' + id;
        axios.delete(url)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '取消成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '取消失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                        title: '取消失败',
                        message: res.data.err_msg,
                        });
                console.log(res.data.err_msg);
            })
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
    
},
components: {
    FileUpload,
}
}
</script>

<style scoped>
.edit-top{
    position: absolute;
    top: 15px;
    left:15px;
}
.card{
    width: 1040px;
    height: 550px;
    overflow-y: scroll;
}
.topfont{
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
}
.time {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    color: #999;
}
.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}
/* .newbutton{
    float: right;
} */
.newbutton2{
    height: 20px;
    margin-top: 10px;
    text-align: center;
}
.image {
    width: 100%;
    height: 100%;
}
.img-con{
    width: 302px;
    height: 200px;
}
.img-con2{
    width: 400px;
    height: 300px;
}
.img-con3{
    width: 250px;
    height: 100px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.col{
    margin-left: 120px;
    margin-bottom: 10px;
}
.col2{
    margin-left: 80px;
    margin-bottom: 10px;
}
.col3{
    margin-left: 280px;
    margin-bottom: 10px;
}
.kuang{
    margin-left: 25px;
}
.sub-edit{
    margin-top: 10px;
    width: 100px;
    margin-left: 160px;
}
.top-but{
    margin-left: 100px;
    margin-bottom: 10px;
    /* width: 80px; */
}
.top-but2{
    margin-left: 160px;
    margin-bottom: 10px;
    /* width: 80px; */
}
/* .edit-top{
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
} */
</style>
