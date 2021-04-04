<template>
    <div class="check-paper">
        <el-container style="height: 500px; border: 1px solid #eee" class="toright">
        <el-container class="elcon">      
            <!-- <el-main> -->
            <el-table :data="currentItems" stripe
            style="width: 100%"
            height="500"
            @current-change="handleCurrentChange"
            >
                <el-table-column prop="headline" label="标题" width="200" fixed>
                </el-table-column>
                <el-table-column prop="subheading" label="副标题" width="120">
                </el-table-column>
                <el-table-column prop="publish" label="提交时间" width="120">
                </el-table-column>
                <el-table-column prop="source" label="文章来源" width="120">
                </el-table-column>
                <el-table-column prop="refuse_reason" label="拒绝原因" width="120">
                </el-table-column>
                <el-table-column prop="username" label="申请老师" width="120">
                </el-table-column>
                <el-table-column prop="check_status" label="评审结果" width="120">
                </el-table-column>
                <el-table-column prop="catalog_name" label="所属目录" width="120">
                </el-table-column>
                <el-table-column prop="author" label="作者" width="80">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            
                            <div>
                                文章审核：
                                <el-radio-group v-model="radio3" class="agree">
                                <el-radio-button label="通过"></el-radio-button>
                                <el-radio-button label="不通过"></el-radio-button>
                                </el-radio-group>
                            </div>
                            <br/>
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入您通过/拒绝此文章的原因"
                                v-model="textarea">
                            </el-input>
                            
                            <div>
                                <br/>
                                <el-button class="bemid" type="primary" @click="submitForm" size="big">提交</el-button>
                                <small class="small">{{err_msg}}</small>
                            </div>
                            <el-button slot="reference" type="primary" class="but" plain @click="handleClick(scope.row)" size="small">审核</el-button>
                        </el-popover>

                        <el-popover
                            placement="left"
                            width="360"
                            trigger="click"
                            class="div-con1">
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于604px*400px且尽可能接近!">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="head(scope.row)">提交</el-button>
                            
                            
                        <el-button slot="reference" type="primary" class="but" plain  size="small">设为头条</el-button>
                        </el-popover>
                        
                        <el-popover
                            placement="left"
                            width="360"
                            trigger="click"
                            class="div-con1">
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于604px*400px且尽可能接近!">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="top(scope.row)">提交</el-button>
                            
                            <el-button v-if="scope.row.catalog_name == '团学快讯'||scope.row.catalog_name == '活动预告'||scope.row.catalog_name == '基层风采'" 
                        type="primary" plain @click="handleClick(scope.row)" 
                        class="but" slot="reference"
                        size="small">设为置顶</el-button>
                        </el-popover>



                        
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
import bus from '@/Eventbus.js'
import FileUpload from '@/components/fileUpload/fileUpload2.vue'
export default {
inject: ["reload"],
created(){
    let data = {
        status: this.status,
        page: 1,
        limit: 100000,
    }
    axios.get('/api/v1/admin/articleApplies', {
        params: data})
    .then(res => {
        if(res.data.success == 1){
            this.currentItems = res.data.data.data;
            for(let i=0; i<this.currentItems.length; i++){
                if(this.currentItems[i].check_status == 1){
                    this.currentItems[i].check_status = '通过';
                }
                if(this.currentItems[i].check_status == 3){
                    this.currentItems[i].check_status = '审核中';
                }
                if(this.currentItems[i].check_status == 2){
                    this.currentItems[i].check_status = '未通过';
                }
            }
            // this.itemNumber = Math.ceil(res.data.data.total/5);
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    });
    
    bus.$on('fileURL', (data) => {
        this.fileURL = data.path[0];
    })
},
computed: {

},
data(){
    return {
        currentItems: '',
        err_msg: '',
        // 用户选择的什么样的文章状态,0：审核中，1：通过，2：未通过，''：全部
        status: '',
        radio3: '通过',
        textarea: '',
        currentId: '',
        fileURL: '',
    }
},
methods: {
    handleClick(row) {
        this.currentId = row.article_id;
    },
    submitForm(){
        this.err_msg = '';
        let sta;
        if(this.radio3 == '通过'){
            sta = 1;
        }else{
            sta = 2;
        }
        let data = {
            article_id: this.currentId,
            status: sta,
            reason: this.textarea,
        };
        axios.put('/api/v1/admin/articleApply', data)
        .then(res => {
            if(res.data.success == 1){
                this.$notify({
                title: '审核成功',
                type: 'success'
                });
                this.reload();
            }else{
                alert('出错啦？');
                this.err_msg = res.data.err_msg;
                console.log(res.data.err_msg);
            }
        })
        .catch(e => {
            console.log(e);
        })
    },
    head(row){
        let data = {
            articleId: row.article_id,
            img_path: this.fileURL,
        }
        let url = '/api/v1/admin/headArticle';
        axios.post(url, data)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '上传成功',
                        type: 'success'
                        }); 
                }else{
                    this.$notify.error({
                        title: '上传失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                this.$notify.error({
                        title: '上传失败',
                        message: e,
                        });
            })
    },
    top(row){
        let data = {
            articleId: row.article_id,
            img_path: this.fileURL,
            catalogId: row.father
        }
        let url = '/api/v1/admin/topArticle';
        axios.post(url, data)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '上传成功',
                        type: 'success'
                        }); 
                }else{
                    this.$notify.error({
                        title: '上传失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                this.$notify.error({
                        title: '上传失败',
                        message: e,
                        });
            })
    },
    handleCurrentChange(now, before) {
        let url = this.$router.resolve({path: '/passage', query: {id: now.article_id }});
        window.open(url.href, '_blank');
        console.log(before);
    },
},
components: {
    FileUpload,
},

}
</script>

<style scoped>
.sub-edit{
    margin-left: 160px;
}
.but{
    margin-left: 10px !important;
    margin-top: 5px;
}
.check-paper{
    position: absolute;
    top: 30px;
    left:15px;
}
.elcon{
    width: 1000px;
}
.agree{
    padding-left: 50px;
}
.bemid{
    margin-left: 170px;
}
.toright{
    margin-left: 20px;
} 
</style>
