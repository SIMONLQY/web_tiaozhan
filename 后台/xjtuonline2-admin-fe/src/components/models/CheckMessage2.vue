<template>
    <div class="check-message">
        <div class="card-con">
            <el-card class="box-card" v-for="item in messages" :key="item.id">
                <div slot="header" class="clearfix">
                    <span>Message </span>
                    <button :style="{background:item.color}" class="small-box">{{item.status}}</button>
                    <div style="float: right">
                        <div v-if="item.status != '已置顶'">
                        <el-button style="padding: 3px 0" type="text" @click="online(item.id)">留言上线</el-button>
                        <el-button style="padding: 3px 0" type="text" @click="topM(item.id)">设为置顶</el-button>
                        <el-button style="padding: 3px 0" type="text" @click="offline(item.id)">取消上线</el-button>
                        </div>
                        <div v-if="item.status == '已置顶'">
                        <el-button style="padding: 3px 0" type="text" @click="online(item.id)">取消置顶</el-button>
                        <el-button style="padding: 3px 0" type="text" @click="topM(item.id)">设为置顶</el-button>
                        <el-button style="padding: 3px 0" type="text" @click="offline(item.id)">取消上线</el-button>
                        </div>
                    </div>
                </div>
            <div class="text item">
                {{item.nickname}}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content }}<br/>
                <time class="time" style="float: right">{{item.create_time}}</time>
            </div>
            <div class="text item">
                {{item.re_nickname }}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.re_content }}<br/>
                <time class="time" v-if="item.update_time != '1970-01-01 08:00:00'" style="float: right">{{item.update_time}}</time>
            </div>
            <div class="text item">
                <div style="float:right;margin-bottom: 10px;">


                    <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="editModel">
                            <el-form-item label="回复昵称">
                                <el-input v-model="editModel.re_nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="回复内容">
                                <el-input type="textarea" v-model="editModel.re_content"></el-input>
                            </el-form-item>
                            </el-form>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="reply(item.id)">回复</el-button>

                            <el-button slot="reference" type="primary" plain icon="el-icon-edit">回复留言</el-button>
                        </el-popover>
                    



                    <el-button type="warning" plain icon="el-icon-delete" @click="deleteM(item.id)">删除留言</el-button>
                </div>
            </div>
            </el-card>
        </div>
       
    </div>
</template>

<script>
// import Page from '@/components/items/Page.vue'
// import Message from '@/components/items/Message.vue'
import axios from 'axios'
import bus from '@/Eventbus.js'
// import SmallBall from '@/components/ball/SmallBall.vue'
export default {
inject: ["reload"],
created(){
   axios.get('/api/v1/admin/getNotesAllAdmin') 
   .then(res => {
       
       if(res.data.success == 1){
            this.messages = res.data.data;
            for(let i=0; i<this.messages.length; i++){
                if(this.messages[i].status == 1){
                    this.messages[i].status = '已下线'
                    this.messages[i].color = '#909399'
                }
                if(this.messages[i].status == 2){
                    this.messages[i].status = '已上线'
                    this.messages[i].color = '#409EFF'
                }
                if(this.messages[i].status == 3){
                    this.messages[i].status = '已置顶'
                    this.messages[i].color = '#67C23A'
                }
            }
            console.log(this.messages);
            
       }else{
           console.log(res.data.err_msg);
       }
    })
},
data(){
    return {
        messages: [],
        newMessages: [],
        count: 0,
        page: 0,
        err_msg: '',
        inputId: '',
        // showBalls： 1--显示 0--不显示
        showBalls: 0,
        currentId: '',
        err_msg2: '',
        reName: '',
        reMessage: '',
        top: -550,
        editModel: {
            re_nickname: '',
            re_content: '',
        }
    }
},
computed: {

},
methods: {
    online(id){
        let data = '/api/v1/admin/upnote/' + id;
            axios.put(data)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '上线成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '上线失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '上线失败',
                    message: e,
                });
            })
    },
    topM(id){
        let data = '/api/v1/admin/topnote/' + id;
            axios.put(data)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '置顶成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '置顶失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '置顶失败',
                    message: e,
                });
            })
    },
    offline(id){
        let data = '/api/v1/admin/downnote/' + id;
            axios.put(data)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '下线成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '下线失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '下线失败',
                    message: e,
                });
            })
    },
    deleteM(id){
        this.$confirm('此操作将永久删除该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let url = '/api/v1/admin/deletenote/' + id;
           axios.delete(url)
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
                        console.log(res.data.err_msg);
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.$notify.error({
                    title: '请求失败',
                    message: e,
                    });
                })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    reply(id){
        let url = '/api/v1/admin/replynote/' + id;
        axios.post(url, this.editModel)
        .then(res => {
            if(res.data.success == 1){
                this.$notify({
                title: '回复成功',
                type: 'success'
                }); 
                this.reload();
            }else{
                this.$notify.error({
                title: '回复失败',
                message: res.data.err_msg,
                });
                console.log(res.data.err_msg);
            }
        })
        .catch(e => {
            console.log(e);
            this.$notify.error({
            title: '回复失败',
            message: e,
            });
        })
    },
},
components: {
}
}
</script>

<style scoped>
.sub-edit{
    margin-left: 180px;
}
.but{
    margin-left: 10px !important;
    margin-top: 5px;
}
.check-message{
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
.text {
    font-size: 14px;
}
.item {
    padding: 18px 0;
}

.box-card {
    margin-left: 20px;
    margin-right: 10px;
    width: 480px;
    margin-bottom: 10px;
}
.card-con{
    display: flex;
    /* justify-content: space-around; */
    flex-wrap: wrap;
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.time {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    color: #999;
}
.small-box{
    margin-left: 20px;
    border-radius: 2px;
    border: none;
    color: white;
    width: 70px;
    height: 25px;
    line-height: 25px;
    text-decoration: none;
    outline: none;
}
</style>
