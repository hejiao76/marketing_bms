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
                <el-option v-for="item in companyContents" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="width:550px;">
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityStartDate" type="date" placeholder="选择活动开始日期"></el-date-picker>
            </el-col>
            <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="filterForm.activityEndDate" type="date" placeholder="选择活动结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="16">
            <div style="width:550px;">
              <el-form-item label="创建时间">
                <el-col :span="11">
                  <el-date-picker v-model="filterForm.activityStartDate" type="date" placeholder="选择创建开始日期"></el-date-picker>
                </el-col>
                <el-col class="line ml5" :span="1" style="text-align: center;width:30px;">-</el-col>
                <el-col :span="11">
                  <el-date-picker v-model="filterForm.activityEndDate" type="date" placeholder="选择创建结束日期"></el-date-picker>
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
          <el-tabs type="card">
            <el-tab-pane label="全部活动"></el-tab-pane>
            <el-tab-pane label=" 已上架 "></el-tab-pane>
            <el-tab-pane label=" 已下架 "></el-tab-pane>
            <el-tab-pane label=" 已结束 "></el-tab-pane>
            <el-tab-pane label=" 已删除 "></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="searchFn" class="fr mr20 ">新建活动</el-button>
        </el-col>
      </el-row>
      <div><span class="totalTip">共找到以下10条数据</span></div>
      <el-table class="table_min_height mt10" :data="resData" ref="singleTable" border highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="index" label="" width="55"></el-table-column>
        <el-table-column prop="companyName" label="活动名称" align="center" width="180" ></el-table-column>
        <el-table-column prop="adminName" label="活动时间" align="center" min-width="80"></el-table-column>
        <el-table-column prop="companyContentName" :formatter="formatContentName" align="center" label="创建时间" min-width="100"></el-table-column>
        <el-table-column prop="createTime" align="center" min-width="160" label="领取数量"></el-table-column>
        <el-table-column prop="statusName" align="center" label="活动pv"></el-table-column>
        <el-table-column prop="statusName" align="center" label="活动链接"></el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template scope="scope">
            <div v-if="Final.CHECK_TYPE_MAPPING[1].includes(scope.row.status)">
              <el-button size="small" @click="toDetail(scope.row.id)">审核</el-button>
            </div>
            <div v-if="Final.CHECK_TYPE_MAPPING[2].includes(scope.row.status)">
              <el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>
              <el-button size="small" @click="revokeAudit(scope.row.id)">撤销</el-button>
            </div>
            <div v-if="Final.CHECK_TYPE_MAPPING[3].includes(scope.row.status)">
              <el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>
              <el-button size="small" @click="revokeAudit(scope.row.id)">撤销</el-button>
            </div>
            <div v-if="Final.CHECK_TYPE_MAPPING[4].includes(scope.row.status)">
              <el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--<span class="demonstration">完整功能</span>-->
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
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        //过滤条1件表单
        labelPosition: 'left',
        filterForm: {
          companyContent: '',
          companyName: '',
          sendDate: '',
          activityName:'',//活动名称
          activityArea:'',//活动区域
          activityStartDate:'',//活动开始时间
          activityEndDate:'', //活动结束时间
          createStartDate:'',//活动创建开始时间
          createEndDate:''//活动创建结束时间
        },
        companyContents: null,
        resData: [],
        currentPage: 1,
        totalRow: 0,
        pageRecorders: 10,
        checkStatus: 1,//审核状态,
        Final: Final,
      }
    },
    components: {
      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.companyContents = Final.CHECK_TYPES;
      this.checkStatus = this.$route.params.checkstatus || 1;
//      this.requestData();
    },
    watch: {
      "$route": function (to, from) {
        this.checkStatus = to.params.checkstatus
        this.resetForm();
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      formatContentName (row, column, cellValue) {
          if(cellValue=="第三方物流公司"){
              return "其他三方物流";
          }
          return cellValue;
      },
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
        this.requestData();
      },
      /**
       * 抢单模式点击
       */
      scrambleClick () {
        let param = {}
        Api.ls_get_scramble_id(Util.getPostParam(param))
          .then(res => {
            if (res.status == 1) {
                let id= res.result;
                if(id){
                  this.toCompanyDetailScramble(id)
                }
            }else if (res.status==245){
//              this.$message({
//                message: '没有更多的审核单了',
//                type: 'warning',
//                duration: 1500,
//                onClose: function () {
//                }.bind(this)
//              });
              this.$refs.tipMsgRef.showTipMsg({
                msg:"没有更多的审核单了",
                type:"warn"
              });
            }else {
//              this.$message({
//                message: '请求异常，请重试',
//                type: 'error',
//                duration: 1500,
//                onClose: function () {
//                }.bind(this)
//              });
              this.$refs.tipMsgRef.showTipMsg({
                msg: '请求异常，请重试',
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
      toCompanyDetailScramble (companyInfoId){
        this.$router.replace({name: 'companyDetailScramble', params: {companyInfoId: companyInfoId}})
      },
      /**
       * 撤销审批
       */
      revokeAudit (companyInfoId) {
        if (companyInfoId) {
          let param = Util.getPostParam({companyInfoId: companyInfoId});
          Api.lc_revoke_audit(param)
            .then(res => {
              if (res.status == 1) {
                this.$refs.tipMsgRef.showTipMsg({
                    msg:"撤销成功",
                    callback:this.requestData,
                    type:"success"
                });
              }else {
                this.$refs.tipMsgRef.showTipMsg({
                  msg:res.message,
                  type:"error"
                });
              }
            }).catch(err => {

          });
        }
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
        if (this.filterForm.companyContent) {
          param.companyContent = this.filterForm.companyContent
        }
        if (this.filterForm.companyName) {
          param.companyName = this.filterForm.companyName
        }
        if (this.filterForm.sendDate) {
          param.sendDate = Util.toDateString(this.filterForm.sendDate.getTime());
        }
        return param;
      },
      searchFn () {
//        this.$refs.tipMsgRef.showTipMsg({
//            msg:"Tip提示框 基于bootstrap 模",
//            callback:this.requestData,
//            type:"error",
//            param:{test:1}
//        });
//        return;
        this.currentPage = 1;
        this.requestData();
      },
      /**
       * 请求列表数据
       */
      requestData (data) {
        var p = this.getFilterParam();
        let param = {jsonData: JSON.stringify(p), pageNum: this.currentPage, pageRecorders: this.pageRecorders};
        Api.lc_company_check_list(param)
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

  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
