<template>
  	<!--<div>-->
     <!--<v-header></v-header>-->
      <!--<div class="con_main">-->
        <!--<v-left></v-left>-->
        <section class="con_main_r">
          <v-con-nav></v-con-nav>
          <section class="con_tab">


          </section>
        </section>
      <!--</div>-->
    <!--</div>-->
</template>
<script>
//  import api from "./../fetch/api"
  import VHeader from "../components/header";
  import VLeft from "../components/left";
  import VConNav from "../components/con_nav";
  import Final from "../../static/baseSetting/Final";
  import API from "./../fetch/api";
  export default {
      data() {
          return {
              test:1,
              test2:"这是变量",
              testObj:{a:"这是a"}
          }
      },
      created (){

      },
      components :{
        VHeader,
        VLeft,
        VConNav
      },
      methods : {
          a : function (data){

          }
      }
  }


</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/style.css";
</style>
