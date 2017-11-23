<template>
  <div class="ds_RR">
    <div class="ds_RR_form">
      <el-form :inline="true" :model="dsRRForm" ref="dsRRForm" class="demo-form-inline">
        <el-form-item label="省份" prop="ds_RRprovince">
          <el-input v-model="dsRRForm.ds_RRprovince" placeholder="省份"></el-input>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="ds_RRCheck">查 询</el-button>
          <el-button @click="ds_RRResetForm('dsRRForm')">重 置</el-button>
          <el-button @click="ds_RRLoadData">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr class="hr_line">
    <div class="ds_RR_table" style="display:block;">
      <el-table class="table_min_height" v-bind:data="ds_RR_tableData" border style="width: 100%;margin-top: 20px;">
        <el-table-column type="index" width="60"  align="center"></el-table-column>
        <el-table-column prop="empUserId" label="发展人ID" width="100"  align="center"></el-table-column>
        <el-table-column prop="empNo" label="发展人编号" width="280" align="center"></el-table-column>
        <el-table-column prop="empName" label="发展人名称"  align="center" width="250"></el-table-column>
        <el-table-column prop="province" label="省"  align="center" width="108"></el-table-column>
        <el-table-column prop="city" label="市"  align="center" width="110"></el-table-column>
        <el-table-column prop="area" label="区/县"  align="center" width="150"></el-table-column>
        <!--加三目运算符显示不同页面的不同tittle-->
        <!--<el-table-column prop="validQishiCount" :label="RRQueryType == 'qishi' ?'有效骑手数量' : '有效司机数量'"  width="130" align="center"></el-table-column>-->
        <el-table-column v-if="RRQueryType == 'qishi'" prop="validQishiCount" label="有效骑手数量"  width="130" align="center"></el-table-column>
        <el-table-column prop="rewardCount" label="业绩数量" align="center" width="180"></el-table-column>
        <el-table-column prop="totalAmount" label="总金额" align="center" width="180"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template scope="scope">
            <el-popover ref="ds_RR_popover1" placement="left" trigger="click" content="ds_RR_IdCard" title="查看">
              <el-table :data="RR_gridData" border style="max-height:241px;overflow-y:scroll;" class="selfTable">
                <el-table-column type="index" width="60"  align="center"></el-table-column>
                <el-table-column width="200" property="createTime" label="入驻时间" v-bind:formatter="ds_RRS_createTime" align="center"></el-table-column>
                <el-table-column width="200" property="name" label="姓名"  align="center"></el-table-column>
                <el-table-column width="100" property="status" label="审核状态" v-bind:formatter="ds_RRS_status" align="center"></el-table-column>
              </el-table>
            </el-popover>
            <el-button  type="text" v-popover:ds_RR_popover1 @click="ds_RR_handleClick(scope.row.empUserId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ds_oq_pageF">
      <el-pagination @current-change="ds_RR_handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow"></el-pagination>
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
        RR_gridData:[],
        ds_RR_tableData:[],
        currentPage:1,
        totalRow:0,
        RRQueryType:'qishi',
        dsRRForm:{
          ds_RRprovince:'',
        },
        tmpParam : {},
      }
    },
    created(){
      this.RRQueryType=this.$route.params.RRQueryType || 'qishi';
      this.ds_RR_fn();
    },
    watch:{
      "$route":function(to,from) {
        this.RRQueryType=to.params.RRQueryType;
        this.ds_RR_fn();
        this.ds_RRResetForm();
        this.tmpParam = {};
      }
    },
    components:{
      VTipMsg
    },
    methods:{
      //小表格内时间转换
      ds_RRS_createTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      //小表格审核状态
      ds_RRS_status(row,column,cellValue){
        return Final.QIAHI_STATUS[cellValue] || "";
      },
      //查看
      ds_RR_handleClick(row){
          let param={queryType:this.RRQueryType,empUserId:row};
          api.ds_RR_check(param)
            .then(res=>{
                if(res.status==1){
                    this.RR_gridData=res.result;
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
      },
      //查询
      ds_RRCheck(){
        this.ds_RR_fn();
      },
      //重置
      ds_RRResetForm(){
        this.$refs['dsRRForm'].resetFields();
        this.ds_RRCheck();
      },
      //导出数据
      ds_RRLoadData(){
        let ds_RRprovince=this.tmpParam.ds_RRprovince;
        let RR_queryType=this.RRQueryType;
        let urlStr="1=1";
        if(ds_RRprovince){
          urlStr+="&province="+ds_RRprovince;
        }
        if(RR_queryType){
          urlStr+="&queryType="+RR_queryType;
        }
        //debugger;
        window.open(Final.IMGURL+"wuliu-web-user/order/zb/recommendRewardExport.action?"+urlStr);
      },
      //翻页
      ds_RR_handleCurrentChange(val){
        this.currentPage = val;
        this.ds_RR_fn( );
      },
      //获取过滤器参数
      RR_getFilterParam(){
        var param={queryType:this.RRQueryType};
        if(this.dsRRForm.ds_RRprovince){
          param.province=this.dsRRForm.ds_RRprovince
        }
        return param;
      },
      //表格数据渲染
      ds_RR_fn(){
          Object.assign(this.tmpParam,this.dsRRForm);
        var stoPer=this.RR_getFilterParam();
        let param= Object.assign({currentPage:this.currentPage},stoPer);//js6合并json的方法Object.assign()
        api.ds_RR(param)
          .then(res=>{
            if(res.status==1){
              this.ds_RR_tableData=res.result;
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
