<template>
  <div class="con_list">
    <!--<h5>待处理事项</h5>-->
    <el-form :model="start_filterForm" :inline="true" ref="start_filterForm" label-width="80px">
      <el-row class="el-row-m">
        <!--<el-col :span="4">-->
          <el-form-item label="类型" prop="companyContent" label-width="50px">
            <!--<label>类型 </label>-->
            <el-select v-model="start_filterForm.companyContent" placeholder="请选择">
              <el-option v-for="item in companyContents" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <!--<label>公司名称 </label>-->
          <el-form-item label="公司名称" prop="companyName">
            <el-input style="width:auto;" v-model="start_filterForm.companyName" placeholder="请输入公司名称"></el-input>
          </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="5">-->
          <!--<label>提交时间 </label>-->
          <el-form-item label="提交时间" prop="sendDate">
            <el-date-picker v-model="start_filterForm.sendDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" @change="changeTime"></el-date-picker>
          </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="3">-->
        <el-form-item class="fr">
          <button v-on:click="start_searchFn" type="button" class="el-button el-button--primary">查 询</button>
          <button type="button" @click="start_resetForm('start_filterForm')" class="el-button el-button--default">重 置</button>
        </el-form-item>

        <!--</el-col>-->
      </el-row>
    </el-form>
    <el-table class="table_min_height" :data="start_resData"  ref="singleTable" border highlight-current-row style="width: 100%;">
      <el-table-column align="center" type="index" label="" width="60"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" align="center" width="180" style="display:none;"></el-table-column>
      <el-table-column prop="adminName" label="管理员" align="center" width="180"></el-table-column>
      <el-table-column prop="companyContentName" align="center" label="入驻模块" width="140"></el-table-column>
      <el-table-column prop="createTime" align="center" label="提交时间" min-width="180"></el-table-column>
      <el-table-column prop="statusName" align="center" label="状态"></el-table-column>
      <el-table-column  label="操作" align="center">
        <template  scope="scope">
          <div v-if="Final.CHECK_TYPE_MAPPING[1].includes(scope.row.status)">
            <el-button size="small" @click="start_toDetail(scope.row.id)">审核</el-button>
          </div>
          <!--<div v-if="Final.CHECK_TYPE_MAPPING[2].includes(scope.row.status)">-->
            <!--<el-button size="small" @click="start_toDetail(scope.row.id)">查看</el-button>-->
            <!--<el-button size="small" @click="revokeAudit(scope.row.id)" >撤销</el-button>-->
          <!--</div>-->
          <!--<div v-if="Final.CHECK_TYPE_MAPPING[3].includes(scope.row.status)">-->
            <!--<el-button size="small" @click="start_toDetail(scope.row.id)">查看</el-button>-->
            <!--<el-button size="small" @click="revokeAudit(scope.row.id)">撤销</el-button>-->
          <!--</div>-->
          <!--<div v-if="Final.CHECK_TYPE_MAPPING[4].includes(scope.row.status)">-->
            <!--<el-button size="small" @click="start_toDetail(scope.row.id)">查看</el-button>-->
          <!--</div>-->
        </template>
      </el-table-column>
    </el-table>
    <!--<span class="demonstration">完整功能</span>-->
    <el-pagination class="mt10" style="text-align:center;"  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>

    <table>

    </table>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>
</template>
<script>
  //  import api from "./../fetch/api"
  import VHeader from "./../../components/header";
  import VTipMsg from './../../components/tipMsg.vue';
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util"
  export default {
    data() {
      return {
        //过滤条件表单
        start_filterForm:{
          companyContent:'',
          companyName:'',
          sendDate:''
        },
        companyContents:null,
        start_resData:[],
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
        this.start_resetForm();
      }
    },
    methods : {
      changeTime(date){
          this.start_filterForm.sendDate=date;

      },
      handleCurrentChange(cpage) {
        this.currentPage=cpage;
        this.requestData();
      },
      /**
       * 撤销审批
       * */
//      revokeAudit (companyInfoId) {
//        if(companyInfoId){
//          let param= Util.getPostParam({companyInfoId:companyInfoId});
//          Api.lc_revoke_audit(param)
//            .then(res => {
//              if(res.status==1){
//                this.$message({
//                  message: '撤销成功',
//                  type: 'success',
//                  duration:1500,
//                  onClose: function (){
//                    this.requestData();
//                  }.bind(this)
//                });
//              }
//              console.log(res);
//            }).catch(err =>{
//
//          });
//        }
//      },
      start_toDetail (companyInfoId){
        this.$router.push({ name: 'startWorkDetail',params : {companyInfoId:companyInfoId} })
      },
      /**
       * 获取过滤器参数
       * @returns {{token: (string|null)}}
       */
      sw_getFilterParam () {
        var param={token:localStorage.getItem("token"),type:this.checkStatus}
        if(this.start_filterForm.companyContent){
          param.companyContent=this.start_filterForm.companyContent
        }
        if(this.start_filterForm.companyName){
          param.companyName=this.start_filterForm.companyName
        }
        //debugger;
        if(this.start_filterForm.sendDate){
          param.sendDate=this.start_filterForm.sendDate;
          console.log(param.sendDate)
        }
        return param;
//        var returnData={jsonData:JSON.stringify(param)};
//        return returnData;
//        console.log(returnData)
      },
      start_searchFn () {
        this.currentPage=1;
        this.requestData();
      },
      /**
       * 请求列表数据
       */
      requestData (data) {
          //debugger;
        var p=this.sw_getFilterParam();
        //let param= Object.assign({pageNum:this.currentPage,pageRecorders:this.pageRecorders},p)
        let param={jsonData:JSON.stringify(p),pageNum:this.currentPage,pageRecorders:this.pageRecorders};
        Api.sw_check_list(param)
          .then(res => {
            if(res.status==1){
              this.start_resData=res.result;
              this.totalRow=res.totalRow;
            }else if(res.status==2){
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:'error',
                param:{test:1}
              });
            }
            console.log(res);
          }).catch(err =>{

        });
      },
      start_resetForm() {
        this.$refs['start_filterForm'].resetFields();
        this.start_searchFn();
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
