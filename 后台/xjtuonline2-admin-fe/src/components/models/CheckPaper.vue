<template>
    <div class="check-paper">
        <page :count="itemNumber" class="page"  ref="page" @changenow="changePage"></page>
        <applyitem v-for="item in currentItems.slice(0, 5)"
        @preview="preview"
        :key="item.article_id"
        :id="item.article_id" 
        :article_id="item.article_id" 
        :headline="item.headline" 
        :subheading="item.subheading" 
        :source="item.source"
        :author="item.author"
        :publish="item.publish"
        :content="item.content"
        :father="item.father"
        :status="item.check_status"
        :reason="item.refuse_reason"
        :catalog_name="item.catalog_name"
        :username="item.username"
        ></applyitem> 
        <sidebar class="side" :style="{'top':height+'px'}"
        :headline="current.headline"
        :subheading="current.subheading"
        :content="current.content"
        :applicant="current.applicant"
        :source="current.source"
        :author="current.author"
        ></sidebar> 
        <div class="right-area">
            <div class="heading">选择文章状态</div>
            <div class="button-con">
                <div class="option" @click="showCata('')">全部</div>
                <div class="option" @click="showCata(3)">未审核</div>
                <div class="option" @click="showCata(1)">已通过</div>
                <div class="option" @click="showCata(2)">未通过</div>
            </div>
            <div class="heading">审核文章</div>
            <div class="xiugai">
                <span>文章的审核id：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入左侧每一条申请右上角的文章id"
                v-model="checkId"/> 
                <div class="mdzz">
                    <span class="reason">原因:</span>
                    <textarea class="reasons" 
                    type="text" 
                    placeholder="请输入您通过/不通过的原因(不通过时原因是必填的)"
                    v-model="checkReason"/>
                </div>
                <span class="second-line">审核结果：</span>
                <div class="two-button">
                    <button class="pass" @click="submit('pass')">通过</button>
                    <button class="fail" @click="submit('fail')">不通过</button>
                </div>
                <small class="small">{{err_msg}}</small>
                <!-- <button class="submit1" @click="checkIt">审核</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import Applyitem from '@/components/items/Applyitem.vue'
import axios from 'axios'
import Page from '@/components/items/Page.vue'
import Sidebar from '@/components/main/Sidebar.vue'
import bus from '@/Eventbus.js'
export default {
inject: ["reload"],
created(){
    let data = {
        status: this.status,
        page: 1,
        limit: 5,
    }
    axios.get('/api/v1/admin/articleApplies', {
        params: data})
    .then(res => {
        if(res.data.success == 1){
            this.currentItems = res.data.data.data;
            this.itemNumber = Math.ceil(res.data.data.total/5);
        }else{
            console.log(res.data.err_msg);
        }
    })
    .catch(e => {
        console.log(e);
    });
    
    bus.$on('show', () => {
        this.height = 700;
    });
    bus.$on('hide', () => {
        this.height = 100;
    });
    bus.$on('anotherID', (id) => {
        this.checkId = id[1];
    })
},
computed: {

},
data(){
    return {
        itemNumber: '',
        pageData: '',
        currentItems: '',
        current: {
            headline: '',
            subheading: '',
            content: '',
            applicant: '',
            source: '',
            author: ''
        },
        height: 100,
        err_msg: '',
        allResource: [],
        checkId: '',
        checkReason: '',
        // 用户选择的什么样的文章状态,0：审核中，1：通过，2：未通过，''：全部
        status: '',
    }
},
methods: {
    preview(data){
        this.current.headline = data[0];
        this.current.subheading = data[1];
        this.current.content = data[2];
        this.current.applicant = data[3];
        this.current.source = data[4];
        this.current.author = data[5];
    },
    submit(ifpass){
        // let iffMatch = 0;
        // this.err_msg = '';
        // for(let i=0; i<this.allResource.length; i++){
        //     if(this.allResource[i] == this.checkId){
        //         iffMatch = 1;
        //     }
        // }
        // if(iffMatch == 1){
            if(ifpass == 'pass'){
                let data = {
                    article_id: this.checkId,
                    status: 1,
                    reason: this.checkReason,
                };
                axios.put('/api/v1/admin/articleApply', data)
                .then(res => {
                    if(res.data.success == 1){
                        alert('审核成功！');
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
            }
            if(ifpass == 'fail'){
                if(this.checkReason == ''){
                    this.err_msg = '不通过的原因是什么？';
                    return
                }else{
                    let data = {
                        article_id: this.checkId,
                        status: 2,
                        reason: this.checkReason,
                    };
                    axios.put('/api/v1/admin/articleApply', data)
                    .then(res => {
                        if(res.data.success == 1){
                            alert('审核成功！');
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
                }
            }
        // }else{
        //     this.err_msg = '未找到对应资源id！';
        // }
    },
    changePage(){
        let currentpage = this.$refs.page.pagenumber + 1;
        let data = {
            status: this.status,
            page: currentpage,
            limit: 5,
        }
        axios.get('/api/v1/admin/articleApplies', {
            params: data})
        .then(res => {
            if(res.data.success == 1){
                this.currentItems = res.data.data.data;
            }else{
                console.log(res.data.err_msg);
            }
        });
    },
    showCata(da){
        this.status = da;
        let data = {
            status: this.status,
            page: 1,
            limit: 5,
        }
        axios.get('/api/v1/admin/articleApplies', {
            params: data})
        .then(res => {
            if(res.data.success == 1){
                this.currentItems = res.data.data.data;
                this.itemNumber = Math.ceil(res.data.data.total/5);
            }else{
                console.log(res.data.err_msg);
            }
        });
    }
},
components: {
    Applyitem,
    Page,
    Sidebar,
},

}
</script>

<style scoped>
.check-paper{
    position: absolute;
    top: 30px;
    left:15px;
}
.page{
    position: absolute;
    top:560px;
    left:0px;
}
.side{
    position: fixed;
    left:10px;
    transition: 0.5s linear;
    transition-delay: 0.3s;
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
.second-line{
    display: block;
    margin-top: 30px;
}
.pass,
.fail{
    cursor: pointer;
    margin-top: 10px;
    border: none;
    outline: none;
    width: 130px;
    height: 35px;
    font-family: '幼圆';
    font-size: 18px;
    font-weight: 800;
    border-radius: 10px;
    color: white;
    transition: 0.2s;
}
.pass{
    border: #006600 1px solid;
    margin-left: 60px;
    background: linear-gradient(#66CC33, #3BA51F, #20920E, #177E09);
    margin-right: 50px;
}
.fail{
    background: linear-gradient(rgb(255, 184, 151), rgb(248, 44, 44), rgb(255, 0, 0));
    border: rgb(88, 3, 3) 1px solid;
}
.pass:hover,
.fail:hover{
    transform: scale(1.1);
    transition: 0.2s;
}
.pass:active{
    background: linear-gradient( #177E09,#66CC33, #3BA51F, #20920E);
}
.fail:active{
    background: linear-gradient( rgb(255, 0, 0), rgb(248, 44, 44), rgb(255, 184, 151));
}
.fail{
    background-color: red;
}
.reason{
    display: block;
    line-height: 120px;
    margin-right: 30px;
}
.reasons{
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px;
    border: lightblue 2px solid;
    outline: none;
    display: block;
    width: 300px;
    height:110px;
    resize: none;
}
.mdzz{
    margin-top: 30px;
    display: flex;
}
.button-con{
    display: flex;
    flex-direction: row;
    text-align: center;
    line-height: 35px;
    justify-content: space-around;
}
.option{
    margin-bottom: 5px;
    font-family: '幼圆';
    font-weight: 400;
    height: 35px;
    width: 90px;
    border-radius: 5px;
    background-color: #ffa500;
    border: blueviolet 2px solid;
    transition: 0.4s;
    cursor: pointer;
}
.option:hover{
    background-color: yellow;
    transform: scale(1.1);
    transition: 0.4s;
}
</style>
