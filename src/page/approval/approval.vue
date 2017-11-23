<template>
  <div>
    <v-header></v-header>
    <div class="con_main">
      <v-left v-bind:menuTag="menuTag"></v-left>
      <section class="con_main_r">
        <v-con-nav></v-con-nav>
        <section class="con_tab">
          <router-view></router-view>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  export default {
    data() {
      return {
        menuTag:Final.APPROVAL
      }
    },
    created (){},
    components :{
      VHeader,
      VLeft,
      VConNav
    },
    methods : {}
  }

</script>
<style>
  @import "./../../assets/css/common.css";
  @import "./../../assets/css/style.css";
</style>
