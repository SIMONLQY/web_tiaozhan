<template>
    <div class="edit-link">
        <template>
        <el-tabs v-model="activeName" class="card" @tab-click="handleClick" type="border-card" tab-position="right">
            <el-tab-pane label="横幅" name="first">
                <div class="topfont">
                    <div>横幅</div>
                    <div>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="addModel">
                            <el-form-item label="链接标题">
                                <el-input v-model="addModel.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="addModel.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于1341px*400px且尽可能接近!注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="addBanner">提交</el-button>
                            
                            <!-- <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button> -->
                            
                        
                        <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button>
                        <!-- <el-button type="success" class="top-but" plain size="small">调序</el-button> -->
                        </el-popover>
                    </div>
                </div>
                <el-row>
                <el-col :span="18" class="col" v-for="(item, index) in banner" :key="item.id" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con">
                        <img :src="item.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{item.link_name}}</span>
                        <div class="bottom clearfix">
                        <div class="time"> 链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                        <time class="time">创建时间：{{item.create_time}}</time>
                        <br/>
                        <time class="time">更改时间：{{item.update_time}}</time>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="editModel">
                            <el-form-item label="链接标题">
                                <el-input v-model="editModel.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="editModel.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于1341px*400px且尽可能接近!注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="editBanner(item.id)">提交</el-button>


                            <el-button slot="reference" type="text" class="button">修改</el-button>
                        </el-popover>

                        <br/>
                        <el-button type="text" class="button" @click="deleteBanner(item.id)">删除</el-button>
                        <div class="newbutton2">
                            <el-button type="text" class="newbutton" @click="moveBanner(item.id)">移动至首部</el-button>
                        </div>
                        </div>
                    </div>
                    </el-card>
                </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="挑战V网" name="second">
                <div class="topfont">
                    <div>挑战V网</div>
                    <div>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="addModel2">
                            <el-form-item label="链接标题">
                                <el-input v-model="addModel2.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="addModel2.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于320px*186px且尽可能接近!注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="addVnet">提交</el-button>
                            
                            <!-- <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button> -->
                            
                        
                        <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button>
                        <!-- <el-button type="success" class="top-but" plain size="small">调序</el-button> -->
                        </el-popover>
                    </div>
                </div>
                <el-row>
                <el-col :span="8.9" class="col2" v-for="(item, index) in vnet" :key="item.id" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con2">
                        <img :src="item.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{item.link_name}}</span>
                        <div class="bottom clearfix">
                        <div class="time"> 链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                        <time class="time">创建时间：{{item.create_time}}</time>
                        <br/>
                        <time class="time">更改时间：{{item.update_time}}</time>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="editModel2">
                            <el-form-item label="链接标题">
                                <el-input v-model="editModel2.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="editModel2.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于320px*186px且尽可能接近!注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="editVnet(item.id)">提交</el-button>


                            <el-button slot="reference" type="text" class="button">修改</el-button>
                        </el-popover>

                        <br/>
                        <el-button type="text" class="button" @click="deleteVnet(item.id)">删除</el-button>
                        <div class="newbutton2">
                            <el-button type="text" class="newbutton" @click="moveVnet(item.id)">移动至首部</el-button>
                        </div>
                        </div>
                    </div>
                    </el-card>
                </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="在线服务" name="third">
                <div class="topfont">
                    <div>在线服务</div>
                    <div>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="addModel3">
                            <el-form-item label="链接标题">
                                <el-input v-model="addModel3.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="addModel3.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！(建议大小： )注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="addOnlineService">提交</el-button>
                            
                            <!-- <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button> -->
                            
                        
                        <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button>
                        <!-- <el-button type="success" class="top-but" plain size="small">调序</el-button> -->
                        </el-popover>
                    </div>
                </div>
                <el-row>
                <el-col :span="8.9" class="col3" v-for="(item, index) in onlineService" :key="item.id" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con3">
                        <img :src="item.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{item.link_name}}</span>
                        <div class="bottom clearfix">
                        <div class="time"> 链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                        <time class="time">创建时间：{{item.create_time}}</time>
                        <br/>
                        <time class="time">更改时间：{{item.update_time}}</time>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="editModel3">
                            <el-form-item label="链接标题">
                                <el-input v-model="editModel3.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="editModel3.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                :upTip="'只接受图片格式！(建议大小： )注意！新增与修改不能同时进行！'">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="editOnlineService(item.id)">提交</el-button>


                            <el-button slot="reference" type="text" class="button">修改</el-button>
                        </el-popover>

                        <br/>
                        <el-button type="text" class="button" @click="deleteOnlineService(item.id)">删除</el-button>
                        <div class="newbutton2">
                            <el-button type="text" class="newbutton" @click="moveOnlineService(item.id)">移动至首部</el-button>
                        </div>
                        </div>
                    </div>
                    </el-card>
                </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="专题" name="fourth">
                <div class="topfont">
                    <div>专题</div>
                    <div>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="addModel4">
                            <el-form-item label="链接标题">
                                <el-input v-model="addModel4.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="addModel4.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于320px*186px且尽可能接近!注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="addSpecial">提交</el-button>
                            
                            
                        
                        <el-button slot="reference" type="primary" class="top-but" plain size="small">新增</el-button>
                        </el-popover>
                    </div>
                </div>
                <el-row>
                <el-col :span="8.9" class="col2" v-for="(item, index) in special" :key="item.id" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="img-con2">
                        <img :src="item.img_path" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{item.link_name}}</span>
                        <div class="bottom clearfix">
                        <div class="time"> 链接地址：<a :href="item.link" target="_blank">{{item.link}}</a></div>
                        <time class="time">创建时间：{{item.create_time}}</time>
                        <br/>
                        <time class="time">更改时间：{{item.update_time}}</time>


                        <el-popover
                            placement="left"
                            width="400"
                            trigger="click"
                            class="div-con1">
                            

                            <el-form label-position="left" label-width="80px" :model="editModel4">
                            <el-form-item label="链接标题">
                                <el-input v-model="editModel4.link_name"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址">
                                <el-input v-model="editModel4.link"></el-input>
                            </el-form-item>
                            </el-form>
                            <file-upload class="kuang" doUpload='/api/v1/admin/uploadImg'
                                acceptLimit="image/jpeg,image/gif,image/png,image/bmp"
                                upTip="只接受图片格式！必须大于320px*186px且尽可能接近!注意！新增与修改不能同时进行！">
                            </file-upload>
                            <el-button class="sub-edit" size="small" type="primary" plain @click="editSpecial(item.id)">提交</el-button>


                            <el-button slot="reference" type="text" class="button">修改</el-button>
                        </el-popover>

                        <br/>
                        <el-button type="text" class="button" @click="deleteSpecial(item.id)">删除</el-button>
                        <div class="newbutton2">
                            <el-button type="text" class="newbutton" @click="moveSpecial(item.id)">移动至首部</el-button>
                        </div>
                        </div>
                    </div>
                    </el-card>
                </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        </template>
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
        this.editModel.img_path = data.path[0];
        this.addModel.img_path = data.path[0];
        this.editModel2.img_path = data.path[0];
        this.addModel2.img_path = data.path[0];
        this.editModel3.img_path = data.path[0];
        this.addModel3.img_path = data.path[0];
        this.editModel4.img_path = data.path[0];
        this.addModel4.img_path = data.path[0];
    })
},
data(){
    return{
        //1:横幅，2：挑战v网，3：在线服务，4：专题
        banner: '',
        vnet: '',
        onlineService: '',
        special: '',
        activeName: 'first',
        editModel: {
          link_name: '',
          link: '',
          img_path: ''
        },
        addModel: {
          link_name: '',
          link: '',
          img_path: ''
        },
        editModel2: {
          link_name: '',
          link: '',
          img_path: ''
        },
        addModel2: {
          link_name: '',
          link: '',
          img_path: ''
        },
        editModel3: {
          link_name: '',
          link: '',
          img_path: ''
        },
        addModel3: {
          link_name: '',
          link: '',
          img_path: ''
        },
        editModel4: {
          link_name: '',
          link: '',
          img_path: ''
        },
        addModel4: {
          link_name: '',
          link: '',
          img_path: ''
        },
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
    handleClick(tab, event) {
        // console.log(tab, event);
        // alert(tab._props.name);
    },
    addBanner(){
        let url = '/api/v1/admin/photoLink/1';
        axios.post(url, this.addModel)
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
                console.log(e);
                this.$notify.error({
                    title: '新增失败',
                    message: e,
                });
            })
    },
    editBanner(id){
        let url = '/api/v1/admin/photoLink/1/' + id;
        axios.put(url, this.editModel)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '修改成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    // this.err_msg2 = res.data.err_msg;
                    this.$notify.error({
                    title: '修改失败',
                    message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                this.$notify.error({
                    title: '修改失败',
                    message: e,
                });
            })
    },
    moveBanner(id){
        let orderString = id + '';
        for(let i=0; i<this.banner.length; i++){
            if(this.banner[i].id == id){
                continue;
            }
            orderString = orderString + ',' +  this.banner[i].id 
        }
        let order = {
                role_order: orderString.split(','),
        }
        axios.post('/api/v1/admin/photoLinkOrder/1', order)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '排序成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '排序失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '请求失败',
                    message: e,
                    });
                console.log(e);
            })
    },
    deleteBanner(id){
        this.$confirm('此操作将永久删除该横幅, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let url = '/api/v1/admin/photoLink/1/' + id;
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
    addVnet(){
        let url = '/api/v1/admin/photoLink/2';
        axios.post(url, this.addModel2)
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
                console.log(e);
                this.$notify.error({
                    title: '新增失败',
                    message: e,
                });
            })
    },
    editVnet(id){
        let url = '/api/v1/admin/photoLink/2/' + id;
        axios.put(url, this.editModel2)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '修改成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    // this.err_msg2 = res.data.err_msg;
                    this.$notify.error({
                    title: '修改失败',
                    message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                this.$notify.error({
                    title: '修改失败',
                    message: e,
                });
            })
    },
    moveVnet(id){
        let orderString = id + '';
        for(let i=0; i<this.vnet.length; i++){
            if(this.vnet[i].id == id){
                continue;
            }
            orderString = orderString + ',' +  this.vnet[i].id 
        }
        let order = {
                role_order: orderString.split(','),
        }
        axios.post('/api/v1/admin/photoLinkOrder/2', order)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '排序成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '排序失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '请求失败',
                    message: e,
                    });
                console.log(e);
            })
    },
    deleteVnet(id){
        this.$confirm('此操作将永久删除该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let url = '/api/v1/admin/photoLink/2/' + id;
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
    addOnlineService(){
        let url = '/api/v1/admin/photoLink/3';
        axios.post(url, this.addModel3)
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
                console.log(e);
                this.$notify.error({
                    title: '新增失败',
                    message: e,
                });
            })
    },
    editOnlineService(id){
        let url = '/api/v1/admin/photoLink/3/' + id;
        axios.put(url, this.editModel3)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '修改成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    // this.err_msg2 = res.data.err_msg;
                    this.$notify.error({
                    title: '修改失败',
                    message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                this.$notify.error({
                    title: '修改失败',
                    message: e,
                });
            })
    },
    moveOnlineService(id){
        let orderString = id + '';
        for(let i=0; i<this.onlineService.length; i++){
            if(this.onlineService[i].id == id){
                continue;
            }
            orderString = orderString + ',' +  this.onlineService[i].id 
        }
        let order = {
                role_order: orderString.split(','),
        }
        axios.post('/api/v1/admin/photoLinkOrder/3', order)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '排序成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '排序失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '请求失败',
                    message: e,
                    });
                console.log(e);
            })
    },
    deleteOnlineService(id){
        this.$confirm('此操作将永久删除该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let url = '/api/v1/admin/photoLink/3/' + id;
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
    addSpecial(){
        let url = '/api/v1/admin/photoLink/4';
        axios.post(url, this.addModel4)
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
                console.log(e);
                this.$notify.error({
                    title: '新增失败',
                    message: e,
                });
            })
    },
    editSpecial(id){
        let url = '/api/v1/admin/photoLink/4/' + id;
        axios.put(url, this.editModel4)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                    title: '修改成功',
                    type: 'success'
                    }); 
                    this.reload();
                }else{
                    // this.err_msg2 = res.data.err_msg;
                    this.$notify.error({
                    title: '修改失败',
                    message: res.data.err_msg,
                    });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                console.log(e);
                this.$notify.error({
                    title: '修改失败',
                    message: e,
                });
            })
    },
    moveSpecial(id){
        let orderString = id + '';
        for(let i=0; i<this.special.length; i++){
            if(this.special[i].id == id){
                continue;
            }
            orderString = orderString + ',' +  this.special[i].id 
        }
        let order = {
                role_order: orderString.split(','),
        }
        axios.post('/api/v1/admin/photoLinkOrder/4', order)
            .then(res => {
                if(res.data.success == 1){
                    this.$notify({
                        title: '排序成功',
                        type: 'success'
                        }); 
                    this.reload();
                }else{
                    this.$notify.error({
                        title: '排序失败',
                        message: res.data.err_msg,
                        });
                    console.log(res.data.err_msg);
                }
            })
            .catch(e => {
                this.$notify.error({
                    title: '请求失败',
                    message: e,
                    });
                console.log(e);
            })
    },
    deleteSpecial(id){
        this.$confirm('此操作将永久删除该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let url = '/api/v1/admin/photoLink/4/' + id;
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
},
components: {
    FileUpload,
}
}
</script>

<style scoped>
.edit-link{
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
    width: 670px;
    height: 200px;
}
.img-con2{
    width: 320px;
    height: 186px;
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
    margin-left: 40px;
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
    font-size: 14px;
    width: 80px;
}
/*
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
} */
</style>
