<template>

  <aside class="left_bgColor">
    <el-row class="tac left_bgColor">
      <el-col :span="24">
        <div style="width:100%;text-align: right;line-height: 36px;color:#878d99;border-bottom: solid 1px #676C81;"><i class="el-icon-menu el-icon-tickets pr20 mr5 cur" style="color:#878d99" @click="colClick"></i></div>
        <el-menu v-if="roleMenusTreeObj.children" :default-active="String(currentNode.resourceId)" :unique-opened="true" :router="true"  class="el-menu-vertical-demo"  background-color="#555A6E" text-color="#FFFFFF" style="border:0">
          <div v-for="(item,index) in roleMenusTreeObj.children">
            <el-menu-item v-if="!item.children" :route="{path:item.resourceUrl}" :index="String(item.resourceId)">{{item.resourceName}}</el-menu-item>
            <el-submenu v-if="item.children" :index="String(item.resourceId)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item.resourceName}}</span>
              </template>
              <el-menu-item  v-for="(childItem,childIndex) in item.children" :route="{path:childItem.resourceUrl}" :index="String(childItem.resourceId)">{{childItem.resourceName}}</el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </el-col>
    </el-row>
    <!--<el-row class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--<el-menu-item index="2"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="f-n-style">收齐</span></el-menu-item>-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->

    <!-------------------静态菜单开始-------------------------->
    <!--<div style="width:100%;text-align: right;line-height: 36px;color:#878d99;border-bottom: solid 1px #676C81;"><i class="el-icon-menu el-icon-tickets pr20 mr5 cur" style="color:#878d99" @click="colClick"></i></div>-->
    <!--<el-menu default-active="1-4-1" :router=true class="el-menu-vertical-demo" background-color="#555A6E" text-color="#FFFFFF" :collapse="isCollapse" style="border:0">-->
      <!--<el-submenu index="1">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>抽奖活动</span>-->
        <!--</template>-->
          <!--<el-menu-item index="1-1" :route="{path:'/prizeDraw/edit/new'}">新增抽奖活动</el-menu-item>-->
          <!--<el-menu-item index="1-2" :route="{path:'/prizeDraw/list'}">抽奖活动管理</el-menu-item>-->
          <!--<el-menu-item index="1-3" :route="{path:'/prizeDraw/prize_list'}">中奖记录</el-menu-item>-->

      <!--</el-submenu>-->
      <!--<el-submenu index="2">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>抵扣券活动</span>-->
        <!--</template>-->
        <!--<el-menu-item index="2-1" :route="{path:'/coupon/edit/new'}">添加抵扣券活动</el-menu-item>-->
        <!--<el-menu-item index="2-2" :route="{path:'/coupon/list'}">抵扣券活动管理</el-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="3">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>抵扣券</span>-->
        <!--</template>-->
        <!--<el-menu-item index="3-1" :route="{path:'/coupon/ticket_edit/new'}">添加抵扣券</el-menu-item>-->
        <!--<el-menu-item index="3-2" :route="{path:'/coupon/ticket_list'}">抵扣券管理</el-menu-item>-->
        <!--<el-menu-item index="3-3" :route="{path:'/coupon/record_list'}">抵扣券消耗记录</el-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="4">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>秒杀活动</span>-->
        <!--</template>-->
        <!--<el-menu-item index="4-1" :route="{path:'/sedkill/edit/new'}">新建活动</el-menu-item>-->
        <!--<el-menu-item index="4-2" :route="{path:'/sedkill/list'}">活动管理</el-menu-item>-->
        <!--<el-menu-item index="4-2" :route="{path:'/sedkill/order_list'}">订单管理</el-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="5">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>秒杀券</span>-->
        <!--</template>-->
        <!--<el-menu-item index="5-1" :route="{path:'/sedkill/ticket_edit/new'}">新建活动</el-menu-item>-->
        <!--<el-menu-item index="5-2" :route="{path:'/sedkill/ticket_list'}">秒杀券管理</el-menu-item>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->
<!-------------------静态菜单结束-------------------------->
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </aside>
</template>

<script>
  import Final from "./../util/Final"
  import Api from "./../fetch/api"
  import VTipMsg from "./tipMsg.vue";
  import TestData from "./../util/TestData"
  export default {
//  name: 'hello',
    props:{
      menuTag:null,
    },
    data () {
      return {
        bcolor:"#555A6E",
        tcolor:"#FFFFFF",
        isCollapse : false,
        mainMenuCode:'',
        childNodes:[],
        currentNode:'',
        mainNode:'',
        navList:[],
        navCodeList:[],
        roleMenusTreeObj:'',
        roleMenus:[],
      }
    },
    watch:{
      "$route": function(to,from) {
       console.log("watch----left---route",to.path);
        let currentPath=to.path;
        currentPath=this.getCurrentMenuNode(to.path,from);
        this.getCurrentMenuNode(currentPath,this.roleMenusTreeObj);
        console.log("left---created---change--路由地址",currentPath);
      }
    },
    created () {
        console.log(this.$route);
      let currentPath=this.$route.path;
      this.initPage(currentPath);
      console.log("left---created-----路由地址",currentPath);
      return;
//      let currentPath=this.$route.path;
//      currentPath=this.getCurrentPath(currentPath);
//      this.$store.commit('updateTmpFromPath', currentPath);
////      let roleMenusTree = JSON.parse(localStorage.getItem("roleMenus"));
////      this.getCurrentMenuNode(currentPath,roleMenusTree);
////      this.mainNode=this.getMainNode(this.currentNode,roleMenusTree);
//      this.navList=[];
//      this.initLeftNav(currentPath)
    },
    components:{
      VTipMsg
    },
    methods : {
        initPage(currentPath){
          this.requestMenuResource(currentPath);
        },
        requestMenuResource (currentPath){
          let roleMenusTree = JSON.parse(localStorage.getItem("roleMenusTree"));
          this.roleMenusTreeObj=roleMenusTree;
          console.log(JSON.stringify(this.roleMenusTreeObj))
          this.getCurrentMenuNode(currentPath,this.roleMenusTreeObj);
          this.childNodes=this.roleMenusTreeObj.children;
          console.log("current----path-------",currentPath);
          console.log("build-----true----success",this.roleMenusTreeObj);
//          Api.base_menus_resource({})
//            .then(res =>{
//              if(res.status==true){
//                  this.roleMenus=res.result;
//                  this.roleMenus=TestData.left_menu_data;
//                  let treeObj={parentId:-1,resourceId:0,resourceName:"根节点",children:[]};
//                  this.buildRolesMenuTree(treeObj,this.roleMenus);
//                  this.roleMenusTreeObj=treeObj;
//                  this.getCurrentMenuNode(currentPath,this.roleMenusTreeObj);
//                  console.log("build-----true----success",treeObj);
//              }else{
//                this.$refs.tipMsgRef.showTipMsg({
//                  msg:res.message,
//                  type:"error"
//                });
//              }
//            }).catch(error =>{
//
//            });
        },
//        buildRolesMenuTree  (pnode,roleMenus) {
//          if(pnode && roleMenus.length>0) {
//            for (let i = 0; i < roleMenus.length; i++) {
//              if (roleMenus[i].parentId == pnode.resourceId) {
//                if(roleMenus[i].resourceUrl){
//                  if (pnode.children) {
//                    pnode.children.push(roleMenus[i]);
//                  } else {
//                    pnode.children = [];
//                    pnode.children.push(roleMenus[i]);
//                    if (roleMenus[i].path) {
//                      pnode.resourceUrl = roleMenus[i].path;  //为父级节点 重新配置path
//                      console.log(pnode.resourceUrl);
//                    }
//                  }
//                  this.buildRolesMenuTree(roleMenus[i], roleMenus, this);
//                }
//              }
//            }
//            if (pnode.children) {
//              pnode.children.sort(function (a, b) {
//                return a["orderNum"] - b["orderNum"];
//              });
//            }
//          }
//        },
        colClick () {
            console.log("click");
          this.isCollapse ==true ? this.isCollapse = false : this.isCollapse = true;
        },
//      /**
//       * 如果当前页面未在权限树中体现，左侧菜单适配
//       * @param currentPath
//       * @param fromRoute
//       * @returns {*}
//       */
//        getCurrentPath (currentPath,fromRoute) {
//            if(Final.PATH_MAPPING.includes(this.$route.name)){
//              if(fromRoute){
//                if(!Final.PATH_MAPPING.includes(fromRoute.name)){
//                  currentPath=fromRoute.path;
//                  let tmpPathMap = {name:this.$route.name,pathMap:fromRoute.path};
//                  localStorage.setItem("tmpPathMap",JSON.stringify(tmpPathMap));
//                }else {
//
//                }
//              }else {
//                  let tmpPathMapString = localStorage.getItem("tmpPathMap");
//                  if(tmpPathMapString){
//                    currentPath=JSON.parse(tmpPathMapString).pathMap;
//                  }else {
//                    let defaultPathMap=Final.PATH_MAPPING_OBJ[this.$route.name];
//                    if(defaultPathMap){
//                        currentPath=defaultPathMap.defaultPathMap;
//                    }
//                  }
//              }
//            }
//            return currentPath;
//        },
//        initLeftNav (currentPath) {
//            let roleMenusTree = JSON.parse(localStorage.getItem("roleMenus"));
//            this.getCurrentMenuNode(currentPath,roleMenusTree);
//            this.roleMenusTreeObj = roleMenusTree;
//            this.navList.push(this.currentNode);
//            this.getParentNode(this.currentNode,this.roleMenusTreeObj);
//            this.navList.reverse();
//            this.mainNode=this.navList[0];
//            this.childNodes=this.navList[0].children || [];
//        },
        getCurrentMenuNode (path,node) {
            console.log(node,"~~~~~~~~~~~~~"+path);
            console.log("看戏的")
            if(node.resourceUrl==path){
                this.currentNode= node;
                console.log("--------",this.currentNode.resourceUrl);
            }
            if(node.children){
                for(let i=0;i<node.children.length;i++){
                    this.getCurrentMenuNode(path,node.children[i]);
                }
            }
        },
//        getParentNode (node,pnode) {
//          if( pnode.children){
//            for(let i = 0 ; i < pnode.children.length;i++){
//              let item =  pnode.children[i];
//              if(node.parentMenuCode== item.menucode){
//                this.navList.push(item);
//                this.navCodeList.push(item.menucode);
//                this.getParentNode(item,this.roleMenusTreeObj);
//                break;
//              }else if(item.children){
//                this.getParentNode(node,item);
//              }
//            }
//          }
//
//        },
//        getMainNode (childNode,roleMenusTree) {
//          let mainMenuArray=roleMenusTree.children;
//          let childPath=childNode.path;
//          if(childPath){
//            let childPathArray=childPath.split("/");
//            let mainPath="/"+childPathArray[1];
//            let mainNode=""
//            for(let i=0;i<mainMenuArray.length;i++){
//              let item = mainMenuArray[i];
//              if(item.path==mainPath){
//                mainNode=item;
//                if(item.children){
//                  this.childNodes=item.children;
//                }
//              }
//            }
//            return mainNode;
//          }
//
//        }
    }
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
 <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left_bgColor {
    background-color:#555A6E;
  }
  /*.f-n-style{*/
    /*font-size:16px;*/
    /*font-width:600;*/
    /*!*color:#94C1F0;*!*/
  /*}*/
  /*.s-n-style{*/
    /*font-size:14px;*/
  /*}*/



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
