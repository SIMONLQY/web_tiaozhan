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
	import search from '../components/search.vue'
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
	margin-right: 50px;
}

.all{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	height: 210px;
	background-image: url('../assets/background.png');
	/* background-size: 100%; */
}
.title{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 750px;
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
  font-size: 70px;
  color: rgb(255, 254, 254);
  font-family: "FZCQJW";
  margin-left: 40px;
  font-weight: normal;
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
</style>


