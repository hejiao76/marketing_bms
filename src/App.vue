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
  import TestData from "./util/TestData"
export default {
  name: 'app',
   data(){
      return {
        roleMenus:""
      }
   },
  created (){
    this.initApp();
  },
  components :{
  },
  methods : {
      initApp (){
        api.base_menus_resource({})
          .then(res =>{
            if(res.status==true){
              this.roleMenus=res.result;
              this.roleMenus=TestData.left_menu_data;
              let treeObj={parentId:-1,resourceId:0,resourceName:"根节点",children:[]};
              this.buildRolesMenuTree(treeObj,this.roleMenus);
              localStorage.setItem("roleMenusTree",JSON.stringify(treeObj));
              console.log("build-----true----success",treeObj);
            }else{
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(error =>{

        });
      },
      buildRolesMenuTree  (pnode,roleMenus) {
        if(pnode && roleMenus.length>0) {
          for (let i = 0; i < roleMenus.length; i++) {
            if (roleMenus[i].parentId == pnode.resourceId) {
              if(roleMenus[i].resourceUrl){
                if (pnode.children) {
                  pnode.children.push(roleMenus[i]);
                } else {
                  pnode.children = [];
                  pnode.children.push(roleMenus[i]);
                  if (roleMenus[i].path) {
                    pnode.resourceUrl = roleMenus[i].path;  //为父级节点 重新配置path
                    console.log(pnode.resourceUrl);
                  }
                }
                this.buildRolesMenuTree(roleMenus[i], roleMenus, this);
              }
            }
          }
          if (pnode.children) {
            pnode.children.sort(function (a, b) {
              return a["orderNum"] - b["orderNum"];
            });
          }
        }
      },

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
