<template>
  <div class="con_list">
    <!--过滤条件-->
    <div class="filter_div mb20">
      <el-form :model="filterForm"   size="small" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户姓名：">
              <el-input v-model="filterForm.activityName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户电话：">
              <el-input v-model="filterForm.activityName"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="抵扣券名称：">
              <el-input v-model="filterForm.activityName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="活动名称：">
            <el-input v-model="filterForm.activityName"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="经销商简称：">
              <el-input v-model="filterForm.activityName"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领取日期:">
              <el-col :span="11">
                <el-form-item >
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
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
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityStartDate" :picker-options="optionsActivityStart" type="date" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker style="width: 100%;" v-model="filterForm.activityEndDate" :picker-options="optionsActivityEnd" type="date" placeholder="请输入结束日期"></el-date-picker>
                </el-form-item>
              </el-col>
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
          sortable>
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="抵扣券名称"
          sortable width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="参与活动"
        >
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="实际抵扣车型"
          sortable>
        </el-table-column>
        <el-table-column
          prop="activity_pv"
          label="抵扣金额(元)"
          sortable>
        </el-table-column>
        <el-table-column
          prop="activityStatus"
          label="用户姓名"
          sortable >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="用户电话"
          sortable >
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
          sortable >
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
        labelPosition:'left',
        activityType : 0,
        resData : [],
        currentPage: 1,
        totalRow: 0,
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
        this.$refs['filterForm'].resetFields();
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
