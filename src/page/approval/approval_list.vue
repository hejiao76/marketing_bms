<template>
  <div>
    <el-table class="table_min_height" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="empNo"label="工号"width="100" align="center"></el-table-column>
      <el-table-column prop="name"label="姓名"width="100" align="center"></el-table-column>
      <el-table-column prop="province"label="省份"width="100" align="center"></el-table-column>
      <el-table-column prop="position"label="职务" width="150" align="center"></el-table-column>
      <el-table-column prop="recommendType" label="类型" width="100" align="center" v-bind:formatter="ap_type"></el-table-column>
      <el-table-column prop="totalAmount"label="总业绩金额"width="120" align="center"> </el-table-column>
      <el-table-column prop="monthTradeAmount"label="已提现金额" width="120" align="center"></el-table-column>
      <el-table-column prop="amount" label="本次提现金额" width="150" align="center"></el-table-column>
      <el-table-column prop="createTime"label="审核期内首次提交审核时间"width="250" align="center" v-bind:formatter="ap_list_sendTime"> </el-table-column>
      <el-table-column prop="daysAgo"label="首次提交审核距当前日期天数" width="250" align="center"></el-table-column>
      <el-table-column prop="tradeNum" label="交易单号" width="300" align="center"></el-table-column>
      <el-table-column  label="操作" width="120" align="center">
        <template scope="scope">
          <el-button @click="ap_list_pass(scope.row.tradeNum)" type="text" size="small">通过</el-button>
          <el-button @click="ap_list_fail(scope.row.tradeNum)" type="text" size="small">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ds_oq_pageF">
      <!--<el-pagination @current-change="ds_oq_handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow"></el-pagination>-->
      <el-pagination class="mt10" style="text-align:center;"  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next, jumper" :total="totalRow"></el-pagination>
    </div>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>

</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VTipMsg from './../../components/tipMsg.vue';
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import * as util from "./../../util/util"
  import api from "./../../fetch/api"
  export default {

    data() {
      return {
          tableData: [],
          currentPage: 1,
          totalRow: 0
      }
    },
    created () {
      this.approval_list_fn();
    },
    components:{
      VTipMsg
    },
    methods : {
      ap_type(row,column,cellValue){
        return Final.TRADE_TYPE[cellValue] || "";
      },
      ap_list_sendTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      handleClick() {
        console.log(1);
      },
      handleCurrentChange(cpage) {
        this.currentPage=cpage;
        this.approval_list_fn();
      },
      ap_list_fail(row){
          //debugger;
        let param={tradeNum:row};
        api.ap_audit_reject_withdrawals(param)
          .then(res=>{
            if(res.status==1){
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:'success',
                callback:this.approval_list_fn,
              });
            }else if(res.status==2){
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:'error',
              });
            }
          })
      },
      //审核通过
      ap_list_pass(row){
          //debugger;
          let param={tradeNum:row}
          api.ap_audit_agree_withdrawals(param)
            .then(res=>{
                if(res.status==1){
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:'success',
                    callback:this.approval_list_fn,
                    param:{}
                  });
                }else if(res.status==2){
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:'error',
                 });
                }
            })
      },
      approval_list_fn(){//渲染表格数据
          let param = {currentPage: this.currentPage};
          api.ap_trade_audit_list(param)
            .then(res=>{
                if(res.status==1){
                    this.tableData=res.result;
                    this.totalRow=res.totalRow;
                }else if(res.status==2){
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:'error',
                  });
                }
            })
      }
    }
  }

</script>
<style>
  @import "./../../assets/css/common.css";
  @import "./../../assets/css/style.css";
</style>
