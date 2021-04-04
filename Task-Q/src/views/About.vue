<template>
  <div class="all">
    <div class="allMesLinks">
      <div class="about">
        <div class="disc">
          <h3 class="h">关于团委</h3>
          <div class="p">共青团西安交通大学委员会（以下简称“团委”）是在校党委和团省委领导下开展工作的群众性组织，负责全校团的组织建设、思想建设、科技创新、社会实践、大学生文化素质教育、学生社团管理等工作。<br> 校团委设专职工作人员岗位9人，其中书记1人，副书记5人，部长2人，工勤岗职员1人。2016年第28次团代会上，选拔两名教师、两名学生当选兼职副书记，完成了“1+5+4”的书记班子配备。团委下设组织部、宣传部、科技部、文艺部、实践部、志愿者工作部、办公室，并在校机关、学院、书院及附属单位设有1个机关与直属单位团工委、19个学院团工委、8个书院团工委和研究生、第一附属医院、第二附属医院、第一附属中学、第二附属中学分团委，指导研究生会、学生会、学委会、社团联合会、团干联谊会等校级学生组织以及200余个学生社团的日常工作，同时指导2个附属小学的少先队工作。2015年，团委依据当前青年的新特点和实际工作需要，在原有团委各部门基础上成立了科技创新指导中心、志愿服务指导中心、社会实践指导中心、优思新媒体中心，建立矩阵式纵横双向工作模式。</div>
        </div>
        <div class="disc">
          <h2 class="h">关于挑战网</h2>
          <div class="p"> 我们专注交大学生至关重要的需求，以卓越人才和领先技术，致力解决最具挑战的议题，提供包括资讯、维权、活动、视频和招聘就业等广泛领域的解决方案，我们构建、驱动、载运，创想为本，行重于言。我们，想到，做到。</div>
        </div>
      </div>

      <div class="friendLinks">
        <div class="imglinks">
          <a href="" v-for="i in 3" class="imgs">
            <img :src='imgs[i-1]' class="img" @click="getImgLinks(i-1)">
          </a>
        </div>
        <div class="links">
          <ul class="ul">
            <h3 class="linksHead">旗下产品</h3>
            <a v-for="(product,i) in products" :href="prolinks[i]" class="linksPros">{{products[i]}}</a>
          </ul>
          <ul class="ul">
            <h3 class="linksHead">友情链接</h3>
            <a v-for="(link,i) in links" :href="linklinks[i]" class="linksPros">{{links[i]}}</a>
          </ul>
        </div>
      </div>
      <p class="footer">Copyright © 2001-2018 TIAOZHAN. All rights reserved. 陕ICP备06001542号</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return{
        products:["交大青年之声","挑战v网","挑战首页","暑期社会实践","公共资源申请"],
        links:["西安交通大学","交大新闻网","西安交大教务处"],
        imglinks:["https://weibo.com/tiaozhanwang?refer_flag=1001030101_&is_hot=1",
                  "https://mp.weixin.qq.com/s?__biz=MzAwOTA1MDkxOA==&mid=202185404&idx=2&sn=adfb6fe6cb7db9011578f91e0d0ae3cc&mpshare=1&scene=23&srcid=04309rJC5JFD33Oz5Hrl7SXd#rd",
                  "http://v.qq.com/vplus/tiaozhan"],
        prolinks:[],
        linklinks:[],
        imgs:[require("../assets/weibo.png"),require("../assets/wechat.png"),require("../assets/top.png")]
      }
    },
    methods:{
      getImgLinks(i){
        window.open(this.imglinks[i],"_blank")
      }
    }
  }

;</script>


<style type="text/css" scoped>
.allMesLinks{
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.footer{
  font-size: 12px;
  font-family: "SimSun";
  color: rgb(249, 234, 185);
  width: 100%;
  display: flex;
  justify-content: center;
  line-height: 1.2;
}

.linksPros{
  font-size: 16px;
  font-family: "DengXian";
  color: rgb(249, 234, 185);
}
.linksHead{
  font-size: 24px;
  font-family: "SimHei";
  margin-top: 7px;
  color: rgb(243, 243, 243);
  line-height: 1.2;
  font-weight: normal;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.all{
  background-color: #919183;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  width:100%;
}
.disc{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.imglinks{
  display: flex;
  justify-content: flex-start;
  margin-left: 80px;
  margin-top: 22px;
}
.links{
  display: flex;
  justify-content: space-between;
  margin-left: 80px;
}
.ul{
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-right: 50px;
  margin-top: 0;
}
.img{
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.h{
  margin-bottom:0px;
  font-size: 22px;
  font-family: "SimHei";
  color: rgb(243, 243, 243);
  line-height: 1.2;
  font-weight: normal;
  letter-spacing: 1px;
}
.p{
  margin-top: 5px;
  margin-bottom: 0px;
  text-indent: 38px;
  font-size: 12px;
  font-family: "SimSun";
  color: rgb(236, 236, 236);
  font-weight: normal;
  letter-spacing: 1px;
}
.about{
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}
.friendLinks{
  width: 40%;
  display: flex;
   flex-direction: column;
}


a{
  list-style: none;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 10px;
}
a:hover{
  text-decoration: underline;
}
@font-face{
  font-family: hwxh;
  src: url(../assets/hwxh.ttf);
}
@font-face{
  font-family: SimHei;
  src: url(../assets/simhei.ttf);
}
@font-face{
  font-family: SimSun;
  src: url(../assets/SimSun.ttf);
}
</style>