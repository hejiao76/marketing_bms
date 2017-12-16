<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"   size="small" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户姓名：">
              <el-input v-model="filterForm.userName"  placeholder="请输入用户姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户电话：" >
              <el-input v-model="filterForm.userPhone" placeholder="请输入用户电话"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="抵扣券名称：">
              <el-input v-model="filterForm.couponName" placeholder="请输入抵扣券名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="活动名称：">
            <el-input v-model="filterForm.activityName" placeholder="请输入活动名称"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="经销商简称：">
              <el-input v-model="filterForm.dealersName" placeholder="请输入经销商简称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="抵扣券码：">
              <el-input v-model="filterForm.couponCode" placeholder="请输入抵扣券码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抵扣金额：">
              <el-col :span="11">
                <el-form-item >
                  <el-input-number v-model="filterForm.couponAmount" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-input-number v-model="filterForm.couponAmount2" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>

            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="领取日期:">
              <el-col :span="11">
                  <el-date-picker style="width: 100%;" v-model="filterForm.getTime" :editable="false" :picker-options="optionsGetStartTIme" type="datetime" placeholder="选择开始日期"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                  <el-date-picker style="width: 100%;" v-model="filterForm.getTime2" :editable="false" :picker-options="optionsGetEndTime" type="datetime" placeholder="选择结束日期"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="核销日期:">
              <el-col :span="11">
                  <el-date-picker style="width: 100%;" v-model="filterForm.useTime" :editable="false" :picker-options="optionsUsedStartTime" type="datetime" placeholder="选择开始日期"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                  <el-date-picker style="width: 100%;" v-model="filterForm.useTime2" :editable="false" :picker-options="optionsUsedEndTime" type="datetime" placeholder="选择结束日期"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下 <span style="padding:0 10px;color: #409eff">{{dataNumber}}</span>条数据</span></div>
      <!--------------列表------------>
      <el-table
        :data="resData"
        style="width: 100%"
        @sort-change="sortTable"
      >
        <el-table-column
          prop="couponCode"
          label="抵扣券码"
          >
        </el-table-column>
        <el-table-column
          prop="couponName"
          label="抵扣券名称"
          width="120"
           >
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="参与活动"
        >
        </el-table-column>
        <el-table-column
          prop="carName"
          label="实际抵扣车型"
          width="120"
          >
        </el-table-column>
        <el-table-column
          prop="couponAmount"
          label="抵扣金额(元)"
          width="120"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
           >
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="用户电话"
           >
        </el-table-column>
        <el-table-column
          prop="getTime"
          label="领取日期"
          width="110"
          sortable="custom" >
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.getTime)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="核销日期"
          width="110"
          sortable="custom" >
          <template slot-scope="scope">
            <span v-html="formatterBr(scope.row.useTime)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="经销商"
           >
          <template slot-scope="scope">
            <el-button type="text">{{scope.row.dealersName}}</el-button>
          </template>
        </el-table-column>
      </el-table >
      <el-pagination class="ds_oq_pageF" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="totalRow"></el-pagination>
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
        optionsGetStartTIme :{
          disabledDate:(time) => {
            if(this.filterForm.getTime2){
              let d = new Date (this.filterForm.getTime2)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsGetEndTime :{
          disabledDate:(time) => {
            if(this.filterForm.getTime){
              let d = new Date (this.filterForm.getTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        optionsUsedStartTime: {
          disabledDate:(time) => {
            if(this.filterForm.useTime2){
              let d = new Date (this.filterForm.useTime2)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsUsedEndTime: {
          disabledDate:(time) => {
            if(this.filterForm.useTime){
              let d = new Date (this.filterForm.useTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        filterForm: {
          "getTime":"", //领取时间
          "getTime2":"",
          "useTime":"", //核销时间
          "useTime2":"",
          "couponCode":"", //抵扣券码
          "couponAmount":"", //抵扣金额
          "couponAmount2":"",
          "couponName":"", //抵扣券名称
          "activityName":"", //活动名称
          "userPhone":"", //用户电话
          "userName":"", //用户姓名
          "dealersName":"" //经销商简称
        },
        labelPosition:'left',
        resData : [],
        currentPage: 1,//当前页
        totalRow: 20,//总页数
        pageRecorders: 10,
        Final: Final,
        sortStatus:1,// 排序方式 1：正序 2：倒序
        sortType:1,// 排序字段 1：活动开始日期 2：活动结束日期 3：领取数量 4：活动PV 5：创建日期
        dataNumber:0,
      }
    },
    components: {
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    mounted () {
        this.requestData();
    },
    watch: {

    },
    methods: {
      /**
       * 日期转1字符串
       * @param date
       */
      formatDateToString (date){
        if(typeof date == 'object'){
          return Util.toFullDateString(date.getTime());
        }else{
          return date;
        }
      },
      /**
       * 截取时间
       * @returns
       */
       formatterBr(cellValue){
            let arr = cellValue.split(" ");
             return arr[0]+'<br/>'+arr[1];
        },
      /**
       * table排序
       * @returns
       */
      sortTable(obj){
        if(obj.prop == 'couponAmount'){
          this.sortType = 1
        }else if(obj.prop == 'getTime'){
          this.sortType = 2
        }else if(obj.prop == 'useTime'){
          this.sortType = 3
        }
        if(obj.order == 'descending'){
          this.sortStatus = 2
        }else{
          this.sortStatus = 1
        }
        this.requestData();
      },
      /**
       * 数据初始化
       * @returns
       */
      requestData(){
        var p = this.getFilterParam();
        Api.cp_activity_coupon_use_list(p)
          .then(res => {
            if (res.status) {
              this.resData = res.result;
              this.totalRow = res.dataNumber;
              this.dataNumber = res.dataNumber;
            }else {
              this.resData = [];
              this.currentPage = 0;
              this.totalRow = 0;
              this.dataNumber = 0;
            }
          }).catch(err => {
          this.$message({
            showClose: true,
            message: '数据请求失败！',
            type: 'error'
          });
        });
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {}
        if (this.filterForm.userName) {
          param.userName = this.filterForm.userName
        }
        if (this.filterForm.activityName) {
          param.activityName = this.filterForm.activityName
        }
        if (this.filterForm.userPhone) {
          param.userPhone = this.filterForm.userPhone
        }
        if (this.filterForm.couponName) {
          param.couponName = this.filterForm.couponName
        }
        if (this.filterForm.dealersName) {
          param.dealersName = this.filterForm.dealersName
        }
        if (this.filterForm.couponCode) {
          param.couponCode = this.filterForm.couponCode
        }
        if (this.filterForm.couponAmount) {
          param.couponAmount = this.filterForm.couponAmount
        }
        if (this.filterForm.couponAmount2) {
          param.couponAmount2 = this.filterForm.couponAmount2
        }
        if (this.filterForm.getTime) {
          param.getTime = this.formatDateToString(this.filterForm.getTime);
        }
        if (this.filterForm.getTime2) {
          param.getTime2 = this.formatDateToString(this.filterForm.getTime2);
        }
        if (this.filterForm.useTime) {
          param.useTime = this.formatDateToString(this.filterForm.useTime);
        }
        if (this.filterForm.useTime2) {
          param.useTime2 = this.formatDateToString(this.filterForm.useTime2);
        }
        param.pageNo = this.currentPage;
        param.pageSize = this.pageRecorders;
        param.sortStatus = this.sortStatus;
        param.sortType = this.sortType
        return param;
      },
      /**
       * 搜索
       */
      searchFn () {
        if(this.filterForm.couponAmount > this.filterForm.couponAmount2){
          this.$message({
            showClose: true,
            message: '抵扣金额输入错误！',
            type: 'error'
          });
          return false;
        } else{
          this.currentPage = 1;
          this.requestData();
        }
      },
      /**
       * 重置表单
       */
      resetForm() {
        //this.$refs['filterForm'].resetFields();
        this.filterForm= {
          "getTime":"", //领取时间
          "getTime2":"",
          "useTime":"", //核销时间
          "useTime2":"",
          "couponCode":"", //抵扣券码
          "couponAmount":"", //抵扣金额
          "couponAmount2":"",
          "couponName":"", //抵扣券名称
          "activityName":"", //活动名称
          "userPhone":"", //用户电话
          "userName":"", //用户姓名
          "dealersName":"" //经销商简称
        }
        this.searchFn();
      },
      /**
       * 翻页控件触发事件
       * @returns {}
       */
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
        this.requestData();
      }



    }
  }
</script>
<style>
  .list_div {}
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

</style>
