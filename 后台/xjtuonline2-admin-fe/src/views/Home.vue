<template>
  <div class="home">
    <main-body></main-body>
    <bar></bar> 
    <top-bar></top-bar>
  </div>
</template>

<script>
import MainBody from '@/components/main/MainBody.vue'
import Ball from '@/components/ball/Ball.vue'
import Bar from '@/components/main/Bar.vue'
import Board from '@/components/main/Board.vue'
import TopBar from '@/components/main/TopBar.vue'
export default {
  data(){
    return {
      background: '',
      currentTabComponent: Board,
    }
  },
  // beforeCreate(){
  //     alert(this.userInfo.USERID);
  // },
  created(){
      if(sessionStorage.getItem('ifLogin') == 1){
      }
      else{
        this.$router.push('/login');
      };
      if(sessionStorage.getItem('background') == null){
        let k;
        k = Math.random();
        if (k>=0 && k<=0.16){
          this.background = 'background1';
          sessionStorage.setItem('background','background1');
        };
        if(k>0.16 && k<=0.32){
          this.background = 'background2';
          sessionStorage.setItem('background','background2');
        };
        if(k>0.32 && k<=0.48){
          this.background = 'background3';
          sessionStorage.setItem('background','background3');
        };
        if(k>0.48 && k<=0.64){
          this.background = 'background4';
          sessionStorage.setItem('background','background4');
        };
        if(k>0.64 && k<=0.80){
          this.background = 'background5';
          sessionStorage.setItem('background','background5');
        };
        if(k>0.8 && k<=1){
          this.background = 'background6';
          sessionStorage.setItem('background','background6');
        };
      }else{
        this.background = sessionStorage.getItem('background');
      }
      
  },
  components: {
    Ball,
    Bar,
    Board,
    TopBar,
    MainBody,
  },
}
</script>

<style scoped>
.home{
  min-width: 1240px;
}
  .background1{
    background: url('../assets/background/q.jpg'),no-repeat;
    background-size: cover;
    width: auto;
    min-width: 1080px;
    height: 800px;
    overflow: hidden;
  }
  .background2{
    background: url('../assets/background/f.jpg'),no-repeat;
    background-size: cover;
    width: auto;
    min-width: 1080px;
    height: 800px;
    overflow: hidden;
  }
  .background3{
    background: url('../assets/background/fence.jpg'),no-repeat;
    background-size: cover;
    width: auto;
    min-width: 1080px;
    height: 800px;
    overflow: hidden;
  }
  .background4{
    background: url('../assets/background/t.jpg'),no-repeat;
    background-size: cover;
    width: auto;
    min-width: 1080px;
    height: 800px;
    overflow: hidden;
  }
  .background5{
    background: url('../assets/background/y.jpg'),no-repeat;
    background-size: cover;
    width: auto;
    min-width: 1080px;
    height: 800px;
    overflow: hidden;
  }
  .background6{
    background: url('../assets/background/g.jpg'),no-repeat;
    background-size: cover;
    width: auto;
    min-width: 1080px;
    height: 800px;
    overflow: hidden;
  }
  .board{

    margin-top:100px;
    margin-left:350px;
  }
</style>
