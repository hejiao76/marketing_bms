<template>
  <header>
    <el-row  style="width: 100%;-moz-box-shadow: 0px 1px 8px #888888;box-shadow: 0px 1px 8px #888888;">
        <el-col :span="8">
          <div class="logo">
            <img style="height: 60px;" class="vm" src="./../assets/img/yunyangLog.png"/>
            <span class="vm">经销商智能营销平台</span>
          </div>
        </el-col>
        <el-col :span="10">
          <el-menu style="border:none;float: right" class="el-menu-demo" mode="horizontal" text-color="#404C73" hover-text-color="#55ACEE" active-text-color="#55ACEE" >
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">应用</template>
              <el-menu-item index="2-1">抵扣券活动</el-menu-item>
              <el-menu-item index="2-2">秒杀活动</el-menu-item>
              <el-menu-item index="2-3">大转盘活动</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">数据中心</template>
              <el-menu-item index="3-1">数据中心</el-menu-item>

            </el-submenu>
            <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
          </el-menu>
        </el-col>
        <el-col :span="1" style="text-align: center;line-height: 60px;">
            <span>|</span>
        </el-col>
        <el-col :span="5" style="text-align: left;line-height:60px;">
          <el-badge :value="16" class="item" style="margin: 0px 20px;">
            <img src="../assets/img/infor.png" style="float:left;">
          </el-badge>
            <img src="../assets/images/jia.png" alt="" style="width: 30px;height: 30px;border-radius: 15px;background: #62d84c;margin-right: 20px;">
            <el-dropdown @command="handleCommand" style="padding-right: 20px;">
              <span class="el-dropdown-link" style="color: #404c73">
                我是超级用户<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="width: 100px;top:40px;">
                <el-dropdown-item  command="loginout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
    <!--<remote-js src="http://mmc.cloudyoung.cn/resources/js/MFRAppHead.js"></remote-js>-->
  </header>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "../../static/baseSetting/Final"
//  import remoteJs from "remote-js.vue"
export default {
  components: {
//    'remote-js': {
//      render(createElement) {
//        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
//      },
//      props: {
//        src: { type: String, required: true },
//      },
//    },
  },
  data () {
    return {
      mainMenus:[],
      menuCode:'',
      Final:Final,
    }
  },
  created () {
  },
  mounted(){
//      window.setTimeout(function (){
//        window.appHead.settings = {
//          logoUrl: 'http://' + window.location.host + '/fweb/images/logo.png',
//          opUrl: 'http://mmc.cloudyoung.cn',
//          appKey: 'GIFTACTIVITY'
//        };
//        window.appHead.initHead();
//      },1000)

  },
  methods:{
      handleCommand(command){
          if(command == 'loginout'){
            let url = Final.LOGIN_PAGE_URL
            window.location.href = url
          }
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
