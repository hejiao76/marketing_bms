<template>
  <header>
    <el-row  style="width: 100%;">
        <el-col :span="6">
          <div class="logo">
            <!--<img class="vm" src="./../assets/img/small_logo.png"/>-->
            <span class="vm">吉利经销商系统</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-menu style="border:none;" class="el-menu-demo" mode="horizontal" text-color="#404C73" hover-text-color="#55ACEE" active-text-color="#55ACEE">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">应用</template>
              <el-menu-item index="2-1">抵扣券活动</el-menu-item>
              <el-menu-item index="2-2">秒杀活动</el-menu-item>
              <el-menu-item index="2-3">大转盘活动</el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
          </el-menu>
        </el-col>
        <el-col :span="6" style="padding-right:30px;text-align: right;line-height:60px;">
            <img src="../assets/images/jia.png" alt="" style="width: 30px;height: 30px;border-radius: 15px;background: #62d84c;margin-right: 20px;">
            <el-dropdown>
              <span class="el-dropdown-link">
                我是超级用户<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出1</el-dropdown-item>
                <el-dropdown-item>退出2</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

        </el-col>
    </el-row>




    <!--<ul class="fl">-->
      <!--<router-link v-for="item in mainMenus" @click.native="saveMainMenuCode(item.menucode)" :to="{path:item.path}" tag="li">-->
        <!--<span :class="['h_icon' ,item.icon]"></span>-->
        <!--<p>{{item.name}}</p>-->
      <!--</router-link>-->
      <!--&lt;!&ndash;<router-link to="/startwork" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon01"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>开始工作</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/lgtcheck" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon02"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>物流审核</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/datasearch" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon03"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>数据查询</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/logsearch" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon04"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>日志查询</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/lgtssetting" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon05"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>物流商配置</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/approval" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon09"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>审批</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/setting" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon06"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>设置</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->

      <!--&lt;!&ndash;<router-link to="/setting" tag="li">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="h_icon h_icon07"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<p class="name_e">总部客服：张三</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--<li v-on:click="loginout">-->
        <!--<span class="h_icon h_icon08"></span>-->
        <!--<p>退出</p>-->
      <!--</li>-->
    <!--</ul>-->
  </header>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElRow},
  name: 'header',
  data () {
    return {
      mainMenus:[],
      menuCode:''
    }
  },
  created () {
//      console.log("--------------------------------->>>>>>>>>header Created");
//      let roleMenus=localStorage.getItem("roleMenus") ?  JSON.parse(localStorage.getItem("roleMenus")): [];
//      if(roleMenus.children && roleMenus.children.length>0){
//          let mainMenusArray=[];
//          for(let i=0;i<roleMenus.children.length;i++){
//              if(roleMenus.children[i].parentMenuCode==0){
////                  let newMenuObj={};
////                  Object.assign(newMenuObj,roleMenus.children[i],Final.MENU_ROUTER_MAPPING[roleMenus.children[i].menucode]);
////                mainMenusArray.push(newMenuObj);
//                mainMenusArray.push(roleMenus.children[i]);
//              }
//          }
//          mainMenusArray.sort(function (a,b){
//             return a["sort"]-b["sort"]
//          });
//          this.mainMenus=mainMenusArray;
//      }
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
