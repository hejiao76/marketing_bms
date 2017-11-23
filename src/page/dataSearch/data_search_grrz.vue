<template>
   <div class="ds_grrz">
     <div class="ds_grrz_form">
       <el-form :inline="true" :model="dsGrrzForm" ref="dsGrrzForm" class="demo-form-inline">
           <el-form-item label="归属仓库编码" prop="ds_grrzStorageNo">
             <el-input v-model="dsGrrzForm.ds_grrzStorageNo" placeholder="归属仓库编码"></el-input>
           </el-form-item>
           <el-form-item label="发展人编号" prop="ds_grrzEmpNo">
             <el-input v-model="dsGrrzForm.ds_grrzEmpNo" placeholder="发展人编号"></el-input>
           </el-form-item>
           <el-form-item label="省份" prop="ds_grrzProvince">
             <el-input v-model="dsGrrzForm.ds_grrzProvince" placeholder="省份(例：广东省)"></el-input>
           </el-form-item>
           <el-form-item label="审核状态" prop="ds_grrzStatus">
             <el-select v-model="dsGrrzForm.ds_grrzStatus" placeholder="请选择">
               <el-option label="审核中" value="1"></el-option>
               <el-option label="审核通过" value="2"></el-option>
               <el-option label="审核未通过" value="3"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="审核时间" >
           <el-col :span="11">
             <el-form-item prop="ds_grrzStartTime">
               <el-date-picker v-model="dsGrrzForm.ds_grrzStartTime" type="date" placeholder="审核开始时间" style="width: 100%;" format="yyyy-MM-dd" @change="getNormalTime1_grrz"></el-date-picker>
             </el-form-item>
           </el-col>
           <el-col class="line ml_10style" :span="2">—</el-col>
           <el-col :span="11">
             <el-form-item prop="ds_grrzEndTime">
               <el-date-picker v-model="dsGrrzForm.ds_grrzEndTime" type="date" placeholder="审核结束时间" style="width: 100%;"  format="yyyy-MM-dd" @change="getNormalTime2_grrz"></el-date-picker>
             </el-form-item>
           </el-col>
         </el-form-item>
         <el-form-item style="float:right;">
           <el-button type="primary" @click="ds_grrzCheck">查 询</el-button>
           <el-button @click="ds_grrzResetForm('dsGrrzForm')">重 置</el-button>
           <el-button @click="ds_grrzLoadData">导出数据</el-button>
         </el-form-item>
       </el-form>
     </div>
     <hr class="hr_line">
     <div class="ds_grrz_table" style="display:block;">
       <el-table class="table_min_height" v-bind:data="ds_grrz_tableData" border style="margin-top: 20px;">
         <el-table-column type="index" width="60"  align="center"></el-table-column>
         <el-table-column prop="name" label="姓名" width="100"  align="center"></el-table-column>
         <el-table-column prop="userPhone" label="手机号" width="130" align="center"></el-table-column>
         <el-table-column prop="status" label="审核状态"  align="center" width="130" v-bind:formatter="ds_grrz_status"></el-table-column>
         <el-table-column prop="storageNo" label="归属仓库编码" align="center" width="130"></el-table-column>
         <el-table-column prop="storageName" label="归属仓库名称" align="center" width="130"></el-table-column>
         <el-table-column prop="empNo" label="发展人编号" width="130" align="center"></el-table-column>
         <el-table-column prop="empName" label="发展人名称" align="center" width="130"></el-table-column>
         <el-table-column prop="province" label="省份" align="center" width="120"></el-table-column>
         <el-table-column prop="position" label="职位" align="center" width="160"></el-table-column>
         <el-table-column prop="createTime" label="创建时间" align="center" width="200" v-bind:formatter="ds_grrz_createTime"></el-table-column>
         <el-table-column prop="auditTime" label="审核时间" align="center" width="200" v-bind:formatter="ds_grrz_auditTime"></el-table-column>
         <el-table-column prop="isEx" label="是否信息异常" align="center"width="130"></el-table-column>
       </el-table>
     </div>
     <div class="ds_oq_pageF" >
       <el-pagination @current-change="ds_grrz_handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow"></el-pagination>
     </div>
     <v-tip-msg ref="tipMsgRef"></v-tip-msg>
   </div>
</template>
<script>
  import VHeader from "./../../components/header";
  import VTipMsg from './../../components/tipMsg.vue';
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import api from './../../fetch/api';
  export default{
      data(){
          return{
            ds_grrz_tableData:[],
            currentPage:1,
            totalRow:0,
            grrzQueryType:'qishi',
            dsGrrzForm:{
              ds_grrzStorageNo:'',
              ds_grrzEmpNo:'',
              ds_grrzProvince:'',
              ds_grrzStatus:'',
              ds_grrzStartTime:'',
              ds_grrzEndTime:''
            },
            tmpParam : {},
          }
      },
      created(){
        this.grrzQueryType=this.$route.params.grrzQueryType || 'qishi';
        this.ds_grrz_fn();
      },
      components:{
        VTipMsg
      },
      watch:{
          "$route":function(to,from) {
            this.grrzQueryType=to.params.grrzQueryType;
            this.ds_grrz_fn();
            this.ds_grrzResetForm();
            this.tmpParam = {} ;
          }
      },
      methods:{
        getNormalTime1_grrz(date1){
          this.dsGrrzForm.ds_grrzStartTime = date1;
          console.log(this.dsGrrzForm.ds_grrzStartTime);
        },
        getNormalTime2_grrz(date2){
          this.dsGrrzForm.ds_grrzEndTime = date2;
          console.log(this.dsGrrzForm.ds_grrzEndTime);
        },
        //状态
        ds_grrz_status(row,column,cellValue){
          return Final.QIAHI_STATUS[cellValue] || "";
        },
        //创建时间
        ds_grrz_createTime(row,column,cellValue){
          return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
        },
        //审核时间
        ds_grrz_auditTime(row,column,cellValue){
            if(cellValue==null){
                return "";
            }else{
              return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
            }
        },
        //查询
        ds_grrzCheck(){
          this.ds_grrz_fn();
        },
        //重置
        ds_grrzResetForm(){
          this.$refs['dsGrrzForm'].resetFields();
          this.ds_grrzCheck();
        },
        //导出数据
        ds_grrzLoadData(){
          let grrz_storageNo=this.tmpParam.ds_grrzStorageNo;
          let grrz_status=this.tmpParam.ds_grrzStatus;
          let grrz_empNo=this.tmpParam.ds_grrzEmpNo;
          let grrz_province=this.tmpParam.ds_grrzProvince;
          let grrz_startTime=this.tmpParam.ds_grrzStartTime;
          let grrz_endTime=this.tmpParam.ds_grrzEndTime;
          let grrz_queryType=this.grrzQueryType;
          let urlStr="1=1";
          if(grrz_storageNo){
            urlStr+="&storageNo="+grrz_storageNo;
          }
          if(grrz_status){
            urlStr+="&status="+grrz_status;
          }
          if(grrz_empNo){
            urlStr+="&empNo="+grrz_empNo;
          }
          if(grrz_province){
            urlStr+="&province="+grrz_province;
          }
          if(grrz_startTime){
            urlStr+="&startTime="+grrz_startTime;
          }
          if(grrz_endTime){
            urlStr+="&endTime="+grrz_endTime;
          }
          if(grrz_queryType){
            urlStr+="&queryType="+grrz_queryType;
          }
          window.open(Final.IMGURL+"wuliu-web-user/order/zb/grrzQishiExport.action?"+urlStr);
        },
        //翻页
        ds_grrz_handleCurrentChange(val){
          this.currentPage = val;
          this.ds_grrz_fn( );
        },
        //获取过滤器参数
        grrz_getFilterParam(){
          var param={queryType:this.grrzQueryType};
          if(this.dsGrrzForm.ds_grrzStorageNo){
            param.storageNo=this.dsGrrzForm.ds_grrzStorageNo
          }
          if(this.dsGrrzForm.ds_grrzEmpNo){
            param.empNo=this.dsGrrzForm.ds_grrzEmpNo
          }
          if(this.dsGrrzForm.ds_grrzProvince){
            param.province=this.dsGrrzForm.ds_grrzProvince
          }
          if(this.dsGrrzForm.ds_grrzStatus){
            param.status=this.dsGrrzForm.ds_grrzStatus
          }
          if(this.dsGrrzForm.ds_grrzStartTime){
            param.startTime=this.dsGrrzForm.ds_grrzStartTime
          }
          if(this.dsGrrzForm.ds_grrzEndTime){
            param.endTime=this.dsGrrzForm.ds_grrzEndTime
          }
          return param;
        },
        //表格数据渲染
        ds_grrz_fn(){
          var grrz=this.grrz_getFilterParam();
          Object.assign(this.tmpParam,this.dsGrrzForm);
          let param= Object.assign({currentPage:this.currentPage},grrz);//js6合并json的方法Object.assign()
          api.ds_grrz(param)
            .then(res=>{
              if(res.status==1){
                this.ds_grrz_tableData=res.result;
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
