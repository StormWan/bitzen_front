<template>
  <div id="app">
    <keep-alive>
      <router-view class="view-router"  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="tabbar"></router-view>
  </div>
</template>
<script>
export default {
  watch: {
    '$route' (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
<style>
  body,html{
    height: 100%;
    width: 100%;
  }
  #app{
    height: 100%;
    width: 100%;
  }
</style>
