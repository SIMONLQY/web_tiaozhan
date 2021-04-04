<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <div id="nav">
      <div >
        <router-link to="/"></router-link>
      </div>
      <div>
      <router-link to="/login"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

<style>

</style>
