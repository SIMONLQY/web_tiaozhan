<template>
  <div class="ball">
    <div id="ball" 
    :style="{'top':height+'px','left':width+'px','opacity':opacity}" 
    @mouseover="show" 
    @mouseout="hide">
    </div>
    <div id="ball-hide" 
    :style="{'top':height+'px','left':width+'px','opacity':opacity}" 
    @mouseover="show" 
    @mouseout="hide">
    
      <websites 
      v-for="website in websites"
      :key="website.id"
      :destination="website.destination"
      :webname="website.webname" 
      :websrc="website.websrc"
      :style="{
          'top':website.webposition.top,
          'left':website.webposition.left,
          'visibility':'visible',
          'opacity':iconOpacity}">
      </websites>
   
      <img class="tiaozhan-logo" src="@/assets/ico/logo-white.png"/>
      <!-- <img class="nail" src="@/assets/loginImg/dingzi.png"/> -->
      <div class="write-about">关于交大青年之声</div>
      <div class="some-words">我们专注交大学生至关重要的需求，以卓越人才和领先技术，致力解决最具挑战的议题，提供包括资讯、维权、活动、视频和招聘就业等广泛领域的解决方案，我们构建、驱动、载运，创想为本，行重于言。我们，想到，做到。</div>
    </div>
  </div>
</template>
<script>

import Websites from '@/components/websites/Websites.vue'
//需要的网站链接在这里
const websitesList = [
  {
    id: 1,
    webname: '西安交通大学',
    websrc: require('@/assets/ico/xjtu.jpg'),
    webposition: {
        top: '20px',
        left: '330px'
    },
    destination: 'http://www.xjtu.edu.cn/'
  },
  {
    id: 2,  
    webname: '交大新闻网',
    websrc: require('@/assets/ico/news.jpg'),
    webposition: {
        top: '45px',
        left: '225px'
    },
    destination: 'http://news.xjtu.edu.cn/'
  },
  {
    id: 3,
    webname: '交大青年之声',
    websrc: require('@/assets/ico/qingnianzhisheng.jpg'),
    webposition: {
        top: '100px',
        left: '120px'
    },
    destination: 'https://tuanwei.xjtu.edu.cn/'
  },
  {
    id: 4,
    webname: '西安交通大学教务处',
    websrc: require('@/assets/ico/jiaowuchu.jpg'),
    webposition: {
        top: '210px',
        left: '50px'
    },
    destination: 'http://dean.xjtu.edu.cn/'
  },
  {
    id: 5,
    webname: '团委挑战网',
    websrc: require('@/assets/ico/tiaozhan.jpg'),
    webposition: {
        top: '330px',
        left: '15px'
    },
    destination: 'https://www.tiaozhan.com/'
  },
]
export default {
    name: 'ball',
    components: {
        Websites,
    },
    data() {
        return {
            width: '',
            height: '',
            opacity: 0.5,
            iconOpacity:0,
            websites: websitesList
        }
    },
    created: function() {
        this.width = window.innerWidth-170;
        this.height = window.innerHeight-170;
    },
    methods: {
        show() {
            this.width = window.innerWidth-450;
            this.height = window.innerHeight-450;
            this.opacity = 1;
            this.iconOpacity = 1;
        },
        hide() {
            this.width = window.innerWidth-170;
            this.height = window.innerHeight-170;
            this.opacity = 0.5;
            this.iconOpacity = 0;
        }
    }
}
</script>
<style scoped>
#ball{
    border: purple 1px solid;
    animation: rotating 5s linear infinite;
    position: fixed;
    border-radius: 50%;
    width: 700px;
    height: 700px;
    background: linear-gradient(135deg, #05ffc9 0%, #079af0 20%, #4603ff 40%,#e106f5);
    transition: 1s ease-in-out 0.2s;
    z-index: 50;
}
#ball-hide{
    visibility: hidden;
    position: fixed;
    border-radius: 50%;
    width: 700px;
    height: 700px;
    background: linear-gradient(135deg, #05ffc9 0%, #079af0 20%, #4603ff 40%,#e106f5);
    transition: 1s ease-in-out 0.2s;
    z-index: 50;
}
@keyframes rotating
{
   0% {transform: rotate(0deg)} 
   100% {transform: rotate(360deg)}
}
.tiaozhan-logo {
    transform-origin: 0%;
    width: 200px;
    visibility: visible;
    position: absolute;
    left:370px;
    top:120px;
    z-index: 50;
    animation: hang 5s ease-in-out infinite;
}
.tiaozhan-logo:hover {
    animation-play-state: paused;
}
@keyframes hang {
    0% {transform: rotate(60deg)}
   
    50% {transform: rotate(120deg)}

    100% {transform: rotate(60deg)}
}
/* .nail {
    position:absolute;
    z-index: 60;
    top: 100px;
    left: 370px;
    width: 50px;
    visibility: visible;
} */
.some-words {
    visibility: visible;
    position: absolute;
    z-index: -50;
    height: 50px;
    width: 290px;
    top:350px;
    left:130px;
    color: rgba(39, 39, 37, 0.877);
    font-size: 12px;
    font-family: "微软雅黑";
}
.write-about {
    visibility: visible;
    position: absolute;
    font-size: 16px;
    font-family: "微软雅黑";
    color: black;
    width: 290px;
    height:30px;
    left: 130px;
    top:310px;
    border-bottom-width: 2px;
    border-bottom-color: yellow;
    border-bottom-style: dotted;
  
}
</style>
