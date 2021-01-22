<template>
  <div id="app" class="wrapper">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tabbar/>
  </div>
</template>

<script>

import MainTabbar from "./components/contents/MainTabber/MainTabbar";

export default {
  name: 'App',
  components:{
    MainTabbar,

  }

}
</script>

<style>
@import "./assets/css/base.css";

</style>
