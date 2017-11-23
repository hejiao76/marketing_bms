<template>

  <aside>
    <el-row class="tac left_bgColor">
      <el-col :span="24">
        <el-menu v-if="childNodes.length>0" :default-active="currentNode.menucode" :unique-opened="true" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">
          <!--<template slot="title" class="a_tit"><i class="h_icon aside_icon02 vm  mr10 ml025"></i><span class="f-n-style">物流审核</span></template>-->
          <div v-for="(item,index) in childNodes">
            <el-menu-item v-if="!item.children" :route="{path:item.path}" :index="item.menucode">{{item.name}}</el-menu-item>
            <el-submenu v-if="item.children" :index="item.menucode">
              <template slot="title"><span class="s-n-style ml025">{{item.name}}</span></template>
              <el-menu-item  v-for="(childItem,childIndex) in item.children" :route="{path:childItem.path}" :index="childItem.menucode">{{childItem.name}}</el-menu-item>
            </el-submenu>
          </div>
          <!--<el-submenu index="1-1">-->
            <!--<template slot="title"><span class="s-n-style ml025">企业审核</span></template>-->
            <!--<el-menu-item index="1-1-1" :route="{name:'companycheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
            <!--<el-menu-item index="1-1-2" :route="{name:'companycheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
            <!--<el-menu-item index="1-1-3" :route="{name:'companycheck',params:{checkstatus:3}}">不同过</el-menu-item>-->
            <!--<el-menu-item index="1-1-4" :route="{name:'companycheck',params:{checkstatus:4}}">已提交</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="1-2">-->
            <!--<template slot="title"><span class="s-n-style ml025">个人审核</span></template>-->
            <!--<el-menu-item index="1-2-1" :route="{name:'personalcheck',params:{checkstatus:0}}">全部</el-menu-item>-->
            <!--<el-menu-item index="1-2-2" :route="{name:'personalcheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
            <!--<el-menu-item index="1-2-3" :route="{name:'personalcheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
            <!--<el-menu-item index="1-2-4" :route="{name:'personalcheck',params:{checkstatus:3}}">不通过</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="1-3">-->
            <!--<template slot="title"><span class="s-n-style ml025">司机审核</span></template>-->
            <!--<el-menu-item index="1-3-1" :route="{name:'drivercheck',params:{checkstatus:0}}">全部</el-menu-item>-->
            <!--<el-menu-item index="1-3-2" :route="{name:'drivercheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
            <!--<el-menu-item index="1-3-3" :route="{name:'drivercheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
            <!--<el-menu-item index="1-3-4" :route="{name:'drivercheck',params:{checkstatus:3}}">不通过</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="1"></el-submenu>-->
        </el-menu>
      </el-col>
    </el-row>
    <!--<el-row v-if="menuTag==1" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--<el-menu-item index="2"><i class="h_icon aside_icon01 vm  mr10 ml025"></i><span class="f-n-style">开始工作</span></el-menu-item>-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row  v-else-if="menuTag==2" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
            <!--&lt;!&ndash;<template slot="title" class="a_tit"><i class="h_icon aside_icon02 vm  mr10 ml025"></i><span class="f-n-style">物流审核</span></template>&ndash;&gt;-->
            <!--<el-submenu index="1-1">-->
              <!--<template slot="title"><span class="s-n-style ml025">企业审核</span></template>-->
              <!--<el-menu-item index="1-1-1" :route="{name:'companycheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
              <!--<el-menu-item index="1-1-2" :route="{name:'companycheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
              <!--<el-menu-item index="1-1-3" :route="{name:'companycheck',params:{checkstatus:3}}">不同过</el-menu-item>-->
              <!--<el-menu-item index="1-1-4" :route="{name:'companycheck',params:{checkstatus:4}}">已提交</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="1-2">-->
              <!--<template slot="title"><span class="s-n-style ml025">个人审核</span></template>-->
              <!--<el-menu-item index="1-2-1" :route="{name:'personalcheck',params:{checkstatus:0}}">全部</el-menu-item>-->
              <!--<el-menu-item index="1-2-2" :route="{name:'personalcheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
              <!--<el-menu-item index="1-2-3" :route="{name:'personalcheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
              <!--<el-menu-item index="1-2-4" :route="{name:'personalcheck',params:{checkstatus:3}}">不通过</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="1-3">-->
              <!--<template slot="title"><span class="s-n-style ml025">司机审核</span></template>-->
              <!--<el-menu-item index="1-3-1" :route="{name:'drivercheck',params:{checkstatus:0}}">全部</el-menu-item>-->
              <!--<el-menu-item index="1-3-2" :route="{name:'drivercheck',params:{checkstatus:1}}">待审核</el-menu-item>-->
              <!--<el-menu-item index="1-3-3" :route="{name:'drivercheck',params:{checkstatus:2}}">已通过</el-menu-item>-->
              <!--<el-menu-item index="1-3-4" :route="{name:'drivercheck',params:{checkstatus:3}}">不通过</el-menu-item>-->
            <!--</el-submenu>-->
          <!--&lt;!&ndash;<el-submenu index="1"></el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row  v-else-if="menuTag==3" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--<el-submenu index="3">-->
            <!--&lt;!&ndash;<template slot="title" class="a_tit"><i class="h_icon aside_icon03 vm  mr10 ml025"></i><span class="f-n-style">数据查询</span></template>&ndash;&gt;-->

              <!--<template slot="title"><span class="s-n-style ml025">用户查询</span></template>-->
              <!--<el-menu-item index="3-1-1" :route="{name:'datasearch_CompanyManager'}">公司管理员查询</el-menu-item>-->
              <!--<el-menu-item index="3-1-2" :route="{name:'datasearch_QiShiImg'}">骑士信息查询</el-menu-item>-->
              <!--<el-menu-item index="3-1-3" :route="{name:'datasearchGrrz',params:{grrzQueryType:'qishi'}}" >个人认证骑手</el-menu-item>-->
              <!--<el-menu-item index="3-1-4" :route="{name:'datasearchGrrz',params:{grrzQueryType:'driver'}}" >个人认证司机</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="3-2">-->
              <!--<template slot="title">订单查询</template>-->
              <!--<el-menu-item index="3-2-1" :route="{name:'datasearch_OrderQuery'}">订单查询</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="3-3">-->
              <!--<template slot="title"><span class="s-n-style ml025">业绩查询</span></template>-->
              <!--<el-menu-item index="3-3-1" :route="{name:'datasearchStoPer',params:{stoPerQueryType:'qishi'}}" >骑士业绩查询</el-menu-item>-->
              <!--<el-menu-item index="3-3-2" :route="{name:'datasearchStoPer',params:{stoPerQueryType:'driver'}}" >司机业绩查询</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="3-4">-->
              <!--<template slot="title"><span class="s-n-style ml025">提成查询</span></template>-->
              <!--<el-menu-item index="3-4-1" :route="{name:'datasearchRR',params:{RRQueryType:'qishi'}}" >骑士奖励</el-menu-item>-->
              <!--<el-menu-item index="3-4-2" :route="{name:'datasearchRR',params:{RRQueryType:'driver'}}" >司机奖励</el-menu-item>-->
            <!--</el-submenu>-->
          <!--&lt;!&ndash;<el-submenu index="3-1">&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row  v-else-if="menuTag==4" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->

            <!--&lt;!&ndash;<template slot="title" class="a_tit"><i class="h_icon aside_icon04 vm  mr10 ml025"></i><span class="f-n-style">日志查询</span></template>&ndash;&gt;-->
            <!--<el-submenu index="4-1">-->
              <!--<template slot="title"><span class="s-n-style ml025">众包订单</span></template>-->
              <!--<el-menu-item index="4-1-1" :route="{name:'logsearch_OrderLog'}">订单日志</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="4-2">-->
              <!--<template slot="title"><span class="s-n-style ml025">骑手设备</span></template>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="4-3">-->
              <!--<template slot="title"><span class="s-n-style ml025">骑手操作</span></template>-->
            <!--</el-submenu>-->
          <!--&lt;!&ndash;<el-submenu index="4"></el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row  v-else-if="menuTag==5" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
            <!--<el-menu-item index="5-1" :route="{name:'lgtssetting_express'}">快递合作商</el-menu-item>-->
            <!--<el-menu-item index="5-2" :route="{name:'lgtssetting_city'}">同城众包</el-menu-item>-->
            <!--<el-menu-item index="5-3" :route="{name:'lgtssetting_lineCompany'}">专线公司</el-menu-item>-->
            <!--<el-menu-item index="5-4" :route="{name:'lgtssetting_driver'}">司机账号绑定</el-menu-item>-->
            <!--&lt;!&ndash;<template slot="title" class="a_tit"><i class="h_icon aside_icon06 vm  mr10 ml025"></i><span class="f-n-style">物流商配置</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="5-1">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title"><router-link to="/lgtssetting/express" ><span class="s-n-style">快递合作商</span></router-link></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="5-2">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title"><router-link to="/lgtssetting/city" ><span class="s-n-style">同城众包</span></router-link></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="5-3">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title"><router-link to="/lgtssetting/lineCompany" ><span class="s-n-style">专线公司</span></router-link></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="5-4">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title"><router-link to="/lgtssetting/driver" ><span class="s-n-style">司机账号绑定</span></router-link></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-submenu index="5"></el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row  v-else-if="menuTag==6" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--<el-menu-item index="6-1" :route="{name:'setting_personInfor'}">个人信息</el-menu-item>-->
          <!--<el-menu-item index="6-2" :route="{name:'setting_staff_management'}">员工管理</el-menu-item>-->
          <!--<el-menu-item index="6-3" :route="{name:'setting_permission_match'}">权限匹配</el-menu-item>-->
          <!--&lt;!&ndash;<el-submenu index="6">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="title" class="a_tit"><i class="h_icon aside_icon06 vm  mr10 ml025"></i><span class="f-n-style">设置中心</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="6-1">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title" route="/setting/setting_personInfor" tag="div" style="width:100%;">个人信息</template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="6-2">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title" route="/setting/setting_staff_management" tag="div" style="width:100%;">员工管理<span class="s-n-style ml025"></span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="6-3">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title" route="/setting/setting_permission_match" tag="div" style="width:100%;">权限匹配<span class="s-n-style ml025"></span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row  v-else-if="menuTag==7" class="tac left_bgColor">-->
      <!--<el-col :span="24">-->
        <!--<el-menu default-active="2" :router=true class="el-menu-vertical-demo" style="text-align:center;background-color:#ffffff">-->
          <!--<el-submenu index="7">-->
            <!--<template slot="title" class="a_tit"><i class="h_icon aside_icon06 vm  mr10 ml025"></i><span class="f-n-style">业绩超额审批</span></template>-->
            <!--<el-menu-item index="6-3" :route="{name:'approval_OrderLog'}">提现超上限(员工)</el-menu-item>-->
            <!--&lt;!&ndash;<el-submenu index="7-1">&ndash;&gt;-->
              <!--&lt;!&ndash;<template slot="title"><span class="s-n-style ml025">提现超上限(员工)</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="7-2">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="title"><span class="s-n-style">员工管理</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-submenu index="7-3">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="title"><span class="s-n-style">权限匹配</span></template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--</el-submenu>-->
        <!--</el-menu>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<div class="a_tit">-->
    <!--<span class="h_icon aside_icon01 vm"></span>-->
    <!--<span class="vm">开始工作</span>-->
    <!--</div>-->
    <!--<ul>-->
    <!--<li>-->
    <!--<span class="vm">个人信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></span>-->
    <!--</li>-->
    <!--<li>-->
    <!--<span class="vm">个人信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></span>-->
    <!--</li>-->
    <!--</ul>-->
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

 <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left_bgColor {
    background-color:#f1f1f1;
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
