<template>
  <header>
    <div class="logo">
      <img class="vm" src="./../assets/img/small_logo.png"/>
      <span class="vm">物流审核系统</span>
    </div>
    <ul class="fr">
      <router-link v-for="item in mainMenus" @click.native="saveMainMenuCode(item.menucode)" :to="{path:item.path}" tag="li">
        <span :class="['h_icon' ,item.icon]"></span>
        <p>{{item.name}}</p>
      </router-link>
      <!--<router-link to="/startwork" tag="li">-->
        <!--<span class="h_icon h_icon01"></span>-->
        <!--<p>开始工作</p>-->
      <!--</router-link>-->
      <!--<router-link to="/lgtcheck" tag="li">-->
        <!--<span class="h_icon h_icon02"></span>-->
        <!--<p>物流审核</p>-->
      <!--</router-link>-->
      <!--<router-link to="/datasearch" tag="li">-->
        <!--<span class="h_icon h_icon03"></span>-->
        <!--<p>数据查询</p>-->
      <!--</router-link>-->
      <!--<router-link to="/logsearch" tag="li">-->
        <!--<span class="h_icon h_icon04"></span>-->
        <!--<p>日志查询</p>-->
      <!--</router-link>-->
      <!--<router-link to="/lgtssetting" tag="li">-->
        <!--<span class="h_icon h_icon05"></span>-->
        <!--<p>物流商配置</p>-->
      <!--</router-link>-->
      <!--<router-link to="/approval" tag="li">-->
        <!--<span class="h_icon h_icon09"></span>-->
        <!--<p>审批</p>-->
      <!--</router-link>-->
      <!--<router-link to="/setting" tag="li">-->
        <!--<span class="h_icon h_icon06"></span>-->
        <!--<p>设置</p>-->
      <!--</router-link>-->

      <!--<router-link to="/setting" tag="li">-->
        <!--<span class="h_icon h_icon07"></span>-->
        <!--<p class="name_e">总部客服：张三</p>-->
      <!--</router-link>-->
      <li v-on:click="loginout">
        <span class="h_icon h_icon08"></span>
        <p>退出</p>
      </li>
    </ul>
  </header>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
export default {
  name: 'header',
  data () {
    return {
      mainMenus:[],
      menuCode:''
    }
  },
  created () {
      console.log("--------------------------------->>>>>>>>>header Created");
      let roleMenus=localStorage.getItem("roleMenus") ?  JSON.parse(localStorage.getItem("roleMenus")): [];
      if(roleMenus.children && roleMenus.children.length>0){
          let mainMenusArray=[];
          for(let i=0;i<roleMenus.children.length;i++){
              if(roleMenus.children[i].parentMenuCode==0){
//                  let newMenuObj={};
//                  Object.assign(newMenuObj,roleMenus.children[i],Final.MENU_ROUTER_MAPPING[roleMenus.children[i].menucode]);
//                mainMenusArray.push(newMenuObj);
                mainMenusArray.push(roleMenus.children[i]);
              }
          }
          mainMenusArray.sort(function (a,b){
             return a["sort"]-b["sort"]
          });
          this.mainMenus=mainMenusArray;
      }
  },
  methods:{
      saveMainMenuCode (menuCode) {
          if(menuCode){
              this.menuCode=menuCode;
              localStorage.setItem("mainMenuCode",menuCode);
              console.log("header-------"+menuCode);
          }
      },
      loginout () {
          var param={token:localStorage.getItem("token")}
          Api.base_loginOut(param).then(res => {
              if(res.status==1){
                  localStorage.removeItem("token");
                  this.$router.replace("/login");
              } else {
                console.log("server error");
              }
          }).catch(error => {
              console.log("error");
          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {

  }
  header ul .active {
    background: #4a8fd4;
  }
/*h1, h2 {*/
  /*font-weight: normal;*/
/*}*/

/*ul {*/
  /*list-style-type: none;*/
  /*padding: 0;*/
/*}*/

/*li {*/
  /*display: inline-block;*/
  /*margin: 0 10px;*/
/*}*/

/*a {*/
  /*color: #42b983;*/
/*}*/
</style>
