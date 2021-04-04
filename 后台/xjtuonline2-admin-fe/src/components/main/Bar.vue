<template>
  <!-- <div class="bar" @mouseover="show" @mouseout="hide">
    <div class="main" id="main">
        <catalog></catalog>
    </div>
    <div class="triangle">
    <img src="@/assets/loginImg/lingdang.png"/>
    </div>
  </div> -->
   <div class="bar">
    <div class="main" id="main">
        <catalog></catalog>
    </div>
  </div>
</template>

<script>
import Catalog from '@/components/main/Catalog.vue'
import bus from '@/Eventbus.js'
export default {
    name: 'bar',
    data(){
        return{
        }
    },
    methods: {
        // show() {
        //     bus.$emit('show');
        // },
        // hide() {
        //     bus.$emit('hide');
        // },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    components: {
        Catalog,
    }
}
</script>

<style scoped>
.bar{
    z-index: 1;
    top: 50px;
    left: 0px;
    position: fixed;
    /* transition: 0.3s;
    transition-delay: 0.8s; */
}
/* .bar:hover{
    transform: translate(0,500px);
    transition: 0.5s;
    transition-timing-function: ease-in-out;
} */
/* img{
    animation: imgrotate 3s ease-in-out infinite;
    opacity: 1;
    position:absolute;
    top: -10px;
    left:-34px;
    width: 70px;
    transition: 1s;
}
img:hover{
    width: 80px;
    left:-37px;
    transition: 0.3s;
}
@keyframes imgrotate {
    0% {transform: rotate(-10deg)}
   
    50% {transform: rotate(10deg)}

    100% {transform: rotate(-10deg)}
} */
/* .main{ */
    /* background: linear-gradient(135deg, #ff0000 0%, #ff9600 20%, #fff600 40%,#ff6600);
    position: absolute;
    width: 230px;
    height: 500px;
    background-color: red;
    transition: 0.5s ease-in-out;
    transition-delay: 0.3s;
    border-width: 0px 2px 0px 2px;
    border-style: solid;
    border-color: #ff6600;
    top: -500px; */
/* } */
/* .triangle{
    position: absolute;
    width: 0;
    height: 0;
    border-width: 117px;
    border-style: solid;
    border-color: #0668fa transparent transparent transparent;
    border-top: 20px solid rgba(255, 102, 0, 0.8);
    transition: 0.5s ease-in-out;
    transition-delay: 0.3s;
} */



.tac{
    width: 402px;
}
.menu{
    height: 800px;
}
</style>
