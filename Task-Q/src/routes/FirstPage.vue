<template>
  <div class="FirstPage">
    <Banner class="banner"></Banner>
    <TopLine class="topLine"></TopLine>
    <Services class="Services"></Services>
    <Subjects class="Subjects"></Subjects>
    <Message class=""></Message>
  </div>
</template>

<script type="text/javascript">
  import Banner from '../views/Banner.vue'
  import TopLine from'../views/topLine.vue'
  import Services from'../views/Services.vue'
  import Subjects from'../views/activitiesSubjects.vue'
  import About from '../views/About.vue'
  import Message from '../views/Messages.vue'
  export default{
    components:{
      Banner,
      TopLine,
      Services,
      Subjects,
      About,
      Message
    },
    
  }
;</script>

<style type="text/css" scoped>
.FirstPage{
  margin-top: 10px;
  width: 84%;
}
.banner{
  width: 100%;
  z-index: 0;
}
.topLine{
  width: 98%;
}
</style>