<template>
  <div class="login">
    <div class="sky">
    </div>
    <div class="head">
    </div>
    <div class="middle">
      <div class="form-container">
        <ul>
          <li class="top-title">青年之声后台管理系统</li>
          <li><input class="name" name="username" placeholder="请输入用户名" v-model="form.username"></li>
          <li><input :type="type" name="password" class="pwd" placeholder="请输入密码" v-model="form.password"></li>
          <small v-show="iferr" class="err">{{err}}</small>
          <div @click="showPassword" id="eye1" v-if="seen"></div>
          <div @click="showPassword" id="eye2" v-if="!seen"></div>

          <li><button class="log-in" @click="log">登录</button></li>
        </ul>
      </div>

    </div>

    <div class="cloud">
    </div>
    <ball></ball>
  </div>
</template>

<script>
// import Ball from '@/components/ball/Ball.vue'
import axios from 'axios'


export default {
  created() {
    if(sessionStorage.getItem('ifLogin') == 1){
      this.$router.push('/');
    }
  },
  data() {
    return {
      type: 'password',
      seen: true,
      form: {
        username: '',
        password: ''
      },
      iferr: false,
      err: '',
    }
  },
  methods: {
    showPassword() {
      this.seen = !this.seen;
      if(this.type === 'password'){
        this.type = 'text';    
      }
      else{
        this.type = 'password';       
      }
    },
    goHome() {
      this.$router.push('/');
    },
    log() {
      axios.post("/api/v1/admin/sign",this.form)
      .then(response => {
        if(response.data.success == 1){ 
          sessionStorage.setItem('USERNAME',response.data.data.username); // 存入一个值
          sessionStorage.setItem('USERID',response.data.data.id);
          sessionStorage.setItem('USERAUTH',response.data.data.auth);
          sessionStorage.setItem('PASSWORD',this.form.password);
          sessionStorage.setItem('ifLogin',1);
          sessionStorage.setItem('SCENE','Personal2');
          sessionStorage.setItem('Num',1);
          this.goHome();
        }
        else{
          this.iferr = true;
          this.err = response.data.err_msg;
        }
        
      })
    }
  },
  components: {
    // Ball,
  }
}
</script>

<style scoped>
  * {
    font-family:"微软雅黑";
    margin:0;
    padding:0;
    border:0;
    font-size:14px;
    color:white;
    }
  li {
    list-style-type:none;
    margin-top: 15px;
    font-size: 48px;
  }
  ul {
    text-align: center;
  }
  .form-container {
    margin: 0 auto;
    width: 500px;
    position: relative;
  }
  .login {
    z-index: 0;
    background:url(../assets/loginImg/bg.png) repeat-x;
    min-height: 600px;
    position: relative;
  }
  .name,
  .pwd {
  width: 260px;
  height: 44px;
  line-height: 44px;
  padding-left: 15px;
  padding-right: 50px;
  outline: none;
  border-radius: 20px;
  background-color: #0A3C78;
  border: 1px solid #329BE0;
  }
  .name:hover,
  .pwd:hover,
  .name:focus,
  .pwd:focus {
	background-color: #052b64;
  }
  .log-in {
    background: #3fb9ff;
    font-size: 18px;
    width: 329px;
    height: 44px;
    outline: none;
    color: white;
    background: linear-gradient(#3fb9ff, #099be7, #229de3);
    border-radius: 20px;
  }
  .log-in:hover {
    background: linear-gradient(#229de3, #099be7,#3fb9ff);
  }
  .head {
    height: 50px;
    padding-top: 25px;
    margin-left: 14px;
  }
  .middle {
    position: relative;
    z-index: 30;
    margin-top: 100px;
    height: 600px;
  }
  #eye1 {
    outline: none;
    left:370px;
    top:190px;
    position: absolute;
    z-index: 30;
    background:url(../assets/loginImg/eye.png) no-repeat;
    background-size: 30px;
    height:30px;
    width: 40px;
  }
  #eye2 {
    outline: none;
    left:370px;
    top:190px;
    position: absolute;
    z-index: 30;
    background:url(../assets/loginImg/eye-open.png) no-repeat;
    background-size: 30px;
    height:30px;
    width: 40px;
  }
  /* .eye:hover {
    background-size: 35px;
    transition: 1s;
  } */
  .footer {
    text-align: center;
    bottom: 15px;
    position: absolute;
    width: 100%;
  }
  .cloud {
    background: url(../assets/loginImg/cloud.png) repeat;
    width: 100%;
    height: 356px;
    position: absolute;
    bottom: 0px;
    animation: cloud 60s linear infinite alternate;
    z-index: 5;
    
  }
  @keyframes cloud {
      0%{background-position:top left}
      100%{background-position:top right}
  }
  .sky {
  background: url(../assets/loginImg/sky.png) repeat;
  width: 100%;
  z-index: 20;
  height: 462px;
  position: absolute;
  top: 0px;
  }
  /* #show-box {
    position: absolute;
    top: -33px;
    left: -38px;
    width: 310px;
    height:0px;
    position: relative;
    z-index: 30;
    color: white;
  } */
  .top-title{
        text-shadow: 0 1px 0 #ccc, 
        0 2px 0 #c9c9c9, 
        0 3px 0 #bbb, 
        0 4px 0 #b9b9b9, 
        0 5px 0 #aaa, 
        0 6px 1px rgba(0,0,0,0.1), 
        0 0 5px rgba(0,0,0,0.1),
        0 1px 3px rgba(0,0,0,0.3),
        0 3px 5px rgba(0,0,0,0.2),
        0 5px 10px rgba(0,0,0,0.25);
  }
  .err {
    display: block;
    margin-top: 10px;
    height: 14px;
    color:red;
  }
</style>
