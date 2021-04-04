<template>
    <div class="add-cata">
        就你们几个能看还指望有什么页面？不存在的<br/>
        添加目录：<br/>
        <input type="text" placeholder="输入目录名字" v-model="model1"/><br/>
        <input type="text" placeholder="输入父级目录id" v-model="model2"/><br/>
        <input type="text" placeholder="输入目录角色，1为主目录，2为一级目录，3为二级目录" v-model="model3"/><br/>
        <button @click="submit1">提交</button><br/>
        修改目录：<br/>
        <input type="text" placeholder="输入目录id" v-model="model4"/><br/>
        <input type="text" placeholder="输入目录名字" v-model="model5"/><br/>
        <input type="text" placeholder="输入父级目录id" v-model="model6"/><br/>
        <input type="text" placeholder="输入目录角色，1为主目录，2为一级目录，3为二级目录" v-model="model7"/><br/>
        <button @click="submit2">提交</button><br/>
        删除目录：<br/>
        <input type="text" placeholder="输入目录id" v-model="model8"/><br/>
        <button @click="submit3">提交</button><br/>
    <div class="right-area">
        <img src="@/assets/others/jiekou.png"/>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            model1: '',
            model2: '',
            model3: '',
            model4: '',
            model5: '',
            model6: '',
            model7: '',
            model8: '',
        }
    },
    methods: {
        submit1(){
            let data = {
                catalogName: this.model1,
                catalogFather: this.model2,
                catalogRole: this.model3
            }
            axios.post('/api/v1/admin/catalog', data)
            .then(res => {
                if(res.data.success == 1){
                    alert('好了');
                }else{
                    alert('失败');
                }
            })
            .catch(e => {
                alert('失败');
                console.log(e);
            })
        },
        submit2(){
            let data = {
                catalogId: this.model4,
                catalogName: this.model5,
                catalogFather: this.model6,
                catalogRole: this.model7
            }
            axios.put('/api/v1/admin/catalog', data)
            .then(res => {
                if(res.data.success == 1){
                    alert('好了');
                }else{
                    alert('失败');
                }
            })
            .catch(e => {
                alert('失败');
                console.log(e);
            })
        },
        submit3(){
            let data = {
                catalogId: this.model8,
            }
            axios.delete('/api/v1/admin/catalog',{
                params: data
            })
            .then(res => {
                if(res.data.success == 1){
                    alert('好了');
                }else{
                    alert('失败');
                }
            })
            .catch(e => {
                alert('失败');
                console.log(e);
            })
        }
    }
}
</script>

<style scoped>
img{
    width: 400px;
    height: 540px;
}
.add-cata{
    position: absolute;
    top: 30px;
    left:15px;
}
input{
    width: 400px;
}
.right-area{
    position: absolute;
    top:-10px;
    left:445px;
    width: 430px;
    height: 570px;
}
</style>
