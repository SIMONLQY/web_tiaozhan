<template>
<div class="book">
    <div class="div-container">
        <div class="firstbar">
            
        </div>
        <div class="firstbar">
        </div>
    </div>
    <div class="middle1"></div>
    <div class="middle2"></div>
    <div class="middle3"></div>
    <component v-bind:is="currentTabComponent"></component>
</div>
</template>

<script>
import Personal from '@/components/models/Personal.vue'
import Mypaper from '@/components/models/Mypaper.vue'
import CheckPaper from '@/components/models/CheckPaper.vue'
import CheckMessage from '@/components/models/CheckMessage.vue'
import UserCreate from '@/components/models/UserCreate.vue'
import EditLink from '@/components/models/EditLink.vue'
import EditTop from '@/components/models/EditTop.vue'
import AddCata from '@/components/models/AddCata.vue'
export default {
    data(){
        return {
            
        }
    },
    computed: {
        currentTabComponent(){
             let component =  sessionStorage.getItem('SCENE');
             if(component == 'Personal'){
                 return Personal
             }
             if(component == 'Mypaper'){
                 return Mypaper
             }
             if(component == 'CheckPaper'){
                 return CheckPaper
             }
             if(component == 'CheckMessage'){
                 return CheckMessage
             }
             if(component == 'UserCreate'){
                 return UserCreate
             }
             if(component == 'EditLink'){
                 return EditLink
             }
             if(component == 'EditTop'){
                 return EditTop
             }
             if(component == 'AddCata'){
                 return AddCata
             }
        }
    },
    components: {
        Personal,
        Mypaper,
        CheckPaper,
        CheckMessage,
        UserCreate,
        EditLink,
        EditTop,
        AddCata
    }
}
</script>

<style scoped>
.book{
    position: relative;
}
.firstbar{
    border: rgb(157, 216, 240) 1px solid;
    margin-top:20px;
    margin-left:10px;
    margin-right:10px;
    width: 430px;
    height: 570px;
    background-color: #f0fcff;
}
.div-container{
    display: flex;
    flex-direction: row;
}
.middle1{
    position: absolute;
    width: 50px;
    height: 10px;
    background-color: grey;
    left:425px;
    top: 70px;
}
.middle2{
    position: absolute;
    width: 50px;
    height: 10px;
    background-color: grey;
    left:425px;
    top: 300px;
}
.middle3{
    position: absolute;
    width: 50px;
    height: 10px;
    background-color: grey;
    left:425px;
    top: 530px;
}
</style>
