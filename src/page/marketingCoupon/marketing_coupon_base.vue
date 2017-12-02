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
        menuTag:Final.LGT_CHECK,
      }
    },
    watch:{
      "$route": function(to,from) {
//          let currentPath = to.path;
//          this.getFromPath (currentPath,from);
      }
    },
    //el 创建完成
    created () {

    },
    //el 挂载完成
    mounted () {

    },
    methods :{
      /**
       * 如果当前页面未在权限树中体现，获取父级菜单路由
       * @param currentPath
       * @param fromRoute
       * @returns {*}
       */
      getFromPath (currentPath,fromRoute) {
        if(Final.PATH_MAPPING.includes(this.$route.name)){
          if(fromRoute){
            if(!Final.PATH_MAPPING.includes(fromRoute.name)){
              currentPath=fromRoute.path;
              let tmpPathMap = {name:this.$route.name,pathMap:fromRoute.path};
              localStorage.setItem("tmpPathMap",JSON.stringify(tmpPathMap));
            }else {

            }
          }else {
            let tmpPathMapString = localStorage.getItem("tmpPathMap");
            if(tmpPathMapString){
              currentPath=JSON.parse(tmpPathMapString).pathMap;
            }else {
              let defaultPathMap=Final.PATH_MAPPING_OBJ[this.$route.name];
              if(defaultPathMap){
                currentPath=defaultPathMap.defaultPathMap;
              }
            }
          }
        }
        return currentPath;
      },
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
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
  @import "./../../assets/css/coupon/coupon.css";
</style>
