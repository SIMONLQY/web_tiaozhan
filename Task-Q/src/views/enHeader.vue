<template>
	<div class="all">
		<div class="title">
			<img src="../assets/TwLogo.png" class="logo">
			<img src="../assets/xjtuLogo.png" class="logo">
			<h1 class="h">{{head}}</h1>
		</div>
		<div class="searchHref">
			<search  :name="name"></search>
		</div>
	</div>
</template>

<script type="text/javascript">
	import search from '../components/ensearch.vue'
	export default{
		props:{
			name:"",
			head:"",
		},
		components:{
			search,
		},
		methods:{
	
	  },
	  created(){
	  }
}
;</script>

<style type="text/css" scoped>
.logo{
	width: 70px;
	height: 70px;
	margin-right: 40px;
}
.all{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	height: 210px;
	background-image: url('../assets/background.png');
	background-size: 100%;
}
.title{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 850px;
	align-items: center;
	margin-left: 50px;
	margin-top: 60px;
}
@font-face{
	font-family: SimHei;
	src: url(../assets/simhei.ttf);
}
.h{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 5px;
  font-size: 31px;
  font-family: "SimHei";
  color: rgb(218, 21, 21);
  margin-left: 40px;
  font-weight: normal;
}
.The_Communist_Youth_League______________Committ {
  font-size: 35px;
  font-family: "SimHei";
  color: rgb(218, 21, 21);
  line-height: 1.2;
  text-align: center;
  position: absolute;
  left: 140px;
  top: 67.766px;
  z-index: 83;
}

.searchHref{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-left: 60px;
	margin-top: 90px;
}
@font-face{
  font-family: FZCQJW;
  src: url(../assets/FZCQJW.ttf);
}
@font-face{
  font-family: SimHei;
  src: url(../assets/simhei.ttf);
}
</style>


