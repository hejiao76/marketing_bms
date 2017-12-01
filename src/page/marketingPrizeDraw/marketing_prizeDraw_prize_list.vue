<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="80px" size="small">
        <el-row>
          <el-col :span="14">
          <el-form-item label="活动名称:" prop="activityName">
            <el-input   v-model="filterForm.activityName" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动区域:" class="ml10" prop="activityArea" label-width="80px">
              <el-select v-model="filterForm.activityArea" placeholder="请选择">
                <!--<el-option v-for="item in companyContents" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="width:550px;">
          <el-form-item label="活动时间:">
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择活动开始日期"></el-date-picker>
            </el-col>
            <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="选择活动结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="16">
            <div style="width:550px;">
              <el-form-item label="创建时间:">
                <el-col :span="11">
                  <el-date-picker v-model="filterForm.createStartDate" :picker-options="optionsCreateStart" type="date" placeholder="选择创建开始日期"></el-date-picker>
                </el-col>
                <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
                <el-col :span="11">
                  <el-date-picker v-model="filterForm.createEndDate" :picker-options="optionsCreateEnd" type="date" placeholder="选择创建结束日期"></el-date-picker>
                </el-col>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item class="fr">
              <el-button type="primary" @click="searchFn">查 询</el-button>
              <el-button @click="resetForm('filterForm')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--------------搜索结果------------>
    <div class="list_div">
      <el-row>
        <el-col :span="20">
          <el-tabs type="card" @tab-click="changeActivityType">
            <el-tab-pane name="0" label="全部活动"></el-tab-pane>
            <el-tab-pane name="1" label=" 已上架 "></el-tab-pane>
            <el-tab-pane name="2" label=" 已下架 "></el-tab-pane>
            <el-tab-pane name="3" label=" 已结束 "></el-tab-pane>
            <el-tab-pane name="4" label=" 已删除 "></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addActivity" class="fr mr20 ">新建活动</el-button>
        </el-col>
      </el-row>
      <div><span class="totalTip">共找到以下10条数据</span></div>
      <el-table class="table_min_height mt10" :data="resData" ref="singleTable" border highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="index" label="" width="55"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" align="center" min-width="90" ></el-table-column>
        <el-table-column prop="activityStartDate" label="活动时间" align="center" min-width="80"></el-table-column>
        <el-table-column prop="createDate" align="center" label="创建时间" min-width="100"></el-table-column>
        <el-table-column prop="activity_getNum" align="center" label="领取数量"></el-table-column>
        <el-table-column prop="activity_pv" align="center" label="活动pv"></el-table-column>
        <el-table-column prop="activity_url" align="center" min-width="140" label="活动链接"></el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template scope="scope">
            <div v-if="activityType==0">
              <el-button @click="addActivity" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="upActivity" type="text" style="padding-top:0px;padding-bottom:0px;">下架</el-button>
              <el-button @click="downActivity" type="text" style="padding-top:0px;padding-bottom:0px;">上架</el-button>
            </div>
            <div v-if="activityType==1">
              <el-button @click="addActivity" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="downActivity" type="text" style="padding-top:0px;padding-bottom:0px;">下架</el-button>
            </div>
            <div v-if="activityType==2">
              <el-button @click="addActivity" type="text" style="padding-top:0px;padding-bottom:0px;">编辑</el-button>
              <el-button @click="upActivity" type="text" style="padding-top:0px;padding-bottom:0px;">上架</el-button>
              <el-button @click="deleteActivity" type="text" style="padding-top:0px;padding-bottom:0px;">删除</el-button>
            </div>
            <div v-if="activityType==3">
              <el-button @click="showPrizeUser" type="text" style="padding-top:0px;padding-bottom:0px;">中奖用户</el-button>
            </div>
            <!--<div v-if="Final.CHECK_TYPE_MAPPING[1].includes(scope.row.status)">-->
              <!--<el-button size="small" @click="toDetail(scope.row.id)">审核</el-button>-->
            <!--</div>-->
            <!--<div v-if="Final.CHECK_TYPE_MAPPING[2].includes(scope.row.status)">-->
              <!--<el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>-->
              <!--<el-button size="small" @click="revokeAudit(scope.row.id)">撤销</el-button>-->
            <!--</div>-->
            <!--<div v-if="Final.CHECK_TYPE_MAPPING[3].includes(scope.row.status)">-->
              <!--<el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>-->
              <!--<el-button size="small" @click="revokeAudit(scope.row.id)">撤销</el-button>-->
            <!--</div>-->
            <!--<div v-if="Final.CHECK_TYPE_MAPPING[4].includes(scope.row.status)">-->
              <!--<el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>-->
            <!--</div>-->
          </template>
        </el-table-column>
      </el-table>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>

      <!-- 中奖用户弹出层 -->
      <div class="mask" style="z-index: 12000;"></div>
      <div class="prize-pop">
        <!-- 关闭按钮 -->
        <div class="pop-close" @click="hidePrizeUser">
          <img src="./../../assets/images/pop-close.png" alt="">
        </div>
        <!-- 具体内容 -->
        <div class="prize-tit">中奖用户</div>
        <div class="pricontent">
          <div class="pricontent-txt fl">
            <div class="pricontent-body">
              <ul class="namepeople">
                <li>
                  <p><em>用户姓名:</em><span>马晓光</span></p>
                </li>
                <li><p><em>手机号:</em><span>18614086655</span></p></li>
              </ul>
              <ul class="prizetxt">
                <li>
                  <p><em>秒杀券名称:</em><span>万元购买豪车</span></p>
                </li>
                <li><p><em>秒杀成功时间:</em><span>2017-11-11 10:58</span></p></li>
                <li><p><em>有效时间:</em><span>2017-11至2017-12</span></p></li>
                <li><p><em>订单编号:</em><span>MHads1516454856</span></p></li>
                <li><p><em>适应于:</em><span>大众迈腾</span></p></li>
              </ul>
            </div>
          </div>
          <div class="pricontent-txt fl">
            <div class="pricontent-body">
              <ul class="namepeople">
                <li>
                  <p><em>用户姓名:</em><span>马晓光</span></p>
                </li>
                <li><p><em>手机号:</em><span>18614086655</span></p></li>
              </ul>
              <ul class="prizetxt">
                <li>
                  <p><em>秒杀券名称:</em><span>万元购买豪车</span></p>
                </li>
                <li><p><em>秒杀成功时间:</em><span>2017-11-11 10:58</span></p></li>
                <li><p><em>有效时间:</em><span>2017-11至2017-12</span></p></li>
                <li><p><em>订单编号:</em><span>MHads1516454856</span></p></li>
                <li><p><em>适应于:</em><span>大众迈腾</span></p></li>
              </ul>
            </div>
          </div>
          <div class="pricontent-txt fl">
            <div class="pricontent-body">
              <ul class="namepeople">
                <li>
                  <p><em>用户姓名:</em><span>马晓光</span></p>
                </li>
                <li><p><em>手机号:</em><span>18614086655</span></p></li>
              </ul>
              <ul class="prizetxt">
                <li>
                  <p><em>秒杀券名称:</em><span>万元购买豪车</span></p>
                </li>
                <li><p><em>秒杀成功时间:</em><span>2017-11-11 10:58</span></p></li>
                <li><p><em>有效时间:</em><span>2017-11至2017-12</span></p></li>
                <li><p><em>订单编号:</em><span>MHads1516454856</span></p></li>
                <li><p><em>适应于:</em><span>大众迈腾</span></p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>





  </div>
</template>
<script>
  //  import api from "./../fetch/api"
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util";
  import VTipMsg from "./../../components/tipMsg.vue";
  import TestData from "./../../util/TestData"
  import $ from "jquery"
  export default {
    data() {
      return {
        optionsActivityStart :{
          disabledDate:(time) => {
              if(this.filterForm.activityEndDate){
                let d = new Date (this.filterForm.activityEndDate)
                return time.getTime() >d.getTime();
              }
          }
        },
        optionsActivityEnd :{
          disabledDate:(time) => {
            if(this.filterForm.activityStartDate){
              let d = new Date (this.filterForm.activityStartDate)
              return time.getTime() <d.getTime();
            }
          }
        },
        optionsCreateStart : {
          disabledDate:(time) => {
            if(this.filterForm.createEndDate){
              let d = new Date (this.filterForm.createEndDate)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsCreateEnd : {
          disabledDate:(time) => {
            if(this.filterForm.createStartDate){
              let d = new Date (this.filterForm.createStartDate)
              return time.getTime() <d.getTime();
            }
          }
        },
        filterForm: {
          activityName:'',//活动名称
          activityArea:'',//活动区域
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          createStartDate:'',//活动创建开始时间
          createEndDate:''//活动创建结束时间
        },
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        Final: Final,
      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.requestData();
    },
    mounted () {
      //      this.requestData();
    },
    watch: {
      "$route": function (to, from) {
        this.resetForm();
      }
    },
    methods: {
      /**
       * 新建活动点击
       * @returns {}
       */
      addActivity () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 已上架
       * @returns {}
       */
      upActivity () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 已下架
       * @returns {}
       */
      downActivity () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 显示中奖纪录
       * @returns {}
       */
      showPrizeUser () {
        $('.prize-pop,.mask').show();
        return;
//        this.$refs.tipMsgRef.showTipMsg({
//          msg:"还在开发! 急什么! 急什么!",
//          type:"error"
//        });
      },
      /**
       * 关闭中奖纪录
       * @returns {}
       */
      hidePrizeUser () {
        $('.prize-pop,.mask').hide();
        return;
      },
      /**
       * 新建活动点击
       * @returns {}
       */
      deleteActivity () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },

      /**
       * 选项卡点击事件触发
       * @returns {}
       */
      changeActivityType (tab, event){
        this.activityType = tab.name;
      },
      /**
       * 翻页控件触发事件
       * @returns {}
       */
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
        this.requestData();
      },
      toDetail (companyInfoId){
        this.$router.push({name: 'companyDetail', params: {companyInfoId: companyInfoId}})
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {token: localStorage.getItem("token"), type: this.checkStatus}
        if (this.filterForm.activityName) {
          param.activityName = this.filterForm.activityName
        }
        if (this.filterForm.activityArea) {
          param.activityArea = this.filterForm.activityArea
        }
        if (this.filterForm.activityStartDate) {
          param.activityStartDate = Util.toDateString(this.filterForm.activityStartDate.getTime());
        }
        if (this.filterForm.activityEndDate) {
          param.activityEndDate = Util.toDateString(this.filterForm.activityEndDate.getTime());
        }
        if (this.filterForm.createStartDate) {
          param.createStartDate = Util.toDateString(this.filterForm.createStartDate.getTime());
        }
        if (this.filterForm.createEndDate) {
          param.createEndDate = Util.toDateString(this.filterForm.createEndDate.getTime());
        }
        console.log("查询提交参数:",param);
        return param;
      },
      searchFn () {
        this.currentPage = 1;
        this.requestData();
      },
      /**
       * 请求列表数据
       */
      requestData (data) {
        var p = this.getFilterParam();
        let param = {jsonData: JSON.stringify(p), pageNum: this.currentPage, pageRecorders: this.pageRecorders};
        this.resData=TestData.sedKill_list_data;
        this.totalRow = 300;
        return;
        Api.sk_activity_list(param)
          .then(res => {
            if (res.status == 1) {
              this.resData = res.result;
              this.totalRow = res.totalRow;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
      /**
       * 重置表单
       */
      resetForm() {
        this.$refs['filterForm'].resetFields();
        this.searchFn();
      }
    }
  }
</script>
<style>
  .list_div {}
  .list_div .el-tabs__content {
      display :none
  }
  .list_div el-tabs--top {
    display : none;
  }
  .list_div .totalTip {
    font-size: 14px;
    color: #8C94AC;
    letter-spacing: 0;
  }
</style>

<style scoped="scope">
  /*.mask {*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*display: none;*/
    /*z-index: 9000;*/
    /*background-color: rgba(0,0,0,.6)*/
  /*}*/
  /*.prize-pop {*/
    /*display: none;*/
    /*position: fixed;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*z-index: 13000;*/
    /*margin-top: -320px;*/
    /*margin-left: -490px;*/
    /*width: 980px;*/
    /*height: 640px;*/
    /*background: url(./../../assets/images/zjyh_bg.png) no-repeat*/
  /*}*/
  /*.prize-pop .pop-close {*/
    /*top: 130px;*/
    /*right: 95px;*/
    /*width: 23px;*/
    /*height: 24px;*/
    /*cursor: pointer*/
  /*}*/
  /*.prize-pop .prize-tit {*/
    /*width: 100%;*/
    /*height: auto;*/
    /*margin-top: 130px;*/
    /*font-size: 36px;*/
    /*color: #e63834;*/
    /*font-weight: 600;*/
    /*line-height: 40px;*/
    /*text-align: center*/
  /*}*/
  /*.prize-pop .pricontent {*/
    /*width: 100%;*/
    /*margin: 10px 0 0 30px;*/
    /*height: 310px;*/
    /*overflow-x: hidden;*/
    /*overflow-y: auto*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt {*/
    /*width: 400px;*/
    /*border: 1px solid #f5efd7;*/
    /*background: #fffcee;*/
    /*margin: 0 20px 20px 0*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt.fl {*/
    /*float: left;*/
    /*display: inline-block*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt.fr {*/
    /*float: right;*/
    /*display: inline-block*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body {*/
    /*padding: 20px 20px 0*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul {*/
    /*width: 100%;*/
    /*overflow: hidden*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul.namepeople {*/
    /*border-bottom: 1px solid #f5efd7*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul.prizetxt {*/
    /*margin-top: 20px*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul li {*/
    /*font-size: 14px;*/
    /*color: #ba8305;*/
    /*margin-bottom: 10px*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul li p {*/
    /*width: 100%;*/
    /*overflow: hidden*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul li p em {*/
    /*width: 100px;*/
    /*float: left*/
  /*}*/
  /*.prize-pop .pricontent .pricontent-txt .pricontent-body ul li p span {*/
    /*float: right;*/
    /*margin-left: 10px*/
  /*}*/
</style>
