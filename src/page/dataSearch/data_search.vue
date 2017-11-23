<template>
  <div class="dataSearch">
    <div class="dsHeader">
      <el-form :inline="true" :model="forminline"  ref="forminline" class="demo-form-inline" label-width="80px">
        <el-form-item label="手机号码" prop="dsPhone">
          <el-input v-model="forminline.dsPhone" placeholder="管理员手机号检索"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="dsCompany">
          <el-input v-model="forminline.dsCompany" placeholder="公司名称检索"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="dsType">
          <el-select v-model="forminline.dsType" placeholder="请选择">
            <el-option label="同城众包" value="1"></el-option>
            <el-option label="同城快递" value="2"></el-option>
            <el-option label="专线公司" value="3"></el-option>
            <!--<el-option label="合同物流公司" value="4"></el-option>-->
            <el-option label="其他三方物流" value="4"></el-option>
            <el-option label="货运公司" value="5"></el-option>
            <!--<el-option label="仓储服务" value="6"></el-option>-->
            <el-option label="未入驻" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="dsStatus" >
          <el-select v-model="forminline.dsStatus" placeholder="请选择" style="width: 180px;">
            <el-option label="待审核" value="1"></el-option>
            <el-option label="补充审核" value="2"></el-option>
            <el-option label="待复审" value="3"></el-option>
            <el-option label="审核不通过" value="4"></el-option>
            <el-option label="审核通过" value="5"></el-option>
            <el-option label="复审通过" value="6"></el-option>
            <el-option label="证件逾期" value="8"></el-option>
          </el-select>
        </el-form-item>
        <!--<br>-->
        <el-form-item label="审核时间" >
          <el-col :span="11">
          <el-form-item prop="dsvalue1">
            <el-date-picker v-model="forminline.dsvalue1" type="date" placeholder="审核开始时间" style="width: 100%;" format="yyyy-MM-dd" @change="getNormalTime1_com"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line ml_10style" :span="2">—</el-col>
          <el-col :span="11">
            <el-form-item prop="dsvalue2">
              <el-date-picker v-model="forminline.dsvalue2" type="date" placeholder="审核结束时间" style="width: 100%;" format="yyyy-MM-dd" @change="getNormalTime2_com"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="onSubmit">查 询</el-button>
          <el-button @click="resetForm('forminline')">重 置</el-button>
          <el-button @click="ds_loadData">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr class="hr_line">
    <div class="dsTable" style="display:block;">
      <el-table class="table_min_height" v-bind:data="tableData" border style="margin-top: 20px;width:100%" >
        <el-table-column type="index"  align="center" width="60"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"  align="center" width="240"></el-table-column>
        <el-table-column prop="phone" label="管理员手机号" width="260" align="center"></el-table-column>
        <el-table-column prop="companyContent" label="公司类型" :formatter="ds_table_cType" align="center" width="260"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" v-bind:formatter="ds_table_reTime" align="center" width="260"></el-table-column>
        <el-table-column prop="enterTime" label="审核时间" v-bind:formatter="ds_table_enTime" align="center" width="260"></el-table-column>
        <el-table-column prop="status" label="状态" v-bind:formatter="ds_table_status" align="center" width="228"></el-table-column>
      </el-table>
    </div>
    <div class="ds_oq_pageF">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow"></el-pagination>
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
  import * as util from "./../../util/util";
  import api from './../../fetch/api';
  export default {
    data() {
      return {
        //value6: '',
        tableData:[],
        currentPage:1,
//        pagesize:5,
        totalRow:0,
        forminline: {
          dsPhone: '',
          dsCompany: '',
          dsType: '',
          dsStatus: '',
          dsvalue1:'',
          dsvalue2:''
        },
        tmpParam : {},
      }
    },
    components:{
      VTipMsg
    },
    created(){
       this.ds_dataShow_fn();
    },
    methods: {
      getNormalTime1_com(date1){
        this.forminline.dsvalue1 = date1;
        console.log(this.forminline.dsvalue1);
      },
      getNormalTime2_com(date2){
        this.forminline.dsvalue2 = date2;
        console.log(this.forminline.dsvalue2);
      },
      //公司类型
      ds_table_cType (row,column,cellValue) {
           if(!cellValue){
               return "未入驻";
           }else{
               return Final.EXPRESS_MODAL_DATA[cellValue] || "";
           }
      },
      //注册时间
      ds_table_reTime (row, column, cellValue) {
        if(!cellValue){
          return "";
        }else{
          return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
        }
      },
      //入驻时间
      ds_table_enTime(row, column, cellValue){
        if(!cellValue){
          return "";
        }else{
          return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
        }
      },
      //状态
      ds_table_status(row,column,cellValue){
        return Final.EXPRESS_TYPE_DATA[cellValue] || "";
      },
      //每页显示数据量变更
      handleSizeChange: function(val) {
        this.pagesize = val;
        //this.lgs_search_fun();
        this.ds_dataShow_fn( this.currentPage, this.pagesize);
      },
      //页码变更
      handleCurrentChange: function(val) {
        this.currentPage = val;
        this.ds_dataShow_fn( );
      },
      //查詢
      onSubmit() {
        this.ds_dataShow_fn();
      },
      //置空 在每个要想被清除内容的小组件上注意写prop=”…” 在每个要想被清除内容的小组件上注意写prop=”…” 在每个要想被清除内容的小组件上注意写prop=”…”重要的事说三遍
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ds_dataShow_fn();
      },
      //导出数据
      ds_loadData(){
        //debugger;
        let data_phone=this.tmpParam.dsPhone;
        let data_company=this.tmpParam.dsCompany;
        let data_type=this.tmpParam.dsType;
        let data_status=this.tmpParam.dsStatus;
        let data_egisterDate=this.tmpParam.dsvalue1;
        let data_postDate=this.tmpParam.dsvalue2;
        var urlStr="1=1";
        if(data_phone){
           if( util.checkMobile(data_phone)){
             urlStr+="&phone="+data_phone;
           }else {
             this.$refs.tipMsgRef.showTipMsg({
               msg:"请输入正确手机号后点击查询",
               type:'error'
             });
             return;
           }
        }
        if(data_company){
          urlStr+="&companyName="+data_company;
        }
        if(data_type){
          urlStr+="&companyContent="+data_type;
        }
        if(data_status){
          urlStr+="&status="+data_status;
        }
        if(data_egisterDate){
          urlStr+="&startEnterTime="+data_egisterDate;
        }
        if(data_postDate){
          urlStr+="&endEnterTime="+data_postDate;
        }
        window.open(Final.IMGURL+"wuliu-web-user/wuliu/user/compAdminExport.action?"+urlStr);
      },
      //渲染表格
      ds_dataShow_fn:function(){
        Object.assign(this.tmpParam,this.forminline);
        let param ={currentPage:this.currentPage,companyName:this.forminline.dsCompany,phone:this.forminline.dsPhone,companyContent:this.forminline.dsType,status:this.forminline.dsStatus,startEnterTime:this.forminline.dsvalue1,endEnterTime:this.forminline.dsvalue2};
          api.ds_test(param)
            .then(res=>{
                if(res.status==1){
                  this.tableData=res.result;
                  this.totalRow=res.totalRow;
                }else if(res.status==2){
                  this.$refs.tipMsgRef.showTipMsg({
                    msg:res.message,
                    type:'error',
                    param:{test:1}
                  });
                }
                //his.currentPage=res.currentPage;
                //console.log(res.totalRow);
            }).catch(err=>{
                console.log(err);
          })
      }
    }
  }
</script>
