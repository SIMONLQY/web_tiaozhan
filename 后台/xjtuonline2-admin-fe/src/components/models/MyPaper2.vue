<template>
    <div class="mypaper">
        <el-popover
            placement="right"
            width="150"
            trigger="click"
            class="div-con1">
            
            <el-button 
            type="warning" plain
            size="small"
            v-for="item in erjimulu"
            :key="item.cataid"
            class="mulu">
                <router-link :to="{path: '/editor', query: {name: item.cataid, use: 'create'}}">
                <label :for="item.cataid" class="but-lab">{{item.cataname}}</label>
                </router-link>
            </el-button>
            
            <el-button slot="reference" type="primary" plain @click="handleClick(scope.row)" size="small" class="fir-but">新增文章</el-button>
        </el-popover>
        <!-- <el-button type="primary" class="fir-but">新增文章</el-button> -->
        <div class="fir"></div>
        <el-container style="height: 500px; border: 1px solid #eee" class="toright">
        <el-container class="elcon">     
            <el-table :data="myapply" stripe
            style="width: 100%"
            height="500"
            
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
                        <el-button type="primary" plain @click="edit2(scope.row)" size="small">查看并修改</el-button>
                        <el-button type="danger" plain @click="delete2(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
        </el-container>
    </div>
</template>
 
<script>
// import Applyitem from '@/components/items/Applyitem.vue'
import axios from 'axios'
// import Page from '@/components/items/Page.vue'
// import Sidebar from '@/components/main/Sidebar.vue'
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
            this.myapply = response.data.data.data;
            console.log(this.myapply);
            for(let i=0; i<this.myapply.length; i++){
                if(this.myapply[i].check_status == 1){
                    this.myapply[i].check_status = '通过';
                }
                if(this.myapply[i].check_status == 3){
                    this.myapply[i].check_status = '审核中';
                }
                if(this.myapply[i].check_status == 2){
                    this.myapply[i].check_status = '未通过';
                }
            }
        }else{
            console.log(response.data.err_msg);
        };
    })

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
        father: '',
    }
},
computed: {
    
},
methods: {
    edit2(row){
        let url = this.$router.resolve({path: '/passage', query: {id: row.article_id }});
        window.open(url.href, '_blank');
    },
    delete2(row){
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let string = '/api/v1/admin/selfApply/' + row.article_id;
                axios.delete(string)
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
                    };
                    })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // handleCurrentChange(now, before) {
    //     let url = this.$router.resolve({path: '/passage', query: {id: now.article_id }});
    //     window.open(url.href, '_blank');
    //     console.log(before);
    // },
    // tableRowClassName({row, rowIndex}) {
    //     if (rowIndex === 1) {
    //       return 'warning-row';
    //     } else if (rowIndex === 3) {
    //       return 'success-row';
    //     }
    //     return '';
    //   }
    
},
components: {
    // Applyitem,
    // Page,
    // Sidebar,
}
}
</script>

<style scoped>
a {
    color: rgb(58, 162, 248);
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
.mypaper{
    position: absolute;
    top: 10px;
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
    /* margin-bottom: 5px;
    font-family: '幼圆';
    font-weight: 400;
    height: 35px;
    width: 130px;
    border-radius: 5px;
    background-color: #ffa500;
    border: blueviolet 2px solid;
    transition: 0.4s; */
    margin-left: 10px;
    margin-bottom: 5px;
    height: 35px;
    width: 130px;
    display: block;
    cursor: pointer;
    padding: 0;
}
.but-lab{
    display: block;
    height: 35px;
    width: 130px;
    line-height: 35px;
}
/* .mulu:hover{
    background-color: yellow;
    transform: scale(1.1);
    transition: 0.4s;
} */

    /* background-color: #f3f29e; */
    /* background-color: #ff3c01; */

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
.elcon{
    width: 1000px;

}
.agree{
    padding-left: 50px;
}
.bemid{
    margin-left: 170px;
}
.fir-but{
    margin-left: 900px;
}
.fir{
    height: 10px;
}
.div-con1{
    display: flex;
    flex-direction: row;
}
.toright{
    margin-left: 20px;
}
/* .el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb !important;
} */
</style>


