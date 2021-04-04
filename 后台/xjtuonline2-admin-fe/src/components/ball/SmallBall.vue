<template>
    <div class="small-ball" @click="tellFather(id)">
        {{name}}
    </div>
</template>

<script>
import bus from '@/Eventbus.js'
export default {
    props: {
        name: String,
        id: String,
    },
    methods: {
        tellFather(id){
            bus.$emit('tellYou', id);
        }
    }
}
</script>

<style scoped>
.small-ball{
    height: 100px;
    width: 100px;
    border: rgb(88, 195, 228) 3px solid;
    border-radius: 50%;
    background-color: rgb(139, 214, 243);
    color: rgb(255, 255, 116);
    font-size: 18px;
    font-family: '幼圆';
    text-align: center;
    font-weight: 800;
    line-height: 100px;
    transition: 0.3s;
}
.small-ball:hover{
    transform: rotate(360deg);
    transition: 1s;
}
</style>

