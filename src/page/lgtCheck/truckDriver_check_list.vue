<template>
   <div class="con_list">
     <el-form :model="filterForm" :inline="true" ref="filterForm">
       <el-form-item label="手机号/姓名" prop="userPhone">
         <el-input style="width:auto;" v-model="filterForm.userPhone" placeholder="请输入手机号/姓名"></el-input>
       </el-form-item>
       <el-form-item class="fr">
         <el-button type="primary" @click="truckDriver_searchFn">查询</el-button>
         <el-button  @click="truckDriver_resetForm">重置</el-button>
       </el-form-item>
     </el-form>
     <hr class="hr_line">
     <el-table class="table_min_height" :data="resData" ref="singleTable" border highlight-current-row style="width: 100%;">
       <el-table-column align="center" type="index" label="" width="55"></el-table-column>
       <el-table-column prop="userName" label="姓名" align="center" width="130"></el-table-column>
       <el-table-column prop="userPhone" label="用户手机号" align="center" width="140"></el-table-column>
       <el-table-column prop="authType" align="center" label="认证类型" width="95" :formatter="authTypeFormat"></el-table-column>
       <el-table-column prop="submitTime" align="center" min-width="120" label="提交时间" :formatter="dateFormat"></el-table-column>
       <el-table-column prop="auditTime" align="center" min-width="120" label="审核时间" :formatter="dateFormat"></el-table-column>
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
         </template>
       </el-table-column>
     </el-table>
     <el-pagination class="ds_oq_pageF" style=""  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>
     <v-tip-msg ref="tipMsgRef"></v-tip-msg>
   </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import Api from "./../../fetch/api";
  import * as Util from "./../../util/util"
  import VTipMsg from "./../../components/tipMsg.vue";
  export default {
    data(){
        return{
          filterForm:{
            userPhone:''
          },
          resData:[],
          currentPage:1,
          totalRow:0,
          pageRecorders:10,
          checkStatus:1,//审核状态
          Final:Final,
        }
    },
    components:{
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created(){
      this.checkStatus=this.$route.params.checkstatus || 1;
      this.requestData();
    },
    watch: {
      "$route": function (to, from) {
        this.checkStatus = to.params.checkstatus;
        this.truckDriver_resetForm();
       }
     },
      methods:{
        //跳转审核详情页面
        toDetail(truckDriverInfoId){
          this.$router.push({ name: 'truckDriverDetail',params : {truckDriverInfoId:truckDriverInfoId} })
        },
        //跳转查看详情页面
        toDetailInfo(truckDriverInfoId){
          this.$router.push({ name: 'truckDriverDetailInfo',params : {truckDriverInfoId:truckDriverInfoId} })
        },
        //时间转换
        dateFormat(row,column,cellvalue) {
          if(cellvalue){
            return Util.toFullDateString(cellvalue);
          }
        },
        //状态
        authTypeFormat(row,column,cellvalue){
          if(cellvalue){
            return Final.ZHUCANG_AUTHTYPE[cellvalue] || "";
          }
        },
        //查询
        truckDriver_searchFn(){
            this.currentPage=1;
            this.requestData();
        },
        //重置
        truckDriver_resetForm() {
          this.$refs['filterForm'].resetFields();
          this.truckDriver_searchFn();
        },
        handleCurrentChange(cpage) {
          this.currentPage=cpage;
          this.requestData();
        },
        /**
         * 撤销审批
         * */
        revokeAudit (driverInfoId) {
          if(driverInfoId){
            let param={userPhone:driverInfoId};
            Api.truckDriver_revoke_audit(param)
              .then(res => {
                if(res.status==1){
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:'撤销成功',
                    type:"success",
                    scope:this,
                    callback:function (){
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
        /**
         * 请求列表数据
         */
        requestData (data) {
          let param= {currentPage:this.currentPage,pageSize:this.pageRecorders,queryType:this.checkStatus,param:this.filterForm.userPhone};
          Api.truckDriver_check_list(param)
            .then(res => {
              if(res.status==1){
                this.resData=res.result;
                this.totalRow=res.totalRow;
              }
            }).catch(err =>{

          });
        },
      }
  }
</script>
