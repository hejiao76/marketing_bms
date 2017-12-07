<template>

  <aside class="left_bgColor">
    <!--<el-row class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu v-if="childNodes.length>0" :default-active="currentNode.menucode" :unique-opened="true" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--&lt;!&ndash;<template slot="title" class="a_tit"><i class="h_icon aside_icon02 vm  mr10 ml025"></i><span class="f-n-style">物流审核</span></template>&ndash;&gt;-->
          <!--<div v-for="(item,index) in childNodes">-->
            <!--<el-menu-item v-if="!item.children" :route="{path:item.path}" :index="item.menucode">{{item.name}}</el-menu-item>-->
            <!--<el-submenu v-if="item.children" :index="item.menucode">-->
              <!--<template slot="title"><span class="s-n-style ml025">{{item.name}}</span></template>-->
              <!--<el-menu-item  v-for="(childItem,childIndex) in item.children" :route="{path:childItem.path}" :index="childItem.menucode">{{childItem.name}}</el-menu-item>-->
            <!--</el-submenu>-->
          <!--</div>-->
          <!--&lt;!&ndash;<el-submenu index="1-1">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="title"><span class="s-n-style ml025">企业审核</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-1-1" :route="{name:'companycheck',params:{checkstatus:1}}">待审核</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-1-2" :route="{name:'companycheck',params:{checkstatus:2}}">已通过</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-1-3" :route="{name:'companycheck',params:{checkstatus:3}}">不同过</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-1-4" :route="{name:'companycheck',params:{checkstatus:4}}">已提交</el-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-submenu index="1-2">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="title"><span class="s-n-style ml025">个人审核</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-2-1" :route="{name:'personalcheck',params:{checkstatus:0}}">全部</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-2-2" :route="{name:'personalcheck',params:{checkstatus:1}}">待审核</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-2-3" :route="{name:'personalcheck',params:{checkstatus:2}}">已通过</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-2-4" :route="{name:'personalcheck',params:{checkstatus:3}}">不通过</el-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-submenu index="1-3">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="title"><span class="s-n-style ml025">司机审核</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-3-1" :route="{name:'drivercheck',params:{checkstatus:0}}">全部</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-3-2" :route="{name:'drivercheck',params:{checkstatus:1}}">待审核</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-3-3" :route="{name:'drivercheck',params:{checkstatus:2}}">已通过</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1-3-4" :route="{name:'drivercheck',params:{checkstatus:3}}">不通过</el-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-submenu index="1"></el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--<el-menu-item index="2"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="f-n-style">收齐</span></el-menu-item>-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <div style="width:100%;text-align: right;line-height: 36px;color:#878d99;border-bottom: solid 1px #676C81;"><i class="el-icon-menu el-icon-tickets pr20 mr5 cur" style="color:#878d99" @click="colClick"></i></div>
    <el-menu default-active="1-4-1" :router=true class="el-menu-vertical-demo" background-color="#555A6E" text-color="#FFFFFF" :collapse="isCollapse" style="border:0">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>抽奖活动</span>
        </template>
          <el-menu-item index="1-1" :route="{path:'/prizeDraw/edit/-1'}">新增抽奖活动</el-menu-item>
          <el-menu-item index="1-2" :route="{path:'/prizeDraw/prize_list'}">抽奖活动管理</el-menu-item>
          <el-menu-item index="1-3" :route="{path:'/prizeDraw/list'}">中奖记录</el-menu-item>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>抵扣券活动</span>
        </template>
        <el-menu-item index="2-1" :route="{path:'/coupon/edit/-1'}">添加抵扣券活动</el-menu-item>
        <el-menu-item index="2-2" :route="{path:'/coupon/list'}">抵扣券活动管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>抵扣券</span>
        </template>
        <el-menu-item index="3-1" :route="{path:'/coupon/ticket_edit/1'}">添加抵扣券</el-menu-item>
        <el-menu-item index="3-2" :route="{path:'/coupon/ticket_list'}">抵扣券管理</el-menu-item>
        <el-menu-item index="3-3" :route="{path:'/coupon/record_list'}">抵扣券消耗记录</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>秒杀活动</span>
        </template>
        <el-menu-item index="4-1" :route="{path:'/sedkill/edit/1'}">新建活动</el-menu-item>
        <el-menu-item index="4-2" :route="{path:'/sedkill/list'}">活动管理</el-menu-item>
        <el-menu-item index="4-2" :route="{path:'/sedkill/order_list'}">订单管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>秒杀券</span>
        </template>
        <el-menu-item index="5-1" :route="{path:'/sedkill/ticket_edit/1'}">新建活动</el-menu-item>
        <el-menu-item index="5-2" :route="{path:'/sedkill/ticket_list'}">秒杀券管理</el-menu-item>
      </el-submenu>


    </el-menu>

        <!--<el-menu default-active="2" :collapse="isCollapse"  class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff;min-height:300px;">-->
            <!--<el-menu-item index="1" @click="colClick"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="f-n-style">收齐</span></el-menu-item>-->
            <!--<el-submenu index="1-1">-->
              <!--<template slot="title"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="s-n-style ml025">企业审核</span></template>-->
              <!--<el-menu-item index="1-1-1" :route="{name:'companycheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
              <!--<el-menu-item index="1-1-2" :route="{name:'companycheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
              <!--<el-menu-item index="1-1-3" :route="{name:'companycheck',params:{checkstatus:3}}">不同过</el-menu-item>-->
              <!--<el-menu-item index="1-1-4" :route="{name:'companycheck',params:{checkstatus:4}}">已提交</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="1-2">-->
              <!--<template slot="title"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="s-n-style ml025">个人审核</span></template>-->
              <!--<el-menu-item index="1-2-1" :route="{name:'personalcheck',params:{checkstatus:0}}">全部</el-menu-item>-->
              <!--<el-menu-item index="1-2-2" :route="{name:'personalcheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
              <!--<el-menu-item index="1-2-3" :route="{name:'personalcheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
              <!--<el-menu-item index="1-2-4" :route="{name:'personalcheck',params:{checkstatus:3}}">不通过</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="1-3">-->
              <!--<template slot="title"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="s-n-style ml025">司机审核</span></template>-->
              <!--<el-menu-item index="1-3-1" :route="{name:'drivercheck',params:{checkstatus:0}}">全部</el-menu-item>-->
              <!--<el-menu-item index="1-3-2" :route="{name:'drivercheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
              <!--<el-menu-item index="1-3-3" :route="{name:'drivercheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
              <!--<el-menu-item index="1-3-4" :route="{name:'drivercheck',params:{checkstatus:3}}">不通过</el-menu-item>-->
            <!--</el-submenu>-->
          <!--&lt;!&ndash;<el-submenu index="1"></el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
  </aside>
</template>

<script>
  import Final from "./../util/Final"
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
        roleMenusTreeObj:"",
//        pathMapping : ["startWorkDetail","companyDetail","personalDetail","personalDetailInfo","driverDetail","driverDetailInfo"],  //左侧菜单适配路由名称
//        pathMappingObj : {//左侧菜单适配路由映射地址
//          "startWorkDetail" : {name :"startWorkDetail",defaultPathMap:"/startwork/startwork_1"},
//          "companyDetail" : {name :"companyDetail",defaultPathMap:"/lgtcheck/companycheck/1"},
//          "personalDetail" : {name :"personalDetail",defaultPathMap:"/lgtcheck/personalcheck/0"},
//          "personalDetailInfo" : {name :"personalDetailInfo",defaultPathMap:"/lgtcheck/personalcheck/0"},
//          "driverDetail" : {name :"driverDetail",defaultPathMap:"/lgtcheck/drivercheck/0"},
//          "driverDetailInfo" : {name :"driverDetailInfo",defaultPathMap:"/lgtcheck/drivercheck/0"},
//        }
      }
    },
    watch:{
      "$route": function(to,from) {
          return;
        let currentPath=to.path;
        currentPath=this.getCurrentPath(to.path,from);
        this.$store.commit('updateTmpFromPath', currentPath);
//        let roleMenusTree = JSON.parse(localStorage.getItem("roleMenus"));
//        this.getCurrentMenuNode(currentPath,roleMenusTree);
//        this.mainNode=this.getMainNode(this.currentNode,roleMenusTree);

        this.navList=[];
        this.initLeftNav(currentPath);
      }
    },
    created () {
        return;
      console.log("left---created")
      let currentPath=this.$route.path;
      currentPath=this.getCurrentPath(currentPath);
      this.$store.commit('updateTmpFromPath', currentPath);
//      let roleMenusTree = JSON.parse(localStorage.getItem("roleMenus"));
//      this.getCurrentMenuNode(currentPath,roleMenusTree);
//      this.mainNode=this.getMainNode(this.currentNode,roleMenusTree);
      this.navList=[];
      this.initLeftNav(currentPath)
    },
    methods : {
        colClick () {
            console.log("click");
          this.isCollapse ==true ? this.isCollapse = false : this.isCollapse = true;
        },
      /**
       * 如果当前页面未在权限树中体现，左侧菜单适配
       * @param currentPath
       * @param fromRoute
       * @returns {*}
       */
        getCurrentPath (currentPath,fromRoute) {
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
        initLeftNav (currentPath) {
            let roleMenusTree = JSON.parse(localStorage.getItem("roleMenus"));
            this.getCurrentMenuNode(currentPath,roleMenusTree);
            this.roleMenusTreeObj = roleMenusTree;
            this.navList.push(this.currentNode);
            this.getParentNode(this.currentNode,this.roleMenusTreeObj);
            this.navList.reverse();
            this.mainNode=this.navList[0];
            this.childNodes=this.navList[0].children || [];
        },
        getCurrentMenuNode (path,node) {
            if(node.path==path){
                this.currentNode= node;
            }
            if(node.children){
                for(let i=0;i<node.children.length;i++){
                    this.getCurrentMenuNode(path,node.children[i]);
                }
            }
        },
        getParentNode (node,pnode) {
          if( pnode.children){
            for(let i = 0 ; i < pnode.children.length;i++){
              let item =  pnode.children[i];
              if(node.parentMenuCode== item.menucode){
                this.navList.push(item);
                this.navCodeList.push(item.menucode);
                this.getParentNode(item,this.roleMenusTreeObj);
                break;
              }else if(item.children){
                this.getParentNode(node,item);
              }
            }
          }

        },
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
