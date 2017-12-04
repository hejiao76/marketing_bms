<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"   size="small" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户姓名：">
              <el-input v-model="filterForm.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户电话：">
              <el-input v-model="filterForm.userPhone"></el-input>
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
              <el-input v-model="filterForm.businessName" placeholder="请输入经销商简称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="抵扣券码：">
              <el-input v-model="filterForm.couponMa" placeholder="请输入抵扣券码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抵扣金额：">
              <el-input v-model="filterForm.couponMoney" placeholder="请输入抵扣金额"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领取日期:">
              <el-col :span="11">
                <el-form-item >
                  <el-date-picker style="width: 100%;" v-model="filterForm.getStartTIme" :editable="false" :picker-options="optionsGetStartTIme" type="date" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.getEndTime" :editable="false" :picker-options="optionsGetEndTime" type="date" placeholder="请输入结束日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="核销日期:">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.usedStartTime" :editable="false" :picker-options="optionsUsedStartTime" type="date" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.usedEndTime" :editable="false" :picker-options="optionsUsedEndTime" type="date" placeholder="请输入结束日期"></el-date-picker>
                </el-form-item>
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
      <div style="margin-bottom:15px;"><span class="totalTip">共找到以下10条数据</span></div>
      <!--------------列表------------>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="activityName"
          label="抵扣券码"
          >
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="抵扣券名称"
           width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="参与活动"
        >
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="实际抵扣车型"
          >
        </el-table-column>
        <el-table-column
          prop="activity_pv"
          label="抵扣金额(元)"
          sortable>
        </el-table-column>
        <el-table-column
          prop="activityStatus"
          label="用户姓名"
           >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="用户电话"
           >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="领取日期"
          sortable >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="核销日期"
          sortable >
        </el-table-column>
        <el-table-column
          label="经销商"
           >
          <template slot-scope="scope">
            <el-button type="text">汇通</el-button>
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
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
    data() {
      return {
        tableData:TestData.prize_list,
        optionsGetStartTIme :{
          disabledDate:(time) => {
            if(this.filterForm.getStartTIme){
              let d = new Date (this.filterForm.getStartTIme)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsGetEndTime :{
          disabledDate:(time) => {
            if(this.filterForm.getEndTime){
              let d = new Date (this.filterForm.getEndTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        optionsUsedStartTime: {
          disabledDate:(time) => {
            if(this.filterForm.usedStartTime){
              let d = new Date (this.filterForm.usedStartTime)
              return time.getTime() >d.getTime();
            }
          }
        },
        optionsUsedEndTime: {
          disabledDate:(time) => {
            if(this.filterForm.usedEndTime){
              let d = new Date (this.filterForm.usedEndTime)
              return time.getTime() <d.getTime();
            }
          }
        },
        filterForm: {
          userName:'',//用户姓名
          userPhone:'',//用户电话
          activityName:'',//活动名称
          couponName:'',//抵扣券名称
          businessName:'',//商家名称
          couponMa:'',//抵扣券码
          couponMoney:'',//抵扣金额
          getStartTIme:'',//领取开始日期
          getEndTime:'',//领取结束日期
          usedStartTime:'',//核销开始日期
          usedEndTime:'',//核销结束日期
        },
        labelPosition:'left',
        activityType : 0,
        resData : [],
        currentPage: 1,//当前页
        totalRow: 20,//总页数
        pageRecorders: 10,
        Final: Final,
      }
    },
    components: {
      ElButton,
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
    },
    mounted () {
      //      this.requestData();
    },
    watch: {

    },
    methods: {
      ////table排序　
      formatter(row, column) {
        return row.address;
      },
      ////卡片切换
      changeCar(){
        if(this.isCar){
          this.isCar = false;
        }else{
          this.isCar = true;
        }
      },
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
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      getFilterParam () {
        var param = {token: localStorage.getItem("token"), type: this.checkStatus}
        if (this.filterForm.userName) {
          param.activityName = this.filterForm.userName
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
        if (this.filterForm.businessName) {
          param.businessName = this.filterForm.businessName
        }
        if (this.filterForm.couponMa) {
          param.couponMa = this.filterForm.couponMa
        }
        if (this.filterForm.couponMoney) {
          param.couponMoney = this.filterForm.couponMoney
        }
        if (this.filterForm.getStartTIme) {
          param.getStartTIme = Util.toDateString(this.filterForm.getStartTIme.getTime());
        }
        if (this.filterForm.getEndTime) {
          param.getEndTime = Util.toDateString(this.filterForm.getEndTime.getTime());
        }
        if (this.filterForm.usedStartTime) {
          param.usedStartTime = Util.toDateString(this.filterForm.usedStartTime.getTime());
        }
        if (this.filterForm.usedEndTime) {
          param.usedEndTime = Util.toDateString(this.filterForm.usedEndTime.getTime());
        }
        console.log("查询提交参数:",param);
        return param;
      },
      /**
       * 搜索
       */
      searchFn () {
        this.currentPage = 1;
        this.requestData();
      },
      /**
       * 重置表单
       */
      resetForm() {
        //this.$refs['filterForm'].resetFields();
        this.filterForm= {
          userName:'',//用户姓名
            userPhone:'',//用户电话
            activityName:'',//活动名称
            couponName:'',//抵扣券名称
            businessName:'',//商家名称
            couponMa:'',//抵扣券码
            couponMoney:'',//抵扣金额
            getStartTIme:'',//领取开始日期
            getEndTime:'',//领取结束日期
            usedStartTime:'',//核销开始日期
            usedEndTime:'',//核销结束日期
        }
        this.searchFn();
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
