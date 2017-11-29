<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <!--<v-tip-msg></v-tip-msg>-->
  </div>
</template>

<script>
  import api from "./fetch/api"
export default {
  name: 'app',
  created (){
    this.checkLogin();
  },
  components :{
  },
  methods : {
      checkLogin(){
//          let token = localStorage.getItem("token");
//          if(!token){
//              this.$router.replace("login");
//          }else {
//              var param={token : token};
//            login_api.checkLogin(param)
//              .then(res =>{
//                if(res.status!=1){
//                  this.$router.replace("login");
//                }
//            }).catch(error => {
//              this.$router.replace("login");
//            })
//          }
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
