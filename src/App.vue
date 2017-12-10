<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <!--<v-tip-msg></v-tip-msg>-->
  </div>
</template>

<script>
  import api from "./fetch/api"
  import * as util from "./util/util"
  import Final from "./util/Final"
export default {
  name: 'app',
  created (){
    this.checkLogin();
  },
  components :{
  },
  methods : {
      checkLogin(){
//          console.log(window.location.href);
//            let ticket=util.getUrlParam(window.location.href,"ticket");
//            console.log("url------>",ticket);
//            api.base_checkLogin({ticket:ticket})
//              .then(res =>{
//                console.log(res);
//            }).catch(error => {
//              window.location.href=Final.LOGIN_PAGE_URL;
//            })

      }
  }
}
</script>

<style>
  @import "assets/css/element-variables.css";
  @import "assets/css/common.css";
  @import "assets/css/style.css";
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
