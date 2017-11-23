<template>
    <div class="ds_qs">
       <div class="ds_qs_form">
         <el-form :inline="true" :model="forminline"  ref="forminline" class="demo-form-inline" label-width="80px">
           <el-form-item label="手机号码" prop="ds_qsPhone">
             <el-input v-model="forminline.ds_qsPhone" placeholder="用户手机号检索"></el-input>
           </el-form-item>
           <el-form-item label="姓名" prop="ds_qsName">
             <el-input v-model="forminline.ds_qsName" placeholder="姓名检索"></el-input>
           </el-form-item>
           <el-form-item label="状态" prop="ds_qsStatus">
             <el-select v-model="forminline.ds_qsStatus" placeholder="请选择">
               <el-option label="审核中" value="1"></el-option>
               <el-option label="审核通过" value="2"></el-option>
               <el-option label="审核未通过" value="3"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="类型" prop="ds_qsType">
             <el-select v-model="forminline.ds_qsType" placeholder="请选择" style="width: 180px;">
               <el-option label="个人认证" value="1"></el-option>
               <el-option label="驻仓骑手" value="2"></el-option>
               <el-option label="站点员工" value="3"></el-option>
             </el-select>
           </el-form-item>
           <!--<br>-->
           <el-form-item label="审核时间" >
             <el-col :span="11">
               <el-form-item prop="ds_qsValue1">
                 <el-date-picker v-model="forminline.ds_qsValue1" type="date" placeholder="审核开始时间" style="width: 100%;" format="yyyy-MM-dd" @change="getNormalTime1"></el-date-picker>
               </el-form-item>
             </el-col>
             <el-col class="line ml_10style" :span="2">—</el-col>
             <el-col :span="11">
               <el-form-item prop="ds_qsValue2">
                 <el-date-picker v-model="forminline.ds_qsValue2" type="date" placeholder="审核结束时间" style="width: 100%;" format="yyyy-MM-dd" @change="getNormalTime2"></el-date-picker>
               </el-form-item>
             </el-col>
           </el-form-item>
           <el-form-item style="float:right;">
             <el-button type="primary" @click="ds_qsCheck">查 询</el-button>
             <el-button @click="ds_qsResetForm('forminline')">重 置</el-button>
             <el-button @click="ds_qsLoadData">导出数据</el-button>
             <el-button @click="ds_qsLoadReport">导出统计报表</el-button>
           </el-form-item>
         </el-form>
       </div>
      <hr class="hr_line">
      <div class="ds_qs_table">
        <el-table class="table_min_height" v-bind:data="tableData" border style="width: 100%;margin-top: 20px;">
          <el-table-column type="index" width="60"  align="center"></el-table-column>
          <el-table-column prop="companyName" label="公司名称" width="210"  align="center"></el-table-column>
          <el-table-column prop="name" label="姓名"  align="center" width="200"></el-table-column>
          <el-table-column prop="userPhone" label="用户手机号"  align="center" width="240"></el-table-column>
          <el-table-column prop="authType" label="认证类型" v-bind:formatter="ds_qsImg_authType" align="center" width="240"></el-table-column>
          <el-table-column prop="status" label="骑士状态" v-bind:formatter="ds_qsImg_status" align="center" width="240"></el-table-column>
          <el-table-column prop="auditTime" label="审核时间" v-bind:formatter="ds_qsImg_auditTime" width="200" align="center"></el-table-column>
          <el-table-column prop="storageNo" label="仓库编号" align="center" width="240"></el-table-column>
          <!--<el-table-column fixed="right" label="操作" width="100" align="center">-->
          <el-table-column label="操作" width="100" align="center">
            <template scope="scope">
              <el-popover ref="ds_qs_popover1" placement="left" trigger="click" content="ds_qs_IdCard" title="查看身份证信息">
                <span>{{ds_qs_IdCard}}</span>
              </el-popover>
              <el-button  type="text" v-popover:ds_qs_popover1 @click="ds_qs_handleClick(scope.row.userPhone)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--<el-dialog title="查看身份证信息" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">-->
          <!--<span >{{IdCard}}</span>-->
        <!--</el-dialog>-->
      </div>
      <div class="ds_oq_pageF">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next" :total="totalRow"></el-pagination>
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
      data(){
        return {
          tableData:[],
          currentPage:1,
          totalRow:0,
          //dialogVisible: false,
          ds_qs_IdCard:'',
          forminline:{
            ds_qsPhone:'',
            ds_qsName:'',
            ds_qsStatus:'',
            ds_qsType:'',
            ds_qsValue1:'',
            ds_qsValue2:''
          },
          tmpParam: {}
        }
      },
      components:{
        VTipMsg
      },
      created(){
         this.ds_qsImg_fn();
      },
      methods:{
        getNormalTime1(date1){
          this.forminline.ds_qsValue1 = date1;
          console.log(this.forminline.ds_qsValue1);
        },
        getNormalTime2(date2){
          this.forminline.ds_qsValue2 = date2;
          console.log(this.forminline.ds_qsValue2);
        },
          //查看
        ds_qs_handleClick(userPhone) {
            //this.dialogVisible=true;
           //console.log(userPhone)
           let param={userPhone:userPhone};
           api.ds_qsImg_check(param)
             .then(res=>{
                if(res.status==1){
                  this.ds_qs_IdCard=res.result;
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
        ds_qsCheck(){
          this.ds_qsImg_fn();
        },
        //重置
        ds_qsResetForm(formName){
          this.$refs[formName].resetFields();
          this.ds_qsCheck();
        },
        //导出统计表
        ds_qsLoadReport(){
          window.open(Final.IMGURL+"wuliu-web-user/order/zb/getZhcRecommendFormExport.action");
        },
        //导出数据
        ds_qsLoadData(){
            //debugger;
          let qishi_state=this.tmpParam.ds_qsStatus;
          let qishi_type=this.tmpParam.ds_qsType;
          let qishi_phone=this.tmpParam.ds_qsPhone;
          let qishi_name=this.tmpParam.ds_qsName;
          let qishi_startTime=this.tmpParam.ds_qsValue1;
          let qishi_endTime=this.tmpParam.ds_qsValue2;
          let urlStr="1=1";
          if(qishi_state){
            urlStr+="&status="+qishi_state;
          }
          if(qishi_type){
            urlStr+="&authType="+qishi_type;
          }
          if(qishi_phone){
            if( util.checkMobile(qishi_phone)){
              urlStr+="&userPhone="+qishi_phone;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:"请输入正确手机号后点击查询",
                type:'error'
              });
              return;
            }
          }
          if(qishi_name){
            urlStr+="&name="+qishi_name;
          }
          if(qishi_startTime){
            urlStr+="&startTime="+qishi_startTime;
          }
          if(qishi_endTime){
            urlStr+="&endTime="+qishi_endTime;
          }
          window.open(Final.IMGURL+"wuliu-web-user/order/zb/qiShiExport.action?"+urlStr);
        },
        //认证类型
        ds_qsImg_authType(row,column,cellValue){
          return Final.QISHI_TYPE[cellValue] || "";
        },
        //状态
        ds_qsImg_status(row,column,cellValue){
          return Final.QIAHI_STATUS[cellValue] || "";
        },
        //格式化时间
        ds_qsImg_auditTime(row,column,cellValue){
          return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
        },
        //页码变更
        handleCurrentChange: function(val) {
          this.currentPage = val;
          this.ds_qsImg_fn( );
        },
         //表格数据渲染
         ds_qsImg_fn:function(){
            Object.assign(this.tmpParam,this.forminline);
            let param={currentPage:this.currentPage,userPhone:this.forminline.ds_qsPhone,name:this.forminline.ds_qsName,status:this.forminline.ds_qsStatus,authType:this.forminline.ds_qsType,startTime:this.forminline.ds_qsValue1,endTime:this.forminline.ds_qsValue2};
             api.ds_qsImg(param)
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
               }).catch(err=>{
                   console.log(err);
             })
         }
      }

    }
</script>
