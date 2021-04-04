<template>
    <el-carousel :interval="5000" class="nav" >
      <el-carousel-item  v-for="(img, i) in imgs" >
        <img  @click="changepath(img.link)" :src="img.img_path" class="imgn" ref="imgHeight"/>
      </el-carousel-item>
    </el-carousel>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import axios from 'axios'
  export default{
    data(){
      return{
        isActive:[],
        imgs:""
      }
    },
    methods:{
      changepath(l){
        window.open("https://"+l,'_blank')
      },
      show(i){
        for(let j=0;j<this.isActive.length;j++){
          if(j==i){
            Vue.set(this.isActive,j,true)
          } else{
            Vue.set(this.isActive,j,false)
          }
        }
      },
      getbanner(r){
        this.imgs=r.data
        for(let i=0;i<r.data.length;i++){
          if(i==0){
            this.isActive.push(true)
          } else{
            this.isActive.push(false)
          }
        }
      }
    },
    created(){
      axios.get('/api/v1/photoLink/1')
      .then(r=>this.getbanner(r.data))
    }
  }
;</script>


<style type="text/css" >
.el-carousel__arrow{
  height: 50px !important;
  width: 50px !important;
}
.el-carousel__button{
  display: inline-block !important;
  width: 15px !important;
  height: 15px !important;
  border-radius: 15px !important;
  border-color: #b9baac !important;
}
.el-carousel__container{
  display: inline-block;
  width: 100%;
  height: 400px !important;
}
.el-carousel__item{
  margin: 0px;
  height: 400px;
  overflow: hidden;
  display: flex !important;
  align-items: flex-end;
  justify-content: center;
}

.el-carousel{
  overflow-y: hidden;
  height:400px;
  width: 100%;
  text-align: center;
  margin:0 auto;
}
.imgn{
  width: 100%;
  height: 400px;
  cursor: pointer;
  object-fit: cover;
  object-position: 50% 50%;
}



</style>