<template>
  <div class="websites">
      <a :href="destination" target="_blank">
        <img :src="websrc"/>
        <div class="name">{{webname}}</div>
      </a>
  </div>  
</template>
<script>
export default {
    name: 'Websites',
    props: {
        webname: String,
        websrc: String,
        destination: String
    }
}
</script>
<style scoped>
a {
    text-decoration: none;
}
.websites {
    z-index: 10;
    width: 80px;
    transition: all 1.5s;
    position: absolute;
}
.websites:hover {
    transform: scale(1.2,1.2);
    transition: 0.5s;
}
img {
    border-radius: 10%;
    width: 80px;
    height: 80px;
}
/* img:hover {
    width: 100px;
    height: 100px;
    margin-top:-10px;
    margin-left: -10px;
    transition: 0.5s;
} */

.name {
    /* word-break: keep-all; */
    font-weight: bold;
    position: relative;
    z-index: 60;
    width: 80px;
    text-align: center;
    color: white;
    font-size: 12px;
}
</style>
