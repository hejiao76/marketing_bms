<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<v-header></v-header>-->
    <!--<div class="con_main">-->
      <!--<v-left></v-left>-->
      <!--<router-view></router-view>-->
    <!--</div>-->
    <!--<el-container>-->
        <!--<v-header></v-header>-->
      <!--<el-container>-->
          <!--<v-left></v-left>-->
          <!--<router-view></router-view>-->
      <!--</el-container>-->
    <!--</el-container>-->

    <el-container class="con_main">
      <el-header style="padding:0px;">
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside class="left_bgColor"  width="auto">
          <v-left></v-left>
        </el-aside>
        <el-main  style="padding:0px;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!--<v-tip-msg></v-tip-msg>-->


    <!--<el-main  style="padding:0px;">-->
      <!--<router-view></router-view>-->
    <!--</el-main>-->
  </div>
</template>

<script>
  import api from "./fetch/api"
  import * as util from "./util/util"
  import Final from "../static/baseSetting/Final"
  import TestData from "./util/TestData"
  import VHeader from "./components/header";
  import VLeft from "./components/left";
export default {
  name: 'app',
   data(){
      return {
        roleMenus:""
      }
   },
  created (){
//    this.initApp();  //初始化菜单 操作 提升至 main.js  提升用户体验 菜单数据拉去成功后 在初始化页面
  },
  components :{
    VHeader,
    VLeft

  },
  methods : {
//      initApp (){
//        api.base_menus_resource({})
//          .then(res =>{
//            if(res.status==true){
//              this.roleMenus=res.result;
//              this.roleMenus=TestData.left_menu_data;
//              let treeObj={parentId:-1,resourceId:0,resourceName:"根节点",children:[]};
//              this.buildRolesMenuTree(treeObj,this.roleMenus);
//              localStorage.setItem("roleMenus",JSON.stringify(treeObj));
//              console.log("build-----true----success",treeObj);
//            }else{
//              this.$refs.tipMsgRef.showTipMsg({
//                msg:res.message,
//                type:"error"
//              });
//            }
//          }).catch(error =>{
//
//        });
//      },
//      buildRolesMenuTree  (pnode,roleMenus) {
//        if(pnode && roleMenus.length>0) {
//          for (let i = 0; i < roleMenus.length; i++) {
//            if (roleMenus[i].parentId == pnode.resourceId) {
//              if(roleMenus[i].resourceUrl){
//                if (pnode.children) {
//                  pnode.children.push(roleMenus[i]);
//                } else {
//                  pnode.children = [];
//                  pnode.children.push(roleMenus[i]);
//                  if (roleMenus[i].path) {
//                    pnode.resourceUrl = roleMenus[i].path;  //为父级节点 重新配置path
//                    console.log(pnode.resourceUrl);
//                  }
//                }
//                this.buildRolesMenuTree(roleMenus[i], roleMenus, this);
//              }
//            }
//          }
//          if (pnode.children) {
//            pnode.children.sort(function (a, b) {
//              return a["orderNum"] - b["orderNum"];
//            });
//          }
//        }
//      },

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
