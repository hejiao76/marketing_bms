<template>
  <div class="con_list">
    <!--<h5>待处理事项</h5>-->
    <el-form :model="filterForm" :inline="true" ref="filterForm" label-width="80px">

        <!--<el-col :span="4">-->
        <el-form-item label="类型" prop="companyContent" label-width="80px">
          <!--<label>类型 </label>-->
          <el-select v-model="filterForm.companyContent" placeholder="请选择">
            <el-option v-for="item in companyContents" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="4">-->
        <!--<label>公司名称 </label>-->
        <el-form-item label="公司名称" prop="companyName">
          <el-input style="width:auto;" v-model="filterForm.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="5">-->
        <!--<label>提交时间 </label>-->
        <el-form-item label="提交时间" prop="sendDate">
          <el-date-picker v-model="filterForm.sendDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="3">-->
        <el-form-item class="fr">
          <!--<button v-on:click="searchFn" type="button" class="btn_b btn_bass mr10">查 询</button>-->
          <!--<button type="button" @click="resetForm('filterForm')" class="btn_y btn_bass mr10" mr10>重 置</button>-->
          <el-button type="primary" @click="searchFn">查 询</el-button>
          <el-button @click="resetForm('filterForm')">重 置</el-button>
          <el-button @click="scrambleClick">抢单模式</el-button>
          <!--<button type="button" @click="scrambleClick" class="btn_b btn_bass ">抢单模式</button>-->
        </el-form-item>

        <!--</el-col>-->

    </el-form>
    <!--<ul class="t_form">-->
    <!--<li>-->
    <!--<label>类型 </label>-->
    <!--<el-select v-model="type" placeholder="请选择">-->
    <!--<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
    <!--</el-select>-->
    <!--</li>-->
    <!--<li>-->
    <!--<label>公司名称 </label>-->
    <!--<el-input v-model="companyName" placeholder="请输入公司名称"></el-input>-->
    <!--</li>-->
    <!--<li>-->
    <!--<label>提交时间 </label>-->
    <!--<el-date-picker v-model="commitDate" type="date" placeholder="选择日期" ></el-date-picker>-->
    <!--</li>-->
    <!--<li>-->
    <!--<button class="btn_b btn_bass mr10">查 询</button>-->
    <!--<button class="btn_y btn_bass">重 置</button>-->
    <!--</li>-->
    <!--</ul>-->
    <hr class="hr_line">
    <el-table class="table_min_height" :data="resData" ref="singleTable" border highlight-current-row style="width: 100%;">
      <el-table-column align="center" type="index" label="" width="55"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" align="center" width="180" ></el-table-column>
      <el-table-column prop="adminName" label="管理员" align="center" min-width="80"></el-table-column>
      <el-table-column prop="companyContentName" :formatter="formatContentName" align="center" label="入驻模块" min-width="100"></el-table-column>
      <el-table-column prop="createTime" align="center" min-width="160" label="提交时间"></el-table-column>
      <el-table-column prop="statusName" align="center" label="状态"></el-table-column>
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

    <table>

    </table>
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
  export default {
    data() {
      return {
        //过滤条件表单
        labelPosition: 'left',
        filterForm: {
          companyContent: '',
          companyName: '',
          sendDate: ''
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


  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
