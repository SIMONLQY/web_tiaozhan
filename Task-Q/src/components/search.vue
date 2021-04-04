<template>
	<div class="search">
		<input type="text" class="input" v-model="input" :placeholder="name" @keyup.enter="search">
		<img src="../assets/Magnifier.png" class="Magnifier" @click="search">
	</div>
</template>


<script type="text/javascript">
	import axios from 'axios'
	export default{
		props:{
			name:""
		},
		data(){
			return{
				input:""
			}
		},
		methods:{
			getinf(r){
				this.$root.total=r.data.total
				this.$root.allAatalogs=r.data.data
				if(r.data.data.length<=20){
					this.$root.catalogs=r.data.data
				} else{
					for(let j=0;j<20;j++){
						this.$root.catalogs.splice(j,1,this.$root.allAatalogs[j])
					}
				}
			},
			search(){
				this.$router.push({path:'/search',query:{key:this.input,page:1}})
				this.$root.catname=this.input+"\t搜索结果"
				axios.get('/api/v1/board',{params:{"key":this.input}})
				.then(r=>this.getinf(r.data))
				.catch(err =>console.log('发生错误'+err))
			}
		}
	}
;</script>


<style type="text/css" scoped>
.search{
	position: relative;
	margin-top: 12px;
}
.input{
  background-color: #dbc2b4;
  height: 22px;
  width: 250px;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  padding-top: 5px;
  resize:none;
  font-size: 15px;
  font-family: "SimHei";
  border:1px solid transparent;
  padding-bottom: 5px;
  padding-right: 30px;
}
input::-webkit-input-placeholder{  
  color:#d20c0d;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:#d20c0d;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:#d20c0d;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
  color:#d20c0d;
}
.Magnifier{
  width: 20px;
  height: 20px;
  position: relative;
  left: 2px;
  top:7px; 
  cursor: pointer;
  position: absolute;
  left: 265px;
}
@font-face{
  font-family: SimHei;
  src: url(../assets/simhei.ttf);
}

@font-face{
  font-family: hwxh;
  src: url(../assets/hwxh.ttf);
}
</style>