<template>
    <div class="main-body">
        <!-- <router-link to="tinymceEditor" style="font-size: 14px;color: orange;">立即注册</router-link> -->
        <!-- <router-view></router-view> -->
        <component v-bind:is="currentTabComponent"></component>

    </div>
</template>

<script>
import Personal from '@/components/models/Personal.vue'
import Personal2 from '@/components/models/Personal2.vue'
import EnMypaper from '@/components/enmodels/enMypaper.vue'
import Mypaper from '@/components/models/Mypaper.vue'
import Mypaper2 from '@/components/models/MyPaper2.vue'
import CheckPaper from '@/components/models/CheckPaper.vue'
import CheckPaper2 from '@/components/models/CheckPaper2.vue'
import CheckMessage from '@/components/models/CheckMessage.vue'
import CheckMessage2 from '@/components/models/CheckMessage2.vue'
import UserCreate from '@/components/models/UserCreate.vue'
import UserCreate2 from '@/components/models/UserCreate2.vue'
import EditLink from '@/components/models/EditLink.vue'
import EditLink2 from '@/components/models/EditLink2.vue'
import EditTop from '@/components/models/EditTop.vue'
import EditTop2 from '@/components/models/EditTop2.vue'
import AddCata from '@/components/models/AddCata.vue'

export default {
    computed: {
        currentTabComponent(){
             let component =  sessionStorage.getItem('SCENE');
             if(component == 'Personal2'){
                 return Personal2
             }
             if(component == 'Mypaper2'){
                 return Mypaper2
             }
             if(component == 'EnMypaper'){
                 return EnMypaper
             }
             if(component == 'CheckPaper2'){
                 return CheckPaper2
             }
             if(component == 'CheckMessage2'){
                 return CheckMessage2
             }
             if(component == 'UserCreate2'){
                 return UserCreate2
             }
             if(component == 'EditLink2'){
                 return EditLink2
             }
             if(component == 'EditTop2'){
                 return EditTop2
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
        AddCata,
        Mypaper2,
        CheckPaper2,
        EditLink2,
        EditTop2,
        CheckMessage2,
        UserCreate2,
        Personal2,
        EnMypaper,
    }
}
</script>


<style scoped>
.main-body{
    position: absolute;
    top: 50px;
    left: 200px;
    height: 600px;
    width: 1080px;
    background: #fffbf0;
}
</style>
