<template>
    <div class="mypaper">
        <applyitem v-for="item in result[page]"
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
        :status="item.check_status"
        :reason="item.refuse_reason"
        :father="item.father"
        ></applyitem> 
        <page :count="count" ref="page" @changenow="changePage" class="page"></page>  
        <sidebar class="side" :style="{'top':height+'px'}"
        :headline="current.headline"
        :subheading="current.subheading"
        :content="current.content"
        :applicant="applicant"
        :source="current.source"
        :author="current.author"
        ></sidebar> 
        <!-- <button @click="changePage">hahahaha</button> -->
        <div class="right-area">
            <div class="heading">新增文章</div>
            <div class="ratio-container">
                <div v-for="item in erjimulu"
                :key="item.cataid"
                class="mulu">
                    <router-link :to="{path: '/editor', query: {name: item.cataid, use: 'create'}}">
                    <label :for="item.cataid">{{item.cataname}}</label>
                    </router-link>
                    <input class="ratio" :id="item.cataid" name="catagory" type="radio" :value="item.cataid" hidden/> 
                </div>
            </div>
            <div class="heading">修改文章</div>
            <!-- <div class="ratio-container">
                <div v-for="item in yijimulu"
                :key="item.cataid"
                class="mulu">
                    <label :for="item.cataname">{{item.cataname}}</label>
                    <input class="ratio" :id="item.cataname" :name="item.cataname" type="radio" value="" hidden/> 
                </div>
            </div> -->
            <div class="xiugai">
                <span>文章的审核id：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入左侧每一条审核右上角的审核id"
                v-model="editid"/> 
                <small class="small">{{err_msg1}}</small>
                <button class="submit1" @click="editIt">修改</button>
            </div>
            <div class="heading">删除申请</div>
            <div class="xiugai">
                <span>文章的审核id：</span>
                <input class="xiugai-input" 
                type="text" 
                placeholder="请输入左侧每一条审核右上角的审核id"
                v-model="deleteid"/> 
                <small class="small">{{err_msg2}}</small>
                <button class="submit1" @click="deleteIt">删除</button>
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
    axios.get("/api/v1/catalogs")
    .then(res => {
        if(res.data.success == 1){
            this.catagory = res.data.data;
            for(let i=0; i<this.catagory.length; i++){
                for(let k=0; k<this.catagory[i].children.length; k++){
                    if(this.catagory[i].children[k].catalog_role == 3){
                        this.erjimulu.push({
                            'cataname': this.catagory[i].children[k].catalog_name,
                            'cataid': this.catagory[i].children[k].id,
                        })
                    };
                    if(this.catagory[i].children[k].childrenRole == 2){
                        this.yijimulu.push({
                            'cataname': this.catagory[i].children[k].catalog_name,
                            'cataid': this.catagory[i].children[k].id,
                        })
                    };
                }
            }
        }else{
            console.log(response.data.err_msg);
        };
    });
    axios.get("/api/v1/admin/selfApply")
    .then(response => {
        if(response.data.success == 1){
            this.myapply = response.data.data;
            let length = this.myapply.length;
            for(var i=0;i<length;i+=5){
                this.result.push(this.myapply.slice(i,i+5));
                this.count = this.count + 1;
            };
            if(this.count == 0){
                this.count = 1
            }
        }else{
            console.log(response.data.err_msg);
        };
    })
    bus.$on('show', () => {
        this.height = 700;
    });
    bus.$on('hide', () => {
        this.height = 100;
    });
    bus.$on('anotherID', (id) => {
        this.editid = id[0];
        this.deleteid = id[0];
    })
},
data(){
    return {
        yijimulu: [],
        erjimulu: [],
        catagory: '',
        myapply: '',
        result: [],
        count: 0,
        page: 0,
        height: 100,
        current: {
            headline: '',
            subheading: '',
            content: '',
            source: '',
            author: '',
        },
        err_msg1: '',
        err_msg2: '',
        deleteid: '',
        editid: '',
        applicant: 'You',
        father: '',
    }
},
methods: {
    changePage(){
        this.page = this.$refs.page.pagenumber;
    },
    preview(data){
        this.current.headline = data[0];
        this.current.subheading = data[1];
        this.current.content = data[2];
        this.current.source = data[4];
        this.current.author = data[5];
    },
    deleteIt(){
        let iffMatch = 0;
        this.err_msg2 = '';
        for(let i=0; i<this.myapply.length; i++){
            if(this.myapply[i].article_id == this.deleteid){
                iffMatch = 1;
            }
        }
        if(iffMatch == 1){
            this.err_msg2 = '';
            event.returnValue = confirm("您确认要删除吗？");
            if(event.returnValue){
                let string = '/api/v1/admin/selfApply/' + this.deleteid;
                axios.delete(string)
                .then(res => {
                    if(res.data.success == 1){
                        alert('删除成功！');
                        this.reload();
                    }else{
                        alert('删除失败');
                        this.err_msg2 = res.data.err_msg;
                    };
                    })
            }else{
                return
            }
        }else{
            this.err_msg2 = '未找到对应审核id！';
        }
    },
    editIt(){
        let iffMatch = 0;
        this.err_msg1 = '';
        for(let i=0; i<this.myapply.length; i++){
            if(this.myapply[i].article_id == this.editid){
                iffMatch = 1;
            }
        }
        if(iffMatch == 1){
            this.err_msg1 = '';
            this.$router.push({name: 'tinymceEditor', query: {name: this.editid, use: 'edit'}});
        }else{
            this.err_msg1 = '未找到对应审核id！';
        }
    }
},
components: {
    Applyitem,
    Page,
    Sidebar,
}
}
</script>

<style scoped>
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
.mypaper{
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
    transition-delay: 0.1s;
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
.ratio{
    width: 0;
    height: 0;
}
.ratio-container{
    display: flex;
    flex-direction: row;
    text-align: center;
    line-height: 35px;
    justify-content: space-around;
    flex-wrap: wrap;
}
.mulu{
    margin-bottom: 5px;
    font-family: '幼圆';
    font-weight: 400;
    height: 35px;
    width: 130px;
    border-radius: 5px;
    background-color: #ffa500;
    border: blueviolet 2px solid;
    transition: 0.4s;
    cursor: pointer;
}
.mulu:hover{
    background-color: yellow;
    transform: scale(1.1);
    transition: 0.4s;
}
.mulu:active{
    /* background-color: #f3f29e; */
    background-color: #ff3c01;
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
/* button{
     position:absolute;
     top:0;
} */
</style>


