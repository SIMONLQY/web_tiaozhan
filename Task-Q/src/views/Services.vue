<template>
  <div class="Services">
    <div v-for="(Service,i) in Services" class="service">
      <img :src="Service.img_path" @click="getservice(Service.link)" class="serviceImg">
      <h3 class="serviceH" @click="getservice(Service.link)"> {{Service.link_name}}</h3>
    </div>
  </div>
</template>


<script type="text/javascript" >
import axios from 'axios'
  export default{
    data(){
      return{
        Services:"",
        forMoreAc:""
      }
    },
    methods:{
      getservice(l){
        window.open("https://"+l,"_blank")
      },
      checkServices(r){
        if(r.data.length>5){
          this.Services=r.data
          for(let j=4;j<this.Services.length;j++){
            this.Services.splice(j,1)
          }
          this.forMoreAc=true
        } else{
          this.Services=r.data
        }
      }
    },
    created(){
      axios.get('/api/v1/photoLink/3')
      .then(r=>this.checkServices(r.data))
    }
  }
;</script>


<style type="text/css" scoped>
.serviceImg{
  height: 185px;
  width: 250px;
  object-fit: cover;
  object-position: 50% 50%;
  cursor: pointer;
}
.serviceH{
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  font-size: 17.5px;
  font-family: "SimHei";
  bottom: 2px;
  color: rgb(255, 255, 255);
  letter-spacing: 1.9px;
  font-weight: normal;
}
.serviceH:hover{
  text-decoration: underline;
  cursor: pointer;
}
.service{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}
.Services{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 10px;
  height: 200px;
}
@font-face{
  font-family: hwxh;
  src: url(../assets/hwxh.ttf);
}
@font-face{
  font-family: Microsoft YaHei;
  src: url(../assets/Microsoft YaHei.ttf);
}
@font-face{
  font-family: SimHei;
  src: url(../assets/simhei.ttf);
}
@media only screen and (max-width: 1500px){

}
</style>