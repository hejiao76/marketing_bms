<template>
  <!--<div>-->
    <!--<v-header></v-header>-->
    <!--<div class="con_main">-->
      <!--<v-left></v-left>-->
      <section class="con_main_r">
        <v-con-nav></v-con-nav>
        <section class="con_tab">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </section>
      </section>
    <!--</div>-->
  <!--</div>-->
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "../../../static/baseSetting/Final";
  export default {
    data() {
      return {
      }
    },
    watch:{
      "$route": function(to,from) {

      }
    },
    created (){
//      this.leftCheckType=;
    },
    methods :{

    },
    components :{
      VHeader,
      VLeft,
      VConNav
    },
    methods : {}
  }

</script>
<style scoped="scope">
  @import "./../../assets/css/sedkill/sedkill.css";
</style>
