<template>
    <div class="con_list">
      <el-form :model="filterForm" :inline="true"  ref="filterForm" label-width="100px">

        <!--<el-col :span="5">-->
          <el-form-item label="手机号/姓名" prop="userPhone">
          <!--<label>类型 </label>-->
            <el-input style="width:auto;" v-model="filterForm.userPhone" placeholder="请输入手机号/姓名"></el-input>
          </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="3">-->
        <el-form-item class="fr">
          <!--<button v-on:click="searchFn" type="button" class="btn_b btn_bass mr10">查 询</button>-->
          <!--<button type="button" @click="resetForm('filterForm')" class="btn_y btn_bass">重  置</button>-->
          <el-button type="primary" @click="searchFn">查 询</el-button>
          <el-button @click="resetForm('filterForm')">重 置</el-button>
        </el-form-item>

        <!--</el-col>-->

      </el-form>
      <hr class="hr_line">
      <el-table class="table_min_height" :data="resData"  ref="singleTable" border highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="index" label="" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="130"></el-table-column>
        <el-table-column prop="userPhone" label="用户手机号" align="center" min-width="160"></el-table-column>
        <el-table-column prop="authType" align="center" label="认证类型" width="100" :formatter="authTypeFormat"></el-table-column>
        <el-table-column prop="submitTime" align="center" label="提交时间" min-width="165" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="auditTime" align="center" label="审核时间" min-width="165" :formatter="dateFormat"></el-table-column>
        <el-table-column  label="操作" align="center" width="150">
          <template  scope="scope">
            <div v-if="Final.ZHUCANG_QUERYTYPE[1].includes(scope.row.status)">
              <el-button size="small" @click="toDetail(scope.row.userPhone)">审核</el-button>
            </div>
            <div v-if="Final.ZHUCANG_QUERYTYPE[2].includes(scope.row.status)">
              <el-button size="small" @click="toDetailInfo(scope.row.userPhone)">查看</el-button>
              <el-button size="small" @click="revokeAudit(scope.row.userPhone)" >撤销</el-button>
            </div>
            <div v-if="Final.ZHUCANG_QUERYTYPE[3].includes(scope.row.status)">
              <el-button size="small" @click="toDetailInfo(scope.row.userPhone)">查看</el-button>
              <el-button size="small" @click="revokeAudit(scope.row.userPhone)">撤销</el-button>
            </div>
            <!--<div v-if="Final.ZHUCANG_QUERYTYPE[4].includes(scope.row.status)">-->
              <!--<el-button size="small" @click="toDetail(scope.row.id)">查看</el-button>-->
            <!--</div>-->
          </template>
        </el-table-column>
      </el-table>
        <!--<span class="demonstration">完整功能</span>-->
        <el-pagination class="ds_oq_pageF" style=""  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>

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
  import * as Util from "./../../util/util"
  import VTipMsg from "./../../components/tipMsg.vue";
  export default {
      data() {
          return {
              //过滤条件表单
              filterForm:{
                userPhone:''
              },
              companyContents:null,
              resData:[],
              currentPage:1,
              totalRow:0,
              pageRecorders:10,
              checkStatus:1 ,//审核状态,
              Final:Final,
          }
      },
      components :{
        VHeader,
        VLeft,
        VConNav,
        VTipMsg
      },
      created (){
        this.companyContents= Final.CHECK_TYPES;
        this.checkStatus=this.$route.params.checkstatus || 1;
        this.requestData();
      },
      watch:{
        "$route": function(to,from) {
          this.checkStatus=to.params.checkstatus
          this.resetForm();
        }
      },
      methods : {
        handleCurrentChange(cpage) {
             this.currentPage=cpage;
             this.requestData();
        },
        /**
         * 撤销审批
         * */
        revokeAudit (personalInfoId) {
          if(personalInfoId){
            let param={userPhone:personalInfoId};
            Api.lc_personal_revoke_audit(param)
              .then(res => {
                if(res.status==1){
//                  this.$message({
//                    message: '撤销成功',
//                    type: 'success',
//                    duration:1500,
//                    onClose: function (){
//                      this.requestData();
//                    }.bind(this)
//                  });
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:'撤销成功',
                    type:"success",
                    scope:this,
                    callback: function (){
                      this.requestData();
                    }
                  });
                }else {
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:"error",
                    scope:this
                  });
                }
              }).catch(err =>{

            });
          }
        },
        toDetail (personalInfoId){
          this.$router.push({ name: 'personalDetail',params : {personalInfoId:personalInfoId} })
        },
        toDetailInfo (personalInfoId) {
          this.$router.push({ name: 'personalDetailInfo',params : {personalInfoId:personalInfoId} })
        },
//        /**
//         * 获取过滤器参数
//         * @returns {{token: (string|null)}}
//         */
//        getFilterParam () {
//            var param={token:localStorage.getItem("token"),queryType:this.checkStatus,userPhone:this.filterForm.userPhone}
//          return param;
//        },
        searchFn () {
            this.currentPage=1;
            this.requestData();
        },
        /**
         * 请求列表数据
         */
        requestData (data) {
//            var p=this.getFilterParam();
            let param= {currentPage:this.currentPage,pageSize:this.pageRecorders,queryType:this.checkStatus,param:this.filterForm.userPhone};
            Api.lc_personal_check_list(param)
            .then(res => {
                if(res.status==1){
                    this.resData=res.result;
                    this.totalRow=res.totalRow;
                }
            }).catch(err =>{

            });
        },
        resetForm() {
          this.$refs['filterForm'].resetFields();
          this.searchFn();
        },
        dateFormat(row,column,cellvalue) {
            if(cellvalue){
              return Util.toFullDateString(cellvalue);
            }
        },
        authTypeFormat(row,column,cellvalue){
            if(cellvalue){
                return Final.ZHUCANG_AUTHTYPE[cellvalue] || "";
            }
        }
      }
  }
</script>
<style>
  .el-row-m {
    margin-bottom: 20px !important;
  }
  /*@import "./../../assets/css/common.css";*/
  /*@import "./../../assets/css/style.css";*/
</style>
