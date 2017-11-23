<template>
  <div class="ds_stoPer">
    <div class="ds_stoPer_form">
      <el-form :inline="true" :model="dsStoPerForm" ref="dsStoPerForm" class="demo-form-inline">
        <el-form-item label="归属仓库编码" prop="ds_stoPerStorageNo">
          <el-input v-model="dsStoPerForm.ds_stoPerStorageNo" placeholder="归属仓库编码"></el-input>
        </el-form-item>
        <el-form-item label="归属仓库名称" prop="ds_stoPerStorageName">
          <el-input v-model="dsStoPerForm.ds_stoPerStorageName" placeholder="归属仓库名称"></el-input>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="ds_stoPerCheck">查 询</el-button>
          <el-button @click="ds_stoPerResetForm('dsStoPerForm')">重 置</el-button>
          <el-button @click="ds_stoPerLoadData">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr class="hr_line">
    <div class="ds_stoPer_table" style="display:block;">
      <el-table class="table_min_height" v-bind:data="ds_stoPer_tableData" border style="width: 100%;margin-top: 20px;">
        <el-table-column type="index" width="60"  align="center"></el-table-column>
        <el-table-column prop="storageNo" label="归属仓库编号" width="230"  align="center"></el-table-column>
        <el-table-column prop="storageName" label="归属仓库名称" width="250" align="center"></el-table-column>
        <el-table-column prop="province" label="省"  align="center" width="180"></el-table-column>
        <el-table-column prop="city" label="市"  align="center" width="180"></el-table-column>
        <el-table-column prop="area" label="区/县"  align="center" width="180"></el-table-column>
        <el-table-column prop="enterCount" label="本月入驻数量"  width="130" align="center"></el-table-column>
        <el-table-column prop="completionRate" label="完成率" align="center" width="180"></el-table-column>
        <el-table-column label="操作" width="178" align="center">
          <template scope="scope">
            <el-popover ref="ds_qs_popover1" placement="left" trigger="click" content="ds_sp_IdCard" title="查看" style="height: 250px">
              <el-table  class="selfTable" :data="sp_gridData" max-height="250" border>
                <el-table-column type="index" width="60"  align="center"></el-table-column>
                <el-table-column width="180" property="createTime" label="入驻时间" v-bind:formatter="ds_qs_createTime" align="center"></el-table-column>
                <el-table-column width="180" property="name" label="姓名" align="center"></el-table-column>
                <el-table-column width="100" property="status" label="审核状态" v-bind:formatter="ds_qs_status" align="center"></el-table-column>
              </el-table>
            </el-popover>
            <el-button  type="text" v-popover:ds_qs_popover1 @click="ds_sp_handleClick(scope.row.storageNo)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ds_oq_pageF">
      <el-pagination @current-change="ds_stoPer_handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow" ></el-pagination>
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
        sp_gridData:[],
        ds_stoPer_tableData:[],
        currentPage:1,
        totalRow:0,
        stoPerQueryType:'qishi',
        dsStoPerForm:{
          ds_stoPerStorageNo:'',
          ds_stoPerStorageName:''
        },
        tmpParam : {}
      }
    },
    components:{
      VTipMsg
    },
    created(){
      this.stoPerQueryType=this.$route.params.stoPerQueryType || 'qishi';
      this.ds_stoPer_fn();
    },
    watch:{
      "$route":function(to,from) {
        this.stoPerQueryType=to.params.stoPerQueryType;
        this.ds_stoPer_fn();
        this.ds_stoPerResetForm();
      }
    },
    methods:{
      //小表格内时间转换
      ds_qs_createTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      //小表格审核状态
      ds_qs_status(row,column,cellValue){
        return Final.QIAHI_STATUS[cellValue] || "";
      },
      //查看
      ds_sp_handleClick(row){
          //debugger;
         let param={storageNo:row,queryType:this.stoPerQueryType};
         api.ds_stoPer_check(param)
           .then(res=>{
               if(res.status==1){
                 this.sp_gridData=res.result;
               }else if(res.status==2){
                 this.$refs.tipMsgRef.showTipMsg({
                   msg:res.message,
                   type:'error',
                   param:{test:1}
                 });
               }
           }).catch(err=>{
           console.log(err);
           }
         )
      },
      //查询
      ds_stoPerCheck(){
        this.ds_stoPer_fn();
      },
      //重置
      ds_stoPerResetForm(){
        this.$refs['dsStoPerForm'].resetFields();
        this.ds_stoPerCheck();
      },
      //导出数据
      ds_stoPerLoadData(){
        let stoPer_storageNo=this.tmpParam.ds_stoPerStorageNo;
        let stoPer_storageName=this.tmpParam.ds_stoPerStorageName;
        let stoPer_queryType=this.stoPerQueryType;
        let urlStr="1=1";
        if(stoPer_storageNo){
          urlStr+="&storageNo="+stoPer_storageNo;
        }
        if(stoPer_storageName){
          urlStr+="&storageName="+stoPer_storageName;
        }
        if(stoPer_queryType){
          urlStr+="&queryType="+stoPer_queryType;
        }
        window.open(Final.IMGURL+"wuliu-web-user/order/zb/zhcAchievementExport.action?"+urlStr);
      },
      //翻页
      ds_stoPer_handleCurrentChange(val){
        this.currentPage = val;
        this.ds_stoPer_fn( );
      },
      //获取过滤器参数
      stoPer_getFilterParam(){
        var param={queryType:this.stoPerQueryType};
        if(this.dsStoPerForm.ds_stoPerStorageNo){
          param.storageNo=this.dsStoPerForm.ds_stoPerStorageNo
        }
        if(this.dsStoPerForm.ds_stoPerStorageName){
          param.storageName=this.dsStoPerForm.ds_stoPerStorageName
        }
        return param;
      },
      //表格数据渲染
      ds_stoPer_fn(){
          Object.assign(this.tmpParam,this.dsStoPerForm);
        var stoPer=this.stoPer_getFilterParam();
        let param= Object.assign({currentPage:this.currentPage},stoPer);//js6合并json的方法Object.assign()
        api.ds_stoPer(param)
          .then(res=>{
            if(res.status==1){
              this.ds_stoPer_tableData=res.result;
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
