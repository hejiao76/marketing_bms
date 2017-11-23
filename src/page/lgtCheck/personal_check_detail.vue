<template>

  <div class="con_list">
    <el-row class="s-f-back" style="line-height:36px;">
      <el-col :span="24" style="text-align:right;">
        <el-button v-if="showCheckLog==1" @click="changeShowCheckLog" type="info">查看审批轨迹</el-button>
        <el-button v-else @click="changeShowCheckLog" type="info">收起审批轨迹</el-button>
      </el-col>
    </el-row>
    <el-row  v-bind:class="['s-f-back','mt10',showCheckLog == 1 ? 'show-check-log': 'hide-check-log']" style="line-height:36px;">
      <el-col :span="24" >
        <el-table class="selfTable"  :data="checkLogs"  ref="singleTable" border highlight-current-row max-height="250">
          <el-table-column align="center" type="index" label="" width="60"></el-table-column>
          <el-table-column prop="auditUserName" label="审核人姓名" align="center" width="180"></el-table-column>
          <el-table-column prop="auditLoginName" label="审核人登录名" align="center" width="180"></el-table-column>
          <el-table-column prop="auditTime" align="center" label="审核时间" width="180" v-bind:formatter="personal_check_allTime"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" v-bind:formatter="personal_check_allStatus"></el-table-column>
          <el-table-column prop="advice"  label="审核意见" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <table class="page_m" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td class="page_m_a">
          <span class="bold">姓名：</span><span>{{this.personalInfo.name}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.nameErrorMsg" @click="objectDataTest('nameErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.nameErrorMsg"  @click="tipMsgRemove('nameErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.nameErrorMsg" ref="nameErrorMsg" v-model="dataObj.nameErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('nameErrorMsg')" @blur="handleInputConfirm('nameErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.nameErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('nameErrorMsg')">{{this.dataObj.nameErrorMsg}}</span>
            </span>
            <span v-if="btnObj.nameErrorMsg && !dataObj.nameErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">身份证号：</span><span>{{this.personalInfo.idCard}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.idCardErrorMsg" @click="objectDataTest('idCardErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.idCardErrorMsg"  @click="tipMsgRemove('idCardErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.idCardErrorMsg" ref="idCardErrorMsg" v-model="dataObj.idCardErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('idCardErrorMsg')" @blur="handleInputConfirm('idCardErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.idCardErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('idCardErrorMsg')">{{this.dataObj.idCardErrorMsg}}</span>
            </span>
            <span v-if="btnObj.idCardErrorMsg && !dataObj.idCardErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="fl bold">手机号：</span><span>{{this.personalInfo.userPhone}}</span>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.userPhoneErrorMsg" @click="objectDataTest('userPhoneErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.userPhoneErrorMsg"  @click="tipMsgRemove('userPhoneErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.userPhoneErrorMsg" ref="userPhoneErrorMsg" v-model="dataObj.userPhoneErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('userPhoneErrorMsg')" @blur="handleInputConfirm('userPhoneErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.userPhoneErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('userPhoneErrorMsg')">{{this.dataObj.userPhoneErrorMsg}}</span>
            </span>
            <span v-if="btnObj.userPhoneErrorMsg && !dataObj.userPhoneErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">个人介绍：</span>
          <p class="yj_p mt5">{{this.personalInfo.introduction}}</p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.introductionErrorMsg" @click="objectDataTest('introductionErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.introductionErrorMsg"  @click="tipMsgRemove('introductionErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.introductionErrorMsg" ref="introductionErrorMsg" v-model="dataObj.introductionErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('introductionErrorMsg')" @blur="handleInputConfirm('introductionErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.introductionErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('introductionErrorMsg')">{{this.dataObj.introductionErrorMsg}}</span>
            </span>
            <span v-if="btnObj.introductionErrorMsg && !dataObj.introductionErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">身份证正面照：</span><span></span>
          <p class="tc card_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+personalInfo.idCardImg1)" v-bind:src="Final.IMGURL+personalInfo.idCardImg1" class=""/>
          </p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.idCardImg1ErrorMsg" @click="objectDataTest('idCardImg1ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.idCardImg1ErrorMsg"  @click="tipMsgRemove('idCardImg1ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.idCardImg1ErrorMsg" ref="idCardImg1ErrorMsg" v-model="dataObj.idCardImg1ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('idCardImg1ErrorMsg')" @blur="handleInputConfirm('idCardImg1ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.idCardImg1ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('idCardImg1ErrorMsg')">{{this.dataObj.idCardImg1ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.idCardImg1ErrorMsg && !dataObj.idCardImg1ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a">
          <span class="bold">身份证：</span><span>背面照</span>
          <p class="tc card_sfz">
            <img  v-on:click="showBigImg(Final.IMGURL+personalInfo.idCardImg2)" v-bind:src="Final.IMGURL+personalInfo.idCardImg2" class=""/>
          </p>
        </td>
        <td class="page_btn">
          <el-button v-if="btnObj.idCardImg2ErrorMsg" @click="objectDataTest('idCardImg2ErrorMsg')" type="primary" size="small">审批</el-button>
          <el-button v-if="tipObj.idCardImg2ErrorMsg"  @click="tipMsgRemove('idCardImg2ErrorMsg')" size="small" type="danger">删除</el-button>
        </td>
        <td class="page_m_b">
          <span class="fl">审批意见：</span>
          <p class="yj_p">
            <el-input v-if="inputObj.idCardImg2ErrorMsg" ref="idCardImg2ErrorMsg" v-model="dataObj.idCardImg2ErrorMsg" type="textarea" :rows="2" placeholder="请输入审批意见，最多50字" style="vertical-align: middle" @keyup.enter.native="handleInputConfirm('idCardImg2ErrorMsg')" @blur="handleInputConfirm('idCardImg2ErrorMsg')" v-bind:maxlength="50"></el-input>
            <span v-if="tipObj.idCardImg2ErrorMsg" class=" mr15 errTipMsg">
              <span class="ml10"  @click="tipMsgClick('idCardImg2ErrorMsg')">{{this.dataObj.idCardImg2ErrorMsg}}</span>
            </span>
            <span v-if="btnObj.idCardImg2ErrorMsg && !dataObj.idCardImg2ErrorMsg"  class=" mr15 errTipMsg">
              <span class="ml10"  >无</span>
            </span>
          </p>
        </td>
      </tr>
      <tr>
        <td class="page_m_a tab_qx_bg" colspan="3">
          <el-row class="" style="line-height:36px;">
            <el-col :span="12">
              <span  class="bold">身份证有效期：</span>
              <span>
                <el-date-picker v-model="dataObj.idCardEndDate" type="date" placeholder="选择日期" ></el-date-picker>
              </span>
            </el-col>
            <el-col :span="12">
              <span  class="bold">是否临时身份证：</span>
              <span>
                <el-radio-group v-model="dataObj.isTempIdCard">
                  <el-radio class="radio"  :label="1">是</el-radio>
                  <el-radio class="radio"  :label="0">否</el-radio>
                </el-radio-group>
                <!--{{this.personalInfo.isTempIdCard > 0 ? "是" : "否"}}-->
              </span>

            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td class="page_m_a tab_qx_bg" colspan="3">
          <span class="bold">综合评价：</span>
          <el-input class="mt10"  type="textarea" :rows="4" placeholder="请输入内容" v-model="dataObj.advice" v-bind:maxlength="50"></el-input>
        </td>
      </tr>
    </table>
    <!--<div style="height:200px;widht:100px;border:1px solid #000000">-->
        <!--<div style="height:100%;border:1px solid red;width:100px;">-->

        <!--</div>-->
    <!--</div>-->
    <el-row class="mt20 mb20" style="line-height:36px;">
      <el-col :span="24" style="text-align:center;">
        <el-button @click="checkPass" type="primary" >审核通过</el-button>
        <el-button @click="checkFail" type="primary" >不通过</el-button>
      </el-col>
    </el-row>

    <el-dialog title="查看大图1" :visible.sync="dialogPicVisible">
      <div style="width:100%;height:400px; overflow:scroll;text-align:center;">
        <img id="showBigImg_img" v-on:click="remoteImg" v-bind:src="bigImgSrc" v-bind:style="{maxWidth:'600px',cursor:'pointer',transform:'rotate('+bigImgRemote+'deg)'}"/>
      </div>
    </el-dialog>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
  </div>

</template>
<script>
  import VHeader from "./../../components/header";
  import VLeft from "./../../components/left";
  import VConNav from "./../../components/con_nav";
  import Final from "./../../util/Final";
  import * as util from "./../../util/util"
  import Api from "./../../fetch/api";
  import VTipMsg from "./../../components/tipMsg.vue";
//  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data() {
      return {
        dataObj:{
          nameErrorMsg:'',
          userPhoneErrorMsg:'',
          idCardErrorMsg:'',
          introductionErrorMsg:'',
          idCardImg1ErrorMsg:'',
          idCardImg2ErrorMsg:'',
          idCardEndDate:'',
          isTempIdCard:0,
          advice:'',
        },
        btnObj:{
          nameErrorMsg:true,
          userPhoneErrorMsg:true,
          idCardErrorMsg:true,
          introductionErrorMsg:true,
          idCardImg1ErrorMsg:true,
          idCardImg2ErrorMsg:true,
        },
        inputObj:{
          nameErrorMsg:false,
          userPhoneErrorMsg:false,
          idCardErrorMsg:false,
          introductionErrorMsg:false,
          idCardImg1ErrorMsg:false,
          idCardImg2ErrorMsg:false,
        },
        tipObj:{
          nameErrorMsg:false,
          userPhoneErrorMsg:false,
          idCardErrorMsg:false,
          introductionErrorMsg:false,
          idCardImg1ErrorMsg:false,
          idCardImg2ErrorMsg:false,
        },
        bigImgRemote:0,
        bigImgSrc:"",
        dialogPicVisible:false,
        fromURL:'',
        personalInfoId:'',
        personalInfo:'',
        Final:'',
        checkType:0,
        checkLogs:[], //审核记录集合,
        showCheckLog:1,
        dialogFormVisible:false,
        checkLogDetail:'',

      }
    },
    components :{
//      ElCol,
      VHeader,
      VLeft,
      VConNav,
      VTipMsg
    },
    created (){
      this.Final=Final;
      this.fromURL=this.$store.state.tmpFromPath;
      this.personalInfoId=this.$route.params.personalInfoId;
      this.requestPersonalInfo();
    },
    watch : {
      "$route": function(to,from) {
        this.fromURL=this.$store.state.tmpFromPath;
      }
    },
    methods : {
      //时间转换
      personal_check_allTime(row,column,cellValue){
        return new Date(parseInt(cellValue) * 1000/1000).toLocaleString('chinese',{hour12:false}).replace("/","-").replace("/","-");
      },
      personal_check_allStatus(row,column,cellValue){
        return Final.ZCQISHOU_STATUS[cellValue] || "";
      },
      changeShowCheckLog () {
        if(this.showCheckLog==1){
          this.showCheckLog=2
        }else{
          this.showCheckLog=1
        }
      },
      objectDataTest (key) {
          this.btnObj[key]=false;
          this.inputObj[key]=true;
          this.tipObj[key]=false;
        this.$nextTick(_ => {
          this.$refs[key].$refs.textarea.focus();
        });
      },
      handleInputConfirm (key){
        if(this.dataObj[key]){
          this.btnObj[key]=false;
          this.inputObj[key]=false;
          this.tipObj[key]=true;
        }else {
          this.btnObj[key]=true;
          this.inputObj[key]=false;
          this.tipObj[key]=false;
        }
      },
      tipMsgClick (key){
        this.btnObj[key]=false;
        this.inputObj[key]=true;
        this.tipObj[key]=false;
        this.$nextTick(_ => {
          this.$refs[key].$refs.textarea.focus();
        });
      },
      tipMsgRemove (key){
        this.btnObj[key]=true;
        this.inputObj[key]=false;
        this.tipObj[key]=false;
        this.dataObj[key]="";
      },
      /**
       * 校验数据状态
       * */
//      getCheckTypeByStatus (data) {
//        if(Final.CHECK_TYPE_MAPPING[1].includes(data.status)){
//          this.checkType=1;
//        }else if(Final.CHECK_TYPE_MAPPING[2].includes(data.status)){
//          this.checkType=2;
//        }else if(Final.CHECK_TYPE_MAPPING[3].includes(data.status)){
//          this.checkType=3;
//        }else if(Final.CHECK_TYPE_MAPPING[4].includes(data.status)){
//          this.checkType=4;
//        }
//
//      },
      /**
       * 旋转图片
       * */
      remoteImg () {
        this.bigImgRemote=(this.bigImgRemote+90)%360;
      },
      /**
       * 显示大图
       * */
      showBigImg (imgUrl){
        this.bigImgSrc=imgUrl;
        this.dialogPicVisible=true;
      },
      formatCheckPassParam () {
          let userPhone = this.personalInfo.userPhone;
          //let advice = this.dataObj.advice;
          let isTempIdCard=this.dataObj.isTempIdCard;
          let idCardEndDate=this.dataObj.idCardEndDate;
          let errorMsgTxt='';
          if(!userPhone){
              errorMsgTxt='骑士手机号异常，请刷新后重试';
          }
//          else if(!advice){
//              errorMsgTxt='请填写综合评价';
//          }
          else if(!idCardEndDate){
              errorMsgTxt='请填写身份证有效期';
          }
          if(errorMsgTxt){
//            this.$message({
//              message: errorMsgTxt,
//              type: 'error'
//            });
            this.$refs.tipMsgRef.showTipMsg({
              msg:errorMsgTxt,
              type:"error"
            });
            return false;
          }
          let param={userPhone:userPhone,isTempIdCard:isTempIdCard,idCardEndDate:idCardEndDate};
          return param;
      },
      /**
       * 审核通过
       * */
      checkPass (p) {
        let param=this.formatCheckPassParam();
        if(param){
          this.requestCheckPass(param);
        }

      },
      /**
       * 提交审核通过数据
       **/
      requestCheckPass (param) {
        if(param){
          Api.lc_personal_check_info_commit(param)
            .then(res => {
              if(res.status==1){
//                this.$message({
//                  message: '审核成功',
//                  type: 'success',
//                  duration:1500,
//                  onClose: function (){
//                    //此处回调
//                    this.$router.push("/lgtcheck/personalcheck/"+this.checkType);
//                  }.bind(this)
//                });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'审核成功',
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push(this.fromURL || ("/lgtcheck/drivercheck/"+this.checkType));
                  }
                });
              }else if(res.status==2){
//                  this.$message({
//                    message: res.message,
//                    type: 'error',
//                    duration:1500,
//                  });
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
       * 审核失败
       * */
      checkFail(){
        let param=this.formatCheckFailParam();
        if(param){
          this.requestCheckFail(param);
        }
      },
      formatCheckFailParam () {
        let userPhone = this.personalInfo.userPhone;
        let advice = this.dataObj.advice;
        let nameErrorMsg = this.dataObj.nameErrorMsg;
        let userPhoneErrorMsg = this.dataObj.userPhoneErrorMsg;
        let idCardErrorMsg = this.dataObj.idCardErrorMsg;
        let idCardImg1ErrorMsg = this.dataObj.idCardImg1ErrorMsg;
        let idCardImg2ErrorMsg = this.dataObj.idCardImg2ErrorMsg;
        let introductionErrorMsg = this.dataObj.introductionErrorMsg;
        let errorMsgTxt='';
        if(!userPhone){
          errorMsgTxt='骑士手机号异常，请刷新后重试';
        }else if(!nameErrorMsg && !userPhoneErrorMsg && !idCardErrorMsg && !idCardImg1ErrorMsg && !idCardImg1ErrorMsg && !idCardImg2ErrorMsg && !introductionErrorMsg){
          errorMsgTxt='请审批不通过项并填写原因';
        }
        if(errorMsgTxt){
//          this.$message({
//            message: errorMsgTxt,
//            type: 'error'
//          });
          this.$refs.tipMsgRef.showTipMsg({
            msg:errorMsgTxt,
            type:"error",
            scope:this
          });
          return false;
        }
        let param={
          userPhone:userPhone,
          advice:advice,
          nameErrorMsg:nameErrorMsg,
          userPhoneErrorMsg:userPhoneErrorMsg,
          idCardErrorMsg:idCardErrorMsg,
          idCardImg1ErrorMsg:idCardImg1ErrorMsg,
          idCardImg2ErrorMsg:idCardImg2ErrorMsg,
          introductionErrorMsg:introductionErrorMsg
        };
//        for(let item in param) {
//            if(param[item]==''){
//                delete param[item];
//            }
//        }
        return param;
      },
      /**
       * 提交审核不通过数据
       **/
      requestCheckFail (param) {
        if(param){
          Api.lc_personal_check_fail_info_commit(util.getPostParam(param))
            .then(res => {
              if(res.status==1){
//                this.$message({
//                  message: '操作成功',
//                  type: 'success',
//                  duration:1500,
//                  onClose: function (){
//                    //此处回调
//                    this.$router.push("/lgtcheck/personalcheck/"+this.checkType);
//                  }.bind(this)
//                });
                this.$refs.tipMsgRef.showTipMsg({
                  msg:'操作成功',
                  type:"success",
                  scope:this,
                  callback:function (){
                    this.$router.push(this.fromURL || ("/lgtcheck/personalcheck/"+this.checkType));
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
       * 请求个人信息
       */
      requestPersonalInfo () {
        if(this.personalInfoId){
          let param= {userPhone:this.personalInfoId,token:localStorage.getItem("token"),applicantUserType:"qishi"};
          Api.lc_personal_check_info(param)
            .then(res => {
              if(res.status==1){
                this.personalInfo=res.result;
                this.checkLogs=res.result.auditLogList;
//                this.getCheckTypeByStatus(res.result);
//                if(this.checkType==3){
//                    this.requestCheckReason(res.result.auditId);
//
//                }
              }
            }).catch(err =>{

          });
        }
      },
//      requestCheckReason (auditId) {
//        if(auditId){
//          let param= util.getPostParam({auditId:auditId});
//          Api.lc_get_audit_remark(param)
//            .then(res => {
//              if(res.status==1){
//                this.checkReason.remark1=res.result.remark1;
//                this.checkReason.remark2=res.result.remark2;
//              }
//            }).catch(err =>{
//
//          });
//        }
//      }
    }
  }
</script>
<style scoped="scope">
  .business_Images {
    max-height: 200px;
  }
  .person_Images {
    max-width:100%;
    width:100%;
    max-height: 400px;
    margin-right: 10px;
  }
  .con_list ul li {
    line-height: 35px;
  }
  .dialogUl li {
    line-height: 35px;
    width: 33%;
    float: left;
  }
  .s-f-back {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    overflow: hidden;
    padding-bottom: 10px;
  }
  /*.show-check-log {*/
    /*display: block;*/
    /*transition:display 1s;*/
  /*}*/
  .show-check-log {
    display: none;
    transition:display 1s;
  }
  .col_div {
    background-color: #E5E9F2;
    border:1px solid #99A9BF;
    border-radius:4px;
    padding-left:10px;
    display:flex;/*设为伸缩容器*/
    flex-flow:row;/*伸缩项目单行排列*/
    align-items: center;
    justify-content: center;

  }
  .col_child_div {
    flex:1;
    height:100%;
  }
  .errTipMsg {
    display:inline-block;
    height:100%;
    color:#333;
    width:100%;
    line-height:20px;
    word-break: break-all;
    /*border: solid 1px #D3DCE6;*/
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    vertical-align: middle;
    display: block;
    min-height: 20px;
    /*background-color:#D3DCE6;*/
    /*display:flex;!*设为伸缩容器*!*/
    /*flex-flow:row;!*伸缩项目单行排列*!*/
    /*align-items: center;*/
  }
  /*.errTipMsg span:first-child  {*/
    /*flex:8*/
  /*}*/
  /*.errTipMsg span:last-child {*/
    /*flex:2;*/
    /*text-align: center;*/

  /*}*/

  .errInput {
    display: inline-block;
    width:100%;
  }

.page_m{
  width: 100%;
  text-align: left;
  margin-top:30px;
  border-right:1px solid #dcdcdc;
  border-bottom:1px solid #dcdcdc;
}
  .page_m tr td{
    border-left:1px solid #dcdcdc;
    border-top:1px solid #dcdcdc;
    padding:10px;
  }
  .page_m tr td:first-child{
    width:45%;
    background: #fff8ef;
  }
  .page_m tr td:nth-child(2){
    width:10%;
    min-width: 110px;
    text-align: center;
  }
  .page_m tr .tab_qx_bg{
    background: #fff!important;
  }
  .page_m_b .yj_p{
    margin-left:70px;
  }
  .page_m_a .card_sfz img{
    width: 270px;
    height: 170px;
    max-width: 270px;
    max-height: 170px;
    border: 1px solid #dcdcdc;
    border-radius:4px;
    padding: 5px;
    margin-top: 10px;
  }
  .el-textarea__inner{
    border:1px solid red!important;
  }
  .color_delate{
    background: #FF4949;
    border-color:#FF4949;
    /*outline: #FF4949;*/
  }
  .color_delate:hover{
    background: rgba(255, 73, 73, 0.76);
    border-color:rgba(255, 73, 73, 0.76);
  }
</style>
