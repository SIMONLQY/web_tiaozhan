<template>
	<div class="app">
		<div class="header">
			<enHeader :name="this.name" :head="this.head" ></enHeader>
		  <enContent :firstPage="true" @namepass="namepass"></enContent>
		</div>
		<div class="FirstPage"v-show="$route.path=='/en'">
			<Banner class="banner"></Banner>
			<enTopLine></enTopLine>
			<enActivities ></enActivities>
		</div>
		<div class="FirstPage" v-show="$route.path=='/en/Passage'||$route.path=='/en/Catalogs'||$route.path=='/en/search'">
			<enPassage :cat="this.$root.catname"
      :pas="this.$root.passage.headline"
      :publish="this.$root.passage.publish"
      :source="this.$root.passage.source"
      :firsthead="this.$root.passage.headline"
      :views="this.$root.passage.views"
      :attachments="this.$root.passage.attachments"
      :secondehead="this.$root.passage.subheading"
      :content="this.$root.passage.content"
      :author="this.$root.passage.author"></enPassage>
		</div>
		<About class="asyouwish"></About>
	</div>
</template>

<script type="text/javascript">
import enHeader from '../views/enHeader.vue'
import enContent from '../views/enContent.vue'
import About from '../views/About.vue'
import Banner from '../views/Banner.vue'
import enTopLine from '../views/enTopLine.vue'
import enActivities from '../views/enActivities.vue'
import enPassage from './enPassage.vue'
export default{
	data(){
		return{
			name:"Search",
			head:"The Communist Youth League Committee of Xi’an Jiaotong University",
			catname:""
		}
	},
	methods:{
		namepass(n){
      this.catname=n
    }
	},
	components:{
		enHeader,
		enContent,
		About,
		Banner,
		enTopLine,
		enActivities,
		enPassage
	}
}
;</script>


<style type="text/css" scoped>
.app{
  width:100%;
  min-height: 1000px;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0px;
}
.banner{
  width: 100%;
  z-index: 0;
}
.FirstPage{
  margin-top: 10px;
  width: 84%;
}
.header{
  width: 100%;
}
.asyouwish{
  margin-top: 10px;
}
</style>