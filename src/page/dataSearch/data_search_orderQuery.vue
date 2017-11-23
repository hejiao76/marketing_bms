<template>
   <div class="ds_oq">
     <div class="ds_oq_form">
       <el-form :inline="true" :model="dsOqForm" ref="dsOqForm" class="demo-form-inline">
         <!--<el-col :span="8">-->
           <el-form-item label="流水号" prop="ds_oqGlobalOrderNum"  >
             <el-input v-model="dsOqForm.ds_oqGlobalOrderNum" placeholder="流水号"></el-input>
           </el-form-item>
         <!--</el-col>-->
         <!--<el-col :span="8">-->
           <el-form-item label="订单号" prop="ds_oqOrderNum"  class="ml10">
             <el-input v-model="dsOqForm.ds_oqOrderNum" placeholder="订单号"></el-input>
           </el-form-item>
         <!--</el-col>-->
         <!--<el-col :span="8">-->
         <el-form-item label="仓库编码" prop="ds_oqStorageNo" class="ml10">
           <el-input v-model="dsOqForm.ds_oqStorageNo" placeholder="仓库编码"></el-input>
         </el-form-item>
         <!--</el-col>-->
         <!--<el-col :span="8">-->
           <el-form-item label="订单模块类型" prop="ds_oqModuleType"  >
             <el-select v-model="dsOqForm.ds_oqModuleType" placeholder="请选择"  style="">
               <el-option label="快递" value="KUAIDI"></el-option>
               <el-option label="同城" value="TONGCHENG"></el-option>
               <el-option label="整车" value="ZHENGCHE"></el-option>
               <el-option label="零担" value="LINGDAN"></el-option>
               <el-option label="周边好货" value="ZBHH"></el-option>
             </el-select>
           </el-form-item>
         <!--</el-col>-->
         <!--<br>-->
         <!--<el-col :span="8">-->
             <el-form-item  class="" label="订单状态" prop="ds_oqStatus">
               <el-select v-model="dsOqForm.ds_oqStatus" placeholder="请选择">
                 <el-option label="待确认" value="1"></el-option>
                 <el-option label="已确认备货中" value="2"></el-option>
                 <el-option label="已备货待取件" value="3"></el-option>
                 <el-option label="已修正信息待发件方确认" value="4"></el-option>
                 <el-option label="压件中" value="10"></el-option>
                 <el-option label="待驻仓人员确认" value="11"></el-option>
                 <el-option label="待驻仓人员取件" value="12"></el-option>
                 <el-option label="待驻仓人员配送" value="13"></el-option>
                 <el-option label="待调度员确认" value="14"></el-option>
                 <el-option label="待站点员工取件" value="15"></el-option>
                 <el-option label="待站点员工确认" value="16"></el-option>
                 <el-option label="已送达客户" value="17"></el-option>
                 <el-option label="待抢单人员确认" value="18"></el-option>
                 <el-option label="压件待分配骑士" value="19"></el-option>
                 <el-option label="待结算" value="20"></el-option>
                 <el-option label="已完成" value="22"></el-option>
                 <el-option label="订单异常" value="40"></el-option>
                 <el-option label="已撤销" value="41"></el-option>
                 <el-option label="超时自动取消" value="42"></el-option>
                 <el-option label="审核不通过" value="43"></el-option>
                 <el-option label="整车_待确认" value="71"></el-option>
                 <el-option label="整车_待取件" value="72"></el-option>
                 <el-option label="整车_待配送" value="73"></el-option>
                 <el-option label="整车_已送达" value="75"></el-option>
               </el-select>
             </el-form-item>
         <!--</el-col>-->
         <!--<el-col :span="15">-->
           <el-form-item label="订单创建时间" >
             <el-col :span="11">
               <el-form-item prop="ds_oqStartTime">
                 <el-date-picker v-model="dsOqForm.ds_oqStartTime" type="date" placeholder="起" style="width: 100%;" format="yyyy-MM-dd" @change="getNormalTime1_order"></el-date-picker>
               </el-form-item>
             </el-col>
             <el-col class="line ml_10style" :span="2">—</el-col>
             <el-col :span="11">
               <el-form-item prop="ds_oqEndTime">
                 <el-date-picker v-model="dsOqForm.ds_oqEndTime" type="date" placeholder="止" style="width: 100%;"  format="yyyy-MM-dd" @change="getNormalTime2_order"></el-date-picker>
               </el-form-item>
             </el-col>
           </el-form-item>
         <!--</el-col>-->
         <el-form-item style="float:right;">
           <el-button type="primary" @click="ds_oqCheck">查 询</el-button>
           <el-button @click="ds_oqResetForm('dsOqForm')">重 置</el-button>
           <el-button @click="ds_oqLoadData">导出数据</el-button>
           <el-button @click="ds_oqLoadReport">导出统计报表</el-button>
         </el-form-item>
       </el-form>
     </div>
     <hr class="hr_line">
     <div class="ds_oq_table" style="display:block;">
         <el-table class="table_min_height" v-bind:data="ds_oq_tableData" border style="margin-top: 20px;">
           <el-table-column type="index" width="60"  align="center"></el-table-column>
           <el-table-column prop="globalOrderNum" label="流水号" width="210"  align="center"></el-table-column>
           <el-table-column prop="orderNum" label="订单号" width="250" align="center"></el-table-column>
           <el-table-column prop="mailNo" label="面单号"  align="center" width="150"></el-table-column>
           <el-table-column prop="moduleType" label="订单模块类型" align="center" width="130"></el-table-column>
           <el-table-column prop="storageNo" label="仓库编码" align="center" width="130"></el-table-column>
           <el-table-column prop="storageName" label="仓库名称" width="150" align="center"></el-table-column>
           <el-table-column prop="status" label="订单状态" align="center" width="130"></el-table-column>
           <el-table-column prop="finalPrice" label="订单总金额" align="center" width="120"></el-table-column>
           <el-table-column prop="createTime" label="订单创建时间" align="center" v-bind:formatter="ds_oq_createTime" width="200"></el-table-column>
           <el-table-column prop="sendProvince" label="发货省" align="center"></el-table-column>
           <el-table-column prop="sendCity" label="发货市" align="center"></el-table-column>
           <el-table-column prop="sendArea" label="发货区县" align="center"width="130"></el-table-column>
           <el-table-column prop="receiveProvince" label="收货省" align="center"></el-table-column>
           <el-table-column prop="receiveCity" label="收货市" align="center"></el-table-column>
           <el-table-column prop="receiveArea" label="收货区县" align="center"width="130"></el-table-column>
           <el-table-column prop="receiveDigest" label="收货地点" align="center"width="230"></el-table-column>
           <el-table-column prop="carrierName" label="承运方名称" align="center"width="130"></el-table-column>
           <el-table-column prop="goodsTotalWeight" label="货物重量(g)" align="center"width="130"></el-table-column>
           <el-table-column prop="goodsVolume" label="货物体积(cm³)" align="center"width="130"></el-table-column>
           <el-table-column prop="longestDb" label="最长单边(cm)" align="center"width="130"></el-table-column>
         </el-table>
       </div>
     <div class="ds_oq_pageF " >
         <el-pagination @current-change="ds_oq_handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow"  ></el-pagination>
     </div>
     <v-tip-msg ref="tipMsgRef"></v-tip-msg>
   </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import api from './../../fetch/api';
  import VTipMsg from './../../components/tipMsg.vue';
  export default{
      data(){
          return{
            ds_oq_tableData:[],
            currentPage:1,
            totalRow:0,
            dsOqForm:{
              ds_oqGlobalOrderNum:'',
              ds_oqOrderNum:'',
              ds_oqStorageNo:'',
              ds_oqModuleType:'',
              ds_oqStatus:'',
              ds_oqStartTime:'',
              ds_oqEndTime:''
            },
            tmpParam : {},
          }
      },
    components:{
      VTipMsg
    },
    created(){
      this.ds_oq_fn();
    },
    methods:{
      getNormalTime1_order(date1){
        this.dsOqForm.ds_oqStartTime = date1;
        console.log(this.dsOqForm.ds_oqStartTime);
      },
      getNormalTime2_order(date2){
        this.dsOqForm.ds_oqEndTime = date2;
        console.log(this.dsOqForm.ds_oqEndTime);
      },
        //查询
      ds_oqCheck(){
         this.ds_oq_fn();
      },
      //重置
      ds_oqResetForm(formName){
        this.$refs[formName].resetFields();
        this.ds_oqCheck();
      },
        //导出统计报表
      ds_oqLoadReport(){
        window.open(Final.IMGURL+"wuliu-web-user/wuliu/order/getZhcOrderFormExport.action");
      },
        //导出数据
      ds_oqLoadData(){
          //debugger;
        let order_liu=this.tmpParam.ds_oqGlobalOrderNum;
        let order_order=this.tmpParam.ds_oqOrderNum;
        let order_type=this.tmpParam.ds_oqModuleType;
        let order_storage=this.tmpParam.ds_oqStorageNo;
        let order_status=this.tmpParam.ds_oqStatus;
        let order_startTime=this.tmpParam.ds_oqStartTime;
        let order_endTime=this.tmpParam.ds_oqEndTime;
        let urlStr="1=1";
        if(order_liu){
          urlStr+="&globalOrderNum="+order_liu;
        }
        if(order_order){
          urlStr+="&orderNum="+order_order;
        }
        if(order_type){
          urlStr+="&moduleType="+order_type;
        }
        if(order_storage){
          urlStr+="&storageNo="+order_storage;
        }
        if(order_status){
          urlStr+="&status="+order_status;
        }
//        if(order_startTime){
//          urlStr+="&startTime="+order_startTime;
//        }
//        if(order_endTime){
//          urlStr+="&endTime="+order_endTime;
//        }
        var date1=new Date(order_startTime);
        var date2=new Date(order_endTime);
        var startEndTime=Math.abs(date2.getMonth()-date1.getMonth())
        //Math.abs(date1.getMonth()-date2.getMonth())>2
        console.log(startEndTime)
        if(order_startTime && order_endTime){
          if(startEndTime+1>2){
            this.$refs.tipMsgRef.showTipMsg({
              msg:"时间范围不得超过两个月",
              type:'error',
            });
            return;
          }
          urlStr+="&startTime="+order_startTime;
          urlStr+="&endTime="+order_endTime;
        }else if(order_startTime=="" || order_endTime==""){
//          this.$message({
//            message:"请选择导出时间范围（两月内）",
//            duration:'1500'
//          });
          this.$refs.tipMsgRef.showTipMsg({
            msg:"请选择导出时间范围（两月内）",
            type:'error',
          });
          return;
        }
        window.open(Final.IMGURL+"wuliu-web-user/wuliu/order/orderInfoExport.action?"+urlStr);
      },
        //格式化时间
      ds_oq_createTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      //翻页
      ds_oq_handleCurrentChange(val){
        this.currentPage = val;
        this.ds_oq_fn( );
      },
      //数据渲染
      ds_oq_fn:function(){
        Object.assign(this.tmpParam,this.dsOqForm);
        let param={currentPage:this.currentPage,globalOrderNum:this.dsOqForm.ds_oqGlobalOrderNum,orderNum:this.dsOqForm.ds_oqOrderNum,moduleType:this.dsOqForm.ds_oqModuleType,storageNo:this.dsOqForm.ds_oqStorageNo,status:this.dsOqForm.ds_oqStatus,startTime:this.dsOqForm.ds_oqStartTime,endTime:this.dsOqForm.ds_oqEndTime};
         api.ds_orderQuery(param)
           .then(res=>{
               if(res.status==1){
                 this.ds_oq_tableData=res.result;
                 this.totalRow=res.totalRow;
               }else if(res.status==2){
                 this.$refs.tipMsgRef.showTipMsg({
                   msg:res.message,
                   type:'error',
                   param:{test:1}
                 });
               }
           }).catch(err=>{
               console.log(err);
         })
        }
    }
  }
</script>
<style scoped="scope">
  .el-form-item__label{
    min-width:70px;
    text-align: left;
  }

</style>
