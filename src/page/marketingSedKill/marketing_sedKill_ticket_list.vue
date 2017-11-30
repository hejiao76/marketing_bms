<template>
  <div class="con_list">
    <!--<h5>待处理事项</h5>-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"  ref="filterForm" label-width="100px" size="small">
        <el-row>
          <el-col :span="14">
            <el-form-item label="秒杀券名称:" prop="activityName">
              <el-input   v-model="filterForm.activityName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <div style="width:550px;">
          <el-form-item label="秒杀券有效期:">
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
            </el-col>
            <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="选择结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="list_div">
      <el-button type="primary" size="small" @click="addTicket" class="fr mr20 ">新建秒杀券</el-button>
      <el-tabs type="card"  v-model="activeName" @tab-click="changeActivityType">
        <div class="control-label col-md-12 row margin-bottom-10">
          共找到以下
          <span>10</span>条消息
        </div>
        <el-tab-pane label="全部活动" name="first">
          <div>
            <table  class="text-center table table-striped table-bordered table-hover">
            <thead>
            <tr>
              <th>秒杀券名称</th>
              <th>秒杀券状态</th>
              <th>秒杀券有效期</th>
              <th>秒杀券适用车系</th>
              <th>单个秒杀券金额</th>
              <th>操作</th>
            </tr>
            </thead>
             <tbody>
            <tr v-for="item in STicketList">
              <td>{{item.ticketName}}</td>
              <td>{{item.isvalid}}</td>
              <td>{{item.activityEndDate}}</td>
              <td>{{item.applyCar}}</td>
              <td>{{item.sedkillMoney}}</td>
              <td>
                <a href="javascript:void(0)" class="st_list-btn" @click="updateTicket()">编辑</a>
                <a href="javascript:void(0)" class="st_list-btn" @click="invalidTicket()">无效</a>
                <a href="javascript:void(0)" class="st_list-btn" @click="copyTicket()">复制</a>
              </td>
            </tr>
             </tbody>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="有效" name="second">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="无效" name="third">
          <div></div>
        </el-tab-pane>

      </el-tabs>
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>

    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util";
  import VTipMsg from "./../../components/tipMsg.vue";
  import TestData from "./../../util/TestData"
  export default {
    data() {
      return {
        STicketList:TestData.sedKill_ticket_list_data,
        activeName:'first',
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
        filterForm: {
          ticketName:'',//秒杀券名称
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
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
       * 复制券
       * @returns {}
       */
      copyTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"复制券还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 修改券
       * @returns {}
       */
      updateTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"编辑券还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * 新建券
       * @returns {}
       */
      addTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"新建券还在开发! 急什么! 急什么!",
          type:"error"
        });
      },
      /**
       * invalid无效券
       * @returns {}
       */
      invalidTicket () {
        this.$refs.tipMsgRef.showTipMsg({
          msg:"还在开发! 急什么! 急什么!",
          type:"error"
        });
      },

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
        if (this.filterForm.ticketName) {
          param.activityName = this.filterForm.activityName
        }
        if (this.filterForm.activityStartDate) {
          param.activityStartDate = Util.toDateString(this.filterForm.activityStartDate.getTime());
        }
        if (this.filterForm.activityEndDate) {
          param.activityEndDate = Util.toDateString(this.filterForm.activityEndDate.getTime());
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
        this.resData=TestData.sedKill_ticket_list_data;
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
  .table-bordered {
    border: 1px solid #F3F4F7;
  }
  .table {
    width: 100%;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .text-center {
    text-align: center;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  .table.table-bordered thead > tr > th {
    border-bottom: 0;
    background-color: #F6F7FB;
    color: #404C73;
    font-style: normal;
  }
  .table-striped > thead > tr > th:first-child {
    padding-left: 15px;
  }
  .table thead tr th {
    font-size: 14px;
    font-weight: 600;
  }
  .table thead > tr > th, .table tbody > tr > th, .table tfoot > tr > th, .table thead > tr > td, .table tbody > tr > td, .table tfoot > tr > td{
    padding: 9px;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  .table-striped > tbody > tr:nth-of-type(odd) {
    background: #f8f8f8;
  }
  .table-striped > tbody > tr > td:first-child {
    padding-left: 15px;
  }
  .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
    border: 1px solid #F3F4F7;
  }
  .table-hover > tbody > tr:hover, .table-hover > tbody > tr:hover > td {
    background: #f3f4f6 !important;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border:none;
  }
  .el-tabs__item{
    background: #EFF0F6;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    float: left;
    border-left:none;
    margin-right:10px;
    border-bottom: 1px solid #dfe4ed;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    border-left: 1px solid #dfe4ed;
    border-right: 1px solid #dfe4ed;
    border-top: 3px solid #527EFE;
    background: #fff;
  }
  .st_list-btn{
    color: #527EFE;
  }
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
